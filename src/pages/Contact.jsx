import React from 'react'
import { SITE } from '../data/siteContent'

export default function Contact(){
  return (
    <div className="container py-8 sm:py-12 px-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">Get in touch</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Contact Information</h2>
          <div className="space-y-3 sm:space-y-4">
            <div>
              <p className="font-semibold text-sm sm:text-base mb-1">Address</p>
              <p className="text-sm sm:text-base text-gray-700">{SITE.address}</p>
            </div>
            <div>
              <p className="font-semibold text-sm sm:text-base mb-1">Phone</p>
              <p className="text-sm sm:text-base text-gray-700">{SITE.phone}</p>
            </div>
            <div>
              <p className="font-semibold text-sm sm:text-base mb-1">Email</p>
              <p className="text-sm sm:text-base text-gray-700">{SITE.email}</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Send us a message</h2>
          <form className="space-y-4" onSubmit={(e)=>e.preventDefault()}>
            <input 
              type="text" 
              placeholder="Name" 
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent text-sm sm:text-base"
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent text-sm sm:text-base"
            />
            <textarea 
              placeholder="Message" 
              rows="5"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent text-sm sm:text-base resize-none"
            ></textarea>
            <button 
              type="submit" 
              className="w-full sm:w-auto bg-red-700 text-white px-6 py-2.5 sm:px-8 sm:py-3 rounded-lg hover:bg-red-800 transition-colors font-semibold text-sm sm:text-base"
            >
              Send Message
            </button>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              This is a static frontend. To accept messages you'd connect the form to a backend or a service like Formspree / Netlify Forms / EmailJS.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
