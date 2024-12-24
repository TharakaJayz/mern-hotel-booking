import { Route, Routes } from "react-router-dom";
import Layouts from "./layouts/Layouts";
import Register from "./pages/Register";
import { useAppDispatch, useAppSeleter } from "./hooks/hooks";

import Toast from "./components/Toast";
import { toastActions } from "./store/Toast-slice";
import { RootState } from "./store/store";
import SignIn from "./pages/SignIn";
import { AddHotel } from "./pages/AddHotel";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";
import Details from "./pages/Details";

function App() {
  const toast = useAppSeleter((state: RootState) => state.toasts);
  const dispatch = useAppDispatch();
  const toastDispatch = () => {
    dispatch(toastActions.add({ message: "", type: "" }));
  };

  const isLoggedIn = useAppSeleter((state) => state.user.isLogged);

  console.log(" is Loggin==>>", isLoggedIn);
  return (
    <div>
      {toast.message.length > 0 && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={toastDispatch}
        />
      )}
      <Routes>
        {true && (
          <>
            <Route
              path="/add-hotel"
              element={
                <Layouts>
                  <AddHotel />
                </Layouts>
              }
            />
            <Route
              path="/my-hotels"
              element={
                <Layouts>
                  <MyHotels />
                </Layouts>
              }
            />
            <Route
              path="/edit-hotel/:hotelId"
              element={
                <Layouts>
                  <EditHotel />
                </Layouts>
              }
            />
          </>
        )}

        <Route
          path="/search"
          element={
            <Layouts>
              <Search />
            </Layouts>
          }
        />
        <Route
          path="/detail/:hotelId"
          element={
            <Layouts>
              <Details />
            </Layouts>
          }
        />
        <Route
          path="/register"
          element={
            <Layouts>
              <Register />
            </Layouts>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layouts>
              <SignIn />
            </Layouts>
          }
        />

        <Route
          path="/"
          element={
            <Layouts>
              <p>home page</p>
            </Layouts>
          }
        />

        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </div>
  );
}

export default App;
