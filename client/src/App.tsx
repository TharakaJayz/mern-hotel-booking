import { Route, Routes } from "react-router-dom"
import Layouts from "./layouts/Layouts"


function App() {


  return (
    <div>

      <Routes>
      <Route path="/"  element ={<Layouts />}  />
      </Routes>
    </div>

  )
}

export default App
