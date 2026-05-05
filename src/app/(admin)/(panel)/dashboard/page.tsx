import ComboChart from "@/components/admin/home/components/combo-chart";
import GroupedBarChart from "@/components/admin/home/components/grouped-bar-chart";
import AdminPanelPieChart from "@/components/admin/home/components/pie-chart";
import StatsCards from "@/components/admin/home/components/stats-cards";
export default function AdminPanelHomePage() {
  return (
    <>
      <StatsCards />
      <ComboChart/>
      <AdminPanelPieChart/>
      <GroupedBarChart/>
    </>
  );
}
