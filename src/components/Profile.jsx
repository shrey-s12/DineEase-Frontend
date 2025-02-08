import React from "react";
import { User, ShieldCheck, Briefcase } from "lucide-react";

const Profile = ({ user }) => {
    const roleIcons = {
        Admin: <ShieldCheck className="text-blue-500 w-10 h-10" />, // Admin Icon
        Merchant: <Briefcase className="text-blue-500 w-10 h-10" />, // Merchant Icon
        Customer: <User className="text-blue-500 w-10 h-10" />, // Customer Icon
    };

    return (
        <div className="bg-gray-900 flex items-center justify-center px-6">
            <div className="bg-gray-800 shadow-lg rounded-lg p-8 flex items-center w-full max-w-3xl">
                {/* Profile Image - Left */}
                <div className="w-40 h-40 rounded-full border-4 border-blue-500 overflow-hidden flex-shrink-0">
                    <img
                        src={user?.image || "/default-avatar.png"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* User Info - Right */}
                <div className="ml-8 text-gray-200 flex flex-col justify-center">
                    <h2 className="text-3xl font-semibold">{user?.name || "N/A"}</h2>
                    <p className="text-lg text-gray-400">{user?.email || "N/A"}</p>

                    {/* Role Section */}
                    <div className="flex items-center gap-3 bg-gray-700 px-5 py-3 rounded-lg shadow-md mt-4">
                        {roleIcons[user?.role] || <User className="text-gray-500 w-10 h-10" />}
                        <span className="text-xl font-semibold text-blue-400">{user?.role || "N/A"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
