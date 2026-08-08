"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Loader2, Trash2, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const supabase = createClient();

  useEffect(() => {
    fetchAppointments();
  }, []);

  async function fetchAppointments() {
    setLoading(true);
    const { data, error } = await supabase.from("appointments").select("*").order("created_at", { ascending: false });
    if (!error && data) {
      setAppointments(data);
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this appointment request?")) return;
    const { error } = await supabase.from("appointments").delete().eq("id", id);
    if (error) toast.error("Error deleting appointment");
    else {
      toast.success("Appointment request deleted");
      fetchAppointments();
    }
  }

  async function updateStatus(id: string, status: string) {
    await supabase.from("appointments").update({ status }).eq("id", id);
    fetchAppointments();
  }

  const filteredAppointments = appointments.filter(appt => {
    if (filter === "All") return true;
    if (filter === "Done") return appt.status === "Completed";
    if (filter === "Pending") return appt.status !== "Completed";
    return true;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900">Manage Appointments</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-2">
          {["All", "Pending", "Done"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                filter === f 
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="p-12 flex justify-center items-center text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p>No appointment requests found for this filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-4 font-semibold text-gray-600">Date</th>
                  <th className="p-4 font-semibold text-gray-600">Patient Details</th>
                  <th className="p-4 font-semibold text-gray-600">Service Requested</th>
                  <th className="p-4 font-semibold text-gray-600">Status</th>
                  <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((appt) => (
                  <tr key={appt.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-gray-500 text-sm whitespace-nowrap">
                      {new Date(appt.created_at).toLocaleDateString()}<br/>
                      {new Date(appt.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{appt.name}</div>
                      <div className="text-sm text-gray-500">{appt.phone}</div>
                      <div className="text-sm text-gray-500">{appt.email}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-[var(--color-primary)]">{appt.service}</div>
                      {appt.message && (
                        <div className="text-sm text-gray-500 mt-1 max-w-xs truncate" title={appt.message}>
                          {appt.message}
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      {appt.status === 'Completed' ? (
                        <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-semibold w-fit">
                          <CheckCircle className="w-3 h-3" /> Completed
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full text-xs font-semibold w-fit">
                          <Clock className="w-3 h-3" /> Pending
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        {appt.status !== 'Completed' && (
                          <Button onClick={() => updateStatus(appt.id, 'Completed')} variant="outline" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                            Mark Done
                          </Button>
                        )}
                        <Button onClick={() => handleDelete(appt.id)} variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 flex items-center gap-1">
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
    </div>
  );
}
