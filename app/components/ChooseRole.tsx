'use client'
import { useState } from 'react'
import { User, Palette, X } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { setCookie } from 'cookies-next'

export default function UserTypeModal() {
   const [isModalOpen, setIsModalOpen] = useState(false)

   const openModal = () => setIsModalOpen(true)
   const closeModal = () => setIsModalOpen(false)

   const handleUserTypeSelection = (userType: string) => {
      setCookie('oauth_role', userType, { maxAge: 120 })
      signIn('google', {
         callbackUrl: '/dashboard',
         redirect: true,
      })
      closeModal()
   }

   return (
      <div>
         {/* Trigger Button */}
         <button
            onClick={openModal}
            className="text-base font-medium  text-white  bg-purple-600 px-3 py-2 rounded-md cursor-pointer flex items-center gap-2"
         >
            Signup
         </button>

         {/* Modal Overlay */}
         {isModalOpen && (
            <div className="fixed inset-0 bg-gray-100/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
               {/* Modal Content */}
               <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-200">
                     <h2 className="text-xl font-semibold text-gray-900">
                        What describes you best?
                     </h2>
                     <button
                        onClick={closeModal}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                     >
                        <X className="w-6 h-6" />
                     </button>
                  </div>

                  {/* Modal Body */}
                  <div className="p-6">
                     <p className="text-gray-600 mb-6">
                        Choose your role to get a personalized experience
                     </p>

                     <div className="space-y-4">
                        {/* Creator Option */}
                        <button
                           onClick={() => handleUserTypeSelection('Streamer')}
                           className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 flex items-center gap-4 group"
                        >
                           <div className="p-3 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors">
                              <Palette className="w-6 h-6 text-purple-600" />
                           </div>
                           <div className="text-left">
                              <h3 className="font-semibold text-gray-900">
                                 Streamer
                              </h3>
                              <p className="text-sm text-gray-600">
                                 I want to stream live and engage with users
                              </p>
                           </div>
                        </button>

                        {/* End User Option */}
                        <button
                           onClick={() => handleUserTypeSelection('EndUser')}
                           className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 flex items-center gap-4 group"
                        >
                           <div className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                              <User className="w-6 h-6 text-blue-600" />
                           </div>
                           <div className="text-left">
                              <h3 className="font-semibold text-gray-900">
                                 End User
                              </h3>
                              <p className="text-sm text-gray-600">
                                 I want to consume and interact with streamer
                              </p>
                           </div>
                        </button>
                     </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="px-6 py-4 bg-gray-50 rounded-b-xl">
                     <p className="text-xs text-gray-500 text-center">
                        You can always change this later in your settings
                     </p>
                  </div>
               </div>
            </div>
         )}
      </div>
   )
}
