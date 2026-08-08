"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Activity, Users, FileText, Calendar, Clock, ArrowRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    visits: 0,
    treatments: 0,
    faqs: 0,
  });
  
  const [appointments, setAppointments] = useState<any[]>([]);
  const [viewType, setViewType] = useState<'daily' | 'monthly' | 'yearly'>('daily');

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();
      
      const [appts, treatments, faqs] = await Promise.all([
        supabase.from("appointments").select("*").order("created_at", { ascending: false }),
        supabase.from("treatments").select("*", { count: "exact", head: true }),
        supabase.from("faqs").select("*", { count: "exact", head: true }),
      ]);

      if (appts.data) setAppointments(appts.data);

      setStats({
        visits: 0,
        treatments: treatments.count || 0,
        faqs: faqs.count || 0,
      });
    }

    fetchData();
  }, []);

  const cards = [
    { name: "Total Page Visits", value: stats.visits, icon: Activity, color: "bg-blue-500" },
    { name: "Appointment Requests", value: appointments.length, icon: Calendar, color: "bg-green-500" },
    { name: "Active Treatments", value: stats.treatments, icon: FileText, color: "bg-purple-500" },
    { name: "Published FAQs", value: stats.faqs, icon: Users, color: "bg-orange-500" },
  ];

  // Process data for Recharts
  const getGraphData = () => {
    const grouped: Record<string, { label: string, dateObj: Date, count: number }> = {};
  
    appointments.forEach(appt => {
       const d = new Date(appt.created_at);
       let groupKey = "";
       let label = "";
       
       if (viewType === 'daily') {
         groupKey = d.toISOString().split('T')[0];
         label = d.toLocaleDateString('default', { month: 'short', day: 'numeric' });
       } else if (viewType === 'monthly') {
         groupKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
         label = d.toLocaleDateString('default', { month: 'short', year: 'numeric' });
       } else {
         groupKey = d.getFullYear().toString();
         label = groupKey;
       }
       
       if (!grouped[groupKey]) {
         grouped[groupKey] = { label, dateObj: d, count: 0 };
       }
       grouped[groupKey].count += 1;
    });
  
    return Object.values(grouped)
      .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())
      .map(item => ({ name: item.label, appointments: item.count }));
  };

  const graphData = getGraphData();
  const recentPending = appointments.filter(a => a.status !== 'Completed').slice(0, 5);

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold text-gray-900 mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card) => (
          <div key={card.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`${card.color} w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg`}>
              <card.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{card.name}</p>
              <h3 className="text-2xl font-bold text-gray-900">{card.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Graph Section */}
        <div className="xl:col-span-2 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-xl font-heading font-bold text-gray-900">Appointment Trends</h2>
              <p className="text-sm text-gray-500 mt-1">Visualize your patient request volume</p>
            </div>
            
            <div className="flex bg-gray-100 p-1 rounded-xl w-fit">
              {(['daily', 'monthly', 'yearly'] as const).map(type => (
                <button 
                  key={type}
                  onClick={() => setViewType(type)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-semibold capitalize transition-all ${
                    viewType === type 
                      ? "bg-white text-gray-900 shadow-sm" 
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="h-[350px] w-full">
            {graphData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={graphData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                  <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dx={-10} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    cursor={{ stroke: '#e5e7eb', strokeWidth: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="appointments" 
                    name="Appointments"
                    stroke="var(--color-primary)" 
                    strokeWidth={4}
                    dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4, stroke: 'white' }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                No appointment data available yet.
              </div>
            )}
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-heading font-bold text-gray-900 flex items-center gap-2">
              Recent Pending <span className="flex h-3 w-3 relative ml-1"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span></span>
            </h2>
          </div>
          
          <div className="flex-1 space-y-4">
            {recentPending.length === 0 ? (
              <div className="text-center text-gray-500 py-10">
                <div className="bg-green-50 text-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Activity className="w-6 h-6" />
                </div>
                <p>All caught up!</p>
                <p className="text-sm mt-1">No pending appointments.</p>
              </div>
            ) : (
              recentPending.map(appt => (
                <div key={appt.id} className="p-4 rounded-2xl bg-orange-50/50 border border-orange-100">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-gray-900">{appt.name}</span>
                    <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Pending
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{appt.service}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(appt.created_at).toLocaleDateString()} at {new Date(appt.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              ))
            )}
          </div>
          
          <Link href="/admin/appointments" className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:text-blue-700 transition-colors p-3 rounded-xl hover:bg-blue-50">
            View all appointments <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
