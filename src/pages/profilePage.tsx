import React from "react";
import { UserProfile } from "../api/profilesApi.ts";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext.jsx";
import { cleanDataContext } from "../contexts/cleanData.tsx";
import { Booking, fetchBookingsByProfile } from "../api/bookingsApi.ts";
import BookingListDropDown from "../components/bookings.tsx";

function ProfilePage() {
  const { user } = useAuth();

  const [profile, setProfile] = useState<UserProfile>(user);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    setProfile(cleanDataContext(user));
    fetchBookingsByProfile(user.name, user.accessToken)
      .then((response) => {
        if (response) {
          setBookings(response.data);
        } else {
          console.error("No bookings found for this profile.");
        }
      });
  }, [user]);

  const [open, setOpen] = useState(false);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-page">
      <div>
        <h1 className="text-woody-wine text-4xl font-bold text-center my-20">
          Welcome {profile.name}!
        </h1>
      </div>
      <div className="flex flex-row justify-center my-20">
        <div className="flex flex-row gap-16">
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
            <h2 className="text-woody-wine py-2">{profile.name}</h2>
            <p className="text-woody-wine">
              {profile.bio || "No description yet"}
            </p>
          </div>
          <div>
            <button className="primary-button-dark">Update Profile</button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center my-20">
        <h3 className="text-woody-wine">Bookings:</h3>
      </div>
{
  bookings?.map((booking) => <BookingListDropDown key={booking.id} booking={booking} />)
}
    </div>
  );
}

export default ProfilePage;
