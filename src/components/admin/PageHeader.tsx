import React from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
    title: string;
    description?: string;
    action?: {
        label: string;
        href: string;
        icon?: React.ReactNode;
    };
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
    return (
        <div className="sm:flex sm:items-center sm:justify-between mb-8 pb-6 border-b border-gray-100">
            <div>
                <h1 className="text-[28px] font-bold tracking-tight text-[#1c1d22]">
                    {title}
                </h1>
                {description && (
                    <p className="mt-2 text-[15px] font-medium text-gray-400">{description}</p>
                )}
            </div>
            {action && (
                <div className="mt-4 sm:ml-4 sm:mt-0">
                    <Link
                        href={action.href}
                        className={cn(
                            "inline-flex items-center gap-2 rounded-full bg-[#d9f969] px-6 py-2.5 text-[14px] font-bold text-[#1c1d22] shadow-[0_0_15px_rgba(217,249,105,0.2)] hover:scale-105 active:scale-95 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9f969]"
                        )}
                    >
                        {action.icon || <Plus className="-ml-0.5 h-4 w-4" strokeWidth={3} aria-hidden="true" />}
                        {action.label}
                    </Link>
                </div>
            )}
        </div>
    );
}
