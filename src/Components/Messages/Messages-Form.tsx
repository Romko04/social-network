import React from 'react';
import { Formik, FormikValues } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { actionsTypes, sendMessage } from '../Redux/message-reducer';
import { appStateType } from '../Redux/redux-store';
import { ThunkDispatch } from 'redux-thunk';

const MessageForm: React.FC = () => {
  const dispatch:ThunkDispatch<appStateType,void,actionsTypes> = useDispatch();
  const {status} = useSelector((state: appStateType) => state.dialogsPage);
  const handleSubmit = (values: FormikValues) => {
    if (values.message !== '') {
      dispatch(sendMessage(values.message));
      values.message = '';
    }
  };

  return (
    <>
      <Formik initialValues={{ message: '' }} onSubmit={handleSubmit}>
        {({ values, handleChange, handleSubmit }) => (
          <form className="submit__messages" onSubmit={handleSubmit}>
            <input
              className="dialog__messages-textarea"
              type="text"
              name="message"
              onChange={handleChange}
              value={values.message}
            />
            <button type="submit" disabled={status !== 'ready' || values.message === ''} className="dialog__messages-btn">
              Submit
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default MessageForm;
