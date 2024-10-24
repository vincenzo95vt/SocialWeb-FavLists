  import { BrowserRouter, Route, Routes } from 'react-router-dom'
  import './App.css'
  import MainComponent from './components/MainComponent/MainComponent'
  import LoginComponent from './components/LoginComponent/LoginComponent'
  import SignUpComponent from './components/SignUpComponent/SignUpComponent'
  import { Provider } from 'react-redux'
  import store from "./core/redux/store/store"
  import IndexComponent from './components/IndexComponent/IndexComponent'

  function App() {

    return (
      <>
        <Provider store={store}>
          <BrowserRouter>
              <Routes>
                <Route path="/" element={<MainComponent/>} />
                <Route path="/login" element={<LoginComponent />} />
                <Route path="/signup" element={<SignUpComponent />} />
                <Route path='/index' element={<IndexComponent section={"index"} />} />
                <Route path='/index/user/:id' element={<IndexComponent section={"index"} path={"user"}/>}/>
                <Route path='/profile' element={<IndexComponent section={"profile"} path={undefined}/>}/>
                <Route path='/profile/favouriteList/:id' element={<IndexComponent section={"profile"} path={"favouriteLists"}/>}/>
                <Route path='/profile/update-prof/:id' element={<IndexComponent section={"profile"} path={"update-prof"}/>}/>
                <Route path='/profile/following' element={<IndexComponent section={"profile"} path={"following"}/>}/>
              </Routes>
            </BrowserRouter>
        </Provider>
      </>
    )
  }

  export default App
