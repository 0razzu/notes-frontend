import classNames from 'classnames'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'


const Tab = ({currentPageName, location, pageName, children}) => {
    return (
        <Link to={location}
              className={classNames(
                  'navbar-item is-tab', {
                      'is-active': currentPageName === pageName,
                  })
              }>
            {children}
        </Link>
    )
}


const mapStateToProps = state => ({
    currentPageName: state.pageName,
})


export default connect(mapStateToProps)(Tab)
