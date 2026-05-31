"use client"

import React, { useEffect, useState } from 'react'
import { fetchUrlLink } from '../UserActions/actions';
import Swal from 'sweetalert2'


const Sharelink = ({ userlink }) => {
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    id: "",
    email: "",
    handle: "",
    Links: [],
    description: "",
    image_url: "",
    public_id: ""
  })

  useEffect(() => {
    getLink();
  }, [])

  const getLink = async () => {
    const link = await fetchUrlLink(userlink[1]);
    if (link) {
      setForm(link);
    }
    setLoading(false);
  }

  const copyUrl = async () => {
    const url = window.location.href; // Get current page URL
    try {
      await navigator.clipboard.writeText(url);
      Swal.fire({
                  title: "Link Copied Successfully!",
                  icon: "success"
                });
    } catch (err) {
      console.error("Failed to copy URL", err);
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 px-4 py-10 text-center">

      {form.image_url && (
        <img
          src={form.image_url}
          alt="User Profile"
          className="w-40 h-40 rounded-full border-4 border-gray"
        />
      )}

      <h2 className="text-xl font-semibold mt-2 text-gray-800">@{form.handle}</h2>

      <p className="text-gray-600 mt-2 max-w-md">{form.description}</p>

      <div className="relative w-full max-w-xs mt-6 space-y-3">
        {form.Links.map((link, index) => (
          <a
            key={index}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-blue-600 text-white py-2 rounded-xl shadow hover:bg-blue-700 transition-all"
          >
            {link}
          </a>
        ))}

        {/* Share Button */}
        <button onClick={copyUrl}
          className="absolute top-[-40px] right-0 bg-green-600 p-2 rounded-full shadow hover:bg-green-700 transition-all cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 8a3 3 0 11-6 0 3 3 0 016 0zM4 19a7 7 0 0114 0v1H4v-1z"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Sharelink

