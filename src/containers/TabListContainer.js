import { connect } from 'react-redux';
import TabList from '../components/TabList';
import { addProject, deleteProject } from '../actions';

const mapStateToProps = (state, props) => {
  return {
    projects : state.projects
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProject: (name)=>{if(name!=='') dispatch(addProject(name))},
    deleteProject: (id)=>{dispatch(deleteProject(id))}
  };
};

const TabListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TabList);

export default TabListContainer;
