import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion"; 
import { Link } from "react-router-dom";
import { useState } from "react";

export const HoverEffect = ({ items, className }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 py-10", className)}>
      {items.map((item, idx) => (
        <Link
          to={item?.link}
          key={item?.link}
          className="relative block group rounded-2xl overflow-hidden"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.div
                className="absolute inset-0 bg-white/10 dark:bg-white/5 z-0 rounded-2xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.3 } }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              />
            )}
          </AnimatePresence>

          <motion.div
            className="relative transition-transform duration-300 ease-in-out group-hover:scale-[1.03]"
          >
            <div className="w-full h-[200px] overflow-hidden px-4 pt-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="text-center m-4 ">
              <h4 className="text-white font-semibold text-lg">{item.title}</h4>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
};
