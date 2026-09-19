"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Plus, Edit2, Trash2, Loader2, X, Image as ImageIcon, Save, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";

export default function AdminGallery() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{current: number, total: number} | null>(null);
  
  const [newCategoryInput, setNewCategoryInput] = useState("");
  const [dynamicCategories, setDynamicCategories] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    id: "",
    src: "",
    category: "",
    alt: "",
  });

  const defaultCategories = ["Clinic", "Surgery", "Events", "Patients"];
  const dbCategories = Array.from(new Set(images.map(img => img.category)));
  const allCategories = Array.from(new Set([...defaultCategories, ...dbCategories, ...dynamicCategories]));

  const supabase = createClient();

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    setLoading(true);
    const { data, error } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });
    if (!error && data) {
      setImages(data);
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this image?")) return;
    const { error } = await supabase.from("gallery").delete().eq("id", id);
    if (error) {
      toast.error("Error deleting image");
    } else {
      toast.success("Image deleted");
      fetchImages();
    }
  }

  async function handleSingleEdit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    
    const { error } = await supabase.from("gallery").update({
      category: formData.category,
      alt: formData.alt,
    }).eq("id", formData.id);
    
    if (!error) {
      setIsModalOpen(false);
      toast.success("Image updated successfully");
      fetchImages();
    } else {
      toast.error("Error updating image: " + error.message);
    }
    setSaving(false);
  }

  async function handleBulkUpload(e: React.FormEvent) {
    e.preventDefault();
    if (selectedFiles.length === 0) return toast.error("Please select at least one image");
    setSaving(true);
    setUploadProgress({ current: 0, total: selectedFiles.length });
  
    let successCount = 0;
    
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `gallery/${fileName}`;
      
      setUploadProgress({ current: i + 1, total: selectedFiles.length });
      
      const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);
      if (!uploadError) {
        const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(filePath);
        
        await supabase.from("gallery").insert([{
          src: publicUrl,
          category: formData.category,
          alt: file.name.split('.')[0].replace(/[-_]/g, ' '), 
        }]);
        successCount++;
      }
    }
  
    setSaving(false);
    setUploadProgress(null);
    setIsModalOpen(false);
    setSelectedFiles([]);
    toast.success(`Successfully uploaded ${successCount} image(s)`);
    fetchImages();
  }

  function handleAddCategory() {
    if (!newCategoryInput.trim()) return;
    if (allCategories.length >= 8) {
      toast.error("You can only have up to 8 categories.");
      return;
    }
    if (allCategories.includes(newCategoryInput.trim())) {
      toast.error("Category already exists.");
      return;
    }
    setDynamicCategories([...dynamicCategories, newCategoryInput.trim()]);
    setFormData({ ...formData, category: newCategoryInput.trim() });
    setNewCategoryInput("");
  }

  function openEditModal(img: any) {
    setFormData(img);
    setSelectedFiles([]);
    setIsModalOpen(true);
  }

  function openCreateModal() {
    setFormData({ id: "", src: "", category: allCategories[0] || "Clinic", alt: "" });
    setSelectedFiles([]);
    setIsModalOpen(true);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900">Manage Gallery</h1>
        <Button onClick={openCreateModal} className="bg-[var(--color-primary)] hover:bg-blue-700 text-white flex items-center gap-2 shadow-md">
          <Upload className="w-4 h-4" /> Bulk Upload Images
        </Button>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 min-h-[60vh]">
        {loading ? (
          <div className="space-y-12">
            {[1, 2].map((i) => (
              <div key={i}>
                <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-2">
                  <div className="h-7 w-32 bg-gray-100 animate-pulse rounded-md" />
                  <div className="h-6 w-8 bg-gray-100 animate-pulse rounded-full" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((j) => (
                    <div key={j} className="aspect-square bg-gray-100 animate-pulse rounded-xl" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : images.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <ImageIcon className="w-12 h-12 mb-4 text-gray-300" />
            <p>No images found in the gallery.</p>
            <p className="text-sm mt-1">Click "Bulk Upload Images" to get started.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {allCategories.map(cat => {
              const categoryImages = images.filter(img => img.category === cat);
              if (categoryImages.length === 0) return null;
              
              return (
                <div key={cat}>
                  <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-2">
                    <h3 className="text-xl font-heading font-bold text-gray-800">{cat}</h3>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full font-semibold">
                      {categoryImages.length}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {categoryImages.map(img => (
                      <div key={img.id} className="relative group rounded-xl overflow-hidden aspect-square border border-gray-200 bg-gray-50 shadow-sm">
                         <Image src={img.src} alt={img.alt || "Gallery image"} fill className="object-cover" sizes="(max-width: 768px) 50vw, 20vw" />
                         
                         {/* Hover Overlay */}
                         <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm">
                            <Button onClick={() => openEditModal(img)} variant="secondary" size="icon" className="h-9 w-9 rounded-full bg-white/90 hover:bg-white text-gray-700">
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button onClick={() => handleDelete(img.id)} variant="outline" size="icon" className="h-9 w-9 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg border-0">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                         </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-2xl">
              <h2 className="text-xl font-heading font-bold text-gray-900 flex items-center gap-2">
                {formData.id ? <Edit2 className="w-5 h-5 text-[var(--color-primary)]" /> : <Upload className="w-5 h-5 text-[var(--color-primary)]" />}
                {formData.id ? "Edit Image Details" : "Upload to Gallery"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={formData.id ? handleSingleEdit : handleBulkUpload} className="p-6 space-y-5">
              
              {!formData.id && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Images (Multiple allowed) *</label>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 font-semibold">
                        {selectedFiles.length > 0 
                          ? `${selectedFiles.length} file(s) selected` 
                          : "Click to select images"}
                      </p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      multiple 
                      accept="image/*" 
                      onChange={e => {
                        if (e.target.files) setSelectedFiles(Array.from(e.target.files));
                      }} 
                    />
                  </label>
                  
                  {uploadProgress && (
                    <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium flex items-center justify-between">
                      <span>Uploading {uploadProgress.current} of {uploadProgress.total}...</span>
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Target Category *</label>
                
                <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] outline-none bg-white">
                  {allCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                
                {allCategories.length < 8 && (
                  <div className="flex gap-2">
                    <input 
                      value={newCategoryInput} 
                      onChange={e => setNewCategoryInput(e.target.value)} 
                      placeholder="Or create new category..." 
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] outline-none text-sm" 
                    />
                    <Button type="button" onClick={handleAddCategory} variant="outline" className="shrink-0">
                      <Plus className="w-4 h-4 mr-1" /> Add
                    </Button>
                  </div>
                )}
                
                {allCategories.length >= 8 && (
                  <p className="text-xs text-orange-500 font-medium">Maximum 8 categories reached.</p>
                )}

                {!formData.id && (
                  <p className="text-xs text-gray-500">All selected images will be assigned to this category.</p>
                )}
              </div>
              
              {formData.id && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text (for SEO)</label>
                  <input value={formData.alt} onChange={e => setFormData({...formData, alt: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] outline-none" placeholder="e.g. Clinic waiting room" />
                </div>
              )}
              
              <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-gray-100">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={saving} className="bg-[var(--color-primary)] text-white hover:bg-blue-700 font-semibold shadow-md">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />} 
                  {formData.id ? "Save Changes" : "Start Upload"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
