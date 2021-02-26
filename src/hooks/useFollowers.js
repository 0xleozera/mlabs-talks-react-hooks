import { useEffect, useState, useCallback } from 'react';

const useFollowers = () => {
  const [followers, setFollowers] = useState([]);

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
    fetchUserFollowers();
  }, [fetchUserFollowers]);

  return { followers };
}

export default useFollowers;
