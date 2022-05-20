import {connect} from 'react-redux'
import FeedPage from './FeedPage'
import GreetingPage from './GreetingPage'


const AppIndex = ({user}) => {
    return (
        user.login?
            <FeedPage /> :
            <GreetingPage />
    )
}


const mapStateToProps = state => ({
    user: state.user,
})


export default connect(mapStateToProps)(AppIndex)
