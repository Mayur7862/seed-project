"use client";
import { useState } from "react";
import bcrypt from "bcryptjs";
import db from "@/lib/db";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const hashedPassword = await bcrypt.hash(formData.password, 10);

    await db.execute(
      "INSERT INTO users (first_name, last_name, mobile, email, password_hash) VALUES (?, ?, ?, ?, ?)",
      [formData.firstName, formData.lastName, formData.mobile, formData.email, hashedPassword]
    );

    alert("Signup successful!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="p-5 bg-white shadow rounded-lg">
        <input name="firstName" placeholder="First Name" className="input input-bordered w-full mb-2" onChange={handleChange} required />
        <input name="lastName" placeholder="Last Name" className="input input-bordered w-full mb-2" onChange={handleChange} required />
        <input name="mobile" placeholder="Mobile" className="input input-bordered w-full mb-2" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" className="input input-bordered w-full mb-2" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" className="input input-bordered w-full mb-2" onChange={handleChange} required />
        <button type="submit" className="btn btn-primary w-full">Sign Up</button>
      </form>
    </div>
  );
}
