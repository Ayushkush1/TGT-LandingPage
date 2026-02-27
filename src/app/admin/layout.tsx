import { AdminSidebar } from "@/components/admin/Sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen overflow-hidden font-sans">
           
                <AdminSidebar />
                <main className="flex-1 overflow-y-auto">
                    <div className="p-8 lg:p-12">
                        {children}
                    </div>
                </main>
        </div>
    );
}
