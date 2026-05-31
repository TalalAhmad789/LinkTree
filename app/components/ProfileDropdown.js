'use client'

import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'


export default function ProfileDropdown({ user }) {
    const { data: session } = useSession()
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center focus:outline-none cursor-pointer"
            >
                <Image width={40} height={40}
                    src={user?.image || '/default-avatar.png'}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border border-gray-300 shadow-sm"
                />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg z-50 p-4">
                    <div className="mb-3">
                        <p className="text-sm font-semibold">{user?.name}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                    <hr className="my-2" />
                    <ul className="space-y-2">
                        <Link href={`/dashboard/${session?.user?.name}`}>
                            <button
                                className="w-full text-left px-2 py-1 rounded hover:bg-gray-100 cursor-pointer"
                            >
                                Dashboard
                            </button>
                        </Link>
                        <Link href={''}>
                            <button
                                className="w-full text-left px-2 py-1 rounded hover:bg-gray-100 cursor-pointer"
                            >
                                Manage Profile
                            </button>
                        </Link>
                        <Link href={'/help'}>
                            <button
                                className="w-full text-left px-2 py-1 rounded hover:bg-gray-100 cursor-pointer"
                            >
                                Help
                            </button>
                        </Link>
                        <li>
                            <button onClick={() => signOut()}
                                className="w-full text-left px-2 py-1 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            )
            }
        </div >
    )
}
