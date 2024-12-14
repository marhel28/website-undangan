'use client'

import { signOut } from 'next-auth/react'
import { useState } from 'react'

interface CustomSignOutButtonProps {
  className?: string
}

export default function Signout({ className = '' }: CustomSignOutButtonProps) {
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleSignOut = async () => {
    setIsSigningOut(true)
    try {
      await signOut({ callbackUrl: '/' })
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setIsSigningOut(false)
    }
  }

  return (
    <button
      onClick={handleSignOut}
      disabled={isSigningOut}
      className={`text-sm bg-transparant border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg pt-2.5 pb-3 w-full md:w-fit px-7 capitalize font-medium text-center ${className}`}
    >
      {isSigningOut ? 'Signing Out...' : 'Sign Out'}
    </button>
  );
}