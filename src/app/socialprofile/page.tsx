"use client";

import { useState } from "react";
import Image from "next/image";

const socialProfiles = [
  { name: "Instagram", icon: "/instagram.svg" },
  { name: "Facebook", icon: "/facebook.svg" },
  { name: "X (Twitter))", icon: "/twitter.svg" },
  { name: "LinkedIn", icon: "/linkedin.svg" },
  { name: "TikTok", icon: "/tiktok.svg" },
  { name: "YouTube", icon: "/youtube.svg" },
  { name: "Threads", icon: "/threads.svg" },
  { name: "Pinterest", icon: "/pinterest.svg" },
];

const SocialProfilePage: React.FC = () => {
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);

  const toggleProfile = (profile: string) => {
    setSelectedProfiles((prev) =>
      prev.includes(profile)
        ? prev.filter((p) => p !== profile)
        : [...prev, profile]
    );
  };

  return (
    <div className="bg-gray-100">
      <div className="flex justify-start items-start">
        <Image
          className="mt-4 p-4"
          src="/logo.svg"
          width={200}
          height={200}
          alt="Logo"
        />
      </div>
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 flex flex-col items-center">
        <div className="w-full max-w-[760px] min-h-[550px] bg-white rounded-lg shadow-lg p-4 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 text-center">
            Connect your social media profiles
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 text-center">
            You can connect any of your social profile where you wish to grow
            your audience.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {socialProfiles.map((profile) => (
              <button
                key={profile.name}
                onClick={() => toggleProfile(profile.name)}
                className={`w-full sm:w-[210px] h-[60px] sm:h-[72px] rounded-md p-3 sm:p-4 border flex items-center gap-3 transition-all ${
                  selectedProfiles.includes(profile.name)
                    ? " shadow-lg border-red-500"
                    : "border-gray-300"
                }`}
              >
                <Image
                  src={profile.icon}
                  width={24}
                  height={24}
                  alt={profile.name}
                />
                <span className="text-sm sm:text-base text-gray-700">
                  {profile.name}
                </span>
              </button>
            ))}
          </div>
          <div className="border-t border-gray-200 mt-6 sm:mt-8 mb-6 sm:mb-8"></div>
          <div className="text-right">
            <button className="w-full sm:w-auto px-4 sm:px-6 py-2 rounded-md font-medium border border-red-500 text-red-500 hover:bg-red-50">
              Skip →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProfilePage;
