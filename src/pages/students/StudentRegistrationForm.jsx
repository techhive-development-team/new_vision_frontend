import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, CreditCard, GraduationCap, Globe, Loader2 } from "lucide-react";
import { studentRegistrationSchema } from "./validation";
import { paymentOptions, schoolTypes, joinRafflesOptions } from "./type";
import Layout from "@/components/common/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { API_URLS, baseUrl, imageUrl } from "@/client/url";
import { useGetCountry, useGetCourseById } from "@/hooks/useGetImage";
import FormSection from "@/components/student-register-components/FormSection";
import FormField from "@/components/student-register-components/FormField";
import NotFoundData from "@/components/common/NotFoundData";
import Loader from "@/components/common/Loader";
import LoadingContext from "@/context/LoadingContext";

const StudentRegistrationForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: course } = useGetCourseById(id);
  const { data: countries = [] } = useGetCountry();
  const { loadingCount } = useContext(LoadingContext);

  if (
    (course?.expireDate &&
    new Date(course.expireDate) < new Date()) ||
    course?.isOpened === false
  ) {
    window.history.back();
    return;
  }

  useEffect(() => {}, [course, countries]);

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
      bank: "",
      message: "",
    },
    mode: "onChange",
  });

  const studyAbroad = watch("studyAbroad");

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      console.log(data);
      for (let [key, value] of Object.entries(data)) {
        if (value === null || value === "") {
          continue;
        }
        formData.append(key, value);
      }

      formData.append("coursesId", id);
      console.log(formData.get("futureCountryId"));
      const response = await fetch(`${baseUrl}/students/upload`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Backend error:", errorData);
        throw new Error(errorData.message || "Registration failed");
      }
      const result = await response.json();
      navigate(`/courses/${id}/apply/success`);
      reset();
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingCount > 0) {
    return <Loader />;
  }
  if (id && !course) {
    return <NotFoundData data={"Course not found or unavailable"} />;
  }
  if (countries && countries.length === 0) {
    return <NotFoundData data={"No countries found"} />;
  }

  return (
    <Layout>
      <div className="my-0 md:my-6 max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <div className="mb-8">
          <h4 className="text-3xl font-bold text-gray-800 mb-2">
            Student Registration
          </h4>
          <p className="text-gray-600">Please fill out all required fields</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {course && (
            <FormSection
              icon={GraduationCap}
              title="Course Information"
              color="text-purple-600"
            >
              <div className="bg-white rounded-2xl border p-6 hover:shadow-md transition border-gray-300 shadow">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="w-full sm:w-1/3">
                    <img
                      src={
                        course.image
                          ? `${imageUrl}${API_URLS.COURSE}/${course.image}`
                          : "/images/a1.jpeg"
                      }
                      alt="Course"
                      className="w-full h-48 sm:h-full object-cover rounded-xl border"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-2xl text-gray-800">
                        {course.name}
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 gap-4 mt-4 text-sm">
                      <div className="bg-gray-50 p-3 rounded-xl border text-gray-700 border-gray-300 shadow">
                        <span className="block text-xs text-gray-500">
                          Level
                        </span>
                        <span className="font-semibold">
                          {course.level || "N/A"}
                        </span>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-xl border text-gray-700 border-gray-300 shadow">
                        <span className="block text-xs text-gray-500">
                          Price
                        </span>
                        <span className="font-semibold">
                          {course.price?.toLocaleString() || "N/A"} MMK
                        </span>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-xl border text-gray-700 border-gray-300 shadow">
                        <span className="block text-xs text-gray-500">
                          Duration
                        </span>
                        <span className="font-semibold">
                          {course.duration || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FormSection>
          )}

          <FormSection
            icon={User}
            title="Student Information"
            color="text-blue-600"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField
                name="name"
                control={control}
                label="Student Name"
                error={errors.name}
                required
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
              <div className="md:col-span-3">
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
              <FormField
                name="studentImage"
                control={control}
                label="Student Photo"
                type="file"
                error={errors.studentImage}
                required
              />
            </div>
          </FormSection>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  <FormField
                    name="joinRaffles"
                    control={control}
                    label="Whould you like to join Raffles University?"
                    type="select"
                    options={joinRafflesOptions}
                  />
                </div>
              )}
            </div>
          </FormSection>
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
                type="radio"
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
              {/* Add Bank Field */}
              <FormField
                name="bank"
                control={control}
                label="Bank Name"
                placeholder="Enter your bank name"
                error={errors.bank}
              />
              {/* Add Message Field */}
              <FormField
                name="message"
                control={control}
                label="Message"
                type="textarea"
                placeholder="Any additional info"
                error={errors.message}
              />
            </div>
          </FormSection>
          <div className="text-center space-y-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 rounded-md font-medium text-black transition-all flex items-center mx-auto space-x-2 
                   bg-new-vision-yellow hover:opacity:70 cursor-pointer"
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
