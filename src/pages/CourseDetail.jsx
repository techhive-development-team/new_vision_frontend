import React from "react";
import Layout from "../components/common/Layout";
import { Calendar, CircleDollarSign, Clock } from "lucide-react";

const CourseDetail = () => {
  return (
    <Layout>
      <div>
        <div className="relative lg:h-auto bg-[url('/images/a1.jpeg')] bg-cover bg-center text-white">
          <div className="absolute inset-0 bg-black opacity-70 z-0"></div>

          <div className="relative z-10 flex  md:flex-col lg:flex-row  xl:flex-row 2xl:flex-row justify-center items-center">
            <div className="lg:px-6 xl:px-2 2xl:px-6 pb-14">
              <div className="flex-row justify-center md:flex-row lg:flex-col pt-20 lg:pl-5 xl:pt-10 2xl:pt-20 ">
                <h1 className="text-2xl text-yellow-300 font-bold lg:text-2xl xl:text-2xl 2xl:text-4xl text-center  md:text-center md:text-4xl 2xl:pt-20 ">
                  Art & Design Program
                </h1>

                <div className="flex flex-col lg:flex-row m-12 p-4 lg:space-between  lg:p-6 lg:m-10 bg-black opacity-70 border rounded-xl">
                  <div className="flex-col space-y-6 pb-6  lg:mx-6 lg:px-4 border-b md:border-b lg:border-r lg:border-b-0  2xl:border-r border-white text-sm md:text-3xl lg:text-xl lg:space-x-12">
                    <div className="flex flex-row space-x-6 pt-6">
                      <Clock className="w-6 h-6" />
                      <p>Duration</p>
                    </div>

                    <p>1 Year</p>
                  </div>
                  <div className="flex-col space-y-6 pb-6  lg:mx-6 lg:px-4 border-b md:border-b lg:border-r lg:border-b-0  border-white text-sm md:text-3xl lg:text-xl lg:space-x-12">
                    <div className="flex flex-row space-x-6 pt-6">
                      <CircleDollarSign className="w-6 h-6" />
                      <p>Fees</p>
                    </div>

                    <p>Fees will be announced on each in take</p>
                  </div>

                  <div className="flex-col space-y-6 pb-6  lg:mx-6 lg:px-4  border-white text-sm md:text-3xl lg:text-xl lg:space-x-12">
                    <div className="flex flex-row space-x-6 pt-6">
                      <Calendar className="w-6 h-6" />
                      <h2>Application Deadline</h2>
                    </div>

                    <p>20th December 2025</p>
                  </div>
                </div>
                <div className="p-3 mx-12 lg:ml-10 lg:mb-8 text-center bg-new-vision-yellow border items-center rounded-xl">
                  <button className="text-black text-md text-center">
                    Check My Level
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="px-10 py-6 bg-white">
          <h3 className="text-2xl md:text-2xl lg:text-2xl lg:font-medium text-bold py-2">
            PROGRAM OVERVIEW
          </h3>
          <div>
            <p className="text-base md:text-xl lg:text-lg">
              If you’re planning to study Architecture abroad with a
              scholarship, it's essential to prepare a strong and complete
              portfolio. To support that goal, New Vision Art & Science
              Institute has launched new Architecture classNamees designed to
              help you build a comprehensive portfolio. You can choose to attend
              the classNamees as Campus (in-person), Online, or Offline
              sessions, and there’s also an option to pay the course fees in
              installments. Since className sizes are limited, we highly
              encourage you to register as soon as possible to secure your spot.
            </p>
            <p className="text-base  md:text-xl lg:text-lg py-2">
              These classNamees are ideal for anyone who wants to study
              Architecture systematically from the basics. You’ll start by
              learning the fundamentals—Point, Line, Shape, and Form—which are
              essential in architectural design. Got plenty of design ideas but
              struggling with the drawing side? No worries—if you feel you’re
              lacking in sketching skills, we’ll guide you step-by-step through
              the fundamentals of sketching, so you can build up your
              confidence. To help you prepare a portfolio that's crucial for
              applying to foreign universities, we’ll also teach you
              step-by-step architectural modeling techniques that you can
              execute yourself. This is a className you definitely don’t want to
              miss!
            </p>
          </div>

          <div className="py-8">
            <h3 className="font-medium text-2xl md:text-2xl lg:text-2xl text-bold">
              SKILL DEVELOPMENT
            </h3>
            <ul className="list-disc p-4 text-base  md:text-xl lg:text-lg">
              <li>Basic Art</li>
              <li>Sketching skills</li>
              <li>Color Theory</li>
              <li>Texture and Pattern</li>
              <li>Linear Perspective</li>
              <li>Curvilinear Perspective</li>
              <li>Perspective in Meterials</li>
              <li>Interior Design</li>
              <li>Exterior Design</li>
            </ul>
          </div>

          <div className="py-2">
            <h3 className="font-medium text-2xl md:text-2xl lg:text-2xl text-bold pb-2">
              ARCHITECTURE CLASSNameES
            </h3>
            <ul className="list-disc p-4 text-base  md:text-xl lg:text-lg">
              <li>Architecture ClassName Level 1 (Beginner)</li>
              <li>Architecture ClassName Level 2 (Intermediate)</li>
              <li>Architecture ClassName Level 3 (Advanced)</li>
              <li>Model Building</li>
              <li>Sketchup</li>
              <li>AutoCAD</li>
              <li>Architectural Paintings</li>
            </ul>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default CourseDetail;
