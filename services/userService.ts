import { User } from "@/types/user";
import axios from "axios";
import { handleError } from "./UserProfileService";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const userService = {
  async create(data: Partial<User>) {
    try {
      const res = await axios.post(`${baseUrl}/api/users/`, data);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },
  async getAll() {
    try {
      const res = await axios.get(`${baseUrl}/api/users`);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },
  async getById(id: string) {
    try {
      const res = await axios.get(`${baseUrl}/api/users/${id}`);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },
  async delete(id: string): Promise<void> {
    try {
      await axios.delete(`${baseUrl}/api/users/${id}`);
    } catch (error) {
      handleError(error);
    }
  },
};
