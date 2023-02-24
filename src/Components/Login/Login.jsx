import React from 'react';
 import { useFormik } from 'formik';
 import './Login.css'
import { connect } from 'react-redux';
import { loginThunk } from '../Redux/auth-reducer';
import { Navigate } from 'react-router-dom';
 const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 5 || values.password.length > 15) {
    errors.password = 'Must be more 5 characters or less 15';
  }

  return errors;
};

const LoginForm = (props) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: 'false'
    },
    validate,
    onSubmit: values => {
      props.loginThunk(values.email, values.password, values.rememberMe, formik.setErrors)
    }
  })
  console.log(formik.errors);
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="Login">Login</label>
      <div>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          placeholder={'email'}
          validate={validate}
        />
        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
      </div>
      <div>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder={'password'}
          validate={validate}
        />
        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
      </div>
      <div>
        <input
          id="rememberMe"
          name="rememberMe"
          type="radio"
          onChange={formik.handleChange}
          value={true}
          validate={validate}
        />
        <label>rememberMe</label>
      </div>
      {formik.errors.apiError ? <div>{formik.errors.apiError}</div> : null}
      <button type="submit">Submit</button>
    </form>
  )

}
const Login = (props) => {
  if (props.isAuth) return <Navigate to='/Profile' />
  return (
    <div className='login'>
      <h1>Anywhere in your app!</h1>
      <LoginForm {...props} />
    </div>
  );
}
const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth
})
 export default connect(mapStateToProps,{loginThunk})(Login);