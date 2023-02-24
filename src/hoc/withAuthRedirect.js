import React from "react";
import { connect } from 'react-redux'
import  { Navigate } from 'react-router-dom'
let mapStateToPropsForRedirect = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}
export const withAuthRedirect = (Component) => {
    let redirectComponent = (props) =>  {
        if (!props.isAuth) return <Navigate to='/login' />
        return <Component {...props} />
    }
    let ConnectAuthRedirectComponent = connect(mapStateToPropsForRedirect)(redirectComponent)
    return ConnectAuthRedirectComponent
}
