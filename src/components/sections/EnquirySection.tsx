"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useCMSStore } from "@/store/useCMSStore";

type EnquiryFormData = {
  name: string;
  email: string;
  interest: string;
  budget: string;
  message: string;
};

const InputField = ({
  label,
  type = "text",
  placeholder,
  register,
  name,
  required,
}: {
  label: string;
  type?: string;
  placeholder: string;
  register: any;
  name: keyof EnquiryFormData;
  required?: boolean;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">
      {label}
    </label>
    <input
      {...register(name, { required: required })}
      type={type}
      placeholder={placeholder}
      className="w-full bg-transparent border-b border-gray-200 py-2 md:py-3 text-sm md:text-base text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-[#D4AF37] transition-colors"
    />
  </div>
);

const SelectField = ({
  label,
  options,
  register,
  name,
  required,
}: {
  label: string;
  options: string[];
  register: any;
  name: keyof EnquiryFormData;
  required?: boolean;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">
      {label}
    </label>
    <div className="relative">
      <select
        {...register(name, { required })}
        className="w-full bg-transparent border-b border-gray-200 py-2 md:py-3 text-sm md:text-base text-gray-900 focus:outline-none focus:border-[#D4AF37] transition-colors appearance-none cursor-pointer"
        defaultValue=""
      >
        <option value="" disabled>
          Select an option
        </option>
        {options?.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
        <ArrowRight className="w-4 h-4 rotate-90" />
      </div>
    </div>
  </div>
);

export const EnquirySection = ({
  data: propData,
  isMain = false,
}: {
  data?: any;
  isMain?: boolean;
}) => {
  const storeData = useCMSStore((state) => state.homeData?.EnquirySection);
  const data = propData || storeData;
  const Heading = (data?.headingTag || (isMain ? "h1" : "h2")) as any;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const { register, handleSubmit, reset } = useForm<EnquiryFormData>();

  const onSubmit = async (formData: EnquiryFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("https://tgt-cms.vercel.app/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          interestedIn: formData.interest,
          budget: formData.budget,
          projectGoals: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit enquiry. Please try again later.");
      }

      setSubmitStatus("success");
      reset();

      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error: any) {
      setSubmitStatus("error");
      setErrorMessage(error.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatedSection animation="fadeUp" delay={0.2}>
      <section
        className="py-10 md:py-20 mb-10 md:mb-20 relative"
        id="contactUs"
      >
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 grid lg:grid-cols-12 gap-8 lg:gap-20 items-start">
          {/* Left Column: Context & Contact Info */}
          <div className="lg:col-span-5 space-y-6 md:space-y-10">
            <div>
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <div className="h-px w-8 bg-[#D4AF37]"></div>
                <span className="text-[#D4AF37] font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase">
                  {data?.upperTag}
                </span>
              </div>
              <Heading className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#0B0F29] tracking-tight leading-tight">
                {data?.headlinePart1} <br className="hidden sm:inline" />
                <span className="font-serif italic text-[#D4AF37]">
                  {data?.headlineHighlight}
                </span>
              </Heading>
            </div>

            <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed">
              {data?.introDescription}
            </p>

            <div className="space-y-4 md:space-y-6 pt-2 md:pt-4">
              <div className="flex items-center gap-4 md:gap-5 group cursor-pointer transition-transform hover:translate-x-1 duration-300">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-gray-100 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#0B0F29] group-hover:text-white transition-all duration-300 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0B0F29] text-xs md:text-sm mb-0.5">
                    Email Us
                  </h4>
                  <p className="text-gray-500 text-xs md:text-sm">
                    {data?.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 md:gap-5 group cursor-pointer transition-transform hover:translate-x-1 duration-300">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-gray-100 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#0B0F29] group-hover:text-white transition-all duration-300 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0B0F29] text-xs md:text-sm mb-0.5">
                    Call Us
                  </h4>
                  <p className="text-gray-500 text-xs md:text-sm">
                    {data?.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 md:gap-5 group cursor-pointer transition-transform hover:translate-x-1 duration-300">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-gray-100 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#0B0F29] group-hover:text-white transition-all duration-300 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0B0F29] text-xs md:text-sm mb-0.5">
                    Visit Us
                  </h4>
                  <p className="text-gray-500 text-xs md:text-sm">
                    {data?.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: The Form */}
          <div className="lg:col-span-7 bg-gray-50 rounded-[1.5rem] md:rounded-[2rem] p-5 sm:p-8 md:p-10 border border-gray-100">
            {submitStatus === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12 md:py-20">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-[#D4AF37]/10 rounded-full flex items-center justify-center text-[#D4AF37]">
                  <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-[#0B0F29]">
                  Thank You!
                </h3>
                <p className="text-gray-500 text-xs md:text-base max-w-sm">
                  Your enquiry has been submitted successfully. We will get back
                  to you shortly.
                </p>
                <button
                  onClick={() => setSubmitStatus("idle")}
                  className="text-[#D4AF37] font-semibold text-xs md:text-sm hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5 md:space-y-8"
              >
                <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                  <InputField
                    label="Your Name"
                    placeholder="John Doe"
                    name="name"
                    register={register}
                    required
                  />
                  <InputField
                    label="Email Address"
                    type="email"
                    placeholder="john@company.com"
                    name="email"
                    register={register}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                  <SelectField
                    label="I'm interested in..."
                    options={data?.interestedInOptions?.split(",") || []}
                    name="interest"
                    register={register}
                    required
                  />
                  <SelectField
                    label="Project Budget"
                    options={data?.budgetOptions?.split(",") || []}
                    name="budget"
                    register={register}
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Tell us about your project
                  </label>
                  <textarea
                    {...register("message", { required: true })}
                    rows={3}
                    placeholder="Briefly describe your project goals..."
                    className="w-full bg-transparent border-b border-gray-200 py-2 md:py-3 text-sm md:text-base text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                  ></textarea>
                </div>

                {submitStatus === "error" && (
                  <p className="text-red-500 text-xs md:text-sm">
                    {errorMessage}
                  </p>
                )}

                <div className="pt-2 md:pt-4 flex justify-end">
                  <button
                    disabled={isSubmitting}
                    className="bg-[#0B0F29] text-white px-8 md:px-10 py-3.5 md:py-4 rounded-full font-semibold tracking-wide hover:bg-black transition-all duration-300 border border-transparent hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center gap-3 group text-xs md:text-sm w-full md:w-auto justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        Submitting...
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </>
                    ) : (
                      <>
                        {data?.submitButtonText}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
};
