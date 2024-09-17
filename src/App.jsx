import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import MainComponent from './components/MainComponent/MainComponent'
import LoginComponent from './components/LoginComponent/LoginComponent'
import SignUpComponent from './components/SignUpComponent/SignUpComponent'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/signup" element={<SignUpComponent />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
