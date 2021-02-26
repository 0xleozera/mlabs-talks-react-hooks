import { useState, useEffect, useCallback } from 'react';

const App = () => {
  const [profile, setProfile] = useState(null);
  const [followers, setFollowers] = useState([]);

  const normalizeUserProfile = useCallback((profile) => {
    const { name, avatar_url: avatarUrl } = profile;
    const userProfile = { name, avatarUrl };

    return userProfile;
  }, []);

  const saveUserProfile = useCallback((profile) => {
    const normalizedUserProfile = normalizeUserProfile(profile);

    setProfile(normalizedUserProfile);
  }, [normalizeUserProfile]);

  const fetchUserProfile = useCallback(async () => {
    const request = await fetch('https://api.github.com/users/leonardorpr')
    const data = await request.json();

    saveUserProfile(data);
  }, [saveUserProfile]);

  const normalizeUserFollowers = useCallback((followers) => {
    const mappedUserFollowers = followers.map(({ login: username, avatar_url: avatarUrl }) => ({ username, avatarUrl }));

    return mappedUserFollowers;
  }, []);

  const saveUserFollowers = useCallback((followers) => {
    const normalizedUserFollowers = normalizeUserFollowers(followers);

    setFollowers(normalizedUserFollowers);
  }, [normalizeUserFollowers]);

  const fetchUserFollowers = useCallback(async () => {
    const request = await fetch('https://api.github.com/users/leonardorpr/followers?page=1&per_page=5')
    const data = await request.json();

    saveUserFollowers(data);
  }, [saveUserFollowers]);

  useEffect(() => {
    fetchUserProfile();
    fetchUserFollowers();
  }, [fetchUserProfile, fetchUserFollowers]);

  return (
    <main>
      <h1>My GitHub</h1>
      <section>
        <h2>Profile</h2>
        <img src={profile?.avatarUrl} alt="User avatar" />
        <p>Name: {profile?.name}</p>
      </section>
      <section>
        <h2>Followers</h2>
        <ul>
          {followers.map((follower) => (
            <li key={follower.username}>
              <img src={follower.avatarUrl} alt="User avatar" />
              <p>Username: {follower.username}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;
