import { useEffect, useState, useCallback } from 'react';

const useProfile = () => {
  const [profile, setProfile] = useState(null);

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

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return { profile };
}

export default useProfile;
