"use client"

import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { updateProfile, fetchuser } from "@/actions/useractions";
import { ToastContainer, toast } from 'react-toastify';

const Dashboard = () => {
    const { data: session, update} = useSession();
    const router = useRouter();
    const [form, setform] = useState({})

    useEffect(() => {
        if (!session) {
            router.push('/login');
        } else {
            getData();
        }
    }, []);

    const getData = async () => {
        let u = await fetchuser(session.user.name);
        setform(u)
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }


    const handleSubmit = async (e) => {
        update();
        let a = await updateProfile(e, session.user.name);
        toast.success('Profile Updated', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    return (
        <>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />

        <div className="my-5 px-5 md:px-0 fixed top-20 w-full">
            <form action={handleSubmit} className="flex flex-col gap-4 w-full max-w-md mx-auto">
                {/* Input for name */}
                <div>
                    <label htmlFor="name" className="block text-white">
                        Name
                    </label>
                    <input
                        value={form.name?form.name: ""}
                        onChange={handleChange}
                        type="text"
                        name="name"
                        id="name"
                        className="w-full bg-gray-500 hover:bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-4 focus:ring-gray-300"
                    />
                </div>

                {/* Input for email */}
                <div>
                    <label htmlFor="email" className="block text-white">
                        Email
                    </label>
                    <input
                        value={form.email?form.email: ""}
                        onChange={handleChange}
                        type="email"
                        name="email"
                        id="email"
                        className="w-full bg-gray-500 hover:bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-4 focus:ring-gray-300"
                    />
                </div>

                {/* Input for username */}
                <div>
                    <label htmlFor="username" className="block text-white">
                        Username
                    </label>
                    <input
                        value={form.username?form.username: ""}
                        onChange={handleChange}
                        type="text"
                        name="username"
                        id="username"
                        className="w-full bg-gray-500 hover:bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-4 focus:ring-gray-300"
                    />
                </div>

                {/* Input for profile picture */}
                <div>
                    <label htmlFor="profilepic" className="block text-white">
                        Profile Picture
                    </label>
                    <input
                        value={form.profilepic?form.profilepic: ""}
                        onChange={handleChange}
                        type="text"
                        name="profilepic"
                        id="profilepic"
                        className="w-full bg-gray-500 hover:bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-4 focus:ring-gray-300"
                    />
                </div>

                {/* Input for cover picture */}
                <div>
                    <label htmlFor="coverpic" className="block text-white">
                        Cover Picture
                    </label>
                    <input
                        value={form.coverpic?form.coverpic: ""}
                        onChange={handleChange}
                        type="text"
                        name="coverpic"
                        id="coverpic"
                        className="w-full bg-gray-500 hover:bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-4 focus:ring-gray-300"
                    />
                </div>

                {/* Input for RazorPay ID */}
                <div>
                    <label htmlFor="razorpayid" className="block text-white">
                        RazorPay ID
                    </label>
                    <input
                        value={form.razorpayid?form.razorpayid: ""}
                        onChange={handleChange}
                        type="text"
                        name="razorpayid"
                        id="razorpayid"
                        className="w-full bg-gray-500 hover:bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-4 focus:ring-gray-300"
                    />
                </div>

                {/* Input for RazorPay Secret */}
                <div>
                    <label
                        htmlFor="razorpaysecret"
                        className="block text-white"
                    >
                        RazorPay Secret
                    </label>
                    <input
                        value={form.razorpaysecret?form.razorpaysecret: ""}
                        onChange={handleChange}
                        type="text"
                        name="razorpaysecret"
                        id="razorpaysecret"
                        className="w-full bg-gray-500 hover:bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-4 focus:ring-gray-300"
                    />
                </div>

                {/* Submit button */}
                <button className="relative inline-flex items-center justify-center w-full p-[2px] mt-10 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 transition-all">
                    <span className="w-full px-6 py-2.5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-md transition-all duration-200 ease-in-out group-hover:bg-transparent group-hover:text-white">
                        Submit
                    </span>
                </button>
            </form>
        </div>
        </>
    );
};

export default Dashboard;
