  import React, { useEffect, useState } from 'react'
  import { AnimatePresence, motion } from 'framer-motion'
  import { useSnapshot } from 'valtio'
  import config from '../config/config';
  import state from '../store'
  import { download, swatch } from '../assets'
  import { downloadCanvasToImage, reader } from '../config/helpers'
  import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants'
  import { fadeAnimation, slideAnimation } from '../config/motion'
  import { AIPicker, CustomButton, Tab, FilePicker, ColorPicker } from '../Components';


  const Customiser = () => {
  const snap = useSnapshot(state);
  const [file, setFile] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generatingImg, setgeneratingImg] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setAtiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })

  //show tab content depending upon active tab
  const generateTabContent = () => {
    switch (activeEditorTab){
      case "colorpicker":
        return <ColorPicker />

      case "filepicker":
        return <FilePicker 
              file= {file}
              setFile= {setFile}
              readFile = {readFile}
        />

       case "aipicker":
        return <AIPicker 
              prompt = {prompt}
              setPrompt = {setPrompt}
              generatingImg = {generatingImg}
              handleSubmit = { handleSubmit}
        />
        
        default:
          return null;
    }
  }

  const handleSubmit = async (type) => {
    if (!prompt) return alert("Please enter a prompt");
  
    try {
      // Call our backend to generate an AI image
      setgeneratingImg(true);
  
      const response = await fetch('https://project-three-js-um6p.onrender.com/api/v1/dalle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
        }),
      });
  
      const data = await response.json();
      console.log({data})
      handleDecals(type, `data:img/png;base64,${data.photo}`);

  
    } catch (error) {
      console.error(error);
      console.error(error);
      alert('400 Billing hard limit has been reached');
    } finally {
      setgeneratingImg(false);
      setActiveEditorTab("");
    }
  };
  
  

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];
    state[decalType.stateProperty] = result;

    if(!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  }

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
          state.isLogoTexture = !activeFilterTab[tabName]
        break;
      
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName]
        break;

      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    setAtiveFilterTab((prevState)=> {
        return {
          ...prevState, 
          [tabName] : !prevState[tabName]
        }
    })
  }

  const readFile = (type) => {
    reader(file).then((result) =>{
      handleDecals(type, result);
      setActiveEditorTab("")
    })
  }

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className='absolute top-0 left-0 z-10'
            {...slideAnimation('left')}
          >
            <div className='flex items-center min-h-screen'>
              <div className='editortabs-container tabs'>
                {EditorTabs.map((tab) => {
                  return(
                    <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => { setActiveEditorTab(tab.name)}}
                  />
                  )
                  
                })}

                {generateTabContent()}

              </div>
            </div>
          </motion.div>

          <motion.div
            className='absolute top-5 right-5 z-10'
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => state.intro = true}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>

          <motion.div
            className='filtertabs-container'
            {...slideAnimation('up')}
          >
            {FilterTabs.map((tab) => {
              return(
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab= {activeFilterTab[tab.name]}
                handleClick={() => { handleActiveFilterTab(tab.name)}}
              />
              )
            })}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
  }

  export default Customiser