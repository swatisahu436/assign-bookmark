import Link from "next/link"

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Home Page</h1>

      <div className="mt-4 space-x-4">
        <Link href="/login" className="text-blue-600">
          Login
        </Link>

        <Link href="/dashboard" className="text-green-600">
          Dashboard
        </Link>
      </div>
    </div>
  )
}