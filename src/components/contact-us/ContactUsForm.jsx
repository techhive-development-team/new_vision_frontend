import React, { useState } from "react";
import logo from "../../assets/logo.png";

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:3000/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response from API:", data);

      setSuccessMessage("Inquiry submitted successfully!");
      setFormData({ name: "", email: "", phone: "", description: "" });
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      setErrorMessage("Failed to submit inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative bg-[url('/images/a1.jpeg')] bg-cover bg-center text-white min-h-1/2 py-20 px-4">
      <div className="absolute inset-0 bg-black opacity-70 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex-1 space-y-6 text-white">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="text-lg leading-relaxed max-w-2xl">
            New Vision Art & Science Institute would be delighted to discuss
            your requirements and help you find the right programme.
          </p>
        </div>

        <div className="w-full md:w-[420px] bg-black backdrop-blur-md text-white rounded-2xl px-8 py-10 shadow-xl">
          <div className="flex items-center space-x-2 justify-center mb-8">
            <img className="w-10 h-10" src={logo} alt="new vision logo" />
            <h2 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-new-vision-yellow to-new-vision-green bg-clip-text text-transparent">
              New Vision Art & Science Institute
            </h2>
          </div>

          {successMessage && (
            <div className="bg-green-600 text-white p-3 rounded mb-4">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="bg-red-600 text-white p-3 rounded mb-4">
              {errorMessage}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="text-sm">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-3 bg-white text-black border border-gray-400 rounded-xl mt-1"
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
                className="w-full px-4 py-3 bg-white text-black border border-gray-400 rounded-xl mt-1"
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
                className="w-full px-4 py-3 bg-white text-black border border-gray-400 rounded-xl mt-1"
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
                className="w-full px-4 py-3 bg-white text-black border border-gray-400 rounded-xl mt-1 resize-none"
                placeholder="Tell us about your needs..."
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-new-vision-yellow text-black font-medium rounded-xl transition duration-300"
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
