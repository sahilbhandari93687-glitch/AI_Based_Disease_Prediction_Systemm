import React, { useState, useEffect } from 'react';
import { diseaseApi } from '../services/api';
import { Link } from 'react-router-dom';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { History, Activity, AlertCircle, Calendar, PlusCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await diseaseApi.getHistory();
        setHistory(response.data);
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  // Process data for charts
  const diseaseCount = history.reduce((acc: any, item: any) => {
    const disease = item.result.disease;
    acc[disease] = (acc[disease] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.keys(diseaseCount).map(name => ({
    name,
    value: diseaseCount[name]
  }));

  const timelineData = history.map(item => ({
    date: new Date(item.result.timestamp).toLocaleDateString(),
    confidence: item.result.confidence * 100
  })).reverse();

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  if (loading) return <div className="p-10 text-center text-gray-500">Loading Dashboard...</div>;

  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Personal Health Dashboard</h2>
        <Link 
          to="/checker" 
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
        >
          <PlusCircle size={20} /> Start New Health Check
        </Link>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Checks" value={history.length.toString()} icon={<History className="text-blue-500" />} />
        <StatCard title="Common Risk" value={pieData[0]?.name || 'N/A'} icon={<AlertCircle className="text-red-500" />} />
        <StatCard title="Avg Confidence" value={history.length ? `${(history.reduce((a, b) => a + b.result.confidence, 0) / history.length * 100).toFixed(1)}%` : '0%'} icon={<Activity className="text-green-500" />} />
        <StatCard title="Last Check" value={history[0] ? new Date(history[0].result.timestamp).toLocaleDateString() : 'N/A'} icon={<Calendar className="text-purple-500" />} />
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-10">
        {/* Disease Distribution */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Disease Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }: any) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Confidence Trend */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Health Check Trend (Confidence %)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="confidence" stroke="#3b82f6" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-800">Recent Prediction History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm font-semibold uppercase">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Disease Predicted</th>
                <th className="px-6 py-4">Symptoms</th>
                <th className="px-6 py-4">Risk Level</th>
                <th className="px-6 py-4">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {history.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm">{new Date(item.result.timestamp).toLocaleString()}</td>
                  <td className="px-6 py-4 font-bold text-blue-700">{item.result.disease}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {item.symptoms.slice(0, 3).map((s: string) => (
                        <span key={s} className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">{s}</span>
                      ))}
                      {item.symptoms.length > 3 && <span className="text-[10px] text-gray-400">+{item.symptoms.length - 3} more</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      item.result.risk_level === 'High' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                    }`}>
                      {item.result.risk_level}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold">{(item.result.confidence * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
          {history.length === 0 && (
            <div className="p-10 text-center text-gray-400">No prediction history found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
    <div className="p-3 bg-gray-50 rounded-xl">{icon}</div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

export default Dashboard;
