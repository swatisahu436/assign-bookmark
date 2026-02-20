"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/utils/supabase/client"

interface Bookmark {
  id: string
  title: string
  url: string
}

export default function FetchList({ userId }: { userId: string }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])

  const handleDelete = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id)
  }

  useEffect(() => {
    const fetchBookmarks = async () => {
      const { data } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", userId)

      if (data) setBookmarks(data)
    }

    fetchBookmarks()

    const channel = supabase
      .channel("bookmarks-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${userId}`,
        },
        () => {
          fetchBookmarks()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId])

  return (
    <div className="space-y-3 mt-4">
      <h3 className="font-semibold">Bookmark list:</h3>
      {bookmarks.map((item) => (
        <div key={item.id} className="border p-3 rounded grid grid-cols-2  gap-72 ">
          <div> <h3 className="font-bold text-2xl">{item.title}</h3>
            <a href={item.url} target="_blank" className="text-blue-600 my-2.5 underline">
              {item.url}
            </a>
          </div>
          <div className="m-3 ">
          <button
            onClick={() => handleDelete(item.id)}
            className="text-red-700 font-extrabold bg-blue-400 p-1.5 rounded"
          >
            Delete
          </button>
          </div>
        </div>
      ))}
    </div>
  )
}
