"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
    const { data: session } = useSession();
    const [showdropdown, setshowdropdown] = useState(false)

    return (
        <nav className="bg-black text-white sticky top-0 z-10 flex justify-between items-center px-5 py-4 md:px-10 md:py-7 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
            <Link href={"/"}>
                <div className="logo font-extraboldy text-xl md:text-2xl font-mono transition-all transform hover:scale-105 cursor-pointer">
                    GetMeAChai☕
                </div>
            </Link>
            <div className="relative">
                {session && (
                    <>
                        <button
                            id="dropdownDefaultButton"
                            data-dropdown-toggle="dropdown"
                            className="text-white mx-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            type="button"
                            onClick={()=>setshowdropdown(!showdropdown)}
                            onBlur={()=>setTimeout(() => {setshowdropdown(false)}, 300)}
                        >
                            Account
                            <svg
                                className="w-2.5 h-2.5 ms-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 4 4 4-4"
                                />
                            </svg>
                        </button>

                        <div
                            id="dropdown"
                            className={`z-10 ${showdropdown?"":"hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 absolute -left-[50px] md:-left-[10px] my-4`}
                        >
                            <ul
                                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdownDefaultButton"
                            >
                                <li>
                                    <Link
                                        href="/dashboard"
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={`/${session.user.name}`}
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        Your Page
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        onClick={() => signOut()}
                                    >
                                        Sign out
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </>
                )}

                {!session && (
                    <Link href={"/login"}>
                        <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Login
                        </button>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
