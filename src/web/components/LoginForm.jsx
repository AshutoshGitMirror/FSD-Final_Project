import { useState } from "react";

export const LoginForm = ({ onLogin, onRegister, loading, error }) => {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "login") onLogin({ email: form.email, password: form.password });
    else onRegister({ name: form.name, email: form.email, password: form.password });
  };

  return (
    <form className="login-form" onSubmit={handleSubmit} id="auth-form">
      <h2>{mode === "login" ? "Sign in" : "Create account"}</h2>
      {error && <p style={{ color: "var(--aqi-hazardous)", fontSize: "0.82rem" }}>{error}</p>}
      {mode === "register" && (
        <div className="form-group">
          <label htmlFor="auth-name">Full name</label>
          <input id="auth-name" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required minLength={2} />
        </div>
      )}
      <div className="form-group">
        <label htmlFor="auth-email">Email</label>
        <input id="auth-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
      </div>
      <div className="form-group">
        <label htmlFor="auth-password">Password</label>
        <input id="auth-password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={8} />
      </div>
      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}
      </button>
      <button type="button" className="toggle-link" onClick={() => setMode(mode === "login" ? "register" : "login")}>
        {mode === "login" ? "Need an account? Sign up" : "Already have an account? Sign in"}
      </button>
    </form>
  );
};
