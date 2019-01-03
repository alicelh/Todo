import React,{Component} from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import handleUpdateTodo from '../helpers/handleUpdateTodo';
import PropTypes from 'prop-types';

var moment = require('moment');

const todoSource = {
    beginDrag(props) {
        return { props };
    }
};

const todoTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        // Time to actually perform the action
        if (dragIndex !== undefined && hoverIndex !== undefined) {
            props.onMoveTodo({ dragIndex, hoverIndex });
        }

        monitor.getItem().index = hoverIndex;
    }
};

const connectDrag = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
};

const connectDrop = (connect) => {
    return { connectDropTarget: connect.dropTarget() };
};

class Todo extends Component{
    constructor(props){
        super(props);
        this.state={
            checked:props.completed
        }
        this.handleCheckClick = this.handleCheckClick.bind(this);
    }

    handleCheckClick = () => {
        this.setState({ checked: !this.state.checked });
      }

    render(){
    const {
        _id,
        index,
        name,
        note,
        completed,
        project,
        priority,
        startDate,
        updatedAt,
        onRemove,
        updateTodo,
        connectDragSource,
        isDragging,
        connectDropTarget
    } = this.props;

    let circlecolor;
    if(priority==='1'){
        circlecolor = '#DC3545';
    } else if(priority==='2'){
        circlecolor = '#FF503F';
    } else if(priority==='3'){
        circlecolor = '#FF8146';
    } else {
        circlecolor = '#FFBB62';
    }

    const time = new Date(updatedAt);

    return connectDragSource(connectDropTarget(
        <div className={`todo ${isDragging ? 'dragging' : ''}`}>
            <ul className="round">
                <input type="checkbox" id={`checkbox${index}`} className={`circle${priority}`} checked={this.state.checked}
                onChange={(e)=>{
                    this.handleCheckClick();
                    handleUpdateTodo(e, updateTodo, _id, {
                            completed: !completed
                        })}}/>
                <label htmlFor={`checkbox${index}`} className={`circle${priority}`} style={{borderColor:circlecolor}}></label>
            </ul>
            <div className='content'>
                <Link to={`/${index}`}>
                <div className={completed ? 'done' : ''}>
                    <h4 style={{textDecoration:this.state.checked?'line-through':'none'}}> { name } </h4>
                    <p style={{textDecoration:this.state.checked?'line-through':'none'}}> { note} </p>
                    <div>
                        <Button variant="success" className="time-button"><span>{moment(startDate).format('MMM D')}</span></Button>
                        <Button variant="primary" className="project-button">{project}</Button>
                        <span className="datetime">
                            Last Updated: { time.toLocaleString() }
                        </span>
                    </div>
                </div>
                <span
                    className="close-todo"
                    onClick={(e) => {
                        e.preventDefault();
                        onRemove(_id);
                    }}>
                    <img alt={''} src={require("./images/delete_forever.png")} style={{opacity:0.8}} width="30" height="30"/>
                </span>
            </Link>
            </div>
        </div>
    ));
    }
};

Todo.propTypes = {
    _id: PropTypes.string,
    index: PropTypes.number,
    name: PropTypes.string,
    note: PropTypes.string,
    completed: PropTypes.bool,
    updatedAt: PropTypes.string,
    onRemove: PropTypes.func,
    updateTodo: PropTypes.func,
    connectDragSource: PropTypes.func,
    isDragging: PropTypes.bool,
    connectDropTarget: PropTypes.func,
    onMoveTodo: PropTypes.func
};

const decorateWithDrag = (component) => {
    return DragSource('Todo', todoSource, connectDrag)(component);
};
const decorateWithDrop = (component) => {
    return DropTarget('Todo', todoTarget, connectDrop)(component);
};

export default decorateWithDrop(decorateWithDrag(Todo));
