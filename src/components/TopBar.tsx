import React from 'react';
import { Mail, Phone } from 'lucide-react';

export const TopBar = () => {
    return (
        <div className="w-full bg-black text-white py-2 px-4 md:px-8 lg:px-12 flex justify-end items-center gap-6 text-[11px] font-medium tracking-wide z-50 relative">
            <div className="flex items-center gap-2 hover:text-gray-300 transition-colors cursor-pointer">
                <Mail className="w-3.5 h-3.5" />
                <span>info@thegoldtechnologies.com</span>
            </div>
            <div className="flex items-center gap-2 hover:text-gray-300 transition-colors cursor-pointer">
                <Phone className="w-3.5 h-3.5" />
                <span>+91 8368198551</span>
            </div>
        </div>
    );
};
