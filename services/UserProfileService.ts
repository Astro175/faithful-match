import { Profile } from "@/types/profile";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseUrl)
  throw new Error("NEXT_PUBLIC_BASE_URL environment variable is required");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    console.error("Axios error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "An unexpected error occurred."
    );
  } else {
    console.error("Unexpected error:", error);
    throw new Error("Something went wrong.");
  }
};

export const patchWithParams = async <T>(
  url: string,
  id: string,
  data: Record<string, string | number | boolean>
): Promise<T> => {
  try {
    const res = await axios.patch(`${baseUrl}${url}`, data, {
      params: { clerkId: id },
    });
    return res.data;
  } catch (error) {
    handleError(error);
    return undefined as unknown as T;
  }
};

export const userProfileService = {
  async create(data: Partial<Profile>, clerkId: string): Promise<Profile> {
    try {
      const res = await axios.post(`${baseUrl}/api/profiles/`, data, {
        params: {
          clerkId,
        },
      });
      return res.data;
    } catch (error) {
      handleError(error);
      return undefined as unknown as Profile;
    }
  },
  async getAll(): Promise<Profile[]> {
    try {
      const res = await axios.get(`${baseUrl}/api/profiles/`);
      return res.data;
    } catch (error) {
      handleError(error);
      return undefined as unknown as Profile[];
    }
  },
  async getById(id: string): Promise<Profile> {
    try {
      const res = await axios.get(`${baseUrl}/api/profiles/`, {
        params: {
          clerkId: id,
        },
      });
      return res.data;
    } catch (error) {
      handleError(error);
      return undefined as unknown as Profile;
    }
  },
  async update(id: string, data: Partial<Profile>): Promise<Profile> {
    try {
      const res = await axios.patch(`${baseUrl}/api/profiles/modify`, data, {
        params: {
          clerkId: id,
        },
      });
      return res.data;
    } catch (error) {
      handleError(error);
      return undefined as unknown as Profile;
    }
  },
  async updateUsername(
    id: string,
    data: Record<string, string | number | boolean>
  ) {
    return patchWithParams("/api/profiles/change-username", id, data);
  },
  async updateVisibility(
    id: string,
    data: Record<string, string | number | boolean>
  ): Promise<string[]> {
    return patchWithParams("/api/profiles/set-visibility", id, data);
  },
  async blockUser(
    id: string,
    data: Record<string, string | number | boolean>
  ): Promise<string[]> {
    return patchWithParams("api/profiles/block-contact", id, data);
  },
  async unblockUser(
    id: string,
    data: Record<string, string | number | boolean>
  ): Promise<string[]> {
    return patchWithParams("/api/profiles/unblock-contact", id, data);
  },
};
