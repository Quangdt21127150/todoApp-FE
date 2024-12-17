import axios from "axios";

const API_URL = "http://localhost:3000/auth";

export interface RegisterFormInputs {
  fullname: string;
  email: string;
  phone: string;
  username: string;
  password: string;
}

export interface LoginFormInputs {
  username: string;
  password: string;
}

export const AuthService = {
  login: async (data: LoginFormInputs) => {
    const response = await axios.post(`${API_URL}/login`, data);

    if (response.data.data.access_token) {
      localStorage.setItem("token", response.data.data.access_token);
    }

    return response.data;
  },

  register: async (data: RegisterFormInputs) => {
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data;
  },
};
