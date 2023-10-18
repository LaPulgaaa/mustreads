import { RecoilRoot } from "recoil"
import Notes from "./components/Admin/Notes"
import SignAdmin from "./components/Admin/SignAdmin"
import Landing from "./components/Landing"
import Navbar from "./components/Navbar"
import { Route,Routes } from "react-router-dom"
import Addnotes from "./components/Admin/Addnotes"
import Editnotes from "./components/Admin/Editnotes"
import AdminPanel from "./components/Admin/AdminPanel"
import Editdetails from "./components/Admin/Editdetails"
import SignUp from "./components/User/SignUp"
import UserHome from "./components/User/UserHome"
function App() {
  

  return (
    <RecoilRoot>
      <div style={{}}>
      <Navbar/>
      <Routes>
        <Route path={"/"} element={<Landing/>}/>
        <Route path={"/admin/signup"} element={<SignAdmin/>}/>
        <Route path={"/admin/notes"} element={<Notes/>} />
        <Route path={"/admin/createNotes"} element={<Addnotes/>}/>
        <Route path={"/admin/editNotes/:noteId"} element={<Editnotes/>} />
        <Route path={"/admin/dashboard"} element={<AdminPanel/>} />
        <Route path={"/admin/editDetails"} element={<Editdetails/>} />
        <Route path={"/user/signup"} element={<SignUp/>} />
        <Route path={"/user/home"} element={<UserHome/>} />
      </Routes>
    </div>
    </RecoilRoot>
    
  )
}

export default App
