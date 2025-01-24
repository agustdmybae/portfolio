'use client'
import Picture4 from '../public/images/notion-portrait.png'
import Work1 from '../public/images/recipe.png'
import Work3 from '../public/images/work2.png'
import Work2 from '../public/images/diaita.png'
import Work4 from '../public/images/bunchful.png'
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
    title: "Bunchful Post",
    description: "A Streamlit app built for the company Bunchful for content management over platforms such as Medium and Facebook. It supports features including content generation, image suggestion, and automated posting.",
    time: "Aug 2024",
    linkDescription: "Project on Github",
    skills: ["Python, Streamlit, Gemini API"],
    src: Work4,
    url: "https://github.com/Bunchful-2024/bunchful-post-frontend",
    color: "#DEDEDE"
  },
  {
    title: "Recipe Generator",
    description: "A React web application powered by OpenAI API to generate recipes. Users can select their ingredients and create customized recipes with ease.",
    time: "Jan 2024",
    linkDescription: "Project on Github",
    skills: ["React, Node.js, MongoDB"],
    src: Work1,
    url: "https://github.com/VT-SE-Fall2023/groupx-recipe-frontend",
    color: "#C9CAC9"
  },
  {
    title: "Diaita",
    description: "Diaita aids users in preventing type 2 diabetes through cognitive behavioral therapy. Implemented the user interface for the mobile app, which provides personalized diet and activity plans.",
    time: "July 2023",
    linkDescription: "Diaita Website",
    skills: ["Flutter"],
    src: Work2,
    url: "https://diaita.github.io",
    color: "#B5B5B5"
  },
  {
    title: "Noisserpmi",
    description: "Noisserpmi is my work for the graduation exhibition. This artwork consists of interactive websites built with p5.js. Data from accelerometers on mobile devices and Arduino sensors are collected to trigger animated elements.",
    time: "May 2023",
    linkDescription: "Null",
    skills: ["JavaScript, Node.js, p5.js"],
    src: Work3,
    url: "https://www.ignant.com/2023/10/28/capturing-balis-many-faces-zissou-documents-the-sacred-and-the-mundane-of-a-fragile-island/",
    color: "#A0A1A0"
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
        <div className='h-[50vh] w-[70vw] flex flex-row gap-20 items-center justify-center text-left pb-80 mx-auto pt-40'>
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
      <div className='flex flex-col items-center gap-5 pb-[15vh]'>
        <a className=' h-[10vh] text-3xl font-mono font-bold'>▚ Contact</a>
        <div>
          <a className='text-xl'>find me here__stephchen55@gmail.com</a>
        </div>
      </div>
      <div className='flex h-[5vh] bg-[#DEDEDE] justify-center items-center mx-auto'>
        <a className='text-sm font-mono'>2025. Personal Website designed by Stephanie Chen</a>
      </div>
    </main>
  );
}