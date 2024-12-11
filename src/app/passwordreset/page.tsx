"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const PasswordResetSuccess: React.FC = () => {
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
      <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
          <div className="mb-6">
            <Image src="/tick.svg" width={80} height={80} alt="Success Tick" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Password Reset
          </h2>
          <p className="text-gray-600 mb-2 text-center">
            Your password has been successfully reset.
          </p>
          <p className="text-gray-600 mb-8 text-center">
            Click below to sign in
          </p>
          <Link href="/signin" className="w-full">
            <button className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600">
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetSuccess;
