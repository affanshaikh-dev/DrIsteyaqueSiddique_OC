"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Plus, Edit2, Trash2, Loader2, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminFAQs() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    id: "",
    question: "",
    answer: "",
  });

  const supabase = createClient();

  useEffect(() => {
    fetchFaqs();
  }, []);

  async function fetchFaqs() {
    setLoading(true);
    const { data, error } = await supabase.from("faqs").select("*").order("created_at", { ascending: false });
    if (!error && data) {
      setFaqs(data);
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;
    const { error } = await supabase.from("faqs").delete().eq("id", id);
    if (error) toast.error("Error deleting FAQ");
    else {
      toast.success("FAQ deleted");
      fetchFaqs();
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    
    const payload = {
      question: formData.question,
      answer: formData.answer,
    };

    let error;
    if (formData.id) {
      const res = await supabase.from("faqs").update(payload).eq("id", formData.id);
      error = res.error;
    } else {
      const res = await supabase.from("faqs").insert([payload]);
      error = res.error;
    }
    
    if (!error) {
      setIsModalOpen(false);
      toast.success("FAQ saved successfully");
      fetchFaqs();
    } else {
      toast.error("Error saving FAQ: " + error.message);
    }
    setSaving(false);
  }

  function openEditModal(faq: any) {
    setFormData(faq);
    setIsModalOpen(true);
  }

  function openCreateModal() {
    setFormData({ id: "", question: "", answer: "" });
    setIsModalOpen(true);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900">Manage FAQs</h1>
        <Button onClick={openCreateModal} className="bg-[var(--color-primary)] hover:bg-blue-700 text-white flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add FAQ
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 flex justify-center items-center text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : faqs.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p>No FAQs found in the database.</p>
            <p className="text-sm mt-1">Click "Add FAQ" to create your first one.</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 font-semibold text-gray-600">Question</th>
                <th className="p-4 font-semibold text-gray-600">Answer</th>
                <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {faqs.map((faq) => (
                <tr key={faq.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-gray-900 w-1/3">{faq.question}</td>
                  <td className="p-4 text-gray-500 text-sm truncate max-w-xs">{faq.answer}</td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    <Button onClick={() => openEditModal(faq)} variant="outline" size="sm" className="flex items-center gap-1">
                      <Edit2 className="w-3.5 h-3.5" /> Edit
                    </Button>
                    <Button onClick={() => handleDelete(faq.id)} variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 flex items-center gap-1">
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-heading font-bold text-gray-900">
                {formData.id ? "Edit FAQ" : "Add FAQ"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                <input required value={formData.question} onChange={e => setFormData({...formData, question: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Do I need surgery?" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                <textarea required value={formData.answer} onChange={e => setFormData({...formData, answer: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" rows={4} placeholder="Not necessarily..." />
              </div>
              
              <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-gray-100">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={saving} className="bg-[var(--color-primary)] text-white hover:bg-blue-700 font-semibold shadow-md">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />} 
                  Save FAQ
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
