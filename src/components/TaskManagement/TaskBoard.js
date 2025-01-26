import React, { useContext, useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { TaskContext, TaskProvider } from "../../context/TaskContext";
import TaskCard from "./TaskCard";
import { DndProvider, DragDropContext } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Row, Select, Form, Input, Button } from "antd";

const ItemType = "TASK";

const TaskBoard = () => {
  const { tasks, updateTaskStatus, deleteTask, editTask, addTask } =
    useContext(TaskContext);
  const [form] = Form.useForm();
  const [taskList, setTaskList] = useState(tasks);

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  const handleSubmit = (values) => {
    addTask(values);
    setTaskList([...taskList, values]); // Update taskList state immediately
    form.resetFields();
  };

  const moveTask = (dragIndex, hoverIndex, newStatus) => {
    const updatedTasks = Array.from(taskList);
    const [movedTask] = updatedTasks.splice(dragIndex, 1);
    movedTask.status = newStatus;
    updatedTasks.splice(hoverIndex, 0, movedTask);
    setTaskList(updatedTasks); // Update taskList state
    updateTaskStatus(updatedTasks);
  };

  const getTasksByStatus = (status) => {
    return taskList.filter((task) => task.status === status);
  };

  return (
    <div>
      <h1>Task Board</h1>

      <h2>Create Task Form</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        // style={{ maxWidth: "400px", margin: "0 auto" }}
      >
        <Row>
          <Form.Item
            label="Title"
            name="title"
            rules={[
              { required: true, message: "Please input the task title!" },
            ]}
          >
            <Input placeholder="Task Title" />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[
              { required: true, message: "Please select the task status!" },
            ]}
          >
            <Select placeholder="Select status">
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="in-progress">In Progress</Select.Option>
              <Select.Option value="completed">Completed</Select.Option>
            </Select>
          </Form.Item>
        </Row>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please input the task description!" },
          ]}
        >
          <Input.TextArea placeholder="Task Description" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Task
          </Button>
        </Form.Item>
      </Form>

      <DndProvider backend={HTML5Backend}>
        <div className="task-board">
          <Row>
            <TaskColumn
              title="Pending"
              status="pending"
              tasks={getTasksByStatus("pending")}
              moveTask={moveTask}
              deleteTask={deleteTask}
              editTask={editTask}
              style={{
                backgroundColor: "#f0f0f0",
                height: "100vh",
                width: "33%",
              }} // light grey
            />
            <TaskColumn
              title="In Progress"
              status="in-progress"
              tasks={getTasksByStatus("in-progress")}
              moveTask={moveTask}
              deleteTask={deleteTask}
              editTask={editTask}
              style={{
                backgroundColor: "#ffebcc",
                height: "100vh",
                width: "33%",
              }} // light orange
            />
            <TaskColumn
              title="Done"
              status="done"
              tasks={getTasksByStatus("done")}
              moveTask={moveTask}
              deleteTask={deleteTask}
              editTask={editTask}
              style={{
                backgroundColor: "#d4edda",
                height: "100vh",
                width: "33%",
              }} // light green
            />
          </Row>
        </div>
      </DndProvider>
    </div>
  );
};

const TaskColumn = ({
  title,
  status,
  tasks,
  moveTask,
  deleteTask,
  editTask,
  style,
}) => {
  const [, drop] = useDrop({
    accept: ItemType,
    drop: (item) => {
      moveTask(item.index, tasks.length, status);
      item.index = tasks.length;
    },
  });

  return (
    <div ref={drop} className={`task-column ${status}`} style={style}>
      <h2>{title}</h2>
      {tasks.map((task, index) => (
        <TaskCardWrapper
          key={task.id}
          index={index}
          task={task}
          moveTask={moveTask}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      ))}
    </div>
  );
};

const TaskCardWrapper = ({ task, index, moveTask, deleteTask, editTask }) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveTask(dragIndex, hoverIndex, task.status);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { type: ItemType, id: task.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <TaskCard task={task} onDelete={deleteTask} />
    </div>
  );
};

export default TaskBoard;
