"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/utils/supabase/client"

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleSession = async () => {
      await supabase.auth.getSession()
      router.push("/dashboard")
    }

    handleSession()
  }, [router])

  return <p>Logging in...</p>
}
