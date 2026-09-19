"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Plus, Edit2, Trash2, Loader2, X, Save, Eye, CheckCircle, Clock, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

const AVAILABLE_ICONS = [
  "Activity", "HeartPulse", "Bone", "Stethoscope", "ActivitySquare", 
  "Microscope", "Syringe", "Pill", "Bandage", "Cross", 
  "Thermometer", "UserPlus", "Users", "PlusSquare", "Heart", 
  "Shield", "ShieldAlert", "AlertTriangle", "CheckCircle", "Info"
];

export default function AdminTreatments() {
  const [treatments, setTreatments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    category: "",
    icon: "",
    description: "",
    image: "",
    content_overview: "",
    content_symptoms: "",
    content_benefits: "",
    content_recovery: "",
    is_published: false,
  });

  const supabase = createClient();

  useEffect(() => {
    fetchTreatments();
  }, []);

  async function fetchTreatments() {
    setLoading(true);
    const { data, error } = await supabase.from("treatments").select("*").order("created_at", { ascending: false });
    if (!error && data) {
      setTreatments(data);
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this treatment?")) return;
    await supabase.from("treatments").delete().eq("id", id);
    toast.success("Treatment deleted");
    fetchTreatments();
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploadingImage(true);
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `treatments/${fileName}`;

    const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);

    if (uploadError) {
      toast.error("Error uploading image: " + uploadError.message);
    } else {
      const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(filePath);
      setFormData({ ...formData, image: publicUrl });
      toast.success("Image uploaded successfully");
    }
    setUploadingImage(false);
  }

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const title = e.target.value;
    if (isCreating) {
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      setFormData({ ...formData, title, id });
    } else {
      setFormData({ ...formData, title });
    }
  }

  async function handleSave(e: React.FormEvent, is_published: boolean) {
    e.preventDefault();
    setSaving(true);
    
    const payload = {
      ...formData,
      is_published,
      content_symptoms: formData.content_symptoms.split('\n').filter(s => s.trim() !== ""),
      content_benefits: formData.content_benefits.split('\n').filter(s => s.trim() !== ""),
    };

    const { error } = await supabase.from("treatments").upsert([payload]);
    
    if (!error) {
      setIsModalOpen(false);
      toast.success("Treatment saved successfully");
      fetchTreatments();
    } else {
      toast.error("Error saving treatment: " + error.message);
    }
    setSaving(false);
  }

  function openEditModal(t: any) {
    setIsCreating(false);
    setFormData({
      ...t,
      content_symptoms: t.content_symptoms?.join('\n') || "",
      content_benefits: t.content_benefits?.join('\n') || "",
      is_published: t.is_published ?? false,
    });
    setIsModalOpen(true);
  }

  function openCreateModal() {
    setIsCreating(true);
    setFormData({
      id: "", title: "", category: "Surgical", icon: "Activity", description: "",
      image: "", content_overview: "", content_symptoms: "", content_benefits: "", content_recovery: "", is_published: false
    });
    setIsModalOpen(true);
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 shrink-0">
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900">Manage Treatments</h1>
        <Button onClick={openCreateModal} className="bg-[var(--color-primary)] hover:bg-blue-700 text-white flex items-center justify-center gap-2 w-full sm:w-auto">
          <Plus className="w-4 h-4" /> Add New Treatment
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex-grow flex flex-col">
        {loading ? (
          <div className="p-6 flex-grow flex flex-col gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 w-full bg-gray-100 animate-pulse rounded-xl" />
            ))}
          </div>
        ) : treatments.length === 0 ? (
          <div className="p-12 text-center text-gray-500 flex-grow flex flex-col items-center justify-center">
            <p>No treatments found in the database.</p>
            <p className="text-sm mt-1">Click "Add New Treatment" to create your first one.</p>
          </div>
        ) : (
          <div className="overflow-x-auto flex-grow">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-4 font-semibold text-gray-600">ID / URL Slug</th>
                  <th className="p-4 font-semibold text-gray-600">Title</th>
                  <th className="p-4 font-semibold text-gray-600">Status</th>
                  <th className="p-4 font-semibold text-gray-600">Category</th>
                  <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {treatments.map((t) => (
                  <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-gray-500 font-mono text-sm">{t.id}</td>
                    <td className="p-4 font-medium text-gray-900">{t.title}</td>
                    <td className="p-4">
                      {t.is_published ? (
                        <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-semibold w-fit">
                          <CheckCircle className="w-3 h-3" /> Published
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full text-xs font-semibold w-fit">
                          <Clock className="w-3 h-3" /> Draft
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-gray-600">
                      <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">
                        {t.category}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button asChild variant="outline" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                          <Link href={`/treatments/${t.id}`} target="_blank">
                            <Eye className="w-3.5 h-3.5 mr-1" /> Preview
                          </Link>
                        </Button>
                        <Button onClick={() => openEditModal(t)} variant="outline" size="sm" className="flex items-center gap-1">
                          <Edit2 className="w-3.5 h-3.5" />
                        </Button>
                        <Button onClick={() => handleDelete(t.id)} variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 flex items-center gap-1">
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 sm:p-6">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center shrink-0 bg-white">
              <h2 className="text-xl font-heading font-bold text-gray-900 flex items-center gap-2">
                {formData.id && !isCreating ? "Edit Treatment" : "Add New Treatment"}
                {formData.is_published ? (
                   <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full uppercase tracking-wider font-semibold">Published</span>
                ) : (
                   <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full uppercase tracking-wider font-semibold">Draft</span>
                )}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 p-2 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex flex-col overflow-hidden">
              <div className="p-6 overflow-y-auto flex-grow space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 border-b pb-2">Basic Info</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                      <input required value={formData.title} onChange={handleTitleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] outline-none" placeholder="Total Knee Replacement" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug (ID) * {isCreating && <span className="text-gray-400 font-normal ml-1">(Auto-generated)</span>}</label>
                      <input required value={formData.id} onChange={e => setFormData({...formData, id: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] outline-none font-mono text-sm" placeholder="knee-replacement" disabled={isCreating && formData.title.length > 0} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                        <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] outline-none">
                          <option value="Surgical">Surgical</option>
                          <option value="Non-Surgical">Non-Surgical</option>
                          <option value="Rehabilitation">Rehabilitation</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Icon *</label>
                        <select required value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] outline-none">
                          {AVAILABLE_ICONS.map(icon => (
                            <option key={icon} value={icon}>{icon}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image *</label>
                      
                      {formData.image ? (
                        <div className="relative w-full h-40 rounded-lg overflow-hidden border border-gray-200 mb-2 group">
                          <Image src={formData.image} alt="Cover" fill className="object-cover" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <Button type="button" variant="outline" size="sm" onClick={() => setFormData({...formData, image: ""})} className="text-red-500 border-red-500 hover:bg-red-50">
                               Remove Image
                             </Button>
                          </div>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            {uploadingImage ? (
                              <Loader2 className="w-8 h-8 text-gray-400 animate-spin mb-2" />
                            ) : (
                              <Upload className="w-8 h-8 text-gray-400 mb-2" />
                            )}
                            <p className="text-sm text-gray-500 font-semibold">{uploadingImage ? "Uploading..." : "Click to upload image"}</p>
                          </div>
                          <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} />
                        </label>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Short Description (Cards) *</label>
                      <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] outline-none resize-none" rows={3} />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 border-b pb-2">Detailed Content</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Overview Paragraph *</label>
                      <textarea required value={formData.content_overview} onChange={e => setFormData({...formData, content_overview: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] outline-none resize-none" rows={4} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Symptoms (One per line) *</label>
                      <textarea required value={formData.content_symptoms} onChange={e => setFormData({...formData, content_symptoms: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] outline-none resize-none" rows={3} placeholder="Pain while walking\nSwelling in joint" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Benefits (One per line) *</label>
                      <textarea required value={formData.content_benefits} onChange={e => setFormData({...formData, content_benefits: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] outline-none resize-none" rows={3} placeholder="Pain relief\nImproved mobility" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Recovery Details *</label>
                      <textarea required value={formData.content_recovery} onChange={e => setFormData({...formData, content_recovery: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] outline-none resize-none" rows={2} />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-100 shrink-0 bg-gray-50 flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  Drafts will not appear on the public website.
                </p>
                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <Button type="button" onClick={(e) => handleSave(e, false)} disabled={saving || uploadingImage} variant="outline" className="bg-white hover:bg-gray-50 border-gray-300 text-gray-700 font-semibold">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />} 
                    Save as Draft
                  </Button>
                  <Button type="button" onClick={(e) => handleSave(e, true)} disabled={saving || uploadingImage} className="bg-[var(--color-primary)] text-white hover:bg-blue-700 font-semibold shadow-md">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <CheckCircle className="w-4 h-4 mr-2" />} 
                    Publish Treatment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
