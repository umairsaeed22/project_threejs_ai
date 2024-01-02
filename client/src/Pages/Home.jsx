import React from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import {useSnapshot} from 'valtio'
import state from '../store'

import {
headContainerAnimation,
headTextAnimation,
slideAnimation,
headContentAnimation
} from '../config/motion'

import { CustomButton } from '../Components'

const Home = () => {
const snap = useSnapshot(state);
return (
<AnimatePresence>
  {snap.intro && (
    <motion.div className='home' {...slideAnimation('left')}>
      <motion.header {...slideAnimation('down')}>
        <img  
        src= "./threejs.png"
        alt= "logo"
        className='w-9 h-8 object-contain'
        />
      </motion.header>

      <motion.div className='home-content' {...headContainerAnimation}>
        <h1 className='head-text mt-0'>
          LET'S <br className='x;"block hidden'/> DO IT.
        </h1>
      </motion.div>

      <motion.div className='flex flex-col gap-5 mt-neg-20' {...headContainerAnimation}>
        <p className='max-w-md font-normal text-gray-600 text-base'>
          Create your unique and exclusive shirt with our brand-new 3D customization too.
          <strong className='x;"block hidden'> Unleash your imagination. </strong> {" "}
          and define your own style.
        </p>
        <CustomButton
          type= "filled"
          title= "Customize it"
          handleClick = {() => {state.intro = false}}
          customStyles = 'w-fit px-4 py-2.5 f-bold text-sm'
        />
      </motion.div>
    </motion.div>

  )}
</AnimatePresence>
)
}

export default Home