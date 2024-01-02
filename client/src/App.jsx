import { useState } from 'react'
import Canvas from './canvas'
import Customiser from './Pages/Customiser'
import Home from './Pages/Home'
import './index.css'

function App() {
const [count, setCount] = useState(0)

return (
  <main className='app transition-all ease-in'>
    <Home />
    <Canvas/>
    <Customiser/>
  </main>
)
}

export default App
