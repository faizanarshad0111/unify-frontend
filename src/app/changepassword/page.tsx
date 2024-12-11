"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ChangePasswordFormValues } from "@/utils/interface";
import { passwordSchema } from "@/utils/validationSchemas";

const ChangePasswordForm: React.FC = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik<ChangePasswordFormValues>({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validateOnBlur: true,
    validateOnChange: true,
    validate: (values) => {
      try {
        passwordSchema.parse(values);
        return {};
      } catch (error) {
        if (error instanceof z.ZodError) {
          return error.formErrors.fieldErrors;
        }
        return {};
      }
    },
    onSubmit: (values) => {
      console.log("Form Values:", values);
      alert("Verification code submitted successfully!");
    },
  });

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
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Change Password
        </h2>
        <p className="text-gray-600 mb-6">Must be at least 8 characters</p>
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4 relative">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="Your new password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newPassword}
                className="mt-1 p-2 w-full border rounded-md border-gray-300"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute top-8 right-3 text-gray-600 hover:text-gray-800 focus:outline-none transition-colors duration-200"
                aria-label={showNewPassword ? "Hide password" : "Show password"}
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>

            <div className="mb-6 relative">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your new password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                className="mt-1 p-2 w-full border rounded-md border-gray-300"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-8 right-3 text-gray-600 hover:text-gray-800 focus:outline-none transition-colors duration-200"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Change Password
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            <Link href="/signin" className="text-gray-950 hover:underline">
              Back to Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
