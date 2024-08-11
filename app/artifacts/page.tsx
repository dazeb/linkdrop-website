"use client"

import React from 'react';
import ArtifactsApp from '@/components/ArtifactsApp';

export default function ArtifactsPage() {
  return (
    <div className="min-h-screen p-24">
      <h1 className="text-4xl font-bold mb-8 bg-white text-center">Artifacts</h1>
      <ArtifactsApp />
    </div>
  );
}