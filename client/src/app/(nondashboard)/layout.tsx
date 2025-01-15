import Footer from "@/components/Footer";
import NonDashboardNavBar from "@/components/NonDashboardNavBar";

export default function Layout({children}:{children:React.ReactNode}) {
  return (
    <div className="nondashboard-layout">
      <NonDashboardNavBar />
      <main className="nondashboard-layout__main">
     {children}
      </main>
      <Footer/>
    </div>
  );
}
