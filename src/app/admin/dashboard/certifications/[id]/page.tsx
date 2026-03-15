'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/db';
import { Certification } from '@/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

export default function CertificationFormPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const isNew = id === 'new';

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(!isNew);
    const [formData, setFormData] = useState<Partial<Certification>>({
        title_fr: '',
        title_en: '',
        issuer: '',
        date: '',
        order: 0,
    });

    useEffect(() => {
        if (!isNew) fetchItem();
    }, [id]);

    async function fetchItem() {
        const { data } = await supabase.from('certifications').select('*').eq('id', id).single();
        if (data) setFormData(data);
        setFetching(false);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (isNew) {
            await supabase.from('certifications').insert([formData]);
        } else {
            await supabase.from('certifications').update(formData).eq('id', id);
        }
        router.push('/admin/dashboard/certifications');
        router.refresh();
        setLoading(false);
    };

    if (fetching) return <p>Loading...</p>;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center space-x-4">
                <Link href="/admin/dashboard/certifications">
                    <Button variant="ghost" size="sm"><ArrowLeft size={18} /></Button>
                </Link>
                <h1 className="text-3xl font-bold">{isNew ? 'New Certification' : 'Edit Certification'}</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Card className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Title (FR)" name="title_fr" value={formData.title_fr} onChange={handleChange} required />
                        <Input label="Title (EN)" name="title_en" value={formData.title_en} onChange={handleChange} required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Issuer" name="issuer" value={formData.issuer} onChange={handleChange} required />
                        <Input label="Date" name="date" value={formData.date} onChange={handleChange} placeholder="e.g. June 2023" required />
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
