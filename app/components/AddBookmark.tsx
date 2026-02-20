"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase/client";

export default function AddBookmark({ userId }: { userId: string }) {
    const [title, setTitle] = useState(" ");
    const [url, setUrl] = useState("");
    const handleAdd = async () => {
        const { data } = await supabase.auth.getUser()
        console.log("Current user:", data.user)

        if (!title || !url) return alert("fill all field")

        const { error } = await supabase.from("bookmarks").insert([
            {
                title,
                url,
                user_id: userId,
            },
        ])

        if (error) {
            console.log(error)
            alert(error.message)
        } else {
            alert("Bookmark added")
        }
    }



    return (
        <div className="bg-white p-4 rounded shadow-md space-y-3">
            <input type="text"
                placeholder="title name enter"
                className="border p-2 w-full rounded"
                value={title}
                onChange={(e) => setTitle(e.target.value)} />

            <input
                type="text"
                placeholder="URL"
                className="border p-2 w-full rounded"
                value={url}
                onChange={(e) => setUrl(e.target.value)} />

            <button onClick={handleAdd}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded">

                Add Bookmark
            </button>
        </div>
    );
}