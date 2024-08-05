import { Route, Routes } from "react-router-dom"
import Layouts from "./layouts/Layouts"
import Register from "./pages/Register"
import { useAppDispatch, useAppSeleter } from "./hooks/hooks"

import Toast from "./components/Toast"
import { toastActions } from "./store/Toast-slice"
import { RootState } from "./store/store"
import SignIn from "./pages/SignIn"
import { AddHotel } from "./pages/AddHotel"
function App() {

  const toast = useAppSeleter((state: RootState) => state.toasts);
  const dispatch = useAppDispatch();
  const toastDispatch = () => {
    dispatch(toastActions.add({ message: "", type: "" }))

  }

  const isLoggedIn = useAppSeleter((state)=> state.user.isLogged);


  return (
    <div>
      {toast.message.length > 0 && (<Toast message={toast.message} type={toast.type} onClose={toastDispatch} />)}
      <Routes>

        {isLoggedIn && <>
        <Route path="add-hotel" element  = {
          <AddHotel />
        }/></>}
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
        <Route path="/register" element={<Layouts>

          <Register />
        </Layouts>
        } />
        <Route path="/sign-in" element={<Layouts>

          <SignIn />
        </Layouts>
        } />
      </Routes>
    </div>

  )
}

export default App
