import Landing from "./components/Admin/Landing"
import Navbar from "./components/Navbar"
import { Route,Routes } from "react-router-dom"
function App() {
  

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Landing/>}/>
      </Routes>
    </div>
  )
}

export default App
