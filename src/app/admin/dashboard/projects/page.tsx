'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { Project } from '@/types';
import { useI18n } from '@/context/I18nContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Plus, Pencil, Trash2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProjectsListPage() {
    const { language } = useI18n();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    async function fetchProjects() {
        setLoading(true);
        try {
            const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Project[];
            setProjects(data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
        setLoading(false);
    }

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this project?')) return;

        try {
            await deleteDoc(doc(db, 'projects', id));
            setProjects(projects.filter(p => p.id !== id));
        } catch (error) {
            console.error('Error deleting project:', error);
            alert('Failed to delete project');
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Projects</h1>
                    <p className="text-gray-500">Manage your portfolio projects.</p>
                </div>
                <Link href="/admin/dashboard/projects/new">
                    <Button className="flex items-center space-x-2">
                        <Plus size={18} />
                        <span>Add Project</span>
                    </Button>
                </Link>
            </div>

            {loading ? (
                <p>Loading projects...</p>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {projects.map((project) => (
                        <Card key={project.id} className="flex items-center justify-between p-4">
                            <div className="flex items-center space-x-4">
                                <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800">
                                    <Image
                                        src={project.image_url || '/next.svg'}
                                        alt={project.title_fr}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold">
                                        {language === 'fr' ? project.title_fr : project.title_en}
                                    </h3>
                                    <p className="text-sm text-gray-500">Order: {project.order}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Link href={`/admin/dashboard/projects/${project.id}`}>
                                    <Button variant="outline" size="sm">
                                        <Pencil size={16} />
                                    </Button>
                                </Link>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-500 hover:text-red-600"
                                    onClick={() => handleDelete(project.id)}
                                >
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                        </Card>
                    ))}

                    {projects.length === 0 && (
                        <Card className="text-center py-12">
                            <p className="text-gray-500">No projects found. Add your first one!</p>
                        </Card>
                    )}
                </div>
            )}
        </div>
    );
}
