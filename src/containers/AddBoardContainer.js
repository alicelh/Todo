import { connect } from 'react-redux';
import { addTodo } from '../actions';
import AddBoard from '../components/AddBoard';

const mapStateToProps = (state) => {
    return{
        projects: state.projects,
        auth: state.auth
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddTodo: (todo) => {dispatch(addTodo(todo))}
    };
};

const AddBoardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddBoard);

export default AddBoardContainer;
