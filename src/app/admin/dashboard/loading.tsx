export default function AdminDashboardLoading() {
  return (
    <main
      className="min-h-screen bg-[#F5F5F5] px-4 py-8 sm:px-8"
      aria-busy="true"
      aria-label="Loading admin dashboard"
    >
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="h-8 w-64 rounded bg-[#73777D]/15" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="h-28 rounded-xl bg-white shadow-sm" />
          ))}
        </div>
        <div className="mt-8 h-96 rounded-xl bg-white shadow-sm" />
      </div>
    </main>
  );
}
