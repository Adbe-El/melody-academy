import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  FileText,
  Download,
  Award,
  Bell,
  CheckCircle2,
  Clock,
  Send,
  User,
  Music,
  BarChart3
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LearnerPortal: React.FC = () => {
  const {
    learners,
    lessonNotes,
    assignments,
    resources,
    certificates,
    announcements,
    submitAssignment
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'notes' | 'assignments' | 'resources' | 'certificates'>('overview');

  // Currently logged in learner demo (Jessica Bennett)
  const currentLearner = learners[0];

  const learnerNotes = lessonNotes.filter(n => n.learnerId === currentLearner?.id);
  const learnerAssignments = assignments.filter(a => a.learnerId === currentLearner?.id);
  const learnerCerts = certificates.filter(c => c.learnerId === currentLearner?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Learner Welcome Header Banner */}
      <div className="bg-academy-emerald rounded-3xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white/10 text-academy-gold px-3.5 py-1 rounded-full text-xs font-semibold border border-white/10">
            <GraduationCap className="w-4 h-4" /> Enrolled Learner Portal
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold">
            Welcome back, {currentLearner?.fullName}!
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm">
            Enrolled Programme: <span className="font-semibold text-white">{currentLearner?.programmeTitle}</span> • Tutor: <span className="text-academy-gold">{currentLearner?.instructorName}</span>
          </p>
        </div>

        {/* Progress Badge */}
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-center min-w-[200px]">
          <p className="text-xs text-gray-300 uppercase tracking-wider font-semibold">Course Progress</p>
          <p className="font-serif text-3xl font-bold text-academy-gold">{currentLearner?.progressPercentage}%</p>
          <div className="w-full bg-white/20 h-2 rounded-full mt-2 overflow-hidden">
            <div className="bg-academy-gold h-full rounded-full" style={{ width: `${currentLearner?.progressPercentage}%` }}></div>
          </div>
        </div>
      </div>

      {/* Sub Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-200">
        <button
          onClick={() => setActiveSubTab('overview')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'overview' ? 'bg-academy-emerald text-white shadow-sm' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" /> Dashboard Overview
        </button>

        <button
          onClick={() => setActiveSubTab('notes')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'notes' ? 'bg-academy-emerald text-white shadow-sm' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" /> Lesson Notes ({learnerNotes.length})
        </button>

        <button
          onClick={() => setActiveSubTab('assignments')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'assignments' ? 'bg-academy-emerald text-white shadow-sm' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <FileText className="w-3.5 h-3.5" /> Assignments ({learnerAssignments.length})
        </button>

        <button
          onClick={() => setActiveSubTab('resources')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'resources' ? 'bg-academy-emerald text-white shadow-sm' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <Download className="w-3.5 h-3.5" /> Learning Resources ({resources.length})
        </button>

        <button
          onClick={() => setActiveSubTab('certificates')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'certificates' ? 'bg-academy-emerald text-white shadow-sm' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <Award className="w-3.5 h-3.5" /> Certificates ({learnerCerts.length})
        </button>
      </div>

      {/* --- TAB 1: OVERVIEW --- */}
      {activeSubTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Recent Lesson Note Card */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-academy-emerald bg-academy-sage px-3 py-1 rounded-full">
                  Latest Lesson Notes
                </span>
                <span className="text-xs text-gray-500 font-medium">{learnerNotes[0]?.dateAssigned}</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-gray-900">{learnerNotes[0]?.title}</h3>
              <p className="text-xs text-gray-700 font-semibold">Topic: {learnerNotes[0]?.topic}</p>
              <p className="text-xs text-gray-600 leading-relaxed bg-academy-cream-light p-4 rounded-2xl border border-gray-200/60">
                {learnerNotes[0]?.content}
              </p>
              <div className="p-4 bg-academy-sage rounded-2xl space-y-1 text-academy-emerald">
                <p className="text-xs font-bold uppercase">🎯 Practice Goal for Next Session:</p>
                <p className="text-xs">{learnerNotes[0]?.practiceGoals}</p>
              </div>
            </div>

            {/* Pending Assignments */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm space-y-4">
              <h3 className="font-serif text-xl font-bold text-gray-900">Current Homework & Assignments</h3>
              <div className="space-y-3">
                {learnerAssignments.map(assign => (
                  <div key={assign.id} className="p-4 rounded-2xl border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-academy-cream-light">
                    <div>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        assign.status === 'reviewed' ? 'bg-emerald-100 text-emerald-800' :
                        assign.status === 'submitted' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {assign.status.toUpperCase()}
                      </span>
                      <h4 className="font-bold text-sm text-gray-900 mt-1">{assign.title}</h4>
                      <p className="text-xs text-gray-600">{assign.description}</p>
                      <p className="text-[11px] text-gray-500 mt-1">Due Date: {assign.dueDate}</p>
                      {assign.feedback && (
                        <p className="text-xs text-academy-emerald italic mt-2 bg-academy-sage p-2 rounded-xl">
                          Feedback: "{assign.feedback}"
                        </p>
                      )}
                    </div>

                    {assign.status === 'pending' && (
                      <button
                        onClick={() => submitAssignment(assign.id)}
                        className="px-4 py-2 rounded-full bg-academy-emerald text-white font-bold text-xs shadow hover:bg-academy-emerald-hover transition-all flex items-center gap-1.5 whitespace-nowrap"
                      >
                        <Send className="w-3.5 h-3.5" /> Mark Submitted
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Sidebar: Announcements */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-academy-cream-light p-6 rounded-3xl border border-black/5 space-y-4">
              <h3 className="font-serif text-xl font-bold text-gray-900 flex items-center gap-2">
                <Bell className="w-5 h-5 text-academy-emerald" /> Academy Announcements
              </h3>
              <div className="space-y-4">
                {announcements.map(ann => (
                  <div key={ann.id} className="bg-white p-4 rounded-2xl border border-gray-200/80 space-y-1 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-academy-emerald uppercase">{ann.date}</span>
                      {ann.important && (
                        <span className="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Important</span>
                      )}
                    </div>
                    <h4 className="font-serif text-sm font-bold text-gray-900">{ann.title}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{ann.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* --- TAB 2: LESSON NOTES --- */}
      {activeSubTab === 'notes' && (
        <div className="space-y-6">
          <h2 className="font-serif text-2xl font-bold text-gray-900">Your Complete Lesson Notes & Practice Logs</h2>
          <div className="space-y-4">
            {learnerNotes.map(note => (
              <div key={note.id} className="bg-white p-6 rounded-3xl border border-gray-200/80 space-y-3 shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-academy-emerald bg-academy-sage px-3 py-1 rounded-full">{note.dateAssigned}</span>
                  <span className="text-xs text-gray-500 font-medium">Instructor: {currentLearner?.instructorName}</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900">{note.title}</h3>
                <p className="text-xs text-gray-700 font-semibold">Topic: {note.topic}</p>
                <div className="p-4 bg-academy-cream-light rounded-2xl text-xs text-gray-700 leading-relaxed border border-gray-200/60">
                  {note.content}
                </div>
                <div className="p-4 bg-academy-sage rounded-2xl text-academy-emerald space-y-1">
                  <p className="text-xs font-bold uppercase">Practice Goal:</p>
                  <p className="text-xs">{note.practiceGoals}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB 3: ASSIGNMENTS --- */}
      {activeSubTab === 'assignments' && (
        <div className="space-y-6">
          <h2 className="font-serif text-2xl font-bold text-gray-900">Submitted & Pending Assignments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learnerAssignments.map(assign => (
              <div key={assign.id} className="bg-white p-6 rounded-3xl border border-gray-200/80 space-y-3 shadow-sm flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      assign.status === 'reviewed' ? 'bg-emerald-100 text-emerald-800' :
                      assign.status === 'submitted' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {assign.status.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">Due: {assign.dueDate}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-gray-900">{assign.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{assign.description}</p>
                  {assign.feedback && (
                    <div className="p-3 bg-academy-sage rounded-2xl text-xs text-academy-emerald">
                      <p className="font-bold">Tutor Feedback:</p>
                      <p>"{assign.feedback}"</p>
                    </div>
                  )}
                </div>

                {assign.status === 'pending' && (
                  <button
                    onClick={() => submitAssignment(assign.id)}
                    className="w-full py-2.5 rounded-full bg-academy-emerald text-white font-bold text-xs hover:bg-academy-emerald-hover transition-all shadow mt-4 flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" /> Submit Assignment Demo
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB 4: RESOURCES --- */}
      {activeSubTab === 'resources' && (
        <div className="space-y-6">
          <h2 className="font-serif text-2xl font-bold text-gray-900">Learning Resources & Sheet Music Library</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map(res => (
              <div key={res.id} className="bg-white p-6 rounded-3xl border border-gray-200/80 space-y-3 shadow-sm flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-2xl bg-academy-sage text-academy-emerald flex items-center justify-center font-bold">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-academy-emerald uppercase">{res.category}</span>
                  <h3 className="font-serif text-base font-bold text-gray-900">{res.title}</h3>
                  <p className="text-xs text-gray-500 font-medium">Format: {res.fileType.toUpperCase()}</p>
                </div>
                <button
                  onClick={() => alert(`Simulated downloading resource: ${res.title}`)}
                  className="w-full py-2.5 rounded-full bg-academy-emerald text-white text-xs font-bold hover:bg-academy-emerald-hover transition-all flex items-center justify-center gap-2 shadow"
                >
                  <Download className="w-3.5 h-3.5" /> Download File
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB 5: CERTIFICATES --- */}
      {activeSubTab === 'certificates' && (
        <div className="space-y-6 max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl font-bold text-gray-900 text-center">Digital Certificates of Completion</h2>
          {learnerCerts.map(cert => (
            <div key={cert.id} className="bg-academy-cream-light p-8 rounded-3xl border-4 border-academy-emerald text-center space-y-4 shadow-xl relative">
              <div className="w-16 h-16 rounded-full bg-academy-emerald text-academy-gold mx-auto flex items-center justify-center shadow-lg">
                <Award className="w-10 h-10" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-academy-emerald">Official Academy Certificate</span>
              <h3 className="font-serif text-3xl font-bold text-gray-900">Certificate of Completion</h3>
              <p className="text-xs text-gray-600">This is proudly awarded to</p>
              <p className="font-serif text-3xl font-bold text-academy-emerald border-b border-academy-emerald/20 pb-2 inline-block px-8">{cert.learnerName}</p>
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
                Print / Download PDF Certificate
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
