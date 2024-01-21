"use client";
import { useEffect, useRef, useState } from "react";
import ParticleCanvas from "./Particle";
import { useTransform, useScroll, motion } from "framer-motion";

export default function Home() {
  const container1 = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container1,
    offset: ["start end", "end start"],
  });

  const container2 = useRef(null);
  const { scrollYProgress: scrollYProgress2 } = useScroll({
    target: container2, // Updated the target ref
    offset: ["start end", "end end"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const x = useTransform(scrollYProgress2, [0, 1], [0, 100]);
  const y = useTransform(scrollYProgress2, [0, 1], [-500, 0]);
  const height = useTransform(scrollYProgress, [0, 0.9], [30, 0]);
  const rotate = useTransform(scrollYProgress2, [0, 1], [120, 90]);
  return (
    <main ref={container1}>
      <div className="hero">
        <div className="absolute top-0 left-0 w-full h-20 bg-white z-[100] flex items-center justify-center">
          <h2 className="h-fit text-3xl">welcome</h2>
        </div>
        <ParticleCanvas />
        <div className="relative heroTxt">
          <header>
            <h1>Joel K George</h1>
          </header>
          <p>
            Full Stack Dev
            <br />
            ML Enthusiast
          </p>
        </div>
      </div>
      {/* <div className="morph flex items-center justify-center">
        <CircleSvg />
      </div> */}
      <motion.div style={{ height }} className="circleContainer">
        <div className="circle"></div>
      </motion.div>
      <motion.div style={{ y }} ref={container2} className="contact">
        <div className="title">
          <h2 className="text-white text-6xl text-center font-semibold flex">
            <img
              src="https://media.licdn.com/dms/image/D5603AQFCgtVBElsbGQ/profile-displayphoto-shrink_800_800/0/1700056565326?e=1711584000&v=beta&t=YaV8nnNMApv1t8sJMJjlP3PCd4HiRP5KgOppFRbtbZQ"
              alt="Joel K George's Photo"
              className="w-16 h-16 rounded-full"
            />
            Let's Connect
          </h2>
          <motion.div style={{ x }} className="buttonContainer">
            <button className="button">Contact Me</button>
          </motion.div>
          <motion.svg
            style={{ rotate, scale: 2 }}
            width="9"
            height="9"
            className="contactSvg"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
              fill="white"
            />
          </motion.svg>
        </div>
        <div className="info">
          <a href="mailto:joelk9895@gmail.com" className="mail">
            joelk9895@gmail.com
          </a>
          <a href="tel:+919895473464" className="mail">
            9895473464
          </a>
        </div>
      </motion.div>
    </main>
  );
}
