import { ApiResponse } from "./ApiResponse";
import { API_KEY } from "./API_KEY.mjs";
import { cleanDataContext } from "../contexts/cleanData.tsx";
import { Booking } from "./bookingsApi.ts";

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

export interface StoredUserProfile {
    name: string;
    accessToken: string;
};

export const fetchUserProfileLoggedIn = async (): Promise<ApiResponse<UserProfile> | null> => {
    const stored = localStorage.getItem("user");
    if (!stored) return null;
  
    const user = JSON.parse(stored);
  
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

export const getLoggedInUser = (): UserProfile | null => {
    const userJson = localStorage.getItem("user");
    if (!userJson) return null;
    try {
        return JSON.parse(userJson) as UserProfile;
    } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        throw error;
    }
};

export const fetchVenuesByProfile = async (name: string): Promise<ApiResponse<any[]>> => {
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

export const updateProfile = async (
    name: string,
    profile: {
        bio?: string;
        venuemanager?: boolean;
        banner?: { url: string; alt: string };
        avatar?: { url: string; alt: string };
    },
    token: string
): Promise<ApiResponse<UserProfile>> => {
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

export const searchProfiles = async (query: string): Promise<ApiResponse<UserProfile[]>> => {
    try {
        const response = await fetch(`${PROFILES_BASE_URL}?search=${query}`);
        if (!response.ok) {
            throw new Error("Error searching profiles");
        }
        return await response.json();
    } catch (error) {
        console.error("Error searching profiles:", error);
        throw error;
    }
}







