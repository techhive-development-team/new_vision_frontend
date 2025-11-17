import Layout from "@/components/common/Layout";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const RegistrationSuccess = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/");
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md text-center">
          <h4 className="text-2xl font-bold mb-4">Registration Successful!</h4>
          <p className="mb-4">
            You will receive a Gmail notification once your registration is
            approved by the admin.
          </p>
          <p className="mb-6">
            If you have any questions, please contact us at{" "}
            <Link
              to="mailto:office@newvision-institute.com"
              className="text-blue-600 underline"
            >
              office@newvision-institute.com
            </Link>
          </p>
          <button
            onClick={handleContinue}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Continue
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default RegistrationSuccess;
