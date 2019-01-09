import { connect } from 'react-redux';
import { LoginUser } from '../actions';
import Login from '../components/Login';

const mapStateToProps = (state) => {
    return {
      auth: state.auth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser : (user) => dispatch(LoginUser(user)),
    };
};

const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

export default LoginContainer;
