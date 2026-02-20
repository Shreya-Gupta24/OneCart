import React from 'react'
import Nav from '../components/Nav.jsx'
import { useState, useEffect } from 'react'
import Background from '../components/Background.jsx'
import Hero from '../components/Hero.jsx'
import Product from './Product.jsx'
import OurPolicy from '../components/OurPolicy.jsx'
import NewLetterBox from '../components/NewLetterBox.jsx'
import Footer from '../components/Footer.jsx'

const Home = () => {
  let heroData=[
      {text1:"30% OFF Limited Offer",text2:"Style that"},
      {text1:"Discover the Best of Bold Fashion",text2:"Limited Time Only!"},
      {text1:"Explore Our Best Collection ",text2:"Shop Now!"},
      {text1:"Choose your Perfect Fasion Fit",text2:"Now on Sale!"}
    ]
    
    let [heroCount,setHeroCount] = useState(0)
    useEffect(()=>{
        let interval = setInterval(()=>{
          setHeroCount(prevCount => (prevCount === 3 ? 0 : prevCount + 1));
        },3000);
        return () => clearInterval(interval)
      },[])
      
  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] overflow-x-hidden relative'>
        <Nav/>
        <div className=' w-[100vw]  lg:h-[100vh] md:h-[50vh] sm:h-[30vh]   bg-gradient-to-l from-[#141414] to-[#0c2025] pt-[50px]'>
        
              <Background heroCount={heroCount}/>
              <Hero
              heroCount={heroCount}
              setHeroCount={setHeroCount}
              heroData={heroData[heroCount]}
              />
        </div>
        <Product/>
        <OurPolicy/>
        <NewLetterBox/>
        <Footer/>
    </div>
  )
}

export default Home