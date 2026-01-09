import React from 'react';

interface LaptopMockupProps {
    children: React.ReactNode;
}

export const LaptopMockup: React.FC<LaptopMockupProps> = ({ children }) => {
    return (
        <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]">
            <div className="rounded-lg overflow-hidden h-[156px] md:h-[278px] bg-white dark:bg-gray-800">
                {children}
            </div>
            <div className="relative mx-auto bg-gray-900 w-[110%] h-[12px] mt-2 rounded-b-xl rounded-t-sm md:w-[124%] absolute bottom-[-16px] left-[-12%]"></div>
            <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[4px] w-[4px] bg-white/20 rounded-full mt-1"></div>
        </div>
    );
};
