'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/db';
import { Certification } from '@/types';
import { useI18n } from '@/context/I18nContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function CertificationsListPage() {
    const { language } = useI18n();
    const [items, setItems] = useState<Certification[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchItems();
    }, []);

    async function fetchItems() {
        setLoading(true);
        const { data } = await supabase
            .from('certifications')
            .select('*')
            .order('order', { ascending: true });

        if (data) setItems(data);
        setLoading(false);
    }

    async function handleDelete(id: string) {
        if (!confirm('Delete this certification?')) return;
        const { error } = await supabase.from('certifications').delete().eq('id', id);
        if (!error) setItems(items.filter(i => i.id !== id));
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Certifications</h1>
                    <p className="text-gray-500">Manage your diplomas and certifications.</p>
                </div>
                <Link href="/admin/dashboard/certifications/new">
                    <Button className="flex items-center space-x-2">
                        <Plus size={18} />
                        <span>Add Certification</span>
                    </Button>
                </Link>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {items.map((item) => (
                        <Card key={item.id} className="flex items-center justify-between p-4">
                            <div>
                                <h3 className="font-bold">
                                    {language === 'fr' ? item.title_fr : item.title_en}
                                </h3>
                                <p className="text-sm text-gray-500">{item.issuer} • {item.date}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Link href={`/admin/dashboard/certifications/${item.id}`}>
                                    <Button variant="outline" size="sm">
                                        <Pencil size={16} />
                                    </Button>
                                </Link>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-500"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
