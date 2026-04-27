import AdminFooter from "@/layout/admin-footer/admin-footer";
import AdminHeader from "@/layout/admin-header/admin-header";

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
