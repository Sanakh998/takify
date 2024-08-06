import { Route, BrowserRouter as Router, Routes,  } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import UpdateProfile from "./pages/UpdateProfile"
import PrivateRoute from "./components/shared/PrivateRoute"
import Logout from "./components/shared/Logout"
import Layout from "./Layout"

function App() {
  return(
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>

          {/* Private Routes */}
          <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route path="" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/update" element={<UpdateProfile />} />
          <Route path="logout" element={<Logout />} />
        </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
