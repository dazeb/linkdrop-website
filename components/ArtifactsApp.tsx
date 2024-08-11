"use client"

import React, { useState, useEffect, useRef } from 'react';
import { PlusCircle, Upload } from 'lucide-react';
import Image from 'next/image';
import { Artifact } from '@prisma/client';

// ... (keep existing imports and interface)

const ArtifactsApp: React.FC = () => {
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [newArtifact, setNewArtifact] = useState({ url: '', title: '', imagePath: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ... (keep existing useEffect and fetchArtifacts function)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewArtifact({ ...newArtifact, imagePath: e.target.files[0].name });
    }
  };

  const validateUrl = (url: string): boolean => {
  const regex = /^https:\/\/claude\.site\/artifacts\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
  return regex.test(url);
};


const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (validateUrl(newArtifact.url) && newArtifact.title && fileInputRef.current?.files?.[0]) {
    setIsSubmitting(true);
    const formData = new FormData();
      formData.append('url', newArtifact.url);
      formData.append('title', newArtifact.title);
      formData.append('image', fileInputRef.current.files[0]);

      try {
        const response = await fetch('/api/links', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const addedArtifact = await response.json();
          setArtifacts(prevArtifacts => [addedArtifact, ...prevArtifacts]);
          setNewArtifact({ url: '', title: '', imagePath: '' });
          if (fileInputRef.current) fileInputRef.current.value = '';
          setError('');
        } else {
          setError('Failed to add artifact');
        }
      } catch (error) {
        console.error('Error submitting artifact:', error);
        setError('An error occurred while adding the artifact');
      } finally {
        setIsSubmitting(false);
      }
  } else {
    setError('Please fill all fields with valid information and upload an image.');
  }
};

  // ... (keep existing validateUrl function)

// ... (previous code remains the same)

return (
  <div className="min-h-screen bg-background text-foreground p-8 ">
    <h1 className="text-4xl font-bold mb-8 text-center">Claude Artifacts</h1>
    <p className="text-center mb-8">Submit Artifacts from Claude.ai and share them with the community!</p>

    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <input
            type="url"
            value={newArtifact.url}
            onChange={(e) => setNewArtifact({ ...newArtifact, url: e.target.value })}
            placeholder="https://claude.site/artifacts/..."
            className="w-full px-4 py-2 rounded-2xl bg-[#f8f8f7] border border-input shadow-[0px_4px_20px_0px_rgba(0,0,0,0.035)]"
            required
          />
        </div>
        <div>
          <input
            type="text"
            value={newArtifact.title}
            onChange={(e) => setNewArtifact({ ...newArtifact, title: e.target.value })}
            placeholder="Artifact Title"
            className="w-full px-4 py-2 rounded-2xl bg-[#f8f8f7] border border-input shadow-[0px_4px_20px_0px_rgba(0,0,0,0.035)]"
            required
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newArtifact.imagePath}
            placeholder="No file chosen"
            className="flex-grow px-4 py-2 rounded-2xl bg-[#f8f8f7] border border-input shadow-[0px_4px_20px_0px_rgba(0,0,0,0.035)]"
            readOnly
          />
          <label className="flex-shrink-0 px-4 py-2 bg-primary text-primary-foreground rounded-2xl cursor-pointer hover:bg-primary/90 transition-colors duration-200">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
              required
            />
            <Upload size={18} className="inline mr-2" />
            Choose File
          </label>
        </div>
        {/* ... (rest of the form remains the same) */}
      </form>
      {/* ... (artifact list rendering remains the same) */}
    </div>
  </div>
);

// ... (rest of the component remains the same)


};


export default ArtifactsApp;
function validateUrl(url: string) {
  throw new Error('Function not implemented.');
}

