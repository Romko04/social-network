import React, { lazy, Suspense } from 'react'

import './App.css';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProfileContainer from './Components/Profile/Profile-Container';
import MessagesContainer from './Components/Messages/Messages-Container';
import HeaderContainer from './Components/Header/Header-Container';
import Login from './Components/Login/Login';
import { connect } from 'react-redux';
import { initalApp } from './Components/Redux/app-reducer';
import Preloader from './Components/common/Preloader';
import NavContainer from './Components/Nav/Nav-Container';
const HeavyComponent = lazy(() => import('./Components/Users/Users-Container'));
class App extends React.Component {
  componentDidMount() {
    this.props.initalApp ()
  }
  render() {
    return (
      !this.props.initial
    ?<Preloader />
    :  <HashRouter>
          <div className='wrapper'>
            <HeaderContainer/>
            <NavContainer/>
            <Routes>
              <Route path="/" element={<Navigate to="/profile" />} />
              <Route path='/Profile/:userId?' element={<ProfileContainer />} />
              <Route path='/Messages/*' element={<MessagesContainer/>} />
              <Route path='/Users'  element={<Suspense fallback={<div>Loading...</div>}>
                                              <HeavyComponent />
                                            </Suspense>} />
              <Route path='/login' element={<Login/>} />
            </Routes>
          </div>
        </HashRouter>
    )


}
}
const mapStateTpProps = (state) => ({
  initial: state.app.inital
})
export default connect(mapStateTpProps,{initalApp})(App);
