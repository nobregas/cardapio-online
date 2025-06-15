import api from "./api";

export interface RegisterOwnerDTO {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export enum UserRoles {
  OWNER = "owner",
  ADMIN = "admin",
  EMPLOYEE = "employee",
  CUSTOMER = "customer",
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRoles;
}

export const registerOwner = async (data: RegisterOwnerDTO) => {
  try {
    const response = await api.post("/auth/register_owner", data);
    return response.data;
  } catch (error) {
    console.log("Error in registerOwner: ", error);
    throw error;
  }
};

export const login = async (data: LoginDTO) => {
  try {
    const response = await api.post("/auth/login", data);
    return response.data;
  } catch (error) {
    console.log("Error in login: ", error);
    throw error;
  }
};
