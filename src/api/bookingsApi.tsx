import { API_KEY } from "./API_KEY.mjs";
import { ApiResponse } from "./ApiResponse";
import { Venue } from "./venuesApi";
import getAccessToken from "../helpers/token";

const BOOKINGS_BY_PROFILE_BASE_URL =
  "https://v2.api.noroff.dev/holidaze/profiles/{$user}/bookings?_venue=true";

const BOOKING_BASE_URL = "https://v2.api.noroff.dev/holidaze/bookings";

const VENUE_BOOKINGS_URL = "https://v2.api.noroff.dev/holidaze/venues/";

export interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  venue: Venue | null;
  customer?: {
    name?: string;
    email?: string;
    bio?: string;
    avatar?: {
      url?: string;
      alt?: string;
    };
  };
}

export async function fetchBookingsByProfile(
  name: string,
): Promise<ApiResponse<Booking[]> | null> {
  const accessToken = getAccessToken();
  const url = BOOKINGS_BY_PROFILE_BASE_URL.replace("{$user}", name);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
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

export const fetchBookingsAtVenue = async (
  id: string,
): Promise<Booking[] | null> => {
  const accessToken = getAccessToken();
  const response = await fetch(`${VENUE_BOOKINGS_URL}${id}?_bookings=true`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": API_KEY,
    },
  });

  if (!response.ok) {
    console.error("Error fetching bookings:", response.statusText);
    return null;
  }

  const res = await response.json();
  return res.data.bookings ?? null;
};

export async function createBooking(
  bookingData: Booking
): Promise<ApiResponse<Booking> | null> {
  const accessToken = getAccessToken();
  const response = await fetch(`${BOOKING_BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
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

export const deleteBooking = async (id: string): Promise<void> => {
  try {
      const accessToken = getAccessToken();
      const response = await fetch(`${BOOKING_BASE_URL}/${id}`, {
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