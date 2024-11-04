import Navbar from "./_components/navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <main className="h-full  px-0 2xl:px-56 overflow-hidden">
      <Navbar />
      {children}
    </main>
  );
};

export default DashboardLayout;
