import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  CreditCard,
  GraduationCap,
  Globe,
  Loader2,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";

import { studentRegistrationSchema } from "./validation";
import SectionHeader from "@/components/forms/SectionHeader";
import InputField from "@/components/forms/InputField";
import TextareaField from "@/components/forms/TextareaField";
import CheckboxField from "@/components/forms/CheckboxField";
import SelectField from "@/components/forms/SelectField";
import StudentImageUpload from "@/components/forms/StudentImageUpload";
import { paymentOptions, schoolTypes } from "./type";
import Layout from "@/components/common/Layout";
import { useParams } from "react-router-dom";
import { API_URLS, baseUrl } from "@/client/url";
import { useGetCountry, useGetCourseById } from "@/hooks/useGetImage";

const LoadingSkeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
);

const ErrorBoundary = ({ children, error }) => {
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-red-800 mb-2">
          Something went wrong
        </h3>
        <p className="text-red-600 mb-4">{error}</p>
      </div>
    );
  }
  return children;
};

const SuccessNotification = ({ message, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 transform animate-in fade-in duration-300">
      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full">
        <CheckCircle className="w-6 h-6 text-green-600" />
      </div>
      <h3 className="text-lg font-medium text-center text-gray-900 mb-2">
        Registration Successful!
      </h3>
      <p className="text-center text-gray-600 mb-6">{message}</p>
      <button
        onClick={onClose}
        className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
      >
        Continue
      </button>
    </div>
  </div>
);

const StudentRegistrationForm = () => {
  const { id } = useParams();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Loading and error states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Data fetching states
  const {
    data: course,
    isLoading: courseLoading,
    error: courseError,
  } = useGetCourseById(id);

  const {
    data: futureCountriesData = [],
    isLoading: countriesLoading,
    error: countriesError,
  } = useGetCountry();

  // Form setup
  const {
    control,
    handleSubmit,
    watch,
    reset,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(studentRegistrationSchema),
    defaultValues: {
      name: "",
      parentName: "",
      parentJob: "",
      dob: "",
      email: "",
      address: "",
      postalCode: "",
      phone: "",
      studentImage: "",
      school: "NOTHING",
      studyAbroad: false,
      futurePlan: "",
      futureCountryId: undefined,
      futureCountryName: "",
      futureuniversityName: "",
      potentialYearOfStudy: "",
      joinRaffles: "MAYBE",
      paymentOption: undefined,
      status: "NONE",
      transactionId: "",
      coursesIds: id ? [id.toString()] : [], // ✅ fixed name
    },
    mode: "onChange",
  });

  const watchStudyAbroad = watch("studyAbroad");

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const validateFormData = (data) => {
    const errors = [];

    if (!data.studentImage) {
      errors.push("Student image is required");
    }

    if (data.studyAbroad && !data.futureCountryId && !data.futureCountryName) {
      errors.push("Please select a future country or specify other");
    }

    if (data.paymentOption === "BANK_TRANSFER" && !data.transactionId) {
      errors.push("Transaction ID is required for bank transfer");
    }

    return errors;
  };

  const onSubmit = async (data) => {
    if (!isOnline) {
      setSubmitError(
        "No internet connection. Please check your network and try again."
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    clearErrors();

    try {
      const validationErrors = validateFormData(data);
      if (validationErrors.length > 0) {
        setSubmitError(validationErrors.join(", "));
        setIsSubmitting(false);
        return;
      }
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (key === "studentImage" && data[key]) {
          formData.append("studentImage", data[key]);
        }
        if (key === "coursesIds" && Array.isArray(data[key])) {
          data[key].forEach((courseId) =>
            formData.append("coursesIds[]", courseId.toString())
          );
        } else if (
          data[key] !== null &&
          data[key] !== undefined &&
          data[key] !== ""
        ) {
          formData.append(key, data[key]);
        }
      });

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(`${baseUrl}/students/register`, {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        if (response.status === 400) {
          if (errorData.validationErrors) {
            Object.keys(errorData.validationErrors).forEach((field) => {
              setError(field, {
                type: "server",
                message: errorData.validationErrors[field],
              });
            });
          }
          throw new Error(
            errorData.message || "Please check your input and try again"
          );
        } else if (response.status === 409) {
          throw new Error("A student with this email already exists");
        } else if (response.status === 413) {
          throw new Error("File size too large. Please upload a smaller image");
        } else if (response.status >= 500) {
          throw new Error("Server error. Please try again later");
        } else {
          throw new Error(errorData.message || "Registration failed");
        }
      }

      const result = await response.json();

      setSubmitSuccess(result.message || "Student registered successfully!");
      setShowSuccess(true);

      localStorage.removeItem("studentRegistrationDraft");
      reset();
    } catch (error) {
      console.error("Registration error:", error);

      if (error.name === "AbortError") {
        setSubmitError("Request timed out. Please try again.");
      } else if (error.message.includes("fetch")) {
        setSubmitError(
          "Network error. Please check your connection and try again."
        );
      } else {
        setSubmitError(error.message || "An unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (courseLoading || countriesLoading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto p-6">
          <div className="space-y-6">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                Loading Registration Form...
              </h2>
              <p className="text-gray-600 mt-2">
                Please wait while we prepare your form
              </p>
            </div>
            <div className="space-y-4">
              <LoadingSkeleton className="h-8 w-1/3" />
              <LoadingSkeleton className="h-32 w-full" />
              <LoadingSkeleton className="h-32 w-full" />
              <LoadingSkeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (courseError && !course) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto p-6">
          <ErrorBoundary error="Failed to load course information. Please try again." />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {showSuccess && (
        <SuccessNotification
          message={submitSuccess}
          onClose={() => setShowSuccess(false)}
        />
      )}

      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Student Registration
          </h1>
          <p className="text-gray-600">
            Please fill out all required fields to register for the course
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Student Information Section */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <SectionHeader
              icon={User}
              color="text-blue-600"
              title="Student Information"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                name="name"
                control={control}
                label="Student Name"
                error={errors.name}
                required
                placeholder="Enter student full name"
              />

              <InputField
                name="parentName"
                control={control}
                label="Parent/Guardian Name"
                error={errors.parentName}
                required
                placeholder="Enter parent/guardian name"
              />

              <InputField
                name="parentJob"
                control={control}
                label="Parent/Guardian Occupation"
                error={errors.parentJob}
                required
                placeholder="Enter parent/guardian occupation"
              />

              <InputField
                name="dob"
                control={control}
                label="Date of Birth"
                type="date"
                error={errors.dob}
                required
              />

              <InputField
                name="email"
                control={control}
                label="Email Address"
                type="email"
                error={errors.email}
                required
                placeholder="Enter email address"
              />

              <InputField
                name="phone"
                control={control}
                label="Phone Number"
                type="tel"
                error={errors.phone}
                required
                placeholder="Enter phone number"
              />

              <div className="md:col-span-2">
                <TextareaField
                  name="address"
                  control={control}
                  label="Full Address"
                  error={errors.address}
                  required
                  placeholder="Enter complete address including street, city, state"
                />
              </div>

              <InputField
                name="postalCode"
                control={control}
                label="Postal/ZIP Code"
                error={errors.postalCode}
                placeholder="Enter postal or ZIP code"
                required
              />

              <SelectField
                name="school"
                control={control}
                label="Current School Type"
                error={errors.school}
                options={schoolTypes}
                required
              />

              <div className="md:col-span-2">
                <StudentImageUpload
                  name="studentImage"
                  control={control}
                  label="Student Photo"
                  error={errors.studentImage}
                  required
                />
              </div>
            </div>
          </div>

          {/* Future Plans Section */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <SectionHeader
              icon={Globe}
              color="text-green-600"
              title="Future Educational Plans"
            />

            <div className="space-y-4">
              <CheckboxField
                name="studyAbroad"
                control={control}
                label="Interested in studying abroad"
              />

              <TextareaField
                name="futurePlan"
                control={control}
                label="Future Educational/Career Goals"
                error={errors.futurePlan}
                placeholder="Describe your future educational or career aspirations"
              />

              {watchStudyAbroad && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="md:col-span-2 font-medium text-blue-900 mb-2">
                    Study Abroad Information
                  </h4>

                  <ErrorBoundary error={countriesError}>
                    <SelectField
                      name="futureCountryId"
                      control={control}
                      label="Preferred Country"
                      error={errors.futureCountryId}
                      options={
                        futureCountriesData?.map((c) => ({
                          value: c.id,
                          label: c.country || c.name,
                        })) || []
                      }
                      placeholder="Select a country"
                    />
                  </ErrorBoundary>

                  <InputField
                    name="futureCountryName"
                    control={control}
                    label="Other Country (if not listed)"
                    error={errors.futureCountryName}
                    placeholder="Enter country name"
                  />

                  <InputField
                    name="futureuniversityName"
                    control={control}
                    label="Target University/College"
                    error={errors.futureuniversityName}
                    placeholder="Enter preferred university name"
                  />

                  <InputField
                    name="potentialYearOfStudy"
                    control={control}
                    label="Expected Start Date"
                    type="date"
                    error={errors.potentialYearOfStudy}
                  />

                  <div className="md:col-span-2">
                    <CheckboxField
                      name="joinRaffles"
                      control={control}
                      label="Interested in Raffles Education Network programs"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Course Information Section */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <SectionHeader
              icon={GraduationCap}
              color="text-purple-600"
              title="Course Information"
            />

            {course ? (
              <div className="mt-4 grid gap-6 grid-cols-1 mx-auto">
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition">
                  <img
                    src={
                      course?.image
                        ? `${baseUrl}${API_URLS.UPLOAD}${API_URLS.COURSE}/${course.image}`
                        : "/images/a1.jpeg"
                    }
                    alt="Course"
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4 space-y-3">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {course?.name}
                    </h2>
                    <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                      <div>
                        <span className="block text-gray-500">Price</span>
                        <span className="font-medium text-green-600">
                          {course?.price
                            ? `${course.price.toLocaleString()} MMK`
                            : "To be announced"}
                        </span>
                      </div>
                      <div>
                        <span className="block text-gray-500">Duration</span>
                        <span className="font-medium">
                          {course?.duration || "N/A"}
                        </span>
                      </div>
                      <div>
                        <span className="block text-gray-500">
                          Registration Deadline
                        </span>
                        <span className="font-medium">
                          {course?.expireDate
                            ? new Date(course.expireDate).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                }
                              )
                            : "Not set"}
                        </span>
                      </div>
                      <div>
                        <span className="block text-gray-500">Level</span>
                        <span className="font-medium">
                          {course?.level || "N/A"}
                        </span>
                      </div>
                    </div>

                    {course?.skills && course.skills.length > 0 && (
                      <div>
                        <span className="block text-gray-500 text-sm mb-1">
                          Skills You'll Learn
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {course.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">
                  Course information not available
                </p>
              </div>
            )}
          </div>

          {/* Payment Information Section */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <SectionHeader
              icon={CreditCard}
              color="text-orange-600"
              title="Payment Information"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField
                name="paymentOption"
                control={control}
                label="Payment Method"
                error={errors.paymentOption}
                options={paymentOptions}
                required
              />

              <InputField
                name="transactionId"
                control={control}
                label="Transaction ID"
                error={errors.transactionId}
                placeholder="Enter transaction ID (required for bank transfer)"
              />
            </div>
          </div>

          {/* Submit Section */}
          <div className="flex flex-col items-center space-y-4">
            {submitError && (
              <div className="w-full max-w-md bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex items-center">
                  <XCircle className="w-5 h-5 text-red-500 mr-3" />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-red-800">
                      Registration Failed
                    </h3>
                    <p className="text-sm text-red-700 mt-1">{submitError}</p>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !isValid || !isOnline}
              className={`px-8 py-3 rounded-md font-medium text-white transition-all duration-200 flex items-center space-x-2 ${
                isSubmitting || !isValid || !isOnline
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg hover:shadow-xl transform hover:scale-105"
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Registering Student...</span>
                </>
              ) : (
                <>
                  <User className="w-4 h-4" />
                  <span>Register Student</span>
                </>
              )}
            </button>

            <div className="text-center text-sm text-gray-500 space-y-1">
              {!isValid && <p>Please fill in all required fields correctly</p>}
              {!isOnline && <p>Please check your internet connection</p>}
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default StudentRegistrationForm;
