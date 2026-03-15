'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { Experience } from '@/types';
import { useI18n } from '@/context/I18nContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function ExperiencesListPage() {
    const { language } = useI18n();
    const [items, setItems] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchItems();
    }, []);

    async function fetchItems() {
        setLoading(true);
        try {
            const q = query(collection(db, 'experiences'), orderBy('order', 'asc'));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Experience[];
            setItems(data);
        } catch (error) {
            console.error('Error fetching experiences:', error);
        }
        setLoading(false);
    }

    async function handleDelete(id: string) {
        if (!confirm('Delete this experience?')) return;
        try {
            await deleteDoc(doc(db, 'experiences', id));
            setItems(items.filter(i => i.id !== id));
        } catch (error) {
            console.error('Error deleting experience:', error);
            alert('Failed to delete experience');
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Experiences</h1>
                    <p className="text-gray-500">Manage your work, education and events.</p>
                </div>
                <Link href="/admin/dashboard/experiences/new">
                    <Button className="flex items-center space-x-2">
                        <Plus size={18} />
                        <span>Add Experience</span>
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
                                <p className="text-sm text-gray-500">
                                    {item.company} • {item.type.toUpperCase()}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {item.start_date} - {item.end_date || 'Present'}
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Link href={`/admin/dashboard/experiences/${item.id}`}>
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
