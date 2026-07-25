import React, { useEffect, useState } from 'react';
import { Download, FileText, Music, File } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { getLearnerByUserId } from '../../services/learners';
import { getResourcesByProgramme } from '../../services/resources';
import { EmptyState } from '../../components/ui/EmptyState';
import { Skeleton } from '../../components/ui/Skeleton';
import type { LMSResource } from '../../types';

const fileTypeIcons: Record<string, React.ReactNode> = {
  pdf: <FileText className="w-5 h-5" />,
  audio: <Music className="w-5 h-5" />,
  sheet_music: <File className="w-5 h-5" />,
};

export const Resources: React.FC = () => {
  const { user } = useAuth();
  const [resources, setResources] = useState<LMSResource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        if (!user) return;
        const learner = await getLearnerByUserId(user.id);
        if (learner) {
          const data = await getResourcesByProgramme(learner.programmeId);
          setResources(data);
        }
      } catch { /* empty */ } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <Skeleton variant="title" />
        <Skeleton variant="card" count={3} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">Learning Resources</h1>

      {resources.length === 0 ? (
        <EmptyState
          icon={Download}
          title="No resources available yet"
          description="Your tutor will upload learning materials here."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map(res => (
            <div key={res.id} className="bg-white p-6 rounded-3xl border border-gray-200/80 space-y-3 shadow-sm flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-academy-sage text-academy-emerald flex items-center justify-center">
                  {fileTypeIcons[res.fileType] || <FileText className="w-5 h-5" />}
                </div>
                <span className="text-[10px] font-bold text-academy-emerald uppercase">{res.category}</span>
                <h3 className="font-serif text-base font-bold text-gray-900">{res.title}</h3>
                <p className="text-xs text-gray-500 font-medium">Format: {res.fileType.toUpperCase()}</p>
              </div>
              <button
                onClick={() => window.open(res.fileUrl, '_blank')}
                className="w-full py-2.5 rounded-full bg-academy-emerald text-white text-xs font-bold hover:bg-academy-emerald-hover transition-all flex items-center justify-center gap-2 shadow"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
