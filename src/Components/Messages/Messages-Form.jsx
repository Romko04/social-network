import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';

const MessageForm = ({wsChannel}) => {
  let [readyStatus, setReadyStatus] = useState('pending')
  useEffect(()=>{
    const openHandler = ()=>{setReadyStatus('ready')}
    wsChannel?.addEventListener('open',openHandler)
    return ()=>{
      wsChannel?.removeEventListener('open',openHandler)
    }
  },[wsChannel])
  return (
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
            validate="true"
          />
          <button type="submit" disabled={readyStatus !== 'ready' || values.message === ''} className='dialog__messages-btn' >
            Submit
          </button>
        </form>
      )}
    </Formik>
  </>
  )
};

export default MessageForm;