import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { writeFile } from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const url = formData.get('url') as string;
    const title = formData.get('title') as string;
    const image = formData.get('image') as File;

    if (!url || !title || !image) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Save the image
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const imageName = `${Date.now()}-${image.name}`;
    const imagePath = path.join(process.cwd(), 'public', 'uploads', imageName);
    await writeFile(imagePath, buffer);
    const imageUrl = `/uploads/${imageName}`;

    // Save to database
    const newArtifact = await prisma.artifact.create({
      data: {
        url,
        title,
        imageUrl,
      },
    });

    return NextResponse.json(newArtifact, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/links:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// ... (keep or add GET method to fetch artifacts)
