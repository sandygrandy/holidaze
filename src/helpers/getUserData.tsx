export interface StoredUserProfile {
  name: string;
  accessToken: string;
}

function getUserData() {
  const user: StoredUserProfile = JSON.parse(
    localStorage.getItem("user") || "{}"
  );
  return user;
}

export default getUserData;
