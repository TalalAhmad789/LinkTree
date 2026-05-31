import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-[#254f1a] via-[#1c3b13] to-[#14280e] text-white">

      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 sm:px-10 lg:px-20 py-12 sm:py-16 lg:py-20 gap-10">
        {/* Text Content */}
        <div className="flex-1 flex flex-col gap-4 sm:gap-6 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight text-[#d2e823]">
            Save & Share Your Links <br className="hidden sm:block" /> Easily With One Click
          </h1>
          <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto lg:mx-0">
            Organize all your links in one place and share them instantly.
            Perfect for creators, businesses, and anyone who wants a simple, beautiful way to share everything.
          </p>
          <Link href={'/login'}>
            <button className="mt-4 px-6 sm:px-8 py-3 sm:py-4 bg-[#d2e823] text-[#254f1a] font-bold rounded-lg text-base sm:text-lg hover:scale-105 hover:bg-[#c1d61e] transition w-full sm:w-auto mx-auto lg:mx-0 cursor-pointer">
              Get Started For Free
            </button>
          </Link>
        </div>

        {/* Hero Image */}
        <div className="flex-1 flex justify-center">
          <Image
            width={500}
            height={500}
            priority
            src="/main.png"
            alt="main illustration"
            className="rounded-2xl w-3/4 sm:w-2/3 lg:w-full max-w-md"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 px-6 sm:px-10 lg:px-20 bg-[#1e3b12]">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-12 text-[#d2e823]">
          Why Choose Our Platform?
        </h2>
        <div className="grid gap-6 sm:gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 bg-[#254f1a] rounded-xl text-center shadow-lg hover:scale-105 transition">
            <Image width={80} height={80} src="/p3.gif" unoptimized alt="save" className="mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-semibold mb-2">Save Links</h3>
            <p className="text-gray-300 text-sm sm:text-base">
              Store all your important links in one secure place for easy access.
            </p>
          </div>
          <div className="p-6 bg-[#254f1a] rounded-xl text-center shadow-lg hover:scale-105 transition">
            <Image width={80} height={80} src="/p1.gif" unoptimized alt="share" className="mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-semibold mb-2">Share Instantly</h3>
            <p className="text-gray-300 text-sm sm:text-base">
              Share your link collection with anyone in seconds using one single URL.
            </p>
          </div>
          <div className="p-6 bg-[#254f1a] rounded-xl text-center shadow-lg hover:scale-105 transition sm:col-span-2 lg:col-span-1">
            <Image width={80} height={80} src="/p2.gif" unoptimized alt="secure" className="mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-semibold mb-2">Safe & Secure</h3>
            <p className="text-gray-300 text-sm sm:text-base">
              Your links are safe with our top-notch security and privacy protection.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 sm:py-20 text-center bg-[#254f1a] px-6">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#d2e823]">Start Saving and Sharing Links Today</h2>
        <p className="text-gray-200 mb-6 sm:mb-8 text-sm sm:text-base">
          Join thousands of users who are simplifying their digital life.
        </p>
        <Link href={'/login'}>
          <button className="px-6 sm:px-8 py-3 sm:py-4 bg-[#d2e823] text-[#254f1a] font-bold rounded-lg text-base sm:text-lg hover:scale-105 hover:bg-[#c1d61e] transition w-full sm:w-auto cursor-pointer">
            Create your free account
          </button>
        </Link>
      </section>
    </main>
  );
}
