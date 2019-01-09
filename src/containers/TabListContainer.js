import { connect } from 'react-redux';
import TabList from '../components/TabList';
import { addProject, deleteProject } from '../actions';

const mapStateToProps = (state, props) => {
  return {
    projects : state.projects,
    auth: state.auth
  };
};

const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    addProject: (json)=>{if(json.name!=='') dispatch(addProject(json))},
    deleteProject: (id)=>{dispatch(deleteProject(id))}
  };
};

const TabListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TabList);

export default TabListContainer;
