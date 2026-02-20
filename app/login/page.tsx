"use client"

import { supabase } from "@/utils/supabase/client"
import search from "@/utils/search.png";

export default function Home() {

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
  provider: "google",
  options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
})

  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      
      <div><button
        onClick={handleGoogleLogin}
        className="flex gap-2 px-6 py-3 bg-black text-white rounded-lg"
      >
        <img src={search.src} alt="google" className="h-6 w-6"/>        
        Continue with Google
      </button>
      </div>
    </main>
  )
}
