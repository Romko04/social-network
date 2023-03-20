import React from 'react';
import { Formik } from 'formik';

const MessageForm = ({wsChannel}) => (
  <>
    <Formik
      initialValues={{ message: ''}}
      onSubmit={(values) => {
        wsChannel.send(values.message)
        values.message = ''
      }}
    >
      {({
        values,
        handleChange,
        handleSubmit,
      }) => (
        <form className='submit__messages' onSubmit={handleSubmit}>
          <input
            className='dialog__messages-textarea'
            type="text"
            name="message"
            onChange={handleChange}
            value={values.message}
          />
          <button type="submit" className='dialog__messages-btn'>
            Submit
          </button>
        </form>
      )}
    </Formik>
  </>
);

export default MessageForm;