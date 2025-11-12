import React from "react";
import { motion } from "framer-motion";

const stats = [
  { number: "10K+", label: "Meals Shared", color: "text-orange-500" },
  { number: "5K+", label: "Community Members", color: "text-green-500" },
  { number: "50+", label: "Cities Served", color: "text-yellow-500" },
];

const Mission = () => {
  return (
    <section className="bg-[#F9F7F4] py-20 px-6 text-center">
      <div className="w-11/12 mx-auto mx-auto px-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-6 text-gray-900"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          Our Mission
        </motion.h2>

        <motion.p
          className="text-gray-600 text-base md:text-lg leading-relaxed mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          PlateShare is dedicated to building stronger communities by connecting
          people through food sharing. We believe that no food should go to
          waste when there are people who need it. Our platform makes it easy
          for individuals and organizations to share excess food with those in
          need, creating a more sustainable and compassionate world.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-20">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              <span className={`text-3xl md:text-4xl font-bold ${item.color}`}>
                {item.number}
              </span>
              <span className="text-gray-700 mt-2 font-medium">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;
