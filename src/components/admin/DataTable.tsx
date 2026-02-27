import React from "react";
import { cn } from "@/lib/utils";

interface DataTableProps<T> {
    columns: {
        header: string;
        accessorKey: keyof T | ((row: T) => React.ReactNode);
        className?: string; // e.g. w-[100px] or text-right
    }[];
    data: T[];
    keyExtractor: (row: T) => string;
}

export function DataTable<T>({ columns, data, keyExtractor }: DataTableProps<T>) {
    if (!data || data.length === 0) {
        return (
            <div className="rounded-3xl border border-gray-100 bg-white shadow-sm p-12 text-center">
                <h3 className="mt-2 text-[15px] font-bold text-[#1c1d22]">No data available</h3>
                <p className="mt-1 text-sm text-gray-500 font-medium">
                    Get started by creating a new entry.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100/50">
            <div className="overflow-x-auto p-2">
                <table className="min-w-full divide-y divide-gray-100/50">
                    <thead>
                        <tr>
                            {columns.map((col, index) => (
                                <th
                                    key={index}
                                    scope="col"
                                    className={cn(
                                        "px-6 py-5 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider",
                                        col.className
                                    )}
                                >
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-50">
                        {data.map((row) => (
                            <tr key={keyExtractor(row)} className="hover:bg-[#fafafb] transition-colors group">
                                {columns.map((col, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className={cn(
                                            "whitespace-nowrap px-6 py-5 text-[14px] font-medium text-gray-600 group-hover:text-[#1c1d22] transition-colors",
                                            col.className
                                        )}
                                    >
                                        {typeof col.accessorKey === 'function'
                                            ? col.accessorKey(row)
                                            : String(row[col.accessorKey] || '')}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
