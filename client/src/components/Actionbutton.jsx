export default function Actionbutton() {
  return (
    <div className="w-full">
      {/* ================= MOBILE ACTION BUTTONS ================= */}
      <div className="sm:hidden flex justify-center">
        <div className=" bg-white rounded-2xl px-3 py-4 shadow-md w-full max-w-sm space-y-4 ">
          {/* Download */}
          <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition">
            <span className="material-icons text-lg">download</span>
            Download Report PDF
          </button>
          <p className="text-xs text-center text-gray-400">
            Printable A4 report for mock interviews
          </p>
          {/* Logout */}
          <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition">
            <span className="material-icons text-lg">logout</span>
            Logout
          </button>
        </div>
      </div>

      {/* ================= DESKTOP + TABLET ACTION BUTTONS ================= */}
      <div className="hidden sm:block ml-4">
        <div className="bg-white rounded-2xl shadow-md p-4 w-[93%] max-w-full space-y-3 mx-auto lg:mr-auto lg:ml-0">
          {/* DOWNLOAD PDF CARD */}
          <div className="relative bg-white rounded-2xl p-4 overflow-hidden border border-indigo-50">
            {/* Soft corner decoration */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50/50 rounded-bl-full" />

            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
                <span className="material-icons text-indigo-600 text-2xl">picture_as_pdf</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Download Report</h3>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              Download your complete mock interview report as a printable PDF.
            </p>

            <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2.5 rounded-xl flex items-center justify-center gap-2 transition">
              <span className="material-icons text-lg">download</span>
              Download PDF
            </button>
          </div>

          {/* Logout */}
          <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition">
            <span className="material-icons text-lg">logout</span>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
