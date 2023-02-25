import React, { lazy, Suspense } from 'react'
import './App.css';
import Nav from './Components/Nav/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProfileContainer from './Components/Profile/Profile-Container';
import MessagesContainer from './Components/Messages/Messages-Container';
import HeaderContainer from './Components/Header/Header-Container';
import Login from './Components/Login/Login';
import { connect } from 'react-redux';
import { initalApp } from './Components/Redux/app-reducer';
import Preloader from './Components/common/Preloader';
const HeavyComponent = lazy(() => import('./Components/Users/Users-Container'));
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
              <Route path='/Profile/:userId?' basename={process.env.PUBLIC_URL} element={<ProfileContainer />} />
              <Route path='/Messages/*' basename={process.env.PUBLIC_URL} element={<MessagesContainer/>} />
              <Route path='/Users' basename={process.env.PUBLIC_URL} element={<Suspense fallback={<div>Loading...</div>}>
                                              <HeavyComponent />
                                            </Suspense>} />
              <Route path='/login' basename={process.env.PUBLIC_URL} element={<Login/>} />
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
