import { RecoilRoot } from "recoil"
import Notes from "./components/Admin/Notes"
import SignAdmin from "./components/Admin/SignAdmin"
import Landing from "./components/Landing"
import Navbar from "./components/Navbar"
import { Route,Routes } from "react-router-dom"
function App() {
  

  return (
    <RecoilRoot>
      <div>
      <Navbar/>
      <Routes>
        <Route path={"/"} element={<Landing/>}/>
        <Route path={"/admin/signup"} element={<SignAdmin/>}/>
        <Route path={"/admin/notes"} element={<Notes/>} />
      </Routes>
    </div>
    </RecoilRoot>
    
  )
}

export default App
