import React, {useRef} from 'react'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import state from '../store'

const CameraRig = ({ children }) => {
    const group = useRef();
    const snap = useSnapshot(state);
  
    useFrame((state, delta) => {
      const isBreakpoint = window.innerWidth > 1024;
      const isMobile = window.innerWidth <= 600;
      const isTablet = window.innerWidth > 600 && window.innerWidth <= 1024;
  
      // Initialize target position based on conditions
      let targetPosition = [-0.4, 0, 2];
  
      if (snap.intro) {
        if (isBreakpoint) targetPosition = [-0.4, 0, 2];
        if (isMobile) targetPosition = [0, 0.15, 2.5];
        if (isTablet) targetPosition = [0, -0.009, 2.5];
      } else {
        if (isMobile) targetPosition = [0, 0.2, 2.5];
        else if (isBreakpoint) targetPosition = [0, 0, 2];
        else if (isTablet) targetPosition = [0, -0.009, 2.5];
      }
  
      // Set model camera position
      easing.damp3(state.camera.position, targetPosition, 0.25, delta);
  
      // Set the model rotation
      easing.dampE(
        group.current.rotation,
        [state.pointer.y / 10, -state.pointer.x / 5, 0],
        0.25,
        delta
      );
    });
  
    return <group ref={group}>{children}</group>;
  };
  

export default CameraRig;