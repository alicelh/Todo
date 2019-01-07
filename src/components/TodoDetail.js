import React,{Component} from 'react';
import { withRouter } from 'react-router';
import handleUpdateTodo from '../helpers/handleUpdateTodo';
import DatePicker from "react-datepicker";
import {Button,DropdownButton,Dropdown} from 'react-bootstrap';
import withExit from '../helpers/withExit';
import * as rules from '../rules';
import PropTypes from 'prop-types';

const handleSave = (router, nameInput, noteInput, startDate, project, priority, params) => {
    const newName = nameInput.value;
    const newNote = noteInput.value;

    if (!newName) return;

    params.push({
        name: newName,
        note: newNote,
        startDate: startDate,
        project: project,
        priority: priority
    });

    withExit(handleUpdateTodo)(router, '/', params);
};

class TodoDetail extends Component{
    constructor(props){
        super(props);
        const { startDate, priority, project } = props.todo;
        this.state = {
            startDate: new Date(startDate),
            priority: priority,
            project: project
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
        const { todo, updateTodo, onRemove, history, projects } = this.props;
        var router = history;
        const { name, note, _id, completed, updatedAt} = todo;
        const time = new Date(updatedAt);

        let nameInput;
        let noteInput;

        return (
            <div className={`todo-detail ${ completed ? 'done' : ''}`}>
                <form>
                    <input
                        type="text"
                        defaultValue={name}
                        maxLength={`${rules.NAME_LENGTH}`}
                        ref={(ref) => { nameInput = ref; }}/>

                    <textarea
                        rows="10"
                        cols="50"
                        defaultValue={note}
                        maxLength={`${rules.NOTE_LENGTH}`}
                        ref={(ref) => { noteInput = ref; }}/>
                </form>
            <div className="detail-footer">
                <div className="choose-item">
                    <DatePicker
                        className="dateInput"
                        selected={this.state.startDate}
                        onChange={this.handleDateChange}
                        dateFormat="MMM d"
                        readonly unselectable="on"
                    />
                    <DropdownButton id="dropdown-project-button" variant="primary" title={this.state.project} className="item-choosed">
                    {projects.map((pro,i)=>
                        <Dropdown.Item key={i} onSelect={this.handleProjectChange} eventKey={pro.name}>{pro.name}</Dropdown.Item>
                    )}
                    </DropdownButton>
                    <DropdownButton id="dropdown-priority-button" variant={"danger"} title={"Priority "+this.state.priority} className="item-choosed">
                        <Dropdown.Item onSelect={this.handlePriorityChange} eventKey={1}>Priority 1</Dropdown.Item>
                        <Dropdown.Item onSelect={this.handlePriorityChange} eventKey={2}>Priority 2</Dropdown.Item>
                        <Dropdown.Item onSelect={this.handlePriorityChange} eventKey={3}>Priority 3</Dropdown.Item>
                        <Dropdown.Item onSelect={this.handlePriorityChange} eventKey={4}>Priority 4</Dropdown.Item>
                    </DropdownButton>
                    <button
                        className="btn-status item-choosed"
                        onClick={(e) => handleUpdateTodo(e, updateTodo, _id, {
                            completed: !completed
                        })}>
                    { completed ? 'Done' : 'Not Done'}
                    </button>
                    <span className="datetime">
                        Last Updated: { time.toLocaleString() }
                    </span>
                </div>
                <div>
                <Button variant="outline-success"
                    className="btn-save"
                    onClick={(e) => handleSave(router, nameInput, noteInput, this.state.startDate, this.state.project, this.state.priority, [e, updateTodo, _id])}>
                    SAVE
                </Button>
                <Button variant="outline-danger"
                    className="btn-delete"
                    onClick={(e) => {
                        e.preventDefault();
                        onRemove(_id);
                        router.push('/');
                    }}>
                    DELETE
                </Button>
                </div>
            </div>
        </div>
        );
    }
};

TodoDetail.propTypes = {
    todo: PropTypes.object,
    onRemove: PropTypes.func,
    updateTodo: PropTypes.func,
    router: PropTypes.object
};


export default withRouter(TodoDetail);
