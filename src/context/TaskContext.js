import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { fetchData, postDatawithtoken } from "../api/api";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData("api/tasks").then((result) => {
      if (result.success !== false) {
        setTasks(result.body);
        setLoading(false);
      }
    });
  }, []);

  const addTask = async (task) => {
    try {
      const response = postDatawithtoken("api/tasks", task);
      setTasks([...tasks, response.data.body]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (taskId, updatedTask) => {
    try {
      const response = await axios.put(`/api/tasks/${taskId}`, updatedTask);
      setTasks(
        tasks.map((task) => (task._id === taskId ? response.data : task))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  const editTask = (taskId, updatedTask) => {
    setTasks(
      tasks.map((task) =>
        task._id === taskId ? { ...task, ...updatedTask } : task
      )
    );
  };

  const updateTaskStatus = (updatedTasks) => {
    setTasks(updatedTasks);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        addTask,
        updateTask,
        deleteTask,
        editTask,
        updateTaskStatus,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
