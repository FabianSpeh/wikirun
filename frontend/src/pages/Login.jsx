import React from "react";
import { useState } from "react";

export default function Login() {
  const loginUser = (e) => {
    e.preventDefault();
  };

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  return (
    <div>
      <form onSubmit={loginUser}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <label>password</label>
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
