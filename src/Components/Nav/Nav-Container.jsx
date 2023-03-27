import React from 'react'
import {logoutThunk} from '../Redux/auth-reducer.ts'
import './Nav.css'
import Nav from './Nav'
import { connect } from 'react-redux'
const NavContainer = (props) => {
    return (
        <Nav {...props}/>
    )
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        sideBar: state.sideBarPage
    }
}
export default connect(mapStateToProps,{logoutThunk})(NavContainer)