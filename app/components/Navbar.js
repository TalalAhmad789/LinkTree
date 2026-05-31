"use client"

import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { fetchUser } from '../UserActions/actions'
import { FaBars } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
    const [menu, setMenu] = useState(false)
    const [userform, setUserform] = useState([])
    const pathname = usePathname();
    const router = useRouter();
    const [drop, setDrop] = useState(false)
    const { data: session, status } = useSession()

    const getData = async () => {
        const user = await fetchUser(session?.user?.email);
        setUserform(user);
    }

    useEffect(() => {
        if (!session) {
            router.push('/')
        }
        if (status === "authenticated") {
            getData()
        }
    }, [session, router])

    return (
        <>
            {pathname === '/login' ? "" : <> <nav className='bg-white border-b-2 border-gray-500 flex items-center justify-between lg:py-3 py-5 sm:px-20 px-8'>
                <div className='flex gap-x-12 items-center'>
                    <Link href="/">
                        <img
                            className="cursor-pointer w-[100px] h-auto"
                            src="/logo.svg"
                            alt="lo"
                        />
                    </Link>
                    {session ? "" : (
                        <ul className='lg:flex lg:text-sm lg:text-gray-700 lg:font-[600] hidden'>
                            <li className='cursor-pointer hover:bg-[#eff0ec] py-2 px-4 transition-all duration-200 ease-in rounded-md'>Products</li>
                            <li className='cursor-pointer hover:bg-[#eff0ec] py-2 px-4 transition-all duration-200 ease-in rounded-md'>Templates</li>
                            <li className='cursor-pointer hover:bg-[#eff0ec] py-2 px-4 transition-all duration-200 ease-in rounded-md'>Marketplace</li>
                            <li className='cursor-pointer hover:bg-[#eff0ec] py-2 px-4 transition-all duration-200 ease-in rounded-md'>Learn</li>
                            <li className='cursor-pointer hover:bg-[#eff0ec] py-2 px-4 transition-all duration-200 ease-in rounded-md'>Pricing</li>
                        </ul>
                    )}

                </div>
                {session ? "" : (
                    <>
                        <div className='lg:flex lg:gap-x-3 hidden'>
                            <Link href={'/login'} className='bg-[#eff0ec] text-bold px-5 py-3 text-[#1e2330] font-bold rounded-md hover:bg-[#f5f1f1] transition-all duration-100 ease-in cursor-pointer'>Log in</Link>
                            <Link href={'/login'} className='bg-[#1e2330] hover:bg-[#242b3a] text-white py-3 px-6 rounded-full font-[500] transition-all duration-100 ease-in cursor-pointer'>Sign up free</Link>
                        </div>
                        <FaBars onClick={() => { setMenu(!menu) }} className='lg:hidden block text-lg text-gray-800' />
                    </>

                )}

                {!session ? null : (
                    <div className='relative inline-block' onBlur={() => setTimeout(() => setDrop(false), 200)} tabIndex={0}>
                        <img
                            src='/user.jpg'
                            alt='iii'
                            onClick={() => setDrop(!drop)}
                            className='w-10 p-0 cursor-pointer hover:scale-105 rounded-full transition-all duration-200 ease-in'
                        />


                        <div
                            id="dropdown"
                            className={`z-10 ${drop ? "" : "hidden"} bg-white divide-y divide-gray-100 w-44 right-0 absolute mt-3 rounded-lg shadow-sm dark:bg-gray-700 border border-gray-200`}
                        >
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                <li className='cursor-pointer'>
                                    <Link href={`/dashboard/${session?.user?.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                                </li>
                                <li className='cursor-pointer'>
                                    <Link href={'/help'} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Help</Link>
                                </li>
                                <li className='cursor-pointer'>
                                    <div onClick={() => signOut()} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </nav>

                {/* Menu DropDown */}
                {session ? "" : (

                    <>
                        <div className={`fixed w-full top-0 h-screen bg-yellow-400  z-50 flex flex-col justify-between px-6 py-6 lg:hidden transition-all duration-300 ease-in ${menu ? "left-0" : "left-[-1030px]"}`}>
                            <div className='flex justify-between'>
                                <h1 className='text-3xl font-bold text-gray-900'>Menu</h1>
                                <RxCross2 onClick={() => { setMenu(!menu) }} className='text-3xl font-bold text-gray-900' />
                            </div>
                            {/* Menu Links */}
                            <ul className="flex flex-col gap-4 text-xl font-semibold text-gray-900 mt-3 w-full max-w-xs">
                                {["Products", "Templates", "Marketplace", "Learn", "Pricing"].map((item, index) => (
                                    <li
                                        key={index}
                                        className="relative py-2 px-2 cursor-pointer w-56 self-start group"
                                    >
                                        <span className="relative z-10">{item}</span>
                                        <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
                                    </li>
                                ))}
                            </ul>

                            {/* Buttons Section */}
                            <div className="flex flex-col gap-4 w-full">
                                <Link
                                    href="/login"
                                    className="text-center py-3 border-2 border-gray-900 rounded-lg font-medium hover:bg-gray-900 hover:text-yellow-400 transition"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href="/login"
                                    className="text-center py-3 bg-gray-900 text-yellow-400 rounded-lg font-medium hover:bg-black transition"
                                >
                                    Sign up free
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </>}

        </>
    )
}

export default Navbar