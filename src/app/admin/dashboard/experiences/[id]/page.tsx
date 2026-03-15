'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/db';
import { Experience } from '@/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

export default function ExperienceFormPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const isNew = id === 'new';

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(!isNew);
    const [formData, setFormData] = useState<Partial<Experience>>({
        title_fr: '',
        title_en: '',
        company: '',
        start_date: '',
        end_date: '',
        description_fr: '',
        description_en: '',
        type: 'job',
        order: 0,
    });

    useEffect(() => {
        if (!isNew) fetchItem();
    }, [id]);

    async function fetchItem() {
        const { data } = await supabase.from('experiences').select('*').eq('id', id).single();
        if (data) setFormData(data);
        setFetching(false);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (isNew) {
            await supabase.from('experiences').insert([formData]);
        } else {
            await supabase.from('experiences').update(formData).eq('id', id);
        }
        router.push('/admin/dashboard/experiences');
        router.refresh();
        setLoading(false);
    };

    if (fetching) return <p>Loading...</p>;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center space-x-4">
                <Link href="/admin/dashboard/experiences">
                    <Button variant="ghost" size="sm"><ArrowLeft size={18} /></Button>
                </Link>
                <h1 className="text-3xl font-bold">{isNew ? 'New Experience' : 'Edit Experience'}</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Card className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Title (FR)" name="title_fr" value={formData.title_fr} onChange={handleChange} required />
                        <Input label="Title (EN)" name="title_en" value={formData.title_en} onChange={handleChange} required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Company / Institution" name="company" value={formData.company} onChange={handleChange} required />
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium">Type</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary dark:border-gray-800 dark:bg-black"
                            >
                                <option value="job">Job</option>
                                <option value="education">Education</option>
                                <option value="event">Event</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Start Date" name="start_date" placeholder="e.g. Jan 2020" value={formData.start_date} onChange={handleChange} required />
                        <Input label="End Date" name="end_date" placeholder="e.g. Present" value={formData.end_date} onChange={handleChange} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Textarea label="Description (FR)" name="description_fr" value={formData.description_fr} onChange={handleChange} required />
                        <Textarea label="Description (EN)" name="description_en" value={formData.description_en} onChange={handleChange} required />
                    </div>
                    <Input label="Order" name="order" type="number" value={formData.order} onChange={handleChange} required />
                </Card>
                <div className="flex justify-end">
                    <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
                </div>
            </form>
        </div>
    );
}
