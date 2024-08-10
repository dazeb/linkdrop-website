import fs from 'fs/promises'
import path from 'path'
import Link from 'next/link'

export default async function LinkPage({ params }: { params: { id: string } }) {
  const dbPath = path.join(process.cwd(), 'db.json')
  const data = JSON.parse(await fs.readFile(dbPath, 'utf8'))
  const link = data.links.find((l: any) => l.id === params.id)

  if (!link) {
    return <div>Link not found</div>
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Your LinkDrop</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <p className="mb-4">Heres your shortened link:</p>
        <Link href={link.url} className="text-blue-500 hover:underline break-all">
          {`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/link/${link.id}`}
        </Link>
      </div>
    </div>
  )
}