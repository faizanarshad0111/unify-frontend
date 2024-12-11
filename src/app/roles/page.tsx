"use client";

import { useState } from "react";
import Image from "next/image";
import { RiCheckboxCircleFill } from "react-icons/ri";

const roles = [
  "Social Media Manager",
  "Digital Agency",
  "Small Business Owner",
  "Individual (Creator)",
  "Influencer",
  "Other",
];

const RoleSelectionPage: React.FC = () => {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const toggleRole = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  return (
    <div className="bg-gray-100">
      <div className="flex justify-start items-start">
        <Image
          className="mt-4 p-4 max-w-[150px] sm:max-w-[200px]"
          src="/logo.svg"
          width={200}
          height={200}
          alt="Logo"
        />
      </div>
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 flex flex-col items-center">
        <div className="w-full max-w-[760px] min-h-[506px] bg-white rounded-lg shadow-lg p-4 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mt-5 mb-2 text-center">
            What best describes your role?
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-8 text-center">
            Your answer lets us shape a better experience for you!
          </p>
          <p className="text-sm sm:text-base text-gray-600 mb-3">
            Choose one or more <button className="text-red-500">*</button>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => toggleRole(role)}
                className={`p-3 border rounded-md flex items-center justify-between transition-all ${
                  selectedRoles.includes(role)
                    ? "border-red-500 text-red-500"
                    : "border-gray-300 text-gray-700"
                }`}
              >
                <span className="text-sm sm:text-base">{role}</span>
                <RiCheckboxCircleFill
                  className="transition-all opacity-100"
                  size={17}
                />
              </button>
            ))}
          </div>
          <div className="mt-8 text-right">
            <button
              className="w-full sm:w-auto bg-red-500 text-white px-6 py-2 rounded-md font-medium hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={selectedRoles.length === 0}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;
