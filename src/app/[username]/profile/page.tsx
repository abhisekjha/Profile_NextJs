"use client";

import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { Label } from '@radix-ui/react-label';
import { Form } from '@radix-ui/react-form';
import 'tailwindcss/tailwind.css';

type Params = {
  params: {
    username: string;
  };
};

export default function UserProfile({ params }: Params) {
  const { username } = params;
  const [user, setUser] = useState({
    username: '',
    name: '',
    avatar: '',
    bio: '',
    website: '',
    twitter: '',
    github: '',
    linkedin: ''
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`/api/users/${username}`);
        if (response.ok) {
          const profile = await response.json();
          setUser((prevState) => ({ ...prevState, ...profile }));
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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch('/api/users/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      const data = await response.json();
      alert('User profile updated successfully');
    } else {
      const errorData = await response.json();
      alert('Error updating user profile: ' + errorData.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Edit User Profile</h1>
      <Form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <Label htmlFor="username" className="block text-gray-700">Username</Label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={user.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            readOnly
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="name" className="block text-gray-700">Name</Label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={user.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="avatar" className="block text-gray-700">Avatar URL</Label>
          <input
            type="text"
            id="avatar"
            name="avatar"
            placeholder="Avatar URL"
            value={user.avatar}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="bio" className="block text-gray-700">Bio</Label>
          <textarea
            id="bio"
            name="bio"
            placeholder="Bio"
            value={user.bio}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          ></textarea>
        </div>
        <div className="mb-4">
          <Label htmlFor="website" className="block text-gray-700">Website</Label>
          <input
            type="text"
            id="website"
            name="website"
            placeholder="Website"
            value={user.website}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="twitter" className="block text-gray-700">Twitter</Label>
          <input
            type="text"
            id="twitter"
            name="twitter"
            placeholder="Twitter"
            value={user.twitter}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="github" className="block text-gray-700">GitHub</Label>
          <input
            type="text"
            id="github"
            name="github"
            placeholder="GitHub"
            value={user.github}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="linkedin" className="block text-gray-700">LinkedIn</Label>
          <input
            type="text"
            id="linkedin"
            name="linkedin"
            placeholder="LinkedIn"
            value={user.linkedin}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="flex justify-center">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Save Profile</button>
        </div>
      </Form>
    </div>
  );
}
