import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { DashboardProvider } from '@/store/DashboardProvider';

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar cố định bên trái */}
        <Sidebar />
        
        {/* Khu vực chính */}
        <div className="flex-1 flex flex-col ml-64 h-screen overflow-hidden">
          <Header />
          
          <main className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
            {children}
          </main>
        </div>
      </div>
    </DashboardProvider>
  );
}