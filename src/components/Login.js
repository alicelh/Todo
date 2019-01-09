import React, { Component } from 'react';
import classnames from 'classnames';
import { Navbar,Button,ButtonToolbar } from 'react-bootstrap';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
        }
        this.props.loginUser(user);
    }

    handleRegister(e){
      this.props.history.push('/register');
      e.preventDefault();
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
          <div className="container" style={{ marginTop: '50px', width: '700px'}}>
          <h2 style={{marginBottom: '40px'}}>登 录</h2>
          <form onSubmit={ this.handleSubmit }>
              <div className="form-group">
                  <input
                  type="email"
                  placeholder="Email"
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
                  placeholder="Password"
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
              <ButtonToolbar style={{float:'right'}}>
                  <Button variant="success" onClick={this.handleRegister}>
                      切换到注册页面
                  </Button>
                  <Button variant="primary" type="submit">
                      登录
                  </Button>
              </ButtonToolbar>
          </form>
      </div>
      </div>
      )
  }
}

export default Login;
