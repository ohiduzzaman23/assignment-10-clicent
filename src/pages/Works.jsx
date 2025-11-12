import React from "react";
import { motion } from "framer-motion";
import postImage from "/post-food.png";
import findImage from "/find-food.png";
import collectImage from "/collect-food.png";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const Works = () => {
  const cards = [
    {
      img: postImage,
      title: "Post Food",
      desc: "Share details about excess food you have available for donation",
    },
    {
      img: findImage,
      title: "Find Food",
      desc: "Browse available food donations shared by others in your area",
    },
    {
      img: collectImage,
      title: "Collect Food",
      desc: "Pick up or coordinate delivery to reduce waste and help others",
    },
  ];

  return (
    <div className="bg-[#E2F1E2] py-16">
      <div className="w-11/12 mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10">How It Works</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              className="text-center tracking-wide"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
            >
              <img
                src={card.img}
                alt=""
                className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-[#F8F6F2] p-4 mx-auto shadow-md"
              />
              <h2 className="text-xl font-semibold py-3">{card.title}</h2>
              <p className="text-gray-600">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Works;
