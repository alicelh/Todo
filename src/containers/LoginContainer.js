import { connect } from 'react-redux';
import { LoginUser,registerUser } from '../actions';
import Login from '../components/Login';

const mapStateToProps = (state) => {
    return {
      errors: state.errors,
      auth: state.auth
    };
};

const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        loginUser : (user) => dispatch(LoginUser(user)),
        registerUser : (user) => dispatch(registerUser(user,ownProps.history)),
    };
};

const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

export default LoginContainer;
