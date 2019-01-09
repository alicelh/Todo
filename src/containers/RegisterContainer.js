import { connect } from 'react-redux';
import { registerUser } from '../actions';
import Register from '../components/Register';

const mapStateToProps = (state) => {
    return {
      errors: state.errors,
      auth: state.auth
    };
};

const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        registerUser : (user) => dispatch(registerUser(user,ownProps.history)),
    };
};

const RegisterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);

export default RegisterContainer;
