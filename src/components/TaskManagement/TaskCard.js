import React from "react";
import { Card } from "antd";
import {
  EllipsisOutlined,
  DeleteOutlined,
  SettingOutlined,
} from "@ant-design/icons";

// import "./TaskCard.css";

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const handleUpdate = () => {
    onUpdate(task.id);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  const actions = [<DeleteOutlined key="delete" onClick={handleDelete} />];

  return (
    <div className={`task-card ${task.status}`}>
      <Card
        title={task.title}
        bordered={false}
        style={{
          width: 300,
        }}
        actions={actions}
      >
        <p>{task.description}</p>
      </Card>

      <div className="task-actions">
        {/* <button onClick={handleUpdate}>Update</button> */}
        {/* <button onClick={handleDelete}>Delete</button> */}
      </div>
    </div>
  );
};

export default TaskCard;
