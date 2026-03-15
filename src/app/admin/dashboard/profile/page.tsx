'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Profile } from '@/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';
import { Save, Upload } from 'lucide-react';
import { uploadImage } from '@/lib/cloudinary';
import Image from 'next/image';

export default function ProfilePage() {
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [profile, setProfile] = useState<Partial<Profile>>({
        name: '',
        bio_fr: '',
        bio_en: '',
        profile_image_url: '',
        social_links: {},
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    async function fetchProfile() {
        try {
            const docRef = doc(db, 'profile', 'main');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setProfile(docSnap.data() as Profile);
                setImagePreview(docSnap.data().profile_image_url);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
        setFetching(false);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name.startsWith('social_')) {
            const platform = name.replace('social_', '');
            setProfile(prev => ({
                ...prev,
                social_links: { ...prev.social_links, [platform]: value }
            }));
        } else {
            setProfile(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let profile_image_url = profile.profile_image_url;
            if (imageFile) {
                const uploadRes: any = await uploadImage(imageFile);
                profile_image_url = uploadRes.secure_url;
            }

            const docRef = doc(db, 'profile', 'main');
            await setDoc(docRef, {
                ...profile,
                profile_image_url,
                updated_at: new Date().toISOString()
            }, { merge: true });

            alert('Profile updated successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <p>Loading...</p>;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Profile Settings</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Card className="space-y-6">
                    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                        <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-brand-primary">
                            {imagePreview ? (
                                <Image src={imagePreview} alt="Profile" fill className="object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                                    <Upload />
                                </div>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Profile Picture</label>
                            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="pfp-upload" />
                            <label htmlFor="pfp-upload">
                                <Button type="button" variant="outline" size="sm" asChild>
                                    <span>Change Photo</span>
                                </Button>
                            </label>
                        </div>
                    </div>

                    <Input label="Name" name="name" value={profile.name} onChange={handleChange} required />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Textarea label="Bio (FR)" name="bio_fr" value={profile.bio_fr} onChange={handleChange} required />
                        <Textarea label="Bio (EN)" name="bio_en" value={profile.bio_en} onChange={handleChange} required />
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold border-b pb-2">Social Links</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="GitHub" name="social_github" value={profile.social_links?.github} onChange={handleChange} />
                            <Input label="LinkedIn" name="social_linkedin" value={profile.social_links?.linkedin} onChange={handleChange} />
                            <Input label="Twitter" name="social_twitter" value={profile.social_links?.twitter} onChange={handleChange} />
                            <Input label="Email" name="social_email" value={profile.social_links?.email} onChange={handleChange} />
                        </div>
                    </div>
                </Card>

                <div className="flex justify-end">
                    <Button type="submit" disabled={loading} className="flex items-center space-x-2">
                        <Save size={18} />
                        <span>{loading ? 'Saving...' : 'Save Profile'}</span>
                    </Button>
                </div>
            </form>
        </div>
    );
}
