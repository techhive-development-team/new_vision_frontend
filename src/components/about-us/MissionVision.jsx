import React from "react";
import { motion } from "framer-motion";
import missionVisionImage from "../../../public/images/art1.jpeg";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const MissionVision = () => {
  return (
    <div className="container mx-auto">
      <motion.div
        className="grid lg:grid-cols-2 gap-3 lg:gap-10 items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        variants={sectionVariants}
      >
        <div className="p-8">
          <h3 className="text-2xl font-semibold text-black dark:text-white mb-6">
            Our Unique Edge
          </h3>
          <p className="text-black dark:text-white text-base leading-relaxed">
            New Vision Art & Science Institute is a forward-thinking educational
            institute in Myanmar, dedicated to blending creative arts and
            applied sciences to prepare students for global success. Our mission
            is to deliver high-quality, internationally aligned education that
            inspires innovation and empowers young minds to thrive in a rapidly
            changing world. We offer a diverse range of courses, including Fine
            Art, Architectural Drawing, Portfolio Preparation (for Art,
            Architecture, Fashion, and Graphic Design), Modeling for
            Architecture, Fashion Design, Child Art, as well as Foundations of
            Computer Science, SQL, and Python Programming. Our signature
            Portfolio Preparation Program helps students create competitive
            portfolios for top universities worldwide. With over 80% of our
            students receiving admission offers, many with scholarships, we are
            proud to be a trusted bridge to international education. At New
            Vision, we believe in nurturing creativity, encouraging innovation,
            and making a lasting impact through education. Inspiration.
            Innovation. Impact.
          </p>
        </div>
        <div className="p-8">
          <img
            src={missionVisionImage}
            className="rounded-3xl h-auto w-full flex items-center justify-center hover:scale-110 transition"
          />
        </div>
      </motion.div>
      <motion.div
        className="grid lg:grid-cols-2 gap-3 lg:gap-16 items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        variants={sectionVariants}
      >
        <div className="p-8">
          <img
            src={missionVisionImage}
            className="rounded-3xl h-auto w-full flex items-center justify-center hover:scale-110 transition"
          />
        </div> 
        <div className="p-8">
          <h3 className="text-2xl font-semibold text-black dark:text-white mb-6">
            Our Mission
          </h3>
          <p className="text-black dark:text-white text-base leading-relaxed">
            At New Vision Art & Science Institute, our mission is to provide
            personalized, world-class education in the creative arts, empowering
            students to achieve their academic and professional dreams. Through
            our Portfolio Preparation for Top Universities course, we are
            dedicated to nurturing artistic talent, fostering creative thinking,
            and guiding students to develop exceptional portfolios that meet the
            standards of leading universities worldwide. By combining
            individualized mentorship with a structured and supportive
            environment, we ensure each student is equipped with the skills,
            knowledge, and confidence necessary for success in a competitive
            global landscape.
          </p>
        </div>
      </motion.div>
      <motion.div
        className="grid lg:grid-cols-2 gap-3 lg:gap-16 items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        variants={sectionVariants}
      >
        <div className="p-8">
          <h3 className="text-2xl font-semibold text-black dark:text-white mb-6 ">
            Our Vision
          </h3>
          <p className="text-black dark:text-white text-base leading-relaxed">
            Our vision is to redefine creative education in Myanmar by equipping
            students with the skills, confidence, and global mindset needed to
            thrive in the fields of art, design, architecture, and applied
            sciences. We strive to become a leading institute that bridges local
            talent with international opportunities, fostering a new generation
            of innovative thinkers and creative leaders. We envision a future
            where our students contribute to the global creative community with
            originality, excellence, and purpose.
          </p>
        </div>
        <div className="p-8">
          <img
            src={missionVisionImage}
            className="rounded-3xl h-auto w-full flex items-center justify-center hover:scale-110 transition"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default MissionVision;
