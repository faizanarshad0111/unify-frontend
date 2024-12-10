"use client";

import React from "react";
import { useFormik } from "formik";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import { resetPasswordSchema } from "@/utils/validationSchemas";
import { ResetPasswordFormValues } from "@/utils/interface";

const ResetPasswordForm: React.FC = () => {
  const formik = useFormik<ResetPasswordFormValues>({
    initialValues: {
      email: "",
    },
    validateOnBlur: true,
    validateOnChange: true,
    validate: (values) => {
      try {
        resetPasswordSchema.parse(values);
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
      alert("Reset password link sent successfully!");
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
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Reset Your Password
        </h2>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          Enter your account's email address and we'll send you a secure link to
          reset your password.
        </p>
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={`mt-1 p-2 w-full border rounded-md ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Send Email
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            <Link href="/signin" className="text-gray-950 hover:underline">
              Back to Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
