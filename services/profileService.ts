import { Profile } from "@/types/profile";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const profileService = {
  async create(data: Profile, clerkId: string): Promise<Profile> {
    const res = await axios.post(`${baseUrl}/api/profiles/`, data, {
      params: {
        clerkId,
      },
    });
    return res.data;
  },
  async getAll(): Promise<Profile[]> {
    const res = await axios.get(`${baseUrl}/api/profiles/`);
    return res.data;
  },
  async getById(id: string): Promise<Profile> {
    const res = await axios.get(`${baseUrl}/api/profiles/`, {
      params: {
        clerkId: id,
      },
    });
    return res.data;
  },
  async update(id: string, data: Partial<Profile>): Promise<Profile> {
    const res = await axios.patch(`${baseUrl}/api/profiles/modify`, data,  {
      params: {
        clerkId: id,
      },
    });
    return res.data;
  },
  async updateUsername(id: string, data: string[]) : Promise<string[]> {
    const res = await axios.patch(`${baseUrl}/api/profiles/change-username`, data, {
        params: {
            clerkId: id
        }
    })
    return res.data
  },
  async updateVisibility(id: string, data: string[]) : Promise<string[]> {
    const res = await axios.patch(`${baseUrl}/api/profiles/set-visibility`, data, {
        params: {
            clerkId: id
        }
    })
    return res.data
  },
  async blockUser(id: string, data: string[]) : Promise<string[]> {
    const res = await axios.patch(`${baseUrl}/api/profiles/block-contact`, data, {
        params: {
            clerkId: id
        }
    })
    return res.data
  },
  async unblockUser(id: string, data: string[]) : Promise<string[]> {
    const res = await axios.patch(`${baseUrl}/api/profiles/unblock-contact`, data, {
        params: {
            clerkId: id
        }
    })
    return res.data
  }
};
