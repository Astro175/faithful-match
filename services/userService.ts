import { User } from "@/types/user";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const userService = {
    async create(data: User) : Promise<User> {
        const res = await axios.post(`${baseUrl}/api/users/`, data)
        return res.data
    },
    async getAll(): Promise<User[]> {
        const res = await axios.get(`${baseUrl}/api/users`)
        return res.data
    },
    async getById(id: string): Promise<User> {
        const res = await axios.get(`${baseUrl}/api/users/${id}`)
        return res.data
    },
    async delete(id: string) : Promise<void> {
        await axios.delete(`${baseUrl}/api/users/${id}`)
    }, 
    
}
