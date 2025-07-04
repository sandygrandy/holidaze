import React, { useState } from "react";
import { UserProfile } from "../api/profilesApi";
import { useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import { cleanDataContext } from "../contexts/cleanData";
import { Booking, fetchBookingsByProfile } from "../api/bookingsApi";
import BookingCard from "../components/bookings";
import { updateProfile } from "../api/profilesApi";

function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile>(user);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [venueManager, setVenueManager] = useState(user.venueManager || false);

  useEffect(() => {
    setProfile(cleanDataContext(user));
    fetchBookingsByProfile(user.name).then((response) => {
      if (response) {
        setBookings(response.data);
      } else {
        console.error("No bookings found for this profile.");
      }
    });
  }, [user]);

  const handleUpdateProfile = () => {
    setIsOverlayOpen(true);
  };

  async function updateProfileData() {
    let profileData = { ...profile, venueManager };
    // Update imageUrl on the profile.avatar if it is set, same with imageAlt
    if (imageUrl || imageAlt) {
      profileData.avatar = {
        url: imageUrl || profile.avatar?.url || "",
        alt: imageAlt || profile.avatar?.alt || "",
      };
    }
    profileData.banner = undefined; // Banner not needed
    const updatedProfile = await updateProfile(profileData);
    if (updatedProfile) {
      window.location.reload(); // Reload the page to reflect changes
    } else {
      console.error("Failed to update profile.");
    }
  }

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-page text-woody-wine px-5 lg:px-wrapper">
      <div>
        <h2 className="text-woody-wine text-4xl font-bold text-center my-20">
          Welcome {profile.name}!
        </h2>
      </div>
      <div className="flex flex-col items-center md:items-start md:flex-row justify-center my-15">
        <div className="flex flex-col items-center md:items-start md:flex-row gap-4 md:gap-8">
          <div>
            <img
              src={
                profile.avatar?.url ||
                "https://images.unsplash.com/photo-1457449940276-e8deed18bfff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
              }
              alt={profile.avatar?.alt || "Profile Avatar"}
              className="rounded-full w-[300px] h-[300px] object-cover"
            />
          </div>
          <div className="m-auto">
            <h3 className="py-2">{profile.name}</h3>
            <p className="">{profile.bio || "No description yet"}</p>
          </div>
          <div>
            <button
              className="primary-button-dark"
              onClick={handleUpdateProfile}
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col items-center my-5">
          <h3>Upcoming bookings:</h3>
        </div>
        <div className="text-center mb-10">
          {bookings.length === 0 ? (
            <p className="py-5 text-medium-p">No bookings yet</p>
          ) : (
            bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          )}
        </div>
      </div>

      {isOverlayOpen && (
        <div className="overlay fixed inset-0 bg-black/75 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Update Profile</h2>
            <div className="mb-4">
              <label className="block mb-2">Image URL:</label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Image Alt:</label>
              <input
                type="text"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label>I am a venue manager</label>
              <input
                type="checkbox"
                className="ml-2"
                checked={venueManager || false}
                onChange={(e) =>
                  setVenueManager(e.target.checked)
                }
              />
            </div>
            <div className="flex justify-center gap-4">
              <button
                className="secondary-button-dark"
                onClick={() => setIsOverlayOpen(false)}
              >
                Cancel
              </button>
              <button
                className="primary-button-dark"
                onClick={updateProfileData}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
