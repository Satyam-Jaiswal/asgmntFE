import React from "react";

const Header = () => {
  return (
    <header>
      <h1>Todo List App</h1>
      <nav>
        <ul>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/signup">Register</a>
          </li>
          <li>
            <a href="/tasks">Tasks</a>
          </li>
          <li>
            <a href="/feed">Feed</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
