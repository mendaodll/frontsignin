import  "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import UserPage from "./pages/UserPage"
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'


function App() {

  return (
   <Router>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path='/' element={<Navigate to="/auth/login" state={{from: "/"}} />} />
          <Route path='/auth/login' element={<LoginPage />} />
          <Route path='/auth/user' element={<UserPage />} />
          <Route path='/auth/register' element={<RegisterPage />} />
        </Routes>
      </ThemeProvider>
   </Router>

  )
}

export default App
