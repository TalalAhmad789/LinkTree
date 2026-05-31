import React from 'react'
import Image from 'next/image';

const User = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center px-4 py-10 space-y-6">
      
      {/* User Image */}
      <div className="w-28 h-28 relative rounded-full overflow-hidden shadow-lg border-4 border-white">
        <Image
          src="/user.jpg" // replace with actual image path
          alt="User Image"
          fill
          className="object-cover"
        />
      </div>

      {/* Handle */}
      <h1 className="text-2xl md:text-3xl font-semibold text-center">@yourhandle</h1>

      {/* Links */}
      <div className="w-full max-w-md flex flex-col gap-4 mt-4">
        <a
          href="#"
          className="bg-white text-gray-900 px-6 py-4 rounded-xl shadow-md text-center font-medium text-lg hover:bg-gray-200 transition duration-300"
        >
          📸 Follow me on Instagram
        </a>
        <a
          href="#"
          className="bg-white text-gray-900 px-6 py-4 rounded-xl shadow-md text-center font-medium text-lg hover:bg-gray-200 transition duration-300"
        >
          🛍️ Visit My Shop
        </a>
        <a
          href="#"
          className="bg-white text-gray-900 px-6 py-4 rounded-xl shadow-md text-center font-medium text-lg hover:bg-gray-200 transition duration-300"
        >
          🎥 Subscribe YouTube Channel
        </a>
        <a
          href="#"
          className="bg-white text-gray-900 px-6 py-4 rounded-xl shadow-md text-center font-medium text-lg hover:bg-gray-200 transition duration-300"
        >
          📧 Contact Me
        </a>
      </div>
    </div>
  );
}

export default User
