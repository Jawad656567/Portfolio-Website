import { useState } from "react";

const ContactComponent = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [focused, setFocused] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setFormData({ name: "", email: "", subject: "", message: "" }); }, 3000);
  };

  const contacts = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: "Email",
      value: "hello@studio.com",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: "Phone",
      value: "+1 (555) 000-0000",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: "Location",
      value: "Lahore, Pakistan",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: "Working Hours",
      value: "Mon – Fri, 9am – 6pm",
    },
  ];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-xs font-medium tracking-widest text-gray-400 uppercase mb-4 border border-gray-200 rounded-full px-4 py-1.5">
            Contact Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 leading-tight mb-3">
            We'd love to hear <br className="hidden sm:block" />
            <span className="text-gray-400 font-normal">from you</span>
          </h1>
          <p className="text-gray-500 text-base max-w-md leading-relaxed">
            Have a project in mind or just want to say hi? Fill out the form and we'll get back to you within 24 hours.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white border border-gray-100 rounded-3xl shadow-xl shadow-gray-100/80 overflow-hidden grid grid-cols-1 lg:grid-cols-5">

          {/* Left Panel */}
          <div className="lg:col-span-2 bg-gray-950 p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <h2 className="text-white text-xl font-semibold mb-2">Contact Information</h2>
              <p className="text-gray-400 text-sm mb-10 leading-relaxed">
                Fill in the form or reach us directly through one of the options below.
              </p>

              <div className="space-y-5">
                {contacts.map((c, i) => (
                  <div key={i} className="flex items-start gap-4 group cursor-default">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 shrink-0 group-hover:bg-white/10 group-hover:text-white transition-all duration-200">
                      {c.icon}
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs font-medium tracking-wide uppercase mb-0.5">{c.label}</p>
                      <p className="text-gray-200 text-sm">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social */}
            <div className="mt-10 pt-8 border-t border-white/10">
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-4">Follow Us</p>
              <div className="flex gap-3 flex-wrap">
                {["Twitter", "LinkedIn", "Dribbble"].map((s) => (
                  <button key={s} className="text-xs text-gray-400 border border-white/10 rounded-lg px-3 py-1.5 hover:bg-white/5 hover:text-white transition-all duration-200">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="lg:col-span-3 p-8 sm:p-10 bg-white">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 bg-green-50 border border-green-100 rounded-2xl flex items-center justify-center mb-5">
                  <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-400 text-sm">Thank you for reaching out. We'll reply within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="text-xl font-semibold text-gray-900 mb-7">Send a Message</h3>

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  {[
                    { name: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
                    { name: "email", label: "Email Address", type: "email", placeholder: "john@example.com" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        onFocus={() => setFocused(field.name)}
                        onBlur={() => setFocused(null)}
                        placeholder={field.placeholder}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-300 outline-none focus:border-gray-800 focus:bg-white focus:ring-2 focus:ring-gray-900/8 transition-all duration-200"
                      />
                    </div>
                  ))}
                </div>

                {/* Subject */}
                <div className="mb-5">
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocused("subject")}
                    onBlur={() => setFocused(null)}
                    placeholder="How can we help?"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-300 outline-none focus:border-gray-800 focus:bg-white focus:ring-2 focus:ring-gray-900/8 transition-all duration-200"
                  />
                </div>

                {/* Message */}
                <div className="mb-8">
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    placeholder="Tell us about your project or question..."
                    rows={5}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-300 outline-none focus:border-gray-800 focus:bg-white focus:ring-2 focus:ring-gray-900/8 transition-all duration-200 resize-none"
                  />
                </div>

                {/* Submit Row */}
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <p className="text-xs text-gray-400">We usually reply within 24 hours.</p>
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-gray-900/20 hover:-translate-y-0.5 active:scale-95"
                  >
                    Send Message
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-300 mt-8 tracking-widest uppercase">
          © 2026 Studio — All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default ContactComponent;