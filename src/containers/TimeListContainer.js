import { connect } from 'react-redux';
import { getTodoToday, getTodoWeek, getTodoInbox } from '../actions';
import TimeList from '../components/TimeList';

const mapStateToProps = (state, props) => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTodosToday: (id) => dispatch(getTodoToday({userId:id})),
    getTodosInbox: (id) => dispatch(getTodoInbox({userId:id})),
    getTodosWeek: (id) => dispatch(getTodoWeek({userId:id}))
  };
};

const TimeListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TimeList);

export default TimeListContainer;
