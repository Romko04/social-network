import React from 'react'
import './App.css';
import Nav from './Components/Nav/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProfileContainer from './Components/Profile/Profile-Container';
import MessagesContainer from './Components/Messages/Messages-Container';
import UsersContainer from './Components/Users/Users-Container';
import HeaderContainer from './Components/Header/Header-Container';
import Login from './Components/Login/Login';
import { connect } from 'react-redux';
import { initalApp } from './Components/Redux/app-reducer';
import Preloader from './Components/common/Preloader';
class App extends React.Component {
  componentDidMount() {
    this.props.initalApp ()
  }
  render() {
    return (
      !this.props.initial
    ?<Preloader />
    :  <BrowserRouter>
          <div className='wrapper'>
            <HeaderContainer/>
            <Nav data={this.props.data.sideBarPage}/>
            <Routes>
              <Route path='/Profile/:userId?' element={<ProfileContainer />} />
              <Route path='/Messages/*' element={<MessagesContainer/>} />
              <Route path='/Users' element={<UsersContainer />} />
              <Route path='/login' element={<Login/>} />
            </Routes>
          </div>
        </BrowserRouter>
    )


}
}
const mapStateTpProps = (state) => ({
  initial: state.app.inital
})
export default connect(mapStateTpProps,{initalApp})(App);
