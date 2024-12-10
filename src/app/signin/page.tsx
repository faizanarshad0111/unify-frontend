"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { SignInFormValues } from "@/utils/interface";
import { signinSchema } from "@/utils/validationSchemas";

const SignInForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik<SignInFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnBlur: true,
    validateOnChange: true,
    validate: (values) => {
      try {
        signinSchema.parse(values);
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
      alert("Form submitted successfully!");
    },
  });

  return (
    <div className="bg-gray-100">
      <div className="flex justify-start items-start ">
        <Image
          className=" mt-4 p-4"
          src="/logo.svg"
          width={200}
          height={200}
          alt="Logo"
        />
      </div>
      <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Sign In
        </h2>
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={formik.handleSubmit}>
            {/* Email Field */}
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

            {/* Password Field */}
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={`mt-1 p-2 w-full border rounded-md ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-2/4 right-3 transform -translate-y-1/10 text-gray-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-red-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-gray-600"
                >
                  Remember me
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm text-red-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-500">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Google Sign-In */}
          <button
            type="button"
            className="w-full py-2 px-4 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100"
          >
            <Image
              src="/google-icon.png"
              width={20}
              height={20}
              alt="Google logo"
            />
            <span className="ml-2">Continue with Google</span>
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link href="/signup" className="text-red-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
