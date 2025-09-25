import React, { useState } from "react";
import { useController, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  CreditCard,
  GraduationCap,
  Globe,
  Loader2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { studentRegistrationSchema } from "./validation";
import { paymentOptions, schoolTypes } from "./type";
import Layout from "@/components/common/Layout";
import { useParams } from "react-router-dom";
import { API_URLS, baseUrl } from "@/client/url";
import { useGetCountry, useGetCourseById } from "@/hooks/useGetImage";
import FormSection from "@/components/student-register-components/FormSection";
import FormField from "@/components/student-register-components/FormField";

const LoadingState = () => (
  <Layout>
    <div className="max-w-4xl mx-auto p-6 text-center">
      <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
      <h2 className="text-xl font-semibold">Loading...</h2>
    </div>
  </Layout>
);

const SuccessModal = ({ message, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black opacity-70">
    <div className="bg-white rounded-lg p-6 max-w-md w-full">
      <div className="text-center">
        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">Registration Successful!</h3>
        <p className="text-gray-600 mb-4">{message}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
);

const StudentRegistrationForm = () => {
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const {
    data: course,
    isLoading: courseLoading,
    error: courseError,
  } = useGetCourseById(id);
  const { data: countries = [], isLoading: countriesLoading } = useGetCountry();

  const {
    control,
    handleSubmit,
    watch,
    reset,
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
      futureCountryId: "",
      futureCountryName: "",
      futureuniversityName: "",
      potentialYearOfStudy: "",
      joinRaffles: "MAYBE",
      paymentOption: undefined,
      status: "NONE",
      transactionId: "",
      coursesIds: id ? [id.toString()] : [],
    },
    mode: "onChange",
  });

  const studyAbroad = watch("studyAbroad");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "coursesIds") {
          formData.append(key, value);
        }
      });
      formData.append("coursesIds", id.toString().trim());
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      const response = await fetch(`${baseUrl}/students/register`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Backend error:", errorData);
        throw new Error(errorData.message || "Registration failed");
      }

      const result = await response.json();
      setSuccessMessage(result.message || "Student registered successfully!");
      setShowSuccess(true);
      reset();
    } catch (error) {
      console.error("Submit error:", error);
      setSubmitError(error.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (courseLoading || countriesLoading) return <LoadingState />;
  if (courseError)
    return (
      <Layout>
        <div className="text-red-600 text-center p-6">Error loading course</div>
      </Layout>
    );

  return (
    <Layout>
      {showSuccess && (
        <SuccessModal
          message={successMessage}
          onClose={() => setShowSuccess(false)}
        />
      )}

      <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 dark:text-white">
            Student Registration
          </h1>
          <p className="text-gray-600 dark:text-gray-100">Please fill out all required fields</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Student Information */}
          <FormSection
            icon={User}
            title="Student Information"
            color="text-blue-600"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                name="name"
                control={control}
                label="Student Name"
                error={errors.name}
                required
                placeholder="Enter full name"
              />
              <FormField
                name="parentName"
                control={control}
                label="Parent/Guardian Name"
                error={errors.parentName}
                required
              />
              <FormField
                name="parentJob"
                control={control}
                label="Parent Occupation"
                error={errors.parentJob}
                required
              />
              <FormField
                name="dob"
                control={control}
                label="Date of Birth"
                type="date"
                error={errors.dob}
                required
              />
              <FormField
                name="email"
                control={control}
                label="Email"
                type="email"
                error={errors.email}
                required
              />
              <FormField
                name="phone"
                control={control}
                label="Phone"
                type="tel"
                error={errors.phone}
                required
              />
              <div className="md:col-span-2">
                <FormField
                  name="address"
                  control={control}
                  label="Address"
                  type="textarea"
                  error={errors.address}
                  required
                />
              </div>
              <FormField
                name="postalCode"
                control={control}
                label="Postal Code"
                error={errors.postalCode}
                required
              />
              <FormField
                name="school"
                control={control}
                label="School Type"
                type="select"
                options={schoolTypes}
                error={errors.school}
                required
              />
              <div className="md:col-span-2">
                <FormField
                  name="studentImage"
                  control={control}
                  label="Student Photo"
                  type="file"
                  error={errors.studentImage}
                  required
                />
              </div>
            </div>
          </FormSection>

          {/* Future Plans */}
          <FormSection icon={Globe} title="Future Plans" color="text-green-600">
            <div className="space-y-4">
              <FormField
                name="studyAbroad"
                control={control}
                label="Interested in studying abroad"
                type="checkbox"
              />
              <FormField
                name="futurePlan"
                control={control}
                label="Future Goals"
                type="textarea"
                error={errors.futurePlan}
              />

              {studyAbroad && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg">
                  <FormField
                    name="futureCountryId"
                    control={control}
                    label="Preferred Country"
                    type="select"
                    options={countries.map((c) => ({
                      value: c.id,
                      label: c.country || c.name,
                    }))}
                  />
                  <FormField
                    name="futureCountryName"
                    control={control}
                    label="Other Country"
                  />
                  <FormField
                    name="futureuniversityName"
                    control={control}
                    label="Target University"
                  />
                  <FormField
                    name="potentialYearOfStudy"
                    control={control}
                    label="Expected Start Date"
                    type="date"
                  />
                </div>
              )}
            </div>
          </FormSection>

          {/* Course Information */}
          {course && (
            <FormSection
              icon={GraduationCap}
              title="Course Information"
              color="text-purple-600"
            >
              <div className="bg-white rounded-lg border p-4">
                <div className="flex gap-4">
                  <img
                    src={
                      course.image
                        ? `${baseUrl}${API_URLS.UPLOAD}${API_URLS.COURSE}/${course.image}`
                        : "/images/a1.jpeg"
                    }
                    alt="Course"
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{course.name}</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mt-2">
                      <div>
                        Price:{" "}
                        <span className="font-medium text-green-600">
                          {course.price?.toLocaleString()} MMK
                        </span>
                      </div>
                      <div>
                        Duration:{" "}
                        <span className="font-medium">{course.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FormSection>
          )}

          {/* Payment Information */}
          <FormSection
            icon={CreditCard}
            title="Payment Information"
            color="text-orange-600"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                name="paymentOption"
                control={control}
                label="Payment Method"
                type="select"
                options={paymentOptions}
                error={errors.paymentOption}
                required
              />
              <FormField
                name="transactionId"
                control={control}
                label="Transaction ID"
                placeholder="Required for bank transfer"
              />
            </div>
          </FormSection>

          {/* Submit */}
          <div className="text-center space-y-4">
            {submitError && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-center">
                <XCircle className="w-5 h-5 text-red-500 mr-3" />
                <div>
                  <h3 className="font-medium text-red-800">
                    Registration Failed
                  </h3>
                  <p className="text-red-700 text-sm">{submitError}</p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className={`px-8 py-3 rounded-md font-medium text-white transition-all flex items-center mx-auto space-x-2 ${
                isSubmitting || !isValid
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Registering...</span>
                </>
              ) : (
                <>
                  <User className="w-4 h-4" />
                  <span>Register Student</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default StudentRegistrationForm;
