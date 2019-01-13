import React, { Component } from 'react';
import classnames from 'classnames';
import { Navbar,Button,ButtonToolbar,Modal,Tabs,Tab } from 'react-bootstrap';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirm: '',
            errors: {},
            showModal: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
        this.showModal= this.showModal.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    showModal(e){
        e.preventDefault();
        this.setState({
            showModal: true
        })
    }

    handleClose(e){
        this.setState({
            showModal: false
        })
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleLoginSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
        }
        this.props.loginUser(user);
    }

    handleRegisterSubmit(e) {
        e.preventDefault();
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm
        }
        this.props.registerUser(user);
    }
    
    componentDidMount() {
      if(this.props.auth.isAuthenticated) {
          this.props.history.push('/main');
      }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/main')
        }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
      const {errors} = this.state;
      return(
        <div id="loginPage">
        <Navbar bg="dark" variant="dark" className="navbar-fixed-top">
            <Navbar.Brand href="#home">
              <img
                alt=""
                src={require('./images/logo.png')}
                width="30"
                height="30"
                className="brandImg align-top"
              />
              <span style={{fontSize:'25px', lineHeight:'30px', marginLeft:'10px'}} >Todo</span>
            </Navbar.Brand>
          </Navbar>
          <div className="loginContainer">
            <Button variant="outline-success" onClick={this.showModal}>登录</Button>
          </div>

          <Modal show={this.state.showModal} onHide={this.handleClose}  size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered id='modalLRForm'>
            <Tabs defaultActiveKey="Login" id="uncontrolled-tab-example">
            <Tab eventKey="Login" title="登录">
            <form onSubmit={ this.handleLoginSubmit } >
              <div className="form-group">
                  <input
                  type="email"
                  placeholder="邮箱"
                  className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.email
                  })}
                  name="email"
                  onChange={ this.handleInputChange }
                  value={ this.state.email }
                  required
                  />
                  {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
              </div>
              <div className="form-group">
                  <input
                  type="password"
                  placeholder="密码"
                  className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password
                  })} 
                  name="password"
                  onChange={ this.handleInputChange }
                  value={ this.state.password }
                  required
                  />
                  {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
              </div>
                  <Button variant="primary" type="submit">
                      登录
                  </Button>
          </form>
            </Tab>
            <Tab eventKey="Register" title="注册">
            <form onSubmit={ this.handleRegisterSubmit }>
              <div className="form-group">
                  <input
                  type="text"
                  placeholder="用户名"
                  className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.name
                  })}
                  name="name"
                  onChange={ this.handleInputChange }
                  value={ this.state.name }
                  />
                  {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
              </div>
              <div className="form-group">
                  <input
                  type="email"
                  placeholder="邮箱"
                  className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.email
                  })}
                  name="email"
                  onChange={ this.handleInputChange }
                  value={ this.state.email }
                  />
                  {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
              </div>
              <div className="form-group">
                  <input
                  type="password"
                  placeholder="密码"
                  className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password
                  })}
                  name="password"
                  onChange={ this.handleInputChange }
                  value={ this.state.password }
                  />
                  {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
              </div>
              <div className="form-group">
                  <input
                  type="password"
                  placeholder="确认密码"
                  className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password_confirm
                  })}
                  name="password_confirm"
                  onChange={ this.handleInputChange }
                  value={ this.state.password_confirm }
                  />
                  {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}
              </div>
                  <Button variant="primary" type="submit">
                      注册
                  </Button>
          </form>
            </Tab>
            </Tabs>        
        </Modal>
      </div>
      )
  }
}

export default Login;
