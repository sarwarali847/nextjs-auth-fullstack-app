"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing");

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout Success");
            router.push('/login');
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }
    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id);
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <p className="mb-4">Profile Page</p>
            <h2 className="border-solid border-4 shadow-lg p-2 border-sky-500 text-blue-500 font-bold font-serif">{data === "nothing" ? "Nothing" :
                <Link href={`/profile/${data}`}>{data}</Link>}
            </h2>
            <button onClick={logout}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">
                Logout
            </button>

            <button onClick={getUserDetails}
                className="bg-green-800 hover:border-l-orange-800 text-white font-bold py-2 px-4 mt-5 rounded">
                Get User Details
            </button>

            <Toaster position="top-right" />
        </div>
    );
}