import React,{Component} from 'react';
import ReactDom from 'react-dom';
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
      searchText:'',
      showLeft: false
    }
    this.myRef = React.createRef();
    this.modalShow = this.modalShow.bind(this);
    this.modalClose = this.modalClose.bind(this);
    this.setPriorityFilter = this.setPriorityFilter.bind(this);
    this.setProjectFilter = this.setProjectFilter.bind(this);
    this.setSearchText = this.setSearchText.bind(this);
    this.displayLeftSide = this.displayLeftSide.bind(this);
  }
  modalShow = () => this.setState({ modalShow: true });
  modalClose = () => this.setState({ modalShow: false });
  setPriorityFilter = (index)=> this.setState({priority: index });
  setProjectFilter = (name)=>this.setState({project: name});
  setSearchText = (text)=>this.setState({searchText: text});
  displayLeftSide = ()=>{
    if(!this.state.showLeft){
      ReactDom.findDOMNode(this.myRef.current).style.left=0;
    }
    else{
      ReactDom.findDOMNode(this.myRef.current).style.left='-240px';
    }
    this.setState({
      showLeft: !this.state.showLeft
    })
    console.log(this.state.showLeft);
  }
  render(){
    return (
      <div className="main">
      <Header modalShow={this.modalShow} setSearchText={this.setSearchText} displayLeftSide = {this.displayLeftSide}/>
      <Container className="content">
        <Row style={{width:"100%"}}>
          <Col sm={5} md={4} lg={3} className="left-side" ref={this.myRef}>
           <TimeListContainer/>
           <TabListContainer setPriorityFilter={this.setPriorityFilter} setProjectFilter={this.setProjectFilter}/>
           <AddBoardContainer show={this.state.modalShow} onHide={this.modalClose}/>
          </Col>
          <Col sm={7} md={8} lg={9}>
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
