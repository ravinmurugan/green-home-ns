"use client";

import { useState, FormEvent } from "react";
import { Loader2, CheckCircle2, Phone, Mail, User, MapPin, MessageSquare } from "lucide-react";

interface Props {
  installerSlug: string;
  installerName: string;
  service?: string;
}

type Status = "idle" | "loading" | "success" | "error";

const SERVICE_OPTIONS = ["Heat Pump", "Solar", "Both"] as const;

export default function InstallerLeadForm({ installerSlug, installerName, service }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [postal, setPostal] = useState("");
  const [serviceVal, setServiceVal] = useState<string>(service ?? "Heat Pump");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const valid = name.trim() !== "" && EMAIL_RE.test(email) && phone.trim() !== "" && consent;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!valid || status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "installer-lead",
          installerSlug,
          installerName,
          name,
          email,
          phone,
          postal,
          service: serviceVal,
          message,
        }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border-2 border-green-200 bg-green-50/60 p-6 text-center">
        <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
        <h3 className="text-lg font-bold mb-2">Request sent to {installerName}</h3>
        <p className="text-sm text-gray-600 mb-4">Here&apos;s what happens next:</p>
        <ul className="text-sm text-gray-700 text-left space-y-2 max-w-xs mx-auto">
          <li className="flex gap-2">
            <span className="w-5 h-5 rounded-full bg-green-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
            We forward your request directly to {installerName}.
          </li>
          <li className="flex gap-2">
            <span className="w-5 h-5 rounded-full bg-green-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
            They&apos;ll contact you within 1–2 business days.
          </li>
          <li className="flex gap-2">
            <span className="w-5 h-5 rounded-full bg-green-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
            You get a free, no-obligation quote — including rebate guidance.
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border-2 border-green-200 bg-green-50/30 p-5 shadow-sm">
      <h3 className="text-lg font-bold mb-1">Request a Free Quote from {installerName}</h3>
      <p className="text-sm text-gray-600 mb-4">No obligation. We forward your request directly to the installer.</p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none"
          />
        </div>

        <div className="relative">
          <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none"
            />
          </div>
          <div className="relative">
            <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={postal}
              onChange={(e) => setPostal(e.target.value)}
              placeholder="Postal code"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none"
            />
          </div>
        </div>

        <select
          value={serviceVal}
          onChange={(e) => setServiceVal(e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none"
        >
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        <div className="relative">
          <MessageSquare className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Anything the installer should know? (optional)"
            rows={3}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none resize-none"
          />
        </div>

        <label className="flex items-start gap-2 text-xs text-gray-600">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 accent-green-600"
          />
          <span>
            I agree to be contacted by {installerName} and GreenHomeNS about my quote request.
          </span>
        </label>

        <button
          type="submit"
          disabled={!valid || status === "loading"}
          className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
        >
          {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          Request Free Quote
        </button>

        {status === "error" && (
          <p className="text-xs text-red-600 text-center">Something went wrong. Please try again.</p>
        )}
      </form>
    </div>
  );
}
