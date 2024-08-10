import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const dbPath = path.join(process.cwd(), 'db.json')

export async function GET() {
  const data = JSON.parse(await fs.readFile(dbPath, 'utf8'))
  return NextResponse.json(data.links)
}

export async function POST(request: Request) {
  const { url } = await request.json()
  const data = JSON.parse(await fs.readFile(dbPath, 'utf8'))
  const id = Math.random().toString(36).substr(2, 9)
  data.links.push({ id, url })
  
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2))
  
  return NextResponse.json({ id, url })
}