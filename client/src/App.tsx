import { Route, Routes } from "react-router-dom"
import Layouts from "./layouts/Layouts"


function App() {


  return (
    <div>

      <Routes>
        <Route path="/" element={<Layouts>
          <p>
            home page
          </p>
        </Layouts>} />
        <Route path="/search" element={<Layouts>
          <p>

            Search page
          </p>
        </Layouts>} />
      </Routes>
    </div>

  )
}

export default App
