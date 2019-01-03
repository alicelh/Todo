import React,{Component} from 'react';
import { Route, Switch } from 'react-router';
import TodosContainer from '../containers/TodosContainer';
import Header from '../components/Header';
import AddBoardContainer from '../containers/AddBoardContainer';
import TodoDetailContainer from '../containers/TodoDetailContainer';
import {Container,Row,Col} from 'react-bootstrap';
import TimeListContainer from '../containers/TimeListContainer';
import TabListContainer from '../containers/TabListContainer';

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      modalShow: false,
      priority: 0,
      project: '',
      searchText:''
    }
    this.modalShow = this.modalShow.bind(this);
    this.modalClose = this.modalClose.bind(this);
    this.setPriorityFilter = this.setPriorityFilter.bind(this);
    this.setProjectFilter = this.setProjectFilter.bind(this);
    this.setSearchText = this.setSearchText.bind(this);
  }
  modalShow = () => this.setState({ modalShow: true });
  modalClose = () => this.setState({ modalShow: false });
  setPriorityFilter = (index)=> this.setState({priority: index });
  setProjectFilter = (name)=>this.setState({project: name});
  setSearchText = (text)=>this.setState({searchText: text});
  render(){
    return (
      <div className="main">
      <Header modalShow={this.modalShow} setSearchText={this.setSearchText}/>
      <Container className="content">
        <Row style={{width:"100%"}}>
          <Col xs={0} sm={3} className="left-side">
           <TimeListContainer/>
           <TabListContainer setPriorityFilter={this.setPriorityFilter} setProjectFilter={this.setProjectFilter}/>
           <AddBoardContainer show={this.state.modalShow} onHide={this.modalClose}/>
          </Col>
          <Col xs={12} sm={9}>
            <Switch>
              <Route exact path="/" component={()=><TodosContainer searchText={this.state.searchText} priority={this.state.priority} project={this.state.project}/>}/>
              <Route path="/:index" component={TodoDetailContainer}/>
            </Switch>
          </Col>
        </Row>
      </Container>
      {/* <footer>
          <Link to="/">Todos</Link>
          <Link to="/about">About</Link>
      </footer> */}
    </div>);
  }
}
