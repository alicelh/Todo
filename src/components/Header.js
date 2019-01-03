import React,{Component} from 'react';
import { Navbar,Nav,Form,FormControl,Button } from 'react-bootstrap';

export default class Header extends Component{
  constructor(){
    super();
    this.state={
      text:''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e){
    this.setState({
      text: e.target.value
    })
    e.preventDefault();
  }
  handleSubmit(e){
    this.props.setSearchText(this.state.text)
    e.preventDefault();
  }
  render(){
    return (
      <Navbar bg="dark" variant="dark" className="navbar-fixed-top">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={require('./images/logo.png')}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          <span style={{fontSize:'25px', lineHeight:'30px', marginLeft:'10px'}} >Todo</span>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          </Nav>
          <Form inline>
            <button type="button" className="add-button" onClick={this.props.modalShow}><img alt={''} src={require('./images/add.png')} style={{width:"35px",height:"35px"}}/></button>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" value={this.state.text} onChange={this.handleChange}/>
            <Button variant="outline-success" style={{height:'35px'}} onClick={this.handleSubmit}>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}