"use client"
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";
import '../signup/global.css';

export default function Login() {
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [buttonDisabled, setBttonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const onLogin = async () => {
        try {
            setLoading(true);
            console.log("Login Request ",user);
            const response = await axios.post("/api/users/login", user);
            console.log("Login Success", response.data);
            toast.success(response.data.message);
            router.push("/profile");
        } catch (error:any) {
            console.log("Login Failed",error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email && user.password) {
            setBttonDisabled(false);
        } else {
            setBttonDisabled(true);
        }
    }, [user])

    return (
        <div className="flex flex-col items-center 
       justify-center min-h-screen py-2 bg-slate-500">
            <header className="text-white p-5 text-2xl fixed top-0 left-0 right-0 bg-white-400 shadow-md z-50 flex items-center justify-center">
                {loading ? "Processing..." : "Sign in"}
            </header>
            <hr />
            <label htmlFor="username">Email</label>
            <input className="p-2 border-2 border-gray-300 rounded-lg
        mb-4 focus:outline-none focus:border-fuchsia-400 shadow-md"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="sarwar"
            />

            <label htmlFor="password">password</label>
            <input className="p-2 border-2 border-gray-300 rounded-lg
        mb-4 focus:outline-none focus:border-fuchsia-400 shadow-md"
                id="username"
                type="text"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="123456"
            />

            <button className={`p-2 border border-blue-500 rounded-lg mt-3 mb-4 focus:outline-none focus:border-gray-600 shadow-md 
                ${buttonDisabled ? 'opacity-50 bg-gray-300 text-white' : 'hover:bg-fuchsia-400 active:text-blue-600'}`}
                onClick={onLogin}
                disabled={buttonDisabled}>
                Login
            </button >
            <Link className="text-blue-400" href="/signup">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-14">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
            </svg>
            Visit Signup Page</Link>
            <Toaster position="top-right" />
        </div>

    );
}
