// types.js - Type definitions and constants for the student registration form

// School Types
export const schoolTypes = [
  { value: "NOTHING", label: "Please select school type" },
  { value: "GOVERNMENT", label: "Government School" },
  { value: "INTERNATIONAL", label: "International School" },
  { value: "BOTH", label: "Both Government & International" },
];

// Payment Options
export const paymentOptions = [
  { value: undefined, label: "Select payment method" },
  { value: "CASH", label: "Cash Payment" },
  { value: "BANK_TRANSFER", label: "Bank Transfer" },
];

// Payment Status Options
export const paymentStatusOptions = [
  { value: "NONE", label: "No Payment" },
  { value: "PENDING", label: "Payment Pending" },
  { value: "COMPLETED", label: "Payment Completed" },
  { value: "FAILED", label: "Payment Failed" },
];

// Join Raffles Options
export const joinRafflesOptions = [
  { value: "MAYBE", label: "Maybe" },
  { value: "YES", label: "Yes, I'm interested" },
  { value: "NO", label: "No, not interested" },
];

// Form validation constants
export const VALIDATION_CONSTANTS = {
  MIN_AGE: 5,
  MAX_AGE: 100,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 100,
  MIN_ADDRESS_LENGTH: 10,
  MAX_ADDRESS_LENGTH: 500,
  MAX_FUTURE_PLAN_LENGTH: 1000,
  MAX_UNIVERSITY_NAME_LENGTH: 200,
  MIN_TRANSACTION_ID_LENGTH: 5,
  MAX_TRANSACTION_ID_LENGTH: 100,
  MAX_COURSES_SELECTION: 5,
  PHONE_MIN_LENGTH: 10,
  PHONE_MAX_LENGTH: 15,
};

// Error messages
export const ERROR_MESSAGES = {
  REQUIRED: (field) => `${field} is required`,
  INVALID_EMAIL: "Please enter a valid email address",
  INVALID_PHONE: "Please enter a valid phone number",
  INVALID_DATE: "Please enter a valid date",
  INVALID_FILE_TYPE: "Please select a valid image file",
  FILE_TOO_LARGE: `File size should be less than ${VALIDATION_CONSTANTS.MAX_FILE_SIZE / 1024 / 1024}MB`,
  FUTURE_DATE_REQUIRED: "Date cannot be in the past",
  INVALID_AGE: `Age must be between ${VALIDATION_CONSTANTS.MIN_AGE} and ${VALIDATION_CONSTANTS.MAX_AGE} years`,
  NETWORK_ERROR: "Network error. Please check your connection and try again",
  SERVER_ERROR: "Server error. Please try again later",
  VALIDATION_ERROR: "Please check your input and try again",
};

// API endpoints
export const API_ENDPOINTS = {
  REGISTER_STUDENT: "/api/students/register",
  GET_COUNTRIES: "/api/countries",
  GET_COURSE: (id) => `/api/courses/${id}`,
  UPLOAD_IMAGE: "/api/upload/student-image",
};

// Form sections configuration
export const FORM_SECTIONS = [
  {
    id: "student-info",
    title: "Student Information",
    icon: "User",
    color: "text-blue-600",
    fields: [
      "name", "parentName", "parentJob", "dob", 
      "email", "phone", "address", "postalCode", 
      "school", "studentImage"
    ]
  },
  {
    id: "future-plans", 
    title: "Future Educational Plans",
    icon: "Globe",
    color: "text-green-600",
    fields: [
      "studyAbroad", "futurePlan", "futureCountryId",
      "futureCountryName", "futureuniversityName", 
      "potentialYearOfStudy", "joinRaffles"
    ]
  },
  {
    id: "course-info",
    title: "Course Information", 
    icon: "GraduationCap",
    color: "text-purple-600",
    fields: ["courseIds"]
  },
  {
    id: "payment-info",
    title: "Payment Information",
    icon: "CreditCard", 
    color: "text-orange-600",
    fields: ["paymentOption", "transactionId"]
  }
];
