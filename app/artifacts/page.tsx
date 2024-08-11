import React from 'react';
import ArtifactSubmission from '@/components/ArtifactSubmission';

export default function ArtifactsPage() {
  return (
    <div className="min-h-screen p-24">
      <h1 className="text-4xl font-bold mb-8 text-center">Artifacts</h1>
      <ArtifactSubmission />
    </div>
  );
}