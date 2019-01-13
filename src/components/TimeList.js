import React,{Component} from 'react';
import {ListGroup} from 'react-bootstrap';

export default class TimeList extends Component{
  constructor(){
    super();
    this.state={
      choose: 3
    }
    this.setChooseBotton = this.setChooseBotton.bind(this);
  }
  setChooseBotton(id){
    this.setState({choose:id});
    let userId = this.props.auth.user.id;
    if(id===1) this.props.getTodosToday(userId);
    else if(id === 2) this.props.getTodosWeek(userId);
    else this.props.getTodosInbox(userId);
  }
  render() {
    return(
      <ListGroup>
        <ListGroup.Item action className={this.state.choose===3? 'choosed': ''} onClick = {()=>this.setChooseBotton(3)}>
          <div>
            <img alt={''} src={require('./images/inbox.png')}/>
            <span>Inbox</span>
          </div>
        </ListGroup.Item>
        <ListGroup.Item action className={this.state.choose===2? 'choosed': ''} onClick = {()=>this.setChooseBotton(2)}>
          <div>
            <img alt={''} src={require('./images/calendar.png')} style={{width:'33px',height:'25px'}}/>
            <span>This Week</span>
          </div>
        </ListGroup.Item>
        <ListGroup.Item action className={this.state.choose===1? 'choosed': ''} onClick = {()=>this.setChooseBotton(1)}>
          <div>
            <img alt={''} src={require('./images/today.png')}/>
            <span>Today</span>
          </div>
        </ListGroup.Item >
      </ListGroup>
    );
  }
}