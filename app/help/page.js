"use client"

import React,{useEffect} from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'

const page = () => {
    const { data: session, status } = useSession()
    const router = useRouter();
    useEffect(() => {
        if (status === "loading") return;
        if (!session) {
            router.push('/');
        }
    }, [session, router])

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10 text-gray-800 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-indigo-600 mb-8">Help & Support</h1>

            <section className="mb-10">
                <h2 className="text-xl font-semibold mb-2">📌 What is This Site?</h2>
                <p>
                    This platform allows you to create a personalized page to manage and share all your important links with one easy-to-share URL.
                </p>
            </section>

            <section className="mb-10">
                <h2 className="text-xl font-semibold mb-2">➕ How to Add a Link?</h2>
                <ol className="list-decimal list-inside space-y-1">
                    <li>Go to your dashboard.</li>
                    <li>Click on <strong>Add Link</strong>.</li>
                    <li>Enter the title and URL of the link.</li>
                    <li>Click <strong>Save</strong>.</li>
                </ol>
            </section>

            <section className="mb-10">
                <h2 className="text-xl font-semibold mb-2">🔗 How to Share Your Page?</h2>
                <p>
                    After adding links, you get a custom link like <code className="bg-gray-200 text-sm px-2 py-1 rounded">/yourusername</code>. Copy and share this URL anywhere.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-2">❓ Need More Help?</h2>
                <p>
                    Contact us at <a href="mailto:support@linktree.com" className="text-indigo-500 underline">support@linktree.com</a>.
                </p>
            </section>
        </div>
    )
}

export default page

 