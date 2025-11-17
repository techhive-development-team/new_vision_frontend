import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { baseUrl } from "@/client/url";

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToast({ message: "", type: "" });

    try {
      await fetch(`${baseUrl}/inquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setToast({ message: "Inquiry submitted successfully!", type: "success" });
      setFormData({ name: "", email: "", phone: "", description: "" });
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      setToast({
        message: "Failed to submit inquiry. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (toast.message) {
      const timer = setTimeout(() => setToast({ message: "", type: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <section className="relative bg-[url('/images/k1.jpeg')] bg-cover bg-center text-white min-h-1/2 py-20 px-4">
      <div className="absolute inset-0 bg-black opacity-70 z-0"></div>
      {toast.message && (
        <div
          className={`z-50 fixed top-20 right-5 px-4 py-3 rounded-lg shadow-lg text-white transition-all duration-500 ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex-1 space-y-6 text-white">
          <h4 className="text-3xl md:text-4xl text-yellow-300 font-bold">
            Contact Us
          </h4>
          <p className="text-lg leading-relaxed text-yellow-300 max-w-2xl">
            New Vision Art & Science Institute would be delighted to discuss
            your requirements and help you find the right programme.
          </p>
        </div>

        {/* Right Section (Form) */}
        <div className="w-full md:w-[420px] bg-black backdrop-blur-md text-white rounded-2xl px-8 py-10 shadow-xl">
          <div className="flex items-center space-x-2 justify-center mb-8">
            <img className="w-10 h-10" src={logo} alt="new vision logo" />
            <h1 className="text-xl sm:text-2xl font-semibold text-new-vision-yellow">
              New Vision Art & Science Institute
            </h1>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="text-sm">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-3 bg-white text-black border border-gray-400 rounded-xl mt-1 focus:outline-none focus:ring-2 focus:ring-new-vision-yellow"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 bg-white text-black border border-gray-400 rounded-xl mt-1 focus:outline-none focus:ring-2 focus:ring-new-vision-yellow"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="text-sm">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-4 py-3 bg-white text-black border border-gray-400 rounded-xl mt-1 focus:outline-none focus:ring-2 focus:ring-new-vision-yellow"
                placeholder="e.g. +959 889 322 324"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="description" className="text-sm">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                className="w-full px-4 py-3 bg-white text-black border border-gray-400 rounded-xl mt-1 focus:outline-none focus:ring-2 focus:ring-new-vision-yellow"
                placeholder="Tell us about your needs..."
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-new-vision-yellow text-black font-medium rounded-xl transition duration-300 hover:bg-yellow-400"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUsForm;
