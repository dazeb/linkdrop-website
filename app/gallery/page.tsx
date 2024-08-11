import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '../../lib/prisma';

interface Artifact {
  id: string;
  url: string;
  imageUrl: string;
  title: string;
}

async function getArtifacts(): Promise<Artifact[]> {
  const artifacts = await prisma.artifact.findMany();
  return artifacts;
}

export default async function GalleryPage() {
  const artifacts = await getArtifacts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Artifact Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {artifacts.map((artifact) => (
          <Link href={artifact.url} key={artifact.id} className="block">
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48">
                <Image
                  src={artifact.imageUrl}
                  alt={artifact.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{artifact.title}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}