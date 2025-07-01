// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import React, { useState, useEffect, useCallback } from "react";
// import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
// import { IoMail } from "react-icons/io5";
// import { useForm } from "react-hook-form";
// import { OtpVerificationModal } from "./OtpVerificationModal";
// import { NewPasswordModal } from "./NewPasswordModal";
// // import { supabase } from "@/lib/supabaseClient";

// interface ForgotPasswordModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onLoginClose: () => void;
//   onLoginOpen: () => void;
// }

// interface ForgotPasswordFormData {
//   email: string;
// }

// export const ForgotPasswordModal = ({
//   isOpen,
//   onClose,

//   onLoginOpen,
// }: ForgotPasswordModalProps) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string>("");
//   const [showOtpModal, setShowOtpModal] = useState(false);
//   const [showNewPasswordModal, setShowNewPasswordModal] = useState(false);
//   const [email, setEmail] = useState<string>("");
//   const [pendingOtp, setPendingOtp] = useState<string>("");

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<ForgotPasswordFormData>();

//   useEffect(() => {
//     if (!isOpen) {
//       setShowOtpModal(false);
//       setShowNewPasswordModal(false);
//     }
//   }, [isOpen]);

//   const closeOtpModal = useCallback(() => setShowOtpModal(false), []);
//   const closeNewPasswordModal = useCallback(
//     () => setShowNewPasswordModal(false),
//     []
//   );
//   const handleOtpSuccess = useCallback((otp: string) => {
//     setPendingOtp(otp);
//     setShowOtpModal(false);
//     setShowNewPasswordModal(true);
//   }, []);

//   const onSubmit = useCallback(
//     async (data: ForgotPasswordFormData) => {
//       setIsLoading(true);
//       setError("");
//       try {
//         // TODO: trigger Supabase password reset, e.g.
//         // const { error: resetError } = await supabase.auth.resetPasswordForEmail(data.email);
//         // if (resetError) throw resetError;

//         setEmail(data.email);
//         setShowOtpModal(true);
//         reset();
//       } catch (err: any) {
//         setError(err.message || "Failed to send OTP. Please try again.");
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [reset]
//   );

//   return (
//     <>
//       <Dialog open={isOpen} onOpenChange={onClose}>
//         <DialogOverlay className="bg-black/50" />
//         <DialogContent className="bg-white rounded-md py-3 px-2 w-full max-w-md mx-auto">
//           <div className="space-y-4 px-8 py-4">
//             <div>
//               <h2 className="text-xl font-outfit font-semibold text-black">
//                 Reset your password 🔑
//               </h2>
//               <p className="text-gray-600 mt-2">
//                 Enter your email and we’ll send an OTP to reset your password.
//               </p>
//             </div>

//             {error && (
//               <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
//                 {error}
//               </div>
//             )}

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block font-outfit font-semibold text-base mb-1"
//                 >
//                   Email
//                 </label>
//                 <div className="relative">
//                   <IoMail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" />
//                   <input
//                     type="email"
//                     id="email"
//                     {...register("email", {
//                       required: "Email is required",
//                       pattern: {
//                         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                         message: "Invalid email address",
//                       },
//                     })}
//                     className="w-full bg-[#FAFAFA] border border-[#FAFAFA] py-4 px-14 rounded-md focus:outline-none focus:border-primary"
//                     placeholder="Email"
//                     disabled={isLoading}
//                   />
//                 </div>
//                 {errors.email && (
//                   <p className="text-error text-sm mt-1">
//                     {errors.email.message}
//                   </p>
//                 )}
//               </div>

//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-4 rounded-full transition-colors"
//               >
//                 {isLoading ? "Sending..." : "Send OTP"}
//               </button>
//             </form>
//           </div>
//         </DialogContent>
//       </Dialog>

//       <OtpVerificationModal
//         isOpen={showOtpModal}
//         onClose={closeOtpModal}
//         email={email}
//         onSuccess={handleOtpSuccess}
//       />

//       <NewPasswordModal
//         isOpen={showNewPasswordModal}
//         onClose={closeNewPasswordModal}
//         code={pendingOtp}
//         email={email}
//         onSuccess={() => {
//           setShowNewPasswordModal(false);
//           onClose();
//         }}
//         onOpenLogin={onLoginOpen}
//       />
//     </>
//   );
// };
import React from "react";

export default function ForgotPasswordModal() {
  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}
