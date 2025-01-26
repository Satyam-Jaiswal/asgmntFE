import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// User authentication
export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
};

export const loginUser = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data;
};

// Task management
export const fetchTasks = async (token) => {
    const response = await axios.get(`${API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const createTask = async (taskData, token) => {
    const response = await axios.post(`${API_URL}/tasks`, taskData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const updateTask = async (taskId, taskData, token) => {
    const response = await axios.put(`${API_URL}/tasks/${taskId}`, taskData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const deleteTask = async (taskId, token) => {
    const response = await axios.delete(`${API_URL}/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

// Feed management
export const fetchPosts = async () => {
    const response = await axios.get(`${API_URL}/feed`);
    return response.data;
};

export const createPost = async (postData, token) => {
    const response = await axios.post(`${API_URL}/feed`, postData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};