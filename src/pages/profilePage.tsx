import { fetchUserProfileLoggedIn, UserProfile } from "../api/profilesApi.ts"
import { useEffect, useState } from "react";
import React from "react";

function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    fetchUserProfileLoggedIn().then(data => {
      if (data) setProfile(data);
    });
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="profile-page">
      <h1 className="text-woody-wine text-4xl font-bold text-center">Welcome {profile.name}!</h1>
      <div className="flex flex-col items-center justify-center mt-8">
        <img
          src={profile.avatar?.url || "https://images.unsplash.com/photo-1457449940276-e8deed18bfff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"}
          alt={profile.avatar?.alt || "Profile Avatar"}
          className="rounded-full w-32 h-32 object-cover mb-4"
        />
        <h2 className="text-woody-wine text-2xl font-semibold">{profile.name}</h2>
        <p className="text-gray-600">{profile.name}</p>
        <p className="text-gray-600">{profile.bio || "no desc yet"}</p>
      </div>
    </div>
  );
}

export default ProfilePage;
