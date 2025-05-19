import React from "react";
import { useEffect, useState } from "react";

interface Venue {
    id: string;
    name: string;
    description: string;
    media: { url: string; alt: string }[];
    price: number;
    maxGuests: number;
    rating: number;
    created: string;
    updated: string;
    meta: {
        wifi: boolean;
        parking: boolean;
        breakfast: boolean;
        pets: boolean;
    };
    location: {
        address: string;
        city: string;
        zip: string;
        country: string;
        continent: string;
    };
}

function ManagerVenuesView() {
    const [venues, setVenues] = useState<Venue[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const name = user.name;

    useEffect(() => {
        async function fetchVenues() {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(
                    `https://v2.api.noroff.dev/holidaze/profiles/${name}/venues`
                );
                if (!res.ok) throw new Error("Failed to fetch venues");
                const data = await res.json();
                setVenues(data.data || []);
            } catch (err: any) {
                setError(err.message || "Unknown error");
            } finally {
                setLoading(false);
            }
        }
        if (name) fetchVenues();
    }, [name]);

    async function handleDelete(id: string) {
        if (!window.confirm("Are you sure you want to delete this venue?")) return;
        try {
            const token = user.accessToken;
            const res = await fetch(
                `https://v2.api.noroff.dev/holidaze/venues/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (!res.ok) throw new Error("Failed to delete venue");
            setVenues((prev) => prev.filter((v) => v.id !== id));
        } catch (err: any) {
            alert(err.message || "Delete failed");
        }
    }

    function handleEdit(id: string) {
        // Implement navigation to edit page or modal
        alert(`Edit venue ${id} (implement navigation)`);
    }

    if (!name) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <h1 className="text-woody-wine text-4xl font-bold mb-4">Not logged in</h1>
                <p className="text-gray-600">Please log in to manage your venues.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 py-8">
            <h1 className="text-woody-wine text-4xl font-bold mb-4">Manage Your Venues</h1>
            {loading && <p>Loading venues...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && venues.length === 0 && (
                <p className="text-gray-600">You have no venues yet.</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                {venues.map((venue) => (
                    <div key={venue.id} className="bg-white rounded shadow p-4 flex flex-col">
                        <img
                            src={venue.media[0]?.url || "https://via.placeholder.com/400x200"}
                            alt={venue.media[0]?.alt || venue.name}
                            className="w-full h-48 object-cover rounded mb-2"
                        />
                        <h2 className="text-xl font-semibold mb-1">{venue.name}</h2>
                        <p className="text-gray-700 mb-2">{venue.description}</p>
                        <div className="flex flex-wrap gap-2 text-sm mb-2">
                            <span>Price: ${venue.price}</span>
                            <span>Guests: {venue.maxGuests}</span>
                            <span>Rating: {venue.rating}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs mb-2">
                            {venue.meta.wifi && <span className="bg-green-100 px-2 rounded">WiFi</span>}
                            {venue.meta.parking && <span className="bg-green-100 px-2 rounded">Parking</span>}
                            {venue.meta.breakfast && <span className="bg-green-100 px-2 rounded">Breakfast</span>}
                            {venue.meta.pets && <span className="bg-green-100 px-2 rounded">Pets</span>}
                        </div>
                        <div className="flex gap-2 mt-auto">
                            <button
                                onClick={() => handleEdit(venue.id)}
                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(venue.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ManagerVenuesView;