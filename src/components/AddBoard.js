import React,{Component} from 'react';
import {Modal,Button,DropdownButton,Dropdown} from 'react-bootstrap';
import * as rules from '../rules';
import DatePicker from "react-datepicker";
import PropTypes from 'prop-types';

import "react-datepicker/dist/react-datepicker.css";

const handleFormSubmit = (nameInput, noteInput, startDate, project, priority, onCreate) => {
    const name = nameInput.value;
    const note = noteInput.value;

    if (!name) return;
    onCreate({ name, note, startDate, project, priority });
    nameInput.value = '';
    noteInput.value = '';
};
export default class AddBoard extends Component{
  constructor(){
    super();
    this.state={
      startDate: new Date(),
      priority: '1',
      project: ''
    }
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handlePriorityChange = this.handlePriorityChange.bind(this);
    this.handleProjectChange = this.handleProjectChange.bind(this);
  }
  handleDateChange(date) {
    this.setState({
      startDate: date
    });
  }
  handlePriorityChange(level){
    this.setState({
      priority: level
    });
  }
  handleProjectChange(project){
    this.setState({
      project: project
    })
  }
  render(){
  let nameInput;
  let noteInput;
  const {onAddTodo, show, onHide, projects} = this.props;
    return(
      <Modal
      show={show}
      onHide={onHide}
      className="addBoard"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        <input  type="text"
                maxLength={`${rules.NAME_LENGTH}`}
                placeholder="Title"
                required
                ref={r => {
                    nameInput = r;
                }} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <textarea
            maxLength={`${rules.NOTE_LENGTH}`}
            placeholder="Note"
            required
            ref={r => {
                noteInput = r;
            }}>
        </textarea>
      </Modal.Body>
      <Modal.Footer>
        <div className="choose-item">
          <DatePicker
            className="dateInput"
            selected={this.state.startDate}
            onChange={this.handleDateChange}
            dateFormat="MMM d"
            readonly unselectable="on"
          />
          <DropdownButton id="dropdown-project-button" variant="primary" title={this.state.project?this.state.project:'Project'}>
            {projects.map((pro,i)=>
              <Dropdown.Item key={i} onSelect={this.handleProjectChange} eventKey={pro.name}>{pro.name}</Dropdown.Item>
            )}
          </DropdownButton>
          <DropdownButton id="dropdown-priority-button" variant={"danger"} title={"Priority "+this.state.priority}>
            <Dropdown.Item onSelect={this.handlePriorityChange} eventKey={1}>Priority 1</Dropdown.Item>
            <Dropdown.Item onSelect={this.handlePriorityChange} eventKey={2}>Priority 2</Dropdown.Item>
            <Dropdown.Item onSelect={this.handlePriorityChange} eventKey={3}>Priority 3</Dropdown.Item>
            <Dropdown.Item onSelect={this.handlePriorityChange} eventKey={4}>Priority 4</Dropdown.Item>
          </DropdownButton>
        </div>
        <div>
        <Button variant="outline-secondary" onClick={this.props.onHide}>Close</Button>
        <Button variant="outline-success" onClick={(e) => {
                    e.preventDefault();
                    handleFormSubmit(nameInput, noteInput, this.state.startDate, this.state.project,this.state.priority, onAddTodo);
                }}>Submit</Button>
        </div>
      </Modal.Footer>
    </Modal>
    );
  }
};

  AddBoard.propTypes = {
    onCreate: PropTypes.func
  };
