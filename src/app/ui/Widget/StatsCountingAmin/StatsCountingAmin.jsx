'use client'

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Counter = ({ from = 0, to }) => {
      const controls = useAnimation();
      const [ref, inView] = useInView({ triggerOnce: false });
      const [count, setCount] = useState(from);
      const [hasAnimated, setHasAnimated] = useState(false);

      useEffect(() => {
            if (inView) {
                  controls.start({ count: to }).then(() => {
                        setHasAnimated(true);
                  });
            } else if (hasAnimated) {
                  controls.set({ count: from });
                  setCount(from); // Reset count when out of view
                  setHasAnimated(false);
            }
      }, [controls, inView, from, to, hasAnimated]);

      return (
            <motion.div
                  ref={ref}
                  initial={{ count: from }}
                  animate={controls}
                  transition={{ duration: 20, ease: "easeInOut" }}
                  onUpdate={(latest) => setCount(Math.round(latest.count))}
                  className="text-6xl font-bold text-neutral-500"
            >
                  {count}
            </motion.div>
      );
};

export default Counter;
