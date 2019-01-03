import { connect } from 'react-redux';
import { getTodoToday, getTodoWeek, getTodoInbox } from '../actions';
import TimeList from '../components/TimeList';

const mapStateToProps = (state, props) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTodosToday: () => dispatch(getTodoToday()),
    getTodosInbox: () => dispatch(getTodoInbox()),
    getTodosWeek: () => dispatch(getTodoWeek())
  };
};

const TimeListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TimeList);

export default TimeListContainer;
