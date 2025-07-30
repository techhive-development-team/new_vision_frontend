import React from "react";

const ContactUsForm = () => {
  return (
    <section
      className={`relative flex items-center justify-between bg-cover bg-center h-[80vh] text-white px-10 lg:px-20 bg-[url('/images/a1.jpeg')]`}
    >
      <div className="absolute inset-0 bg-black opacity-70 z-0" />

      <div className="z-10 w-1/2 pr-6">
        <h1 className="text-sm md:text-lg lg:text-4xl font-bold mb-6">Contact Us</h1>
        <p className="text-xl max-w-xl">
          New Vision Art & Science Institute would be delighted to discuss your
          requirements and help you find the right programme to enable you to
          fulfill your career opportunities or your organizational development
          needs.
        </p>
      </div>

      <div className="z-10 w-full md:w-1/2 bg-black opacity-70 px-8 md:px-12 py-10 rounded-lg">
        <div className="flex items-center space-x-4 mb-6">
          <img
            className="w-12 h-12"
            src="/images/new_vision_logo_nobg.png"
            alt="logo"
          />
          <h2 className="text-xl font-semibold">
            New Vision Art & Science Institute
          </h2>
        </div>

        <form className="space-y-5">
          <div>
            <label htmlFor="name" className="text-xl block mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 bg-white text-black border border-gray-600 rounded-lg"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="text-xl block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 bg-white text-black border border-gray-600 rounded-lg"
              placeholder="example@example.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="text-xl block mb-1">
              Phone No
            </label>
            <input
              type="text"
              id="phone"
              className="w-full px-4 py-2 bg-white text-black border border-gray-600 rounded-lg"
              placeholder="+95..."
            />
          </div>

          <div>
            <label htmlFor="description" className="text-xl block mb-1">
              Description
            </label>
            <textarea
              id="description"
              className="w-full px-4 py-2 bg-white text-black border border-gray-600 rounded-lg h-28"
              placeholder="Write your message here..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-white text-black text-xl font-medium border border-gray-600 rounded-lg hover:bg-yellow-400 hover:text-gray-800 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUsForm;
