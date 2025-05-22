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
}

export const fetchVenues = async (): Promise<ApiResponse<Venue[]>> => {
    try {
        const response = await fetch(`${VENUES_BASE_URL}?sort=created&sortOrder=desc&_owner=true&_bookings=true`);
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
        const response = await fetch(`${PROFILES_BASE_URL}/${name}/venues`);
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
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching venue with ID ${id}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching venue with ID ${id}:`, error);
        throw error;
    }
};

export const createVenue = async (venue: Partial<Venue>, token: string): Promise<ApiResponse<Venue>> => {
    try {
        const response = await fetch(VENUES_BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
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

export const updateVenue = async (id: string, venue: Partial<Venue>, token: string): Promise<ApiResponse<Venue>> => {
    try {
        const response = await fetch(`${VENUES_BASE_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
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

export const deleteVenue = async (id: string, token: string): Promise<void> => {
    try {
        const response = await fetch(`${VENUES_BASE_URL}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
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