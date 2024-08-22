import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'
import FetchWeather from './components/weather-main'
import Test from 
'./components/test'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   
    <div className='bg-map h-screen '>
    <FetchWeather />
    </div>

    

  
        
    </>
  )
}

export default App
