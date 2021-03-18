import useProfile from "./hooks/useProfile";
import useFollowers from "./hooks/useFollowers";

const App = () => {
  const { profile } = useProfile();
  const { followers } = useFollowers();

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
};

export default App;
