import Footer from "@/layout/site-layout/footer";
import Header from "@/layout/site-layout/header";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
