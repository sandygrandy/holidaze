import { ApiResponse } from "./ApiResponse";
import { API_KEY } from "./API_KEY.mjs";
import { Venue } from "./venuesApi";


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

export const updateProfile = async (profile: UserProfile, token: string): Promise<ApiResponse<UserProfile>> => {
    try {
        const response = await fetch(`${PROFILES_BASE_URL}/${profile.name}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                "X-Noroff-API-Key": API_KEY,
            },
            body: JSON.stringify(profile),
        });
        if (!response.ok) {
            throw new Error(`Error updating profile ${profile.name}`);
        }
        const res = await response.json();
        localStorage.setItem("user", JSON.stringify({...profile, ...res.data}));
        return await res;
    } catch (error) {
        console.error(`Error updating profile ${profile.name}:`, error);
        throw error;
    }
};







