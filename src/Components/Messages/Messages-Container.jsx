import { connect } from 'react-redux'
import { compose } from 'redux'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { setMessages } from '../Redux/message-reducer'
import Messages from './Messages'
const mapDispatchToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    }

}

export default compose(
    connect(mapDispatchToProps,{setMessages}),
    withAuthRedirect,
)(Messages)