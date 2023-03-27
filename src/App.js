import React from 'react'

import './App.css';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProfileContainer from './Components/Profile/Profile-Container';
import HeaderContainer from './Components/Header/Header-Container';
import Login from './Components/Login/Login';
import { connect } from 'react-redux';
import { initalApp } from './Components/Redux/app-reducer.ts';
import Preloader from './Components/common/Preloader';
import NavContainer from './Components/Nav/Nav-Container';
import UsersContainer from './Components/Users/Users-Container';
import MessagesContainer from './Components/Messages/Messages-Container';
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
              <Route path='/Messages/*'  element={<MessagesContainer/>} />
              <Route path='/Users'  element={<UsersContainer/>} />
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
