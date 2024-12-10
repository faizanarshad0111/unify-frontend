"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import { VerificationCodeFormValues } from "@/utils/interface";
import { verificationCodeSchema } from "@/utils/validationSchemas";

const VerificationCodeForm: React.FC = () => {
  const formik = useFormik<VerificationCodeFormValues>({
    initialValues: {
      code: Array(5).fill(""),
    },
    validateOnBlur: true,
    validateOnChange: true,
    validate: (values) => {
      try {
        verificationCodeSchema.parse(values);
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

  const handleCodeChange = (index: number, value: string) => {
    if (index === 0 && value.length > 1) {
      const codeArray = value.slice(0, 5).split("");
      const paddedArray = [
        ...codeArray,
        ...Array(5 - codeArray.length).fill(""),
      ];
      formik.setFieldValue("code", paddedArray);

      const lastFilledIndex = Math.min(codeArray.length - 1, 4);
      const nextInput = document.getElementById(`code-${lastFilledIndex}`);
      nextInput?.focus();
    } else {
      const newCode = [...formik.values.code];
      newCode[index] = value;
      formik.setFieldValue("code", newCode);

      if (value && index < 4) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
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
      <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Verification Code
        </h2>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          We sent a code to enter email demo@gmail.com
        </p>
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-12">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-6 flex justify-between gap-4">
              {[0, 1, 2, 3, 4].map((index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  maxLength={index === 0 ? 5 : 1}
                  value={formik.values.code[index]}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  className="w-14 h-14 text-center border-2 border-gray-300 rounded-md text-lg font-bold focus:border-red-500 focus:ring-2 focus:ring-red-200"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Continue
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Didn't receive the email?{" "}
            <button className="text-red-500 hover:underline">
              Click to Resend
            </button>
          </p>

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

export default VerificationCodeForm;
