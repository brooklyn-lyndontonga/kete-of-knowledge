import ErrorBoundary from "../components/ErrorBoundary";

export default function AdminLayout() {
  return (
    <ErrorBoundary>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Topbar />
          <main className="p-6 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
}
