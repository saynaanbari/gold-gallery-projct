import ComboChart from "@/components/admin/home/components/combo-chart";
import AdminPanelPieChart from "@/components/admin/home/components/pie-chart";
import StatsCards from "@/components/admin/home/components/stats-cards";
export default function AdminPanelHomePage() {
  return (
    <>
      <StatsCards />
      <ComboChart/>
      <AdminPanelPieChart/>
    </>
  );
}
