"use client"

import Image from 'next/image';
import { useSession, signIn } from "next-auth/react"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


export default function Page() {
    const router = useRouter();
    const { data: session, status } = useSession()
    useEffect(() => {
        if (session) {
            router.push(`dashboard/${session?.user?.name}`);
        }
    }, [session, router])

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30vw] space-y-6 bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
                    <div className="flex flex-col items-center text-center">
                        <h2 className="mt-4 text-2xl font-semibold text-gray-900">Sign in to LinkTree</h2>
                        <p className="mt-1 text-sm text-gray-500">Welcome back! Please sign in to continue</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-8">
                        <button onClick={()=> signIn('google')} className="flex-1 flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition text-sm font-bold text-gray-600 cursor-pointer">
                            <img width={20} height={20} src="/google.svg" alt="google" />
                            <div>Google</div>
                        </button>

                        <button onClick={()=> signIn('google')} className="flex-1 flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition text-sm font-bold text-gray-600 cursor-pointer">
                            <img width={20} height={20} src="/github.svg" alt="github" />
                            <div>GitHub</div>
                        </button>
                    </div>

                    <div className="relative text-center text-gray-500 text-sm">
                        <span className="absolute left-0 top-1/2 w-full border-t border-gray-300 transform -translate-y-1/2"></span>
                        <span className="bg-white px-4 relative z-10">or</span>
                    </div>

                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                            <input
                                type="email"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                                placeholder="you@example.com"
                            />
                        </div>
                        <button className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 text-sm transition-all duration-200 ease-in cursor-pointer">
                            Continue
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-500">
                        Don't have an account?{' '}
                        <a href="#" className="font-medium text-black hover:underline">Sign up</a>
                    </p>
                </div>
            </div>


        </>
    );
}
