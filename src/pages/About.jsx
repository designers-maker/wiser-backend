import React from 'react'
import { SITE } from '../data/siteContent'

export default function About(){
  return (
    <div className="container py-8 sm:py-12 px-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">About {SITE.orgName}</h1>
      <div className="space-y-4 sm:space-y-6 max-w-3xl">
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
          {SITE.orgName} is a volunteer-run registered charity that empowers disadvantaged children and individuals across India.
        </p>
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
          Our mission is to ensure that every child and community has access to education and essential services. We do this through volunteering, partnerships, fellowships and community programs.
        </p>
      </div>
    </div>
  )
}
