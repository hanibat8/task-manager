import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import LayoutWrapper from './Layout';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { fetchProjectTasks } from '../features/projectsSlice';

import { useParams } from 'react-router-dom';

const columns = [
    { id: 'todo', title: 'To Do' },
    { id: 'testing', title: 'Testing' },
    { id: 'hold', title: 'Hold' },
    { id: 'inProgress', title: 'In Progress' },
    { id: 'completed', title: 'Completed' },
];

const Task = () => {
    const { id:projectById } = useParams();
    const role=localStorage.getItem('role')
    const dispatch : AppDispatch  = useDispatch();

    useEffect(()=>{
        dispatch(fetchProjectTasks({projectById,role}))
    },[])

    const initialTasks = {
        todo: [{ id: '1', content: 'Task 1' }, { id: '2', content: 'Task 2' }],
        testing: [],
        hold: [],
        inProgress: [],
        completed: [],
    };

    const [tasks, setTasks] = useState(initialTasks);

    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        const sourceColumn = tasks[source.droppableId];
        const destColumn = tasks[destination.droppableId];
        const [removed] = sourceColumn.splice(source.index, 1);
        destColumn.splice(destination.index, 0, removed);

        setTasks({
            ...tasks,
            [source.droppableId]: sourceColumn,
            [destination.droppableId]: destColumn,
        });
    };

    return (
        <LayoutWrapper>
            <p>/* Since I was not getting an empty tasks array returned from this api call 'project/${projectById}/task' so no tasks so I just put some dummy data to show drag and drop functionality</p>
            <div style={{ padding: '20px', overflowX: 'auto', width: '100%' }}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Row gutter={16} style={{ display: 'flex', minWidth: '1000px' }}>
                        {columns.map((column) => (
                            <Col style={{ minWidth: '200px' }} key={column.id}>
                                <h3 className='font-bold'>{column.title}</h3>
                                <Droppable droppableId={column.id}>
                                    {(provided) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            style={{
                                                background: '#f0f0f0',
                                                padding: '10px',
                                                minHeight: '80vh',
                                                borderRadius: '4px',
                                            }}
                                        >
                                            {tasks[column.id]?.map((task, index) => (
                                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={{
                                                                marginBottom: '8px',
                                                                ...provided.draggableProps.style,
                                                            }}
                                                        >
                                                            <Card>{task.content}</Card>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </Col>
                        ))}
                    </Row>
                </DragDropContext>
            </div>
        </LayoutWrapper>
    );
};

export default Task;
