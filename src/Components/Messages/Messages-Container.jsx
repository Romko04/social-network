import { connect } from 'react-redux'
import { compose } from 'redux'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { createActionAddMessage, createActionChangeMessage } from '../Redux/message-reducer'
import Messages from './Messages'
const mapDispatchToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    }

}
let mapStateToProps = (state) => {
    return {
        onChangeMessage: (text)=>{
            state(createActionChangeMessage(text))
         },
         onAddMessage: ()=>{
             state(createActionAddMessage())
         }
    }
}
export default compose(
    connect(mapDispatchToProps,mapStateToProps),
    withAuthRedirect,
)(Messages)