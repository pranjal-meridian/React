import React from 'react';
import { FaUserSlash } from 'react-icons/fa';

const BlockedUser = ({ username, time }) => {
    return (
        <div className="flex items-center p-4 border-b border-gray-200">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-600">
                <FaUserSlash className="text-2xl" />
            </div>
            <div className="ml-7 flex-grow">
                <div className="text-lg font-normal text-gray-800">
                    {username}
                </div>
            </div>
            <div className="text-lg text-gray-500">
                {time}
            </div>
        </div>
    );
};

export default BlockedUser;