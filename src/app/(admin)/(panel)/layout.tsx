import AdminPanelHeader from "@/layout/admin-panel-layout/admin-panel-header";
import AdminPanelSidebar from "@/layout/admin-panel-layout/admin-panel-sidebar";

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-hidden">
      <div className="hidden md:block fixed right-0 top-0 bottom-0 w-64 z-20">
        <AdminPanelSidebar />
      </div>
      <div className="h-full flex flex-col md:pr-60">
        <div className="shrink-0 z-10">
          <AdminPanelHeader />
        </div>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
