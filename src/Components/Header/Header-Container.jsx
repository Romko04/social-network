import React from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import {setUserData,authThunk, logoutThunk} from '../Redux/auth-reducer'
const HeaderContainer = (props)=> {
    return (
        <Header {...props}/>
    )
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps,{setUserData,authThunk, logoutThunk})(HeaderContainer)