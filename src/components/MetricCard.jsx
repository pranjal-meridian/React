import React from 'react';
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

const MetricCard = ({ title, count, percentageChange }) => {
    const isNegativeChange = percentageChange < 0;

    return (
        <div className="bg-[#EAF2FF] p-5 rounded-lg inline-block text-left min-w-[200px] shadow">
            <div className="text-lg font-semibold mb-2 text-[#202224d3]">
                {title}
            </div>
            <div className='flex justify-between pt-1'>
                <div className="text-2xl font-semibold">
                    {count}
                </div>
                <div className="flex items-center justify-center py-1">
                    <span className={`text-2xl ${isNegativeChange ? 'text-red-500' : 'text-green-500'}`}>
                        {isNegativeChange ? <FaArrowTrendDown /> : <FaArrowTrendUp />}
                    </span>
                    <span className={`ml-2 ${isNegativeChange ? 'text-red-500' : 'text-green-500'}`}>
                        {Math.abs(percentageChange)}%
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MetricCard;