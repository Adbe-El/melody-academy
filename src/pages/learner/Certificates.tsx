import React, { useEffect, useState } from 'react';
import { Award } from 'lucide-react';
import { useLearner } from '../../context/LearnerContext';
import { getCertificatesByLearner } from '../../services/certificates';
import { EmptyState } from '../../components/ui/EmptyState';
import { Skeleton } from '../../components/ui/Skeleton';
import type { Certificate } from '../../types';

export const Certificates: React.FC = () => {
  const { learnerId, loading: learnerLoading } = useLearner();
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (learnerLoading) return;
    if (!learnerId) { setLoading(false); return; }
    getCertificatesByLearner(learnerId)
      .then(setCerts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [learnerId, learnerLoading]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <Skeleton variant="title" />
        <Skeleton variant="card" count={2} />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 text-center">Certificates</h1>

      {certs.length === 0 ? (
        <EmptyState
          icon={Award}
          title="No certificates yet"
          description="Complete your programme to earn a certificate."
        />
      ) : (
        <div className="space-y-6">
          {certs.map(cert => (
            <div key={cert.id} className="bg-academy-cream-light p-8 rounded-3xl border-4 border-academy-emerald text-center space-y-4 shadow-xl relative">
              <div className="w-16 h-16 rounded-full bg-academy-emerald text-academy-gold mx-auto flex items-center justify-center shadow-lg">
                <Award className="w-10 h-10" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-academy-emerald">Official Academy Certificate</span>
              <h3 className="font-serif text-3xl font-bold text-gray-900">Certificate of Completion</h3>
              <p className="text-xs text-gray-600">This is proudly awarded to</p>
              <p className="font-serif text-3xl font-bold text-academy-emerald border-b border-academy-emerald/20 pb-2 inline-block px-8">
                {cert.learnerName}
              </p>
              <p className="text-xs text-gray-700">for successfully fulfilling the curriculum requirements of</p>
              <p className="font-serif text-xl font-bold text-gray-900">{cert.programmeTitle}</p>
              <div className="pt-4 flex items-center justify-between text-xs text-gray-500 border-t border-gray-200">
                <span>Issue Date: {cert.issueDate}</span>
                <span>Code: {cert.certificateCode}</span>
              </div>
              <button
                onClick={() => window.print()}
                className="px-6 py-2.5 rounded-full bg-academy-emerald text-white font-bold text-xs shadow hover:bg-academy-emerald-hover transition-all"
              >
                Print Certificate
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
