import React from 'react';
import { useFormik, FormikErrors, FormikValues } from 'formik';
import './Login.css';
import { connect, ConnectedProps } from 'react-redux';
import { deleteCaptcha, loginThunk } from '../Redux/auth-reducer';
import { Navigate } from 'react-router-dom';

interface FormValues {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string
  apiError?: string
}
interface PropsFromRedux {
  captcha: { url: string };
  deleteCaptcha: () => void;
  isAuth: boolean;
  loginThunk: (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null,
    setErrors: (errors: { [key: string]: string }) => void
  ) => void;
}
const validate = (values: FormValues): FormikErrors<FormValues> => {
  const errors: FormikErrors<FormValues> = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 3 || values.password.length > 15) {
    errors.password = 'Must be more 3 characters or less 15';
  }

  return errors;
};

const LoginForm = (props: PropsFromRedux) => {
  console.log(props);
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
      captcha: '',
    },
    validate,
    onSubmit: (values: FormValues) => {
      props.deleteCaptcha();
      props.loginThunk(values.email, values.password, values.rememberMe, values.captcha, formik.setErrors);
    },
  });

  return (
    <form className="login__form" onSubmit={formik.handleSubmit}>
      <h3 className="login__title">Login</h3>
      <input
        className="login--input "
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        placeholder={'email'}
      />
      {formik.errors.email ? <div className="validate">{formik.errors.email}</div> : null}
      <input
        className="login--input"
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        placeholder={'password'}
      />
      {formik.errors.password ? <div className="validate">{formik.errors.password}</div> : null}
      <div className="login__check">
        <input
          className="login__check-input"
          id="rememberMe"
          name="rememberMe"
          type="checkBox"
          onChange={formik.handleChange}
          checked={formik.values.rememberMe}
        />
        <label className="login__label">Remember Me</label>
      </div>
      {props.captcha && <div><img src={props.captcha.url} alt="" /></div>}
      {props.captcha && (
        <div>
          <input
            className="captcha login--input"
            placeholder="Введіть Captch`у"
            id="captcha"
            name="captcha"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.captcha}
          />
        </div>
      )}
      {formik.errors.apiError ? <div className="error">{formik.errors.apiError}</div> : null}
      <button className="login__btn-submit" type="submit">Submit</button>
    </form>
  );
};
const Login = (props) => {
  if (props.isAuth) return <Navigate to='/Profile' />
  return (
    <div className='login'>
      <LoginForm {...props} />
    </div>
  );
}
const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  captcha: state.auth.captcha
})
 export default connect(mapStateToProps,{loginThunk,deleteCaptcha})(Login);