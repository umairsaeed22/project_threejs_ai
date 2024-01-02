import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Center, OrbitControls } from '@react-three/drei'
import Shirt from './Shirt'
import Backdrop from './Backdrop'
import CameraRig from './CameraRig'

const CanvasModal = () => {
  return (
    
      <Canvas 
        shadows
        position= {[0, 0, 0 ]}
        camera={{position: [0, 0, 0] , fov: 25}}
        gl= {{preserveDrawingBuffer: true}}
        className='w-full max-w-full h-fill transition-all ease-in'
    > 
        <ambientLight intensity={1} />
        
        <Environment preset='city' />
        <CameraRig>
        <Backdrop/>
          <Center>
            <Shirt />
          </Center>
        </CameraRig>
      </Canvas>

  )
}

export default CanvasModal