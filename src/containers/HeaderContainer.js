import { connect } from 'react-redux';
import Header from '../components/Header';
import {setAuthToken} from '../api';
import {setCurrentUser} from '../actions'

const mapStateToProps = (state) => {
    return {
      avatar: state.auth.user.avatar
    };
};

const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        logout:  ()=>{
          localStorage.removeItem('jwtToken');
          setAuthToken(false);
          dispatch(setCurrentUser({}));
          window.location.assign('/login');
        }
    };
};

const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);

export default HeaderContainer;
