import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import MainComponent from './components/MainComponent/MainComponent'
import LoginComponent from './components/LoginComponent/LoginComponent'
import SignUpComponent from './components/SignUpComponent/SignUpComponent'
import { Provider } from 'react-redux'
import store from "./core/redux/store/store"
import IndexComponent from './components/IndexComponent/IndexComponent'
import ProfileComponent from './components/ProfileComponent/ProfileComponent'
import AroundMeComponent from './components/AroundMeComponent/AroundMeComponent'

function App() {

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainComponent/>} />
              <Route path="/login" element={<LoginComponent />} />
              <Route path="/signup" element={<SignUpComponent />} />
              <Route path='/index' element={<IndexComponent />} />
              <Route path='/profile' element={<ProfileComponent/>}/>
              <Route path='/aroundMe' element={<AroundMeComponent/>}/>
            </Routes>
          </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
