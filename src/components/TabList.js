import React,{Component} from 'react';
import {Tabs,Tab,ListGroup} from 'react-bootstrap';

export default class TabList extends Component{
  constructor() {
    super();
    this.state = {
      key: 'Project',
      choose: 0,
      projectChoose: '',
      showInput: 'none',
      value:''
    };
    this.textInput = React.createRef();
    this.setChooseBotton = this.setChooseBotton.bind(this);
    this.setChooseProBotton = this.setChooseProBotton.bind(this);
    this.setShowInput = this.setShowInput.bind(this);
    this.submitProject = this.submitProject.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  setChooseBotton(index,setPriorityFilter){
    if(index===this.state.choose){
      this.setState({choose:0});
      setPriorityFilter(0);
    }
    else {
      this.setState({
        choose:index
      });
      setPriorityFilter(index);
    }
  }
  setChooseProBotton(name,setProjectFilter){
    if(name===this.state.projectChoose){
      this.setState({projectChoose:''});
      setProjectFilter('');
    }
    else {
      this.setState({
        projectChoose:name
      });
      setProjectFilter(name);
    }
  }
  setShowInput(){
    if(this.state.showInput === 'none'){
      this.setState({
        showInput:'flex'
      });
      this.textInput.current.focus();
    } else {
      this.setState({
        showInput:'none'
      });
    }
  }
  submitProject(e){
    if(this.state.value!==''){
      this.props.addProject({'name':this.state.value,'userId':this.props.auth.user.id});
      this.setShowInput();
      this.setState({
        value:''
      })
    }else{
      this.textInput.current.focus();
      this.textInput.current.placeholder='请输入项目名';
    }
    e.preventDefault();
  }
  handleChange(e){
    this.setState({
      value: e.target.value
    })
  }
  render(){
    const{setPriorityFilter, projects, setProjectFilter, deleteProject,auth} = this.props;
    return(
      <Tabs
        id="controlled-tab"
        activeKey={this.state.key}
        onSelect={key => this.setState({ key })}
        >
        <Tab eventKey="Project" title="Project">
          <div className="addDiv">
            <span>Add Project</span>
            <img src={require('./images/add_black.png')} alt={''} onClick={this.setShowInput}/>
          </div>
          <div id="addProjectForm" style={{display:this.state.showInput}}>
            <form onSubmit={this.submitProject}>
              <input type="text" value={this.state.value} onChange={this.handleChange} ref={this.textInput}/>
            </form>
          </div>
          <ListGroup>
          {projects.map((pro, i)=>
            <ListGroup.Item action key={i} className={this.state.projectChoose===pro.name? 'choosed': ''}>
              <div className={'deleteButton'} onClick={()=>deleteProject(pro._id)}>
                <img alt={''} src={require('./images/remove.png')}/>
              </div>
              <div className={'tagButton'} onClick = {()=>this.setChooseProBotton(pro.name,setProjectFilter)}>
                <img alt={''} src={require('./images/project0.png')}/>
                <span>{pro.name}</span>
              </div>
            </ListGroup.Item >
          )}
          </ListGroup>
        </Tab>
        <Tab eventKey="Filter" title="Filter">
          <ListGroup>
            <ListGroup.Item action className={this.state.choose===1? 'choosed': ''} onClick = {()=>this.setChooseBotton(1,setPriorityFilter)}>
              <div>
                <img alt={''} src={require('./images/priority.png')}/>
                <span>Priority 1</span>
              </div>
            </ListGroup.Item >
            <ListGroup.Item action className={this.state.choose===2? 'choosed': ''} onClick = {()=>this.setChooseBotton(2,setPriorityFilter)}>
              <div>
                <img alt={''} src={require('./images/priority.png')} style={{width:'33px',height:'25px'}}/>
                <span>Priority 2</span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item action className={this.state.choose===3? 'choosed': ''} onClick = {()=>this.setChooseBotton(3,setPriorityFilter)}>
              <div>
                <img alt={''} src={require('./images/priority.png')}/>
                <span>Priority 3</span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item action className={this.state.choose===4? 'choosed': ''} onClick = {()=>this.setChooseBotton(4,setPriorityFilter)}>
              <div>
                <img alt={''} src={require('./images/priority.png')}/>
                <span>Priority 4</span>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Tab>
      </Tabs>
    );
  }
}