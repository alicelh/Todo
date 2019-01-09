import React, { Component } from 'react';
import classnames from 'classnames';
import { Navbar,Button,ButtonToolbar } from 'react-bootstrap';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirm: '',
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleToLogin = this.handleToLogin.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm
        }
        this.props.registerUser(user);
    }

    handleToLogin(e){
      e.preventDefault();
      this.props.history.push('./login');
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

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/main');
        }
    }

    render() {
      const { errors } = this.state;
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
          <div className="container" style={{ marginTop: '50px', width: '700px'}}>
          <h2 style={{marginBottom: '40px'}}>注册</h2>
          <form onSubmit={ this.handleSubmit }>
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
              <ButtonToolbar style={{float:'right'}}>
                  <Button variant="success" onClick={this.handleToLogin}>
                      切换到登录页面
                  </Button>
                  <Button variant="primary" type="submit">
                      注册
                  </Button>
              </ButtonToolbar>
          </form>
      </div>
      </div>
      )
  }
}

export default Register;