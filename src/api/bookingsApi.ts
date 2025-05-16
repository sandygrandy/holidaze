import { API_KEY } from "./API_KEY.mjs";
import { ApiResponse } from "./ApiResponse";
import { Venue } from "./venuesApi";
// import { API_KEY } from "./API_KEY.mjs";

const BOOKINGS_BASE_URL = "https://v2.api.noroff.dev/holidaze/profiles/{$profileName}/bookings";

export interface Booking {
    id: string;
    dateFrom: string;
    dateTo: string;
    guests: number;
    created: string;
    updated: string;
    venue: Venue | null;
}

export async function fetchBookingsByProfile(profileName: string, accessToken: string): Promise<ApiResponse<Booking[]> | null> {
    if (!profileName) {
        throw new Error("User is not logged in or profile name is not available.");
    }
    const url = BOOKINGS_BASE_URL.replace("{$profileName}", profileName);

    const response = await fetch(`${url}?_venue=true`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
            "X-Noroff-API-Key": API_KEY,
        },
    });

    const result = await response.json();
    return result as ApiResponse<Booking[]>;
}

