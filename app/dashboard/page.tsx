"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/utils/supabase/client"
import AddBookmark from "../components/AddBookmark"
import FetchList from "../components/FetchList"

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }

    getUser()
  }, [])

  if (!user) return <p className="p-6">Loading...</p>

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">
        Welcome {user.email}
      </h1>

      <div className="mb-6">
        <AddBookmark userId={user.id} />
      </div>

      <hr className="my-4" />

      <FetchList userId={user.id} />
    </div>
  )
}