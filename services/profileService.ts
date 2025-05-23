
import axios from "axios";
import { handleError } from "./UserProfileService";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const profileService = {
    async getProfiles(id: string, distance: string | null, unit: string | null) {
        try {
            const res = await axios.get(`${baseUrl}/api/matching/auto_match`, {
                params: {
                    userId: id,
                    maxDistance: distance,
                    unit
                }
            })
            return res.data
        } catch(error) {
            handleError(error)
        }
    },
    // There should be a service method for manual filtering but endpoint is structured unusual
    
}