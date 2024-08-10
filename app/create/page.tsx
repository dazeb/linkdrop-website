'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateLink() {
  const [url, setUrl] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/links', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    })
    if (response.ok) {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Share New Link</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          required
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
        />
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Share Link
        </button>
      </form>
    </div>
  )
}