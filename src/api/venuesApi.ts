import getAccessToken from "../helpers/token";
import { API_KEY } from "./API_KEY.mjs";
import { ApiResponse } from "./ApiResponse";
import { Booking } from "./bookingsApi";

const PROFILES_BASE_URL = "https://v2.api.noroff.dev/holidaze/profiles";
const VENUES_BASE_URL = "https://v2.api.noroff.dev/holidaze/venues";


export interface Venue {
    id: string;
    name: string;
    description: string;
    location?: {
        address: string;
        city: string;
        country: string;
        continent: string;
        zip?: string;
    };
    price?: number;
    maxGuests?: number;
    media: {
        url: string;
        alt: string;
    }[];
    rating?: number;
    bookings?: Booking[];
    meta?: {
        wifi: boolean;
        parking: boolean;
        breakfast: boolean;
        pets: boolean;
    };
    _count?: {
        bookings: number;
      };
}

export interface VenuesRequestParams {
    limit?: number;
    page?: number;
    includeOwner?: boolean;
    includeBookings?:boolean;
    search?: string;
}

export const fetchVenues = async (params?: VenuesRequestParams): Promise<ApiResponse<Venue[]>> => {
    try {
        let url = params?.search
            ? `${VENUES_BASE_URL}/search?q=${encodeURIComponent(params.search)}&sort=created&sortOrder=desc`
            : `${VENUES_BASE_URL}?sort=created&sortOrder=desc`;

        if (params?.includeOwner) {
            url += "&_owner=true";
        }
        if (params?.includeBookings) {
            url += "&_bookings=true";
        }
        if (params?.limit) {
            url += `&limit=${params.limit}`;
        }
        if (params?.page) {
            url += `&page=${params.page}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error fetching venues");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching venues:", error);
        throw error;
    }
};

export const fetchVenuesByProfile = async (name: string): Promise<ApiResponse<Venue[]>> => {
    try {
        const accessToken = getAccessToken();
        const response = await fetch(`${PROFILES_BASE_URL}/${name}/venues`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-Noroff-API-Key": API_KEY,
                "Authorization": `Bearer ${accessToken}`,
            },
        });
        if (!response.ok) {
            throw new Error("Error fetching venues");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching venues:", error);
        throw error;
    }
};

export const fetchVenueById = async (id: string, includeBookings?: boolean): Promise<ApiResponse<Venue>> => {
    try {
        const url = includeBookings ? `${VENUES_BASE_URL}/${id}?_bookings=true` : `${VENUES_BASE_URL}/${id}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-Noroff-API-Key": API_KEY,
            },
        });
        if (!response.ok) {
            throw new Error(`Error fetching venue with ID ${id}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching venue with ID ${id}:`, error);
        throw error;
    }
};

export const createVenue = async (venue: Partial<Venue>): Promise<ApiResponse<Venue>> => {
    try {
        const accessToken = getAccessToken();
        const response = await fetch(VENUES_BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
                "X-Noroff-API-Key": API_KEY,
            },
            body: JSON.stringify(venue),
        });
        if (!response.ok) {
            throw new Error("Error creating venue");
        }
        return await response.json();
    } catch (error) {
        console.error("Error creating venue:", error);
        throw error;
    }
};

export const updateVenue = async (id: string, venue: Partial<Venue>): Promise<ApiResponse<Venue>> => {
    try {
        const accessToken = getAccessToken();
        const response = await fetch(`${VENUES_BASE_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
                "X-Noroff-API-Key": API_KEY,
            },
            body: JSON.stringify(venue),
        });
        if (!response.ok) {
            throw new Error(`Error updating venue with ID ${id}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error updating venue with ID ${id}:`, error);
        throw error;
    }
};

export const deleteVenue = async (id: string): Promise<void> => {
    try {
        const accessToken = getAccessToken();
        const response = await fetch(`${VENUES_BASE_URL}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "X-Noroff-API-Key": API_KEY,
            },
        });
        if (!response.ok) {
            throw new Error(`Error deleting venue with ID ${id}`);
        }
    } catch (error) {
        console.error(`Error deleting venue with ID ${id}:`, error);
        throw error;
    }
};