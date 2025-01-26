import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import TaskBoard from "./components/TaskManagement/TaskBoard";
import Feed from "./components/Feed/Feed";
import { TaskProvider } from "./context/TaskContext";
import Dashboard from "./components/Dashboard";
import Test from "./components/Test";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/home/*" element={<Dashboard />} />
        {/* <Route
          path="/tasks"
          element={
            <TaskProvider>
              <TaskBoard />{" "}
            </TaskProvider>
          }
        />
        <Route path="/feed" element={<Feed />} /> */}
        <Route path="/" exact element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
