"use client"
import React, { useState, useEffect } from 'react'
import { deleteImage, fetchLinks } from '../UserActions/actions'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2'
import { RiDeleteBin2Fill } from "react-icons/ri";


const Dashboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession()
  const [form, setForm] = useState({ handle: "", links: [""], description: "", id: uuidv4() });
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(null)
  const [links, setLinks] = useState([])

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push('/');
    }
  }, [session, router])

  const getLinks = async () => {
    const Links = await fetchLinks(session?.user?.email);
    setLinks(Links);
  }


  const handleLinkDelete = async (Id, public_ID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLinks(links.filter(item => item.id !== Id));
        const deleteImg = await deleteImage(Id, public_ID);
        Swal.fire({
          title: "Deleted!",
          text: "Your link has been deleted.",
          icon: "success"
        });
      }
    });

  }

  useEffect(() => {
    getLinks();
  }, [])


  const handleImageChange = (e) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  }

  const handleAddLink = () => {
    if (form.links.length < 4) {
      setForm({ ...form, links: [...form.links, ""] });
    }
    else {
      Swal.fire({
        title: "No more links are allowed",
        icon: "error"
      });
    }
  }

  const handleLinkChange = (index, value) => {
    const updatedLinks = [...form.links];
    updatedLinks[index] = value;
    setForm({ ...form, links: updatedLinks });
  };


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true)

    try {
      if (!image) {
        Swal.fire({
          title: "Image is not found!",
          icon: "error"
        });
      }
      else {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("email", session?.user?.email);
        formData.append("handle", form.handle);
        formData.append("description", form.description);
        formData.append("id", form.id);
        form.links.forEach(link => formData.append("links", link));


        const response = await fetch("/api/upload-image", {
          method: "POST",
          body: formData,
        });

        const res = await response.json();
        if (res.error) {
          await Swal.fire({
            title: res.error,
            icon: "error"
          });
        }
        else {
          setForm({ handle: "", links: [""], description: "" });
          await Swal.fire({
            title: "Link Generated Successfully!",
            icon: "success"
          });
          router.push(`/link/${session?.user?.name}/${form.id}`)
        }
      }
    } catch (error) {
      console.log("Submitted error: ", error)
    } finally {
      setLoading(false)
    }

  }


  const handleLinkRoute = async (id) => {
    router.push(`/link/${session?.user?.name}/${id}`)
  }


  return (
    // <>
    //   <div className="absolute inset-0 -z-10 min-h-screen w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>

    //   <div className='flex lg:flex-row flex-col justify-between items-center my-6 sm:mx-20 mx-4'>

    //     <form onSubmit={handleSubmit} className="p-6 bg-white rounded-3xl shadow-xl lg:max-w-md w-full space-y-6">

    //       <h2 className="text-2xl font-bold text-center text-gray-800">🚀 Build Your LinkTree</h2>


    //       <div className="flex flex-col gap-1">
    //         <label htmlFor="HANDLE" className="text-sm font-medium text-gray-700">
    //           Step 1: Claim your Handle
    //         </label>
    //         <input
    //           id="HANDLE"
    //           type="text"
    //           value={form.handle}
    //           name='handle'
    //           onChange={(e) => handleChange(e)}
    //           placeholder="e.g. yourname"
    //           className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
    //         />
    //       </div>


    //       <div className="flex flex-col gap-2">
    //         <label className="text-sm font-medium text-gray-700">Step 2: Add Links</label>
    //         {form.links.map((link, index) => (
    //           <div key={index} className="flex flex-col gap-2 mb-3">
    //             <input
    //               type="text"
    //               value={link}
    //               onChange={(e) => handleLinkChange(index, e.target.value)}
    //               placeholder={`Enter link ${index + 1}`}
    //               className="flex-1 px-4 py-2 bg-gray-50 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
    //             />
    //           </div>
    //         ))}

    //         <button
    //           onClick={handleAddLink}
    //           type="button"
    //           className="w-full text-sm py-2 mt-1 bg-yellow-400 hover:bg-yellow-500 text-gray-800 rounded-xl transition font-semibold"
    //         >
    //           + Add Another Link
    //         </button>
    //       </div>


    //       <div className="flex flex-col gap-1">
    //         <label htmlFor="Description" className="text-sm font-medium text-gray-700">
    //           Step 3: Add Description
    //         </label>
    //         <textarea
    //           rows={3}
    //           id="Description"
    //           type="text"
    //           name='description'
    //           value={form.description}
    //           onChange={(e) => handleChange(e)}
    //           placeholder="Tell your audience something cool..."
    //           className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none"></textarea>
    //       </div>


    //       <div className="flex flex-col gap-1">
    //         <label htmlFor="Picture" className="text-sm font-medium text-gray-700">
    //           Step 4: Add Picture
    //         </label>
    //         <input onChange={handleImageChange}
    //           name="image"
    //           type="file"
    //           id="Picture"
    //           className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
    //         />
    //       </div>
    //       <button className='bg-yellow-400 font-bold text-center w-full text-gray-800 rounded-xl cursor-pointer hover:bg-yellow-500 transition-all duration-200 ease-in p-2' type='submit'>{loading ? "Loading..." : "Submit"}</button>
    //     </form>

    //     <div className='lg:mt-0 mt-12 lg:self-start self-center lg:w-[40vw] w-full'>
    //       <div className='bg-yellow-400 py-4 rounded-xl'>
    //         <h2 className='text-center font-bold text-gray-800 text-2xl'>Your LinkTree's</h2>
    //       </div>
    //       {links.length === 0 ? <div className="flex flex-col items-center justify-center w-full h-40 bg-gray-100 text-gray-500 rounded-xl shadow-inner text-center mt-4">
    //         <p className="text-lg font-medium">No Links</p>
    //         <p className="text-sm text-gray-400 mt-1">You haven't added any links yet.</p>
    //       </div> : <ul className={`mt-4 ${links.length > 5 ? "overflow-y-scroll" : ""} flex flex-col gap-y-3 h-[80vh]`}>
    //         {links.map((item, index) => (
    //           <li
    //             key={index}
    //             className="flex items-center bg-white border border-gray-300 justify-between py-3 px-4 rounded-lg transition-all duration-200"
    //           >
    //             {/* Left Section */}
    //             <div className="flex gap-x-3 items-center">
    //               <div className="w-12 h-12">
    //                 <img
    //                   className="object-cover w-full h-full rounded-full border border-gray-300"
    //                   src={item.image_url}
    //                   alt={index}
    //                 />
    //               </div>
    //               <div className="text-gray-800 sm:text-base font-semibold text-[12px]">@{item.handle}</div>
    //             </div>

    //             {/* Right Section */}
    //             <div className="flex items-center gap-x-5">
    //               <RiDeleteBin2Fill
    //                 onClick={() => handleLinkDelete(item.id, item.public_id)}
    //                 className="text-xl text-red-500 hover:scale-110 transition-transform cursor-pointer"
    //               />
    //               <div
    //                 onClick={() => handleLinkRoute(item.id)}
    //                 className="underline sm:text-base text-[12px] text-blue-500 cursor-pointer hover:text-blue-700"
    //               >
    //                 View
    //               </div>
    //             </div>
    //           </li>
    //         ))}
    //       </ul>
    //       }

    //     </div>

    //   </div>


    // </>
    <>
      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-yellow-50 via-white to-blue-50">
        <div className="absolute inset-0 bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] [background-size:22px_22px] opacity-40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
            Build Your LinkTree
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Create your personalized profile and share all your links in one place.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* Form Section */}
          <form
            onSubmit={handleSubmit}
            className="
          backdrop-blur-xl
          bg-white/80
          border
          border-white/30
          shadow-2xl
          rounded-3xl
          p-8
          space-y-6
        "
          >
            <h2 className="text-3xl font-bold text-gray-800 text-center">
              🚀 Create Profile
            </h2>

            {/* Handle */}
            <div className="space-y-2">
              <label
                htmlFor="HANDLE"
                className="text-sm font-medium text-gray-700"
              >
                Step 1: Claim Your Handle
              </label>

              <input
                id="HANDLE"
                type="text"
                value={form.handle}
                name="handle"
                onChange={handleChange}
                placeholder="e.g. yourname"
                className="
              w-full
              px-4
              py-3
              bg-white
               text-gray-700
              border
              border-gray-200
              rounded-xl
              outline-none
              transition
              focus:ring-4
              focus:ring-yellow-200
              focus:border-yellow-400
            "
              />
            </div>

            {/* Links */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">
                Step 2: Add Links
              </label>

              {form.links.map((link, index) => (
                <input
                  key={index}
                  type="text"
                  value={link}
                  onChange={(e) =>
                    handleLinkChange(index, e.target.value)
                  }
                  placeholder={`Enter link ${index + 1}`}
                  className="
                w-full
                px-4
                py-3
                bg-white
                border
                border-gray-200
                 text-gray-700
                rounded-xl
                outline-none
                transition
                focus:ring-4
                focus:ring-yellow-200
                focus:border-yellow-400
              "
                />
              ))}

              <button
                type="button"
                onClick={handleAddLink}
                className="
              w-full
              py-3
              rounded-xl
              border-2
              border-dashed
              border-yellow-400
              text-yellow-600
              font-semibold
              hover:bg-yellow-50
              transition
            "
              >
                + Add New Link
              </button>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label
                htmlFor="Description"
                className="text-sm font-medium text-gray-700"
              >
                Step 3: Add Description
              </label>

              <textarea
                rows={4}
                id="Description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Tell your audience something cool..."
                className="
              w-full
              px-4
              py-3
              bg-white
              text-gray-700
              border
              border-gray-200
              rounded-xl
              outline-none
              transition
              resize-none
              focus:ring-4
              focus:ring-yellow-200
              focus:border-yellow-400
            "
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="Picture"
                className="text-sm font-medium text-gray-700"
              >
                Step 4: Upload Profile Picture
              </label>

              <input
                onChange={handleImageChange}
                name="image"
                type="file"
                id="Picture"
                className="
              block
              w-full
              text-sm
              text-gray-600
              file:mr-4
              file:py-3
              file:px-4
              file:rounded-xl
              file:border-0
              file:font-semibold
              file:bg-yellow-100
              file:text-yellow-700
              hover:file:bg-yellow-200
            "
              />
            </div>

            <button
              type="submit"
              className="
            w-full
            py-3
            rounded-xl
            font-bold
            text-white
            bg-gradient-to-r
            from-yellow-500
            to-orange-500
            hover:scale-[1.02]
            transition-all
            shadow-lg
            cursor-pointer
          "
            >
              {loading ? "Creating..." : "Create LinkTree"}
            </button>
          </form>

          <div className="sticky top-8">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-5 rounded-2xl shadow-lg">
              <h2 className="text-center text-white text-2xl font-bold">
                Your LinkTrees
              </h2>
            </div>

            {links.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-md p-10 mt-5 text-center">
                <div className="text-6xl mb-3">🔗</div>

                <h3 className="font-bold text-xl text-gray-700">
                  No LinkTrees Yet
                </h3>

                <p className="text-gray-500 mt-2">
                  Create your first LinkTree profile and it will appear here.
                </p>
              </div>
            ) : (
              <ul
                className={`
              mt-5
              flex
              flex-col
              gap-4
              ${links.length > 5
                    ? "h-[80vh] overflow-y-auto pr-2"
                    : ""
                  }
            `}
              >
                {links.map((item, index) => (
                  <li
                    key={index}
                    className="
                  bg-white
                  rounded-2xl
                  p-4
                  shadow-md
                  hover:shadow-xl
                  hover:-translate-y-1
                  transition-all
                  duration-300
                  flex
                  items-center
                  justify-between
                "
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image_url}
                        alt={item.handle}
                        className="
                      w-14
                      h-14
                      rounded-full
                      object-cover
                      border-4
                      border-yellow-100
                      shadow
                    "
                      />

                      <div>
                        <p className="font-bold text-gray-800">
                          @{item.handle}
                        </p>

                        <p className="text-sm text-gray-500">
                          Personal LinkTree
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          handleLinkRoute(item.id)
                        }
                        className="
                      px-4
                      py-2
                      bg-blue-500
                      text-white
                      rounded-lg
                      hover:bg-blue-600
                      transition
                    "
                      >
                        View
                      </button>

                      <button
                        onClick={() =>
                          handleLinkDelete(
                            item.id,
                            item.public_id
                          )
                        }
                        className="
                      p-2
                      bg-red-50
                      text-red-500
                      rounded-lg
                      hover:bg-red-100
                      transition
                    "
                      >
                        <RiDeleteBin2Fill size={18} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
