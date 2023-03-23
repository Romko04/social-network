import React from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../Redux/message-reducer';

const MessageForm = () => {
  const dispatch = useDispatch()
  // let [readyStatus, setReadyStatus] = useState('pending')
  // useEffect(()=>{
  //   const openHandler = ()=>{setReadyStatus('ready')}
  //   wsChannel?.addEventListener('open',openHandler)
  //   return ()=>{
  //     wsChannel?.removeEventListener('open',openHandler)
  //   }
  // },[wsChannel])
  let status = useSelector((state)=>state.dialogsPage.status)
  return (
  <>
    <Formik
      initialValues={{ message: ''}}
      onSubmit={(values) => {
        dispatch(sendMessage(values.message))
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
          <button type="submit" disabled={status !== 'ready'} className='dialog__messages-btn' >
            Submit
          </button>
        </form>
      )}
    </Formik>
  </>
  )
};

export default MessageForm;