"use client";

import React, { useEffect, useState } from 'react';

type Params = {
  params: {
    username: string;
  };
};

type UserProfile = {
  name: string;
  avatar: string;
  bio: string;
  website: string;
  twitter: string;
  github: string;
  linkedin: string;
};

export default function UserProfile({ params }: Params) {
  const { username } = params;
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`/api/users/${username}`);
        if (response.ok) {
          const profile = await response.json();
          setUserProfile(profile);
        } else {
          console.error('Error fetching user profile:', response.statusText);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error fetching user profile:', error.message);
        } else {
          console.error('Unknown error');
        }
      }
    };

    fetchUserProfile();
  }, [username]);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">User Profile</h1>
        <div className="mb-4">
          <img src={userProfile.avatar} alt={`${userProfile.name}'s avatar`} className="w-32 h-32 rounded-full mx-auto mb-4" />
          <h2 className="text-xl font-bold text-center">{userProfile.name}</h2>
        </div>
        <div className="mb-4">
          <p className="text-gray-700"><strong>Bio:</strong> {userProfile.bio}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-700"><strong>Website:</strong> <a href={userProfile.website} target="_blank" rel="noopener noreferrer" className="text-blue-500">{userProfile.website}</a></p>
        </div>
        <div className="mb-4">
          <p className="text-gray-700"><strong>Twitter:</strong> <a href={`https://twitter.com/${userProfile.twitter}`} target="_blank" rel="noopener noreferrer" className="text-blue-500">{userProfile.twitter}</a></p>
        </div>
        <div className="mb-4">
          <p className="text-gray-700"><strong>GitHub:</strong> <a href={`https://github.com/${userProfile.github}`} target="_blank" rel="noopener noreferrer" className="text-blue-500">{userProfile.github}</a></p>
        </div>
        <div className="mb-4">
          <p className="text-gray-700"><strong>LinkedIn:</strong> <a href={`https://linkedin.com/in/${userProfile.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-blue-500">{userProfile.linkedin}</a></p>
        </div>
      </div>
    </div>
  );
}
