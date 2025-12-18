import { useMemo, useState } from "react";
import { getUsers } from "../utils/storeData";

export default function Login({ onLoginSuccess }) {
  const dummyUser = useMemo(() => {
    const users = getUsers();
    const first = users[0];
    return {
      username: first?.username || "gamer",
      password: first?.password || "gamer123",
    };
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password) {
      setError("Username dan password wajib diisi.");
      return;
    }

    const users = getUsers();
    const found = users.find(
      (u) => u.username === username && String(u.password) === String(password)
    );

    if (found) {
      onLoginSuccess?.({ username: found.username });
      return;
    }

    setError(
      "Username atau password salah. Gunakan data dummy yang ditampilkan."
    );
  };

  return (
    <section className="login-page">
      <div className="login-card">
        <div className="login-brand" aria-label="GamerZone">
          <div className="login-brand__icon" aria-hidden="true">
            <i className="fa-solid fa-gamepad"></i>
          </div>
          <div className="login-brand__text">
            <div className="login-brand__name">
              GAMER<span className="text-gradient">ZONE</span>
            </div>
            <div className="login-brand__tagline">Sign in to continue</div>
          </div>
        </div>

        <h1 className="login-title">Login User</h1>
        <p className="login-subtitle">Silakan masuk untuk melanjutkan.</p>

        <div className="login-hint" role="note" aria-label="Dummy credentials">
          <div className="login-hint__title">Data Dummy</div>
          <div className="login-hint__row">
            <span className="login-hint__label">Username:</span>
            <span className="login-hint__value">{dummyUser.username}</span>
          </div>
          <div className="login-hint__row">
            <span className="login-hint__label">Password:</span>
            <span className="login-hint__value">{dummyUser.password}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="login-username">Username</label>
            <input
              id="login-username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
            />
          </div>

          {error ? <div className="error">{error}</div> : null}

          <div className="login-actions">
            <button className="btn btn-primary" type="submit">
              <i className="fa-solid fa-right-to-bracket"></i> Login
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
