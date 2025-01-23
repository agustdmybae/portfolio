'use client'
import Picture1 from '../public/vercel.svg'
import Picture2 from '../public/vercel.svg'
import Picture3 from '../public/vercel.svg'
import Picture4 from '../public/images/about-profile.png'
import Work1 from '../public/images/recipe.png'
import Work3 from '../public/images/work2.png'
import Work2 from '../public/images/diaita.png'
import Lenis from 'lenis';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { StaticImageData } from 'next/image';
import { motion, useTransform, useScroll, MotionValue } from "framer-motion"
import Card from '../components/card/page';

interface SlideProps {
  left: string;
  src: StaticImageData;
  direction: 'left' | 'right';
  progress: MotionValue<number>;
}

const projects = [
  {
    title: "Recipe Generator",
    description: "A React web application powered by OpenAI API to generate recipes. Users can select their ingredients and create customized recipes with ease.",
    src: Work1,
    url: "https://github.com/VT-SE-Fall2023/groupx-recipe-frontend",
    color: "#BBACAF"
  },
  {
    title: "Diaita",
    description: "Diaita aids users in preventing type 2 diabetes through cognitive behavioral therapy. Implemented the user interface for the mobile app, which provides personalized diet and activity plans.",
    src: Work2,
    url: "https://diaita.github.io",
    color: "#977F6D"
  },
  {
    title: "Noisserpmi",
    description: "Noisserpmi is my work for the graduation exhibition. This artwork consists of interactive websites built with p5.js. Data from accelerometers on mobile devices and Arduino sensors are collected to trigger animated elements.",
    src: Work3,
    url: "https://www.ignant.com/2023/10/28/capturing-balis-many-faces-zissou-documents-the-sacred-and-the-mundane-of-a-fragile-island/",
    color: "#C2491D"
  }
]

const Slide = (props: SlideProps) => {
  const direction = props.direction == 'left' ? -1 : 1;
  const translateX = useTransform(props.progress, [0, 1], [150 * direction, -150 * direction])

  return (
    <motion.div style={{x: translateX, left: props.left}} className="relative flex whitespace-nowrap">
      <Phrase src={props.src}/>
      <Phrase src={props.src}/>
      <Phrase src={props.src}/>
    </motion.div>
  )
}
  
const Phrase = ({src}: { src: StaticImageData }) => {
  return (
    <div className={'px-5 flex gap-5 items-center'}>
    <p className='text-[7.5vw]'>stef uh nee</p>
    <span className="relative h-[7.5vw] aspect-[4/2] rounded-full overflow-hidden">
        <Image style={{objectFit: "cover"}} src={src} alt="image" fill/>
    </span>
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
        <div className='h-[10vh]'/>
        <div ref={container}>
          <Slide left="0" src={Picture2} direction={'right'} progress={scrollYProgress}/>
          <Slide left="0" src={Picture1} direction={'left'} progress={scrollYProgress}/>
          <Slide left="0" src={Picture2} direction={'right'} progress={scrollYProgress}/>
          <Slide left="0" src={Picture3} direction={'left'} progress={scrollYProgress}/>
        </div>
        <div className='h-[50vh]' />
      </div>
      <div className='h-[10vh] w-[70vw] flex flex-row gap-20 items-center justify-center text-left pb-56 mx-auto'>
        <a className='text-2xl'>
          Stephanie is a Full-stack Developer with a passion for building digital products that impact the world. 
          <br />
          <br />
          In love with art and design, she enjoys creating clean and appealing interfaces. 
          She is also interested in Big Data, hoping to leverage data information to build insightful applications. 
          <br />
          <br />
          Stephanie enjoys music, dance, and exhibitions in her free time.
        </a>
        <Image width={1000} height={1000} src={Picture4} alt="image"/>
      </div>
      <div className="mt-50 mb-50">
        {
          projects.map( (project, i) => {
            return <Card key={`p_${i}`} {...project} i={i}/>
          })
        }
      </div>
    </main>
  );
}