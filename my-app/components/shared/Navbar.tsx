'use client'

import Link from 'next/link'
import { Search, Menu, X } from 'lucide-react'
import React, { useState } from 'react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const links = ['Home', 'About', 'Gameplay', 'Characters']

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-16 lg:px-38 font-bold text-white">
  

      <Link href="/" className="flex-1 md:flex-none">
        <img 
          src="logo.png" 
          alt="logo" 
          className="w-60 h-60 max-md:w-28 invert"  
        />
      </Link>

      <div className="hidden md:flex items-center gap-29">
        {links.map((link) => (
          <Link 
            key={link}
            href={`/${link.toLowerCase()}`}
            className="font-medium hover:text-blue-600 transition-colors"
          >
            {link}
          </Link>
        ))}
      </div>

      <div className="hidden md:block ml-4">
        <Search className="cursor-pointer" />
      </div>

      <button 
        className="md:hidden p-2"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      >
        <Menu size={28} />
      </button>

      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-60 z-50">
          <div className="absolute top-0 right-0 h-full w-3/4 bg-white p-6 shadow-lg">
            <div className="flex justify-end mb-8">
              <button 
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <X size={28} />
              </button>
            </div>
            
            <div className="flex flex-col gap-6">
              {links.map((link) => (
                <Link
                  key={link}
                  href={`/${link.toLowerCase()}`}
                  className="text-xl font-medium py-2 border-b border-gray-200"
                  onClick={() => setIsOpen(false)}
                >
                  {link}
                </Link>
              ))}
              <div className="flex items-center mt-4 border-b border-gray-300 pb-3">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="flex-1 outline-none py-1"
                />
                <Search className="ml-2 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar