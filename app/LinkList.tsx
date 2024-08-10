'use client'

import { useState, useEffect } from 'react'

interface Link {
  id: string
  url: string
}

export function LinkList() {
  const [links, setLinks] = useState<Link[]>([])

  useEffect(() => {
    fetch('/api/links')
      .then(response => response.json())
      .then(data => setLinks(data))
  }, [])

  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Shared Links</h2>
      {links.length === 0 ? (
        <p>No links shared yet.</p>
      ) : (
        <ul className="space-y-4">
          {links.map(link => (
            <li key={link.id} className="bg-white p-4 rounded shadow">
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline break-all">
                {link.url}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}