"use client";
import { useState } from "react";
import bcrypt from "bcryptjs";
import db from "@/lib/db";
import { RowDataPacket } from "mysql2";

interface UserRow extends RowDataPacket {
  password_hash: string;
}

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const [rows] = await db.execute<UserRow[]>(
      "SELECT password_hash FROM users WHERE email = ?",
      [formData.email]
    );

    if (rows.length === 0) return alert("User not found");

    const isValid = await bcrypt.compare(formData.password, rows[0].password_hash);
    if (!isValid) return alert("Incorrect password");

    alert("Login successful!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="p-5 bg-white shadow rounded-lg">
        <input name="email" type="email" placeholder="Email" className="input input-bordered w-full mb-2" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" className="input input-bordered w-full mb-2" onChange={handleChange} required />
        <button type="submit" className="btn btn-primary w-full">Login</button>
      </form>
    </div>
  );
}
