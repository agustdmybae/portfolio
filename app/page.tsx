'use client'
import Picture4 from '../public/images/notion-portrait.png'
import Work1 from '../public/images/recipe.png'
import Work3 from '../public/images/work2.png'
import Work2 from '../public/images/diaita.png'
import Lenis from 'lenis';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { motion, useTransform, useScroll, MotionValue } from "framer-motion"
import Card from '../components/card/page';

interface SlideProps {
  left: number;
  word: string;
  direction: 'left' | 'right';
  progress: MotionValue<number>;
}

const projects = [
  {
    title: "Recipe Generator",
    description: "A React web application powered by OpenAI API to generate recipes. Users can select their ingredients and create customized recipes with ease.",
    time: "Jan 2024",
    skills: ["React, Node.js, MongoDB"],
    src: Work1,
    url: "https://github.com/VT-SE-Fall2023/groupx-recipe-frontend",
    color: "#DEDEDE"
  },
  {
    title: "Diaita",
    description: "Diaita aids users in preventing type 2 diabetes through cognitive behavioral therapy. Implemented the user interface for the mobile app, which provides personalized diet and activity plans.",
    time: "July 2023",
    skills: ["Flutter"],
    src: Work2,
    url: "https://diaita.github.io",
    color: "#C9CAC9"
  },
  {
    title: "Noisserpmi",
    description: "Noisserpmi is my work for the graduation exhibition. This artwork consists of interactive websites built with p5.js. Data from accelerometers on mobile devices and Arduino sensors are collected to trigger animated elements.",
    time: "May 2023",
    skills: ["JavaScript, Node.js, p5.js"],
    src: Work3,
    url: "https://www.ignant.com/2023/10/28/capturing-balis-many-faces-zissou-documents-the-sacred-and-the-mundane-of-a-fragile-island/",
    color: "#B5B5B5"
  }
]

const Slide = (props: SlideProps) => {
  const direction = props.direction == 'left' ? -1 : 1;
  const translateX = useTransform(props.progress, [0, 1], [150 * direction, -150 * direction])

  return (
    <motion.div style={{x: translateX, left: props.left}} className="relative flex whitespace-nowrap">
      <Phrase word={props.word}/>
      <Phrase word={props.word}/>
      <Phrase word={props.word}/>
    </motion.div>
  )
}
  
const Phrase = ({word}: { word: string }) => {
  return (
    <div className={'px-5 flex gap-6 items-center'}>
    <p className='text-[5.5vw]'>{word}</p>
    </div>
  )
}

export default function Home() {

  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start']
  })

  useEffect( () => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  return (
    <main>
      <div  className='overflow-hidden'>
        <div className='h-[15vh] bg-[#DEDEDE]'/>
        <div ref={container} className='bg-[#DEDEDE] h-[70vh] font-mono'>
          <Slide left={10} word="stef-uh-nee ▘" direction={'right'} progress={scrollYProgress}/>
          <Slide left={-50} word="welcome to my world ▚ " direction={'left'} progress={scrollYProgress}/>
          <Slide left={-20} word="stef-uh-nee ▟" direction={'right'} progress={scrollYProgress}/>
          <Slide left={-120} word="welcome to my world ▗" direction={'left'} progress={scrollYProgress}/>
        </div>
        <div className='h-[15vh] bg-[#DEDEDE]'/>
        <div className='h-[20vh]' />
      </div>
      <div className='flex flex-col items-center gap-5 pb-10'>
        <a className='h-[10vh] text-3xl font-mono font-bold'>▚ About Me</a>
        <div className='h-[50vh] w-[70vw] flex flex-row gap-20 items-center justify-center text-left pb-80 mx-auto pt-32'>
          <a className='text-2xl'>
            Stephanie is a Full-stack Developer with 2 years of experience in web development. She is passionate about interactive web design, combining technical skills with creativity to develop engaging user experiences.
            <br />
            <br />
            Stephanie is currently a Computer Science grad student at New York University. She focuses her studies on Big Data, hoping to leverage data to build insightful applications. 
            <br />
            <br />
            In her free time, she enjoys music, dance, and coffee.
          </a>
          <div className='w-[60vw] border-4 border-solid border-black'>
            <Image src={Picture4} alt="image"/>
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <a className='h-[1vh] text-3xl font-mono font-bold'>▚ Selected Projects</a>
          <div className="mb-20">
            {
              projects.map( (project, i) => {
                return <Card key={`p_${i}`} {...project} i={i}/>
              })
            }
          </div>
        </div>
    </main>
  );
}