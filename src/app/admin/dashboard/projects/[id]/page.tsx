'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc, collection, addDoc } from 'firebase/firestore';
import { uploadFile } from '@/lib/actions';
import { Project } from '@/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProjectFormPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const isNew = id === 'new';

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(!isNew);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const [formData, setFormData] = useState<Partial<Project>>({
        title_fr: '',
        title_en: '',
        description_fr: '',
        description_en: '',
        tech_stack: [],
        repo_url: '',
        live_url: '',
        order: 0,
    });

    useEffect(() => {
        if (!isNew) {
            fetchProject();
        }
    }, [id]);

    async function fetchProject() {
        try {
            const docRef = doc(db, 'projects', id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data() as Project;
                setFormData(data);
                setImagePreview(data.image_url);
            }
        } catch (error) {
            console.error('Error fetching project:', error);
        }
        setFetching(false);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'order' ? Number(value) : value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleTechChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const techs = e.target.value.split(',').map(t => t.trim());
        setFormData(prev => ({ ...prev, tech_stack: techs }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let image_url = formData.image_url;
            let image_public_id = formData.image_public_id;

            if (imageFile) {
                const formData = new FormData();
                formData.append('file', imageFile);
                const uploadRes: any = await uploadFile(formData);
                image_url = uploadRes.secure_url;
                image_public_id = uploadRes.public_id;
            }

            const dataToSave = {
                ...formData,
                image_url,
                image_public_id,
                updated_at: new Date().toISOString(),
            };

            if (isNew) {
                await addDoc(collection(db, 'projects'), {
                    ...dataToSave,
                    created_at: new Date().toISOString(),
                });
            } else {
                await updateDoc(doc(db, 'projects', id), dataToSave);
            }

            router.push('/admin/dashboard/projects');
            router.refresh();
        } catch (error) {
            console.error('Error saving project:', error);
            alert('Failed to save project');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <p>Loading project data...</p>;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center space-x-4">
                <Link href="/admin/dashboard/projects">
                    <Button variant="ghost" size="sm">
                        <ArrowLeft size={18} />
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold">{isNew ? 'New Project' : 'Edit Project'}</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Card className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Title (FR)"
                            name="title_fr"
                            value={formData.title_fr}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            label="Title (EN)"
                            name="title_en"
                            value={formData.title_en}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Textarea
                            label="Description (FR)"
                            name="description_fr"
                            value={formData.description_fr}
                            onChange={handleChange}
                            required
                        />
                        <Textarea
                            label="Description (EN)"
                            name="description_en"
                            value={formData.description_en}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Repository URL"
                            name="repo_url"
                            value={formData.repo_url}
                            onChange={handleChange}
                            placeholder="https://github.com/..."
                        />
                        <Input
                            label="Live URL"
                            name="live_url"
                            value={formData.live_url}
                            onChange={handleChange}
                            placeholder="https://..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Technologies (comma separated)"
                            name="tech_stack"
                            value={formData.tech_stack?.join(', ')}
                            onChange={handleTechChange}
                            placeholder="Next.js, Tailwind, TypeScript"
                        />
                        <Input
                            label="Display Order"
                            name="order"
                            type="number"
                            value={formData.order}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Project Image</label>
                        <div className="flex items-center space-x-4">
                            <div className="relative w-32 h-32 rounded-xl overflow-hidden border-2 border-dashed border-gray-200 dark:border-gray-800 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                                {imagePreview ? (
                                    <>
                                        <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => { setImagePreview(null); setImageFile(null); }}
                                            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full"
                                        >
                                            <X size={12} />
                                        </button>
                                    </>
                                ) : (
                                    <Upload className="text-gray-400" />
                                )}
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                                id="image-upload"
                            />
                            <label htmlFor="image-upload">
                                <Button type="button" variant="outline" size="sm" asChild>
                                    <span>Choose Image</span>
                                </Button>
                            </label>
                        </div>
                    </div>
                </Card>

                <div className="flex justify-end">
                    <Button type="submit" disabled={loading} className="flex items-center space-x-2">
                        <Save size={18} />
                        <span>{loading ? 'Saving...' : 'Save Project'}</span>
                    </Button>
                </div>
            </form>
        </div>
    );
}
