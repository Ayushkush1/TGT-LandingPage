"use client";

import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable } from "@/components/admin/DataTable";

export default function ServicesPage() {
    const dummyServices = [
        { id: "1", title: "Custom Web Development", description: "Building scalable web applications.", iconName: "Code" },
        { id: "2", title: "UI/UX Design", description: "Creating intuitive and beautiful interfaces.", iconName: "Palette" },
        { id: "3", title: "Cloud Architecture", description: "Designing reliable cloud infrastructure.", iconName: "Cloud" },
    ];

    const columns = [
        { header: "Icon Class/Name", accessorKey: "iconName" as keyof typeof dummyServices[0], className: "text-gray-500 w-[150px] font-mono text-xs" },
        { header: "Service Title", accessorKey: "title" as keyof typeof dummyServices[0], className: "font-medium text-gray-900 w-[200px]" },
        { header: "Description", accessorKey: "description" as keyof typeof dummyServices[0] },
        {
            header: "Actions",
            accessorKey: (row: typeof dummyServices[0]) => (
                <div className="flex gap-3">
                    <button className="text-brand-navy hover:underline text-sm font-medium">Edit</button>
                    <button className="text-red-600 hover:underline text-sm font-medium">Delete</button>
                </div>
            )
        }
    ];

    return (
        <div>
            <PageHeader
                title="Services"
                description="Manage the list of services offered by your company."
                action={{ label: "Add Service", href: "#" }}
            />

            <DataTable
                data={dummyServices}
                columns={columns}
                keyExtractor={(item) => item.id}
            />
        </div>
    );
}
