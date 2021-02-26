import { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: null,
      followers: [],
    }
  }

  normalizeUserProfile = (profile) => {
    const { name, avatar_url: avatarUrl } = profile;
    const userProfile = { name, avatarUrl };

    return userProfile;
  };

  saveUserProfile = (profile) => {
    const normalizedUserProfile = this.normalizeUserProfile(profile);

    this.setState((prevState) => ({ ...prevState, profile: normalizedUserProfile }));
  };

  fetchUserProfile = async () => {
    const request = await fetch('https://api.github.com/users/leonardorpr')
    const data = await request.json();

    this.saveUserProfile(data);
  };

  normalizeUserFollowers = (followers) => {
    const mappedUserFollowers = followers.map(({ login: username, avatar_url: avatarUrl }) => ({ username, avatarUrl }));

    return mappedUserFollowers;
  };

  saveUserFollowers = (followers) => {
    const normalizedUserFollowers = this.normalizeUserFollowers(followers);

    this.setState((prevState) => ({ ...prevState, followers: normalizedUserFollowers }));
  };

  fetchUserFollowers = async () => {
    const request = await fetch('https://api.github.com/users/leonardorpr/followers?page=1&per_page=5')
    const data = await request.json();

    this.saveUserFollowers(data);
  };

  componentDidMount() {
    this.fetchUserProfile();
    this.fetchUserFollowers();
  }

  render() {
    const { profile, followers } = this.state;

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
}

export default App;
