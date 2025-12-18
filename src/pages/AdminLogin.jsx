import { useMemo, useState } from "react";

export default function AdminLogin({ onLoginSuccess }) {
  const dummyAdmin = useMemo(
    () => ({ username: "admin", password: "admin123" }),
    []
  );

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

    if (username === dummyAdmin.username && password === dummyAdmin.password) {
      onLoginSuccess?.({ username });
      return;
    }

    setError("Login admin gagal. Gunakan data dummy yang ditampilkan.");
  };

  return (
    <section className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-brand" aria-label="Admin Panel">
          <div className="admin-login-brand__icon" aria-hidden="true">
            <i className="fa-solid fa-user-shield"></i>
          </div>
          <div>
            <div className="admin-login-brand__title">Admin Panel</div>
            <div className="admin-login-brand__subtitle">
              Login untuk mengatur dan mengelola
            </div>
          </div>
        </div>

        <div
          className="admin-login-hint"
          role="note"
          aria-label="Dummy admin credentials"
        >
          <div className="admin-login-hint__title">Data Dummy Admin</div>
          <div className="admin-login-hint__row">
            <span className="admin-login-hint__label">Username:</span>
            <span className="admin-login-hint__value">
              {dummyAdmin.username}
            </span>
          </div>
          <div className="admin-login-hint__row">
            <span className="admin-login-hint__label">Password:</span>
            <span className="admin-login-hint__value">
              {dummyAdmin.password}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="admin-username">Username</label>
            <input
              id="admin-username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username admin"
            />
          </div>

          <div className="form-group">
            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password admin"
            />
          </div>

          {error ? <div className="error">{error}</div> : null}

          <div className="admin-login-actions">
            <button className="btn btn-primary" type="submit">
              <i className="fa-solid fa-right-to-bracket"></i> Login Admin
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
