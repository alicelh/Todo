import React from 'react';
import Todo from './Todo';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';

const handleMoveTodo = (todos, moveTodo, indexes) => {
    const { dragIndex, hoverIndex } = indexes;

    return moveTodo(dragIndex, hoverIndex, todos[dragIndex]);
};

class Todos extends React.Component {
    render() {
        const { todos, onRemoveTodo, updateTodo, moveTodo, priority, project, searchText } = this.props;
        var chooseTodos = todos;
        if(priority!==0) chooseTodos = chooseTodos.filter((d)=>parseInt(d.priority) === priority);
        if(project!=='') chooseTodos = chooseTodos.filter((d)=>d.project === project)
        if(searchText!=='') chooseTodos = chooseTodos.filter((d)=>{return d.name.match(searchText) || d.note.match(searchText)})

        return (
            <div className="todos">
                {
                    chooseTodos.map((t, i) =>
                        <Todo
                            key={t.updatedAt}
                            index={i}
                            onRemove={onRemoveTodo}
                            updateTodo={updateTodo}
                            onMoveTodo={(indexes) => {
                                handleMoveTodo(todos, moveTodo, indexes);
                            }}
                            {...t}/>
                    )
                }
            </div>
        );
    }
}

Todos.propTypes = {
    todos: PropTypes.array,
    onRemoveTodo: PropTypes.func,
    updateTodo: PropTypes.func,
    moveTodo: PropTypes.func
};

export default DragDropContext(HTML5Backend)(Todos);
