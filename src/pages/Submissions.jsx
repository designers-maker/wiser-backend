import React, { useEffect, useState } from 'react';

export default function Submissions() {
  const [active, setActive] = useState('individual_volunteering');
  const [data, setData] = useState({ individual_volunteering: [], corporate_volunteering: [], request_for_volunteering: [], contact: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const tabs = [
    { key: 'individual_volunteering', label: 'Individual Volunteering' },
    { key: 'corporate_volunteering', label: 'Corporate Volunteering' },
    { key: 'request_for_volunteering', label: 'Request for Volunteering' },
    { key: 'contact', label: 'Contact' }
  ];

  const loadTab = (key) => {
    setLoading(true);
    setError('');
    fetch(`/api/forms/${key}?limit=20`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((json) => {
        setData((prev) => ({ ...prev, [key]: json }));
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load submissions');
        setLoading(false);
      });
  };

  useEffect(() => {
    loadTab(active);
  }, [active]);

  const rows = data[active] || [];

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-white border-b border-gray-100 pt-8 pb-10 shadow-sm">
        <div className="container mx-auto px-4 max-w-7xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Recent Submissions</h1>
          <p className="text-gray-600 mt-2">Viewing latest {active} entries</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-8">
        <div className="flex gap-2 mb-6">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`px-4 py-2 rounded-full font-semibold border transition-all ${
                active === t.key
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-blue-400'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {loading && (
          <div className="p-4 rounded-lg border border-gray-200 bg-white text-gray-700">Loading...</div>
        )}
        {error && (
          <div className="p-4 rounded-lg border border-red-200 bg-red-50 text-red-700">{error}</div>
        )}

        {!loading && !error && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                  {active !== 'contact' && (
                    <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Phone</th>
                  )}
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    {active === 'contact' ? 'Subject' : 'Organization'}
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Message</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Created</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 && (
                  <tr>
                    <td className="px-4 py-6 text-gray-500" colSpan={6}>
                      No submissions found.
                    </td>
                  </tr>
                )}
                {rows.map((r) => (
                  <tr key={r._id} className="border-t border-gray-100">
                    <td className="px-4 py-3">{r.name}</td>
                    <td className="px-4 py-3">{r.email}</td>
                    {active !== 'contact' && <td className="px-4 py-3">{r.phone}</td>}
                    <td className="px-4 py-3">{active === 'contact' ? r.subject : r.company || r.organization}</td>
                    <td className="px-4 py-3">{r.message}</td>
                    <td className="px-4 py-3">{new Date(r.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
