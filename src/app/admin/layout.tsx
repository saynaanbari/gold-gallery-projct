import AdminFooter from "@/layout/admin-panel-layout/admin-panel-footer";
import AdminHeader from "@/layout/admin-panel-layout/admin-panel-header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AdminHeader />
      {children}
      <AdminFooter />
    </div>
  );
}
