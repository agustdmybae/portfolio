'use client'
import Picture1 from '../public/vercel.svg'
import Picture2 from '../public/vercel.svg'
import Picture3 from '../public/vercel.svg'
import Lenis from 'lenis';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { StaticImageData } from 'next/image';
import { motion, useTransform, useScroll, MotionValue } from "framer-motion"

interface SlideProps {
  left: string;
  src: StaticImageData;
  direction: 'left' | 'right';
  progress: MotionValue<number>;
}

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
      <div className='h-[10vh] w-[50vw] flex items-center justify-center text-center mx-auto pb-56'>
        <a className='text-2xl'>
          Stephanie is a Computer Science grad student at New York University. specializing in fullstack development. My passion lies in building digital products that bring meaningful impacts to the world. 
          <br />
          <br />
          In addition to my love in technology and design,  I also enjoy music, dance, and exhibitions.
        </a>
      </div>
    </main>
  );
}