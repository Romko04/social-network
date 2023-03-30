import React from 'react'
import {logoutThunk} from '../Redux/auth-reducer'
import './Nav.css'
import Nav, { navPropsType } from './Nav'
import { connect } from 'react-redux'
import { appStateType } from 'Components/Redux/redux-store'
import { setUserTypeData } from 'types/types'
type mapStateToPropsType = {auth: setUserTypeData}
type mapDispatchToPropsType = {logoutThunk:()=>void}
const NavContainer:React.FC<navPropsType> = (props) => {
    return (
        <Nav {...props}/>
    )
}
const mapStateToProps = (state:appStateType):mapStateToPropsType => {
    return {
        auth: state.auth,
    }
}
export default connect<mapStateToPropsType,mapDispatchToPropsType,{},appStateType>(mapStateToProps,{logoutThunk})(NavContainer)