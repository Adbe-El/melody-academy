import React, { useEffect, useState } from 'react';
import { BookOpen } from 'lucide-react';
import { useLearner } from '../../context/LearnerContext';
import { getLessonNotesByLearner } from '../../services/lessonNotes';
import { EmptyState } from '../../components/ui/EmptyState';
import { Skeleton } from '../../components/ui/Skeleton';
import { YouTubeEmbed } from '../../components/common/YouTubeEmbed';
import type { LessonNote } from '../../types';

export const LessonNotes: React.FC = () => {
  const { learnerId, loading: learnerLoading } = useLearner();
  const [notes, setNotes] = useState<LessonNote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (learnerLoading) return;
    if (!learnerId) { setLoading(false); return; }
    getLessonNotesByLearner(learnerId)
      .then(setNotes)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [learnerId, learnerLoading]);

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
      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">Lesson Notes</h1>

      {notes.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No lesson notes yet"
          description="Your tutor will post lesson notes here."
        />
      ) : (
        <div className="space-y-4">
          {notes.map(note => (
            <div key={note.id} className="bg-white p-6 rounded-3xl border border-gray-200/80 space-y-3 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-academy-emerald bg-academy-sage px-3 py-1 rounded-full">
                  {note.upload_date}
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-gray-900">{note.title}</h3>
              <p className="text-xs text-gray-700 font-semibold">Topic: {note.topic}</p>
              <div className="p-4 bg-academy-cream-light rounded-2xl text-xs text-gray-700 leading-relaxed border border-gray-200/60">
                {note.content}
              </div>
              {note.video_url && (
                <YouTubeEmbed url={note.video_url} title={note.title} />
              )}
              <div className="p-4 bg-academy-sage rounded-2xl text-academy-emerald space-y-1">
                <p className="text-xs font-bold uppercase">Practice Goal:</p>
                <p className="text-xs">{note.practice_goals}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
