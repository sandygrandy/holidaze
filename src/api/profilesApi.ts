import { ApiResponse } from "./ApiResponse";
import { API_KEY } from "./API_KEY.mjs";
import { cleanDataContext } from "../contexts/cleanData.tsx";
import { Venue } from "./venuesApi";
import getUserData from "../helpers/getUserData.tsx";
import { StoredUserProfile } from "../helpers/getUserData.tsx";

const PROFILES_BASE_URL = "https://v2.api.noroff.dev/holidaze/profiles";

export interface UserProfile {
    name: string;
    email: string;
    bio: string;
    avatar?: {
        url: string;
        alt: string;
    };
    banner?: {
        url: string;
        alt: string;
    };
    venuemanager?: boolean;
};

const user = getUserData();

export const fetchUserProfileLoggedIn = async (storedUser: StoredUserProfile): Promise<ApiResponse<UserProfile> | null> => {
    try {
      const response = await fetch(`https://v2.api.noroff.dev/holidaze/profiles/${user.name}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          "X-Noroff-API-Key": API_KEY,
        },
      });
  
      const result = await response.json();
      result.data = cleanDataContext(result.data);
      return result as ApiResponse<UserProfile>;
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
  };


export const fetchProfiles = async (): Promise<ApiResponse<UserProfile[]>> => {
    try {
        const response = await fetch(PROFILES_BASE_URL);
        if (!response.ok) {
            throw new Error("Error fetching profiles");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching profiles:", error);
        throw error;
    }
};

export const fetchVenuesByProfile = async (name: string): Promise<ApiResponse<Venue[]>> => {
    try {
        const response = await fetch(`${PROFILES_BASE_URL}/${name}/venues`);
        if (!response.ok) {
            throw new Error(`Error fetching venues for profile ${name}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching venues for profile ${name}:`, error);
        throw error;
    }
};

export const updateProfile = async (name: string, profile: UserProfile, token: string): Promise<ApiResponse<UserProfile>> => {
    try {
        const response = await fetch(`${PROFILES_BASE_URL}/${name}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(profile),
        });
        if (!response.ok) {
            throw new Error(`Error updating profile ${name}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error updating profile ${name}:`, error);
        throw error;
    }
};







