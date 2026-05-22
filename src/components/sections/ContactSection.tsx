"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Heading, Text } from "@/components/ui/Typography";
import { Reveal } from "@/components/ui/Reveal";

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    productOfInterest: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({
        name: "",
        email: "",
        phone: "",
        company: "",
        industry: "",
        productOfInterest: "",
        message: ""
      });
    }, 3000);
  };

  return (
    <section className="mt-4 py-8 md:py-12 bg-white">
      <Container>
        <div
          className="rounded-3xl overflow-hidden bg-cover bg-center px-6 py-12 md:px-12 lg:px-16 md:py-16 lg:py-20 text-white shadow-xl"
          style={{
            backgroundImage: "url('/images/hero-bg.png')",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column — Contact Details */}
            <div className="lg:col-span-5 flex flex-col gap-6 md:gap-8">
              <Reveal direction="up" delay={0.1}>
                {/* Wavy Logo Icon */}
                <svg
                  width="50"
                  height="26"
                  viewBox="0 0 65 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mb-2"
                  aria-hidden="true"
                >
                  <path d="M10 29C20 29 23 5 37 5" stroke="#38A81B" strokeWidth="8" strokeLinecap="round" />
                  <path d="M28 29C38 29 41 5 55 5" stroke="#A0FF88" strokeWidth="8" strokeLinecap="round" />
                </svg>

                <Heading as="h1" className="text-white !text-[40px] md:!text-[50px] font-bold font-heading mb-4">
                  Let&apos;s Connect
                </Heading>

                <Text className="text-white/85 !text-[16px] md:!text-[18px] font-body leading-relaxed max-w-md">
                  Get in touch with by filling out the form or via the contact details below.
                </Text>
              </Reveal>

              {/* Info Items */}
              <div className="flex flex-col gap-6 mt-6 md:mt-8">
                {/* Pin Address */}
                <Reveal direction="up" delay={0.2}>
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 bg-transparent rounded-full flex items-center justify-center pt-1 text-brand-green-light">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <span className="font-body font-normal text-[16px] md:text-[18px] text-white/90 leading-relaxed max-w-sm">
                      1st Floor, Portfolio Place 498 Broadway Oldham, United Kingdom OL9 9PY
                    </span>
                  </div>
                </Reveal>

                {/* Email Address */}
                <Reveal direction="up" delay={0.3}>
                  <div className="flex items-center gap-4">
                    <div className="shrink-0 bg-transparent rounded-full flex items-center justify-center text-brand-green-light">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                    <a
                      href="mailto:hello@providus.io"
                      className="font-body font-normal text-[16px] md:text-[18px] text-white hover:text-brand-green-light transition-colors leading-relaxed"
                    >
                      hello@providus.io
                    </a>
                  </div>
                </Reveal>

                {/* Phone Number */}
                <Reveal direction="up" delay={0.4}>
                  <div className="flex items-center gap-4">
                    <div className="shrink-0 bg-transparent rounded-full flex items-center justify-center text-brand-green-light">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <a
                      href="tel:+971581090882"
                      className="font-body font-normal text-[16px] md:text-[18px] text-white hover:text-brand-green-light transition-colors leading-relaxed"
                    >
                      +971 58 109 0882
                    </a>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* Right Column — Contact Form */}
            <div className="lg:col-span-7 w-full bg-transparent rounded-2xl">
              <Reveal direction="left" delay={0.2} width="100%">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {submitted ? (
                    <div className="bg-[#A0FF88]/20 border border-brand-green-light/45 rounded-xl p-8 text-center flex flex-col items-center gap-3">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#A0FF88"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <Heading as="h4" className="text-white">
                        Thank You!
                      </Heading>
                      <Text className="text-white/80">
                        Your message has been sent successfully. We will connect with you shortly.
                      </Text>
                    </div>
                  ) : (
                    <>
                      {/* Name & Email */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="font-body font-normal text-[18px] leading-[25px] text-white">
                            Name
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Enter your full name"
                            value={formState.name}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            className="h-[48px] px-4 bg-white border border-transparent rounded-[6px] text-[14px] font-body text-gray-800 placeholder-gray-400 focus:outline-none focus:border-brand-green transition-all"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="font-body font-normal text-[18px] leading-[25px] text-white">
                            Email
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="Enter your email address"
                            value={formState.email}
                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            className="h-[48px] px-4 bg-white border border-transparent rounded-[6px] text-[14px] font-body text-gray-800 placeholder-gray-400 focus:outline-none focus:border-brand-green transition-all"
                          />
                        </div>
                      </div>

                      {/* Phone & Company */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="font-body font-normal text-[18px] leading-[25px] text-white">
                            Phone
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="Enter your phone number"
                            value={formState.phone}
                            onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                            className="h-[48px] px-4 bg-white border border-transparent rounded-[6px] text-[14px] font-body text-gray-800 placeholder-gray-400 focus:outline-none focus:border-brand-green transition-all"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="font-body font-normal text-[18px] leading-[25px] text-white">
                            Company
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Enter your company name"
                            value={formState.company}
                            onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                            className="h-[48px] px-4 bg-white border border-transparent rounded-[6px] text-[14px] font-body text-gray-800 placeholder-gray-400 focus:outline-none focus:border-brand-green transition-all"
                          />
                        </div>
                      </div>

                      {/* Industry & Product of Interest */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="font-body font-normal text-[18px] leading-[25px] text-white">
                            Industry
                          </label>
                          <select
                            required
                            value={formState.industry}
                            onChange={(e) => setFormState({ ...formState, industry: e.target.value })}
                            className="h-[48px] px-4 bg-white border border-transparent rounded-[6px] text-[14px] font-body text-gray-800 focus:outline-none focus:border-brand-green transition-all appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%232E2E2E%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-[right_16px_center] bg-no-repeat"
                          >
                            <option value="" disabled className="text-gray-400">
                              Select your industry
                            </option>
                            <option value="Nonprofit">Nonprofit</option>
                            <option value="Financial Services">Financial Services</option>
                            <option value="Retail & Commerce">Retail & Commerce</option>
                            <option value="Education">Education</option>
                            <option value="Manufacturing">Manufacturing</option>
                            <option value="Healthcare">Healthcare</option>
                          </select>
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="font-body font-normal text-[18px] leading-[25px] text-white">
                            Product of Interest
                          </label>
                          <select
                            required
                            value={formState.productOfInterest}
                            onChange={(e) => setFormState({ ...formState, productOfInterest: e.target.value })}
                            className="h-[48px] px-4 bg-white border border-transparent rounded-[6px] text-[14px] font-body text-gray-800 focus:outline-none focus:border-brand-green transition-all appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%232E2E2E%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-[right_16px_center] bg-no-repeat"
                          >
                            <option value="" disabled className="text-gray-400">
                              Select your product of interest
                            </option>
                            <option value="Salesforce Sales Cloud">Salesforce Sales Cloud</option>
                            <option value="Salesforce Service Cloud">Salesforce Service Cloud</option>
                            <option value="Salesforce Marketing Cloud">Salesforce Marketing Cloud</option>
                            <option value="Salesforce Commerce Cloud">Salesforce Commerce Cloud</option>
                            <option value="Salesforce Health Cloud">Salesforce Health Cloud</option>
                            <option value="Custom CRM Development">Custom CRM Development</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>

                      {/* Textarea */}
                      <div className="flex flex-col gap-2">
                        <label className="font-body font-normal text-[18px] leading-[25px] text-white">
                          How can we help?
                        </label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Please tell us about your project..."
                          value={formState.message}
                          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                          className="px-4 py-3 bg-white border border-transparent rounded-[6px] text-[14px] font-body text-gray-800 placeholder-gray-400 focus:outline-none focus:border-brand-green transition-all resize-none min-h-[120px]"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="w-full bg-[#38A81B] text-white hover:bg-[#2d8c14] focus-visible:outline-[#38A81B] py-3.5 rounded-full font-body font-semibold text-[16px] transition-all cursor-pointer shadow-md active:scale-[0.99] flex items-center justify-center"
                      >
                        Let&apos;s Connect
                      </button>
                    </>
                  )}
                </form>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
