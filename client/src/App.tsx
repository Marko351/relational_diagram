import { useState } from 'react'

function App() {
  const [darkToggle, setDarkToggle] = useState(false)

  return (
    <h1 className={`text-xl font-bold underline tablet:text-3xl ${darkToggle && 'dark'}`}>
      <p className='text-blue-200 dark:text-teal-800'>Text</p>
      Hello world!
    </h1>
  )
}

export default App
