import { useLocation, Navigate, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-md md:max-w-3xl lg:max-w-5xl bg-white px-4 md:px-8 py-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <img src="/forese-logo.png" alt="Forese" className="h-18" />
          <img src="/svce-logo.png" alt="SVCE" className="h-6" />
        </div>

        {/* Profile */}
        <div className="flex flex-col items-center mt-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-orange-400 flex items-center justify-center text-white text-3xl font-bold">
              {user.username?.[0]?.toUpperCase() || '?'}
            </div>
            <span className="absolute bottom-2 right-2 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
          </div>

          <h2 className="mt-4 text-xl font-semibold">{user.username}</h2>
          <p className="text-gray-500 text-sm">
            Department • {user.dept}
          </p>

          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            <span className="px-4 py-1 text-xs rounded-full bg-purple-100 text-purple-700">
              Reg No: {user.regno}
            </span>
            <span className="px-4 py-1 text-xs rounded-full bg-purple-100 text-purple-700">
              {user.email}
            </span>
          </div>
        </div>

        {/* Greeting */}
        <div className="mt-8 bg-gray-50 rounded-xl p-5">
          <h3 className="font-semibold text-lg">
            Hello, {user.username?.split(" ")[0] || 'User'}! 👋
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Ready to check your performance? Generate your latest mock placement
            report.
          </p>
        </div>

        {/* Action Section */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {/* Generate Report */}
          <div className="border rounded-xl p-5 flex flex-col justify-between">
            <div className="flex gap-3">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 flex items-center justify-center rounded-lg text-xl">
                📊
              </div>
              <div>
                <h4 className="font-semibold">Performance Report</h4>
                <p className="text-sm text-gray-500">
                  View detailed mock interview analysis.
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate('/report', { state: user })}
              className="mt-4 w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              Generate Report
            </button>
          </div>

          {/* Download PDF */}
          <div className="border rounded-xl p-5 flex items-center justify-between">
            <div className="flex gap-3">
              <div className="w-12 h-12 bg-red-100 text-red-600 flex items-center justify-center rounded-lg text-xl">
                📄
              </div>
              <div>
                <h4 className="font-semibold">Download PDF</h4>
                <p className="text-sm text-gray-500">
                  Optimized for A4 printing and sharing.
                </p>
              </div>
            </div>

            <button className="text-black-600 font-semibold hover:underline">
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}