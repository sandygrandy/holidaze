import { API_KEY } from "./API_KEY.mjs";
import { ApiResponse } from "./ApiResponse";
import { Venue } from "./venuesApi";
import getUserData from "../helpers/getUserData";

const BOOKINGS_BY_PROFILE_BASE_URL = "https://v2.api.noroff.dev/holidaze/profiles/{$user}/bookings?_venue=true";
const profileBookings = BOOKINGS_BY_PROFILE_BASE_URL.replace("{$user}", getUserData().name);

const BOOKING_BASE_URL = "https://v2.api.noroff.dev/holidaze/bookings";



export interface Booking {
    id: string;
    dateFrom: string;
    dateTo: string;
    guests: number;
    created: string;
    updated: string;
    venue: Venue | null;
}

export async function fetchBookingsByProfile(user: string, accessToken: string): Promise<ApiResponse<Booking[]> | null> {

    const response = await fetch(`${profileBookings}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
            "X-Noroff-API-Key": API_KEY,
        },
        });

    if (!response.ok) {
        console.error("Error fetching bookings:", response.statusText);
        return null;
    }

    const res = await response.json();
    if (!res || !Array.isArray(res.data)) {
        console.error("Invalid or no data received from API");
        return null;
    }

    if (res.data.length === 0) {
        console.log("No bookings under this profile");
        return null;
    }

    return res as ApiResponse<Booking[]>;
}

export async function createBooking(accessToken: string, bookingData: Booking): Promise<ApiResponse<Booking> | null> {
    const response = await fetch(`${BOOKING_BASE_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
            "X-Noroff-API-Key": API_KEY,
        },
        body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
        const errMsg = await response.text();
        console.error("Error creating booking:", response.statusText, errMsg);
        return null;
    }

    const data = await response.json();
    return data as ApiResponse<Booking>;
}
