// src/components/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Backend API URL

// Register User
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, userData);
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error.response ? error.response.data : error;
    }
};

// Login User
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, credentials);
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error.response ? error.response.data : error;
    }
};

// Purchase (trigger referral logic)
export const makePurchase = async (userId, amount) => {
    try {
        const response = await axios.post(`${API_URL}/referral/purchase`, { userId, amount });
        return response.data;
    } catch (error) {
        console.error("Error making purchase:", error);
        throw error.response ? error.response.data : error;
    }
};

// Get User Referral Data
export const getReferralData = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/referral`, { params: { userId } });
        return response.data;
    } catch (error) {
        console.error("Error fetching referral data:", error);
        throw error.response ? error.response.data : error;
    }
};

// Get User Referral Data
export const getUserData = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching referral data:", error);
        throw error.response ? error.response.data : error;
    }
};

// Logout User (destroy session)
export const logoutUser = async () => {
    try {
        const response = await axios.post(`${API_URL}/auth/logout`);
        return response.data;
    } catch (error) {
        console.error("Error logging out:", error);
        throw error.response ? error.response.data : error;
    }
};
