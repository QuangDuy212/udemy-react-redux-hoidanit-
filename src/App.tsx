import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'

function App() {
  const count = useSelector((state: RootState) => state.counter);
  console.log(">>> check count: ", count);
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div>
        My current count = {count.value}
        <div>
          <button>Increase + 1</button>
        </div>
      </div>
    </>
  )
}

export default App
