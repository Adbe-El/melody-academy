import React, { useState } from 'react';
import {
  Shield,
  Users,
  Calendar,
  Briefcase,
  ShoppingBag,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  Clock,
  MessageSquare,
  FileText,
  BookOpen,
  Award,
  Settings,
  Building2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Programme, Instrument, Consultation, InstructorApplication } from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
    consultations,
    updateConsultationStatus,
    instructorApps,
    updateInstructorAppStatus,
    consultancyRequests,
    updateConsultancyStatus,
    programmes,
    addProgramme,
    deleteProgramme,
    instruments,
    addInstrument,
    deleteInstrument,
    learners,
    lessonNotes,
    addLessonNote,
    assignments,
    addAssignment,
    resources,
    addResource,
    issueCertificate,
    whatsappNumber,
    setWhatsappNumber
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'consultations' | 'instructors' | 'learners' | 'programmes' | 'instruments' | 'consultancy' | 'settings'>('overview');

  // Modal / Form States
  const [showAddProgramme, setShowAddProgramme] = useState(false);
  const [newProg, setNewProg] = useState<Omit<Programme, 'id'>>({
    title: '',
    category: 'Keyboard',
    description: '',
    level: 'Beginner',
    ageGroup: 'All Ages',
    duration: '12 Weeks',
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=800&auto=format&fit=crop',
    syllabusHighlights: ['Technique', 'Repertoire', 'Theory']
  });

  const [showAddInstrument, setShowAddInstrument] = useState(false);
  const [newInst, setNewInst] = useState<Omit<Instrument, 'id'>>({
    name: '',
    category: 'Keyboard',
    price: '$500 / ₦450,000',
    description: '',
    specifications: ['Quality Wooden Finish', 'Includes Stand'],
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=600&auto=format&fit=crop',
    condition: 'Brand New'
  });

  // Post Lesson Note Form State
  const [newNoteData, setNewNoteData] = useState({
    title: '',
    topic: '',
    content: '',
    practiceGoals: ''
  });

  // Post Assignment Form State
  const [newAssignData, setNewAssignData] = useState({
    title: '',
    description: '',
    dueDate: '2026-08-05'
  });

  // Handlers
  const handleCreateProgramme = (e: React.FormEvent) => {
    e.preventDefault();
    addProgramme(newProg);
    setShowAddProgramme(false);
    setNewProg({
      title: '',
      category: 'Keyboard',
      description: '',
      level: 'Beginner',
      ageGroup: 'All Ages',
      duration: '12 Weeks',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=800&auto=format&fit=crop',
      syllabusHighlights: ['Technique', 'Repertoire', 'Theory']
    });
  };

  const handleCreateInstrument = (e: React.FormEvent) => {
    e.preventDefault();
    addInstrument(newInst);
    setShowAddInstrument(false);
    setNewInst({
      name: '',
      category: 'Keyboard',
      price: '$500 / ₦450,000',
      description: '',
      specifications: ['Quality Wooden Finish'],
      inStock: true,
      imageUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=600&auto=format&fit=crop',
      condition: 'Brand New'
    });
  };

  const handlePostNote = (learnerId: string) => {
    if (!newNoteData.title || !newNoteData.content) return;
    addLessonNote({
      learnerId,
      ...newNoteData
    });
    setNewNoteData({ title: '', topic: '', content: '', practiceGoals: '' });
    alert('Lesson note posted successfully for enrolled learner!');
  };

  const handlePostAssignment = (learnerId: string) => {
    if (!newAssignData.title) return;
    addAssignment({
      learnerId,
      ...newAssignData
    });
    setNewAssignData({ title: '', description: '', dueDate: '2026-08-05' });
    alert('Assignment assigned to learner!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Dashboard Header */}
      <div className="bg-academy-emerald rounded-3xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white/10 text-academy-gold px-3.5 py-1 rounded-full text-xs font-semibold border border-white/10">
            <Shield className="w-4 h-4" /> Administrative Back-Office Portal
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold">
            Academy Management Overview
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm">
            Control center for consultations, enrolments, LMS notes, tutor applications, and catalog management.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveAdminTab('consultations')}
            className="px-5 py-2.5 rounded-full bg-academy-gold text-academy-emerald font-bold text-xs hover:bg-academy-gold-hover transition-all shadow"
          >
            Manage Consultations ({consultations.filter(c => c.status === 'new').length} New)
          </button>
        </div>
      </div>

      {/* Admin Nav Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-200">
        <button
          onClick={() => setActiveAdminTab('overview')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            activeAdminTab === 'overview' ? 'bg-academy-emerald text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          Overview Stats
        </button>

        <button
          onClick={() => setActiveAdminTab('consultations')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all relative ${
            activeAdminTab === 'consultations' ? 'bg-academy-emerald text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          Consultations ({consultations.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('instructors')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            activeAdminTab === 'instructors' ? 'bg-academy-emerald text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          Tutor Applications ({instructorApps.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('learners')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            activeAdminTab === 'learners' ? 'bg-academy-emerald text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          Learner LMS Admin ({learners.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('programmes')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            activeAdminTab === 'programmes' ? 'bg-academy-emerald text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          Programmes ({programmes.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('instruments')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            activeAdminTab === 'instruments' ? 'bg-academy-emerald text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          Instruments ({instruments.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('consultancy')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            activeAdminTab === 'consultancy' ? 'bg-academy-emerald text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          Institutional Requests ({consultancyRequests.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('settings')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            activeAdminTab === 'settings' ? 'bg-academy-emerald text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          Settings
        </button>
      </div>

      {/* --- OVERVIEW TAB --- */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-8">
          
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-academy-sage text-academy-emerald flex items-center justify-center font-bold">
                <Calendar className="w-5 h-5" />
              </div>
              <p className="text-xs text-gray-500 font-semibold uppercase">Pending Consultations</p>
              <p className="font-serif text-3xl font-bold text-gray-900">{consultations.length}</p>
              <span className="text-[11px] text-emerald-700 font-medium">
                {consultations.filter(c => c.status === 'new').length} require immediate follow-up
              </span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-academy-sage text-academy-emerald flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <p className="text-xs text-gray-500 font-semibold uppercase">Enrolled Learners</p>
              <p className="font-serif text-3xl font-bold text-gray-900">{learners.length}</p>
              <span className="text-[11px] text-emerald-700 font-medium">100% LMS Access Active</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-academy-sage text-academy-emerald flex items-center justify-center font-bold">
                <Briefcase className="w-5 h-5" />
              </div>
              <p className="text-xs text-gray-500 font-semibold uppercase">Tutor Applications</p>
              <p className="font-serif text-3xl font-bold text-gray-900">{instructorApps.length}</p>
              <span className="text-[11px] text-amber-700 font-medium">
                {instructorApps.filter(a => a.status === 'pending' || a.status === 'under_review').length} under review
              </span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-academy-sage text-academy-emerald flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <p className="text-xs text-gray-500 font-semibold uppercase">Instrument Products</p>
              <p className="font-serif text-3xl font-bold text-gray-900">{instruments.length}</p>
              <span className="text-[11px] text-emerald-700 font-medium">WhatsApp Leads Active</span>
            </div>
          </div>

          {/* Recent Consultations Table */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200/80 space-y-4 shadow-sm">
            <h3 className="font-serif text-xl font-bold text-gray-900">Recent Consultation Requests</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-700">
                <thead className="bg-academy-cream-light text-gray-900 font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3">Applicant</th>
                    <th className="p-3">Instrument</th>
                    <th className="p-3">Age & Level</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {consultations.map(c => (
                    <tr key={c.id} className="hover:bg-gray-50">
                      <td className="p-3 font-semibold text-gray-900">{c.fullName}<br/><span className="text-[10px] text-gray-500">{c.email}</span></td>
                      <td className="p-3">{c.preferredInstrument}</td>
                      <td className="p-3">{c.ageGroup} • {c.experienceLevel}</td>
                      <td className="p-3 font-mono">{c.phone}</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          c.status === 'new' ? 'bg-amber-100 text-amber-800' :
                          c.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                          c.status === 'completed' || c.status === 'enrolled' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <select
                          value={c.status}
                          onChange={e => updateConsultationStatus(c.id, e.target.value as any)}
                          className="px-2 py-1 rounded-lg border border-gray-300 text-xs bg-white focus:outline-none"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="scheduled">Scheduled</option>
                          <option value="completed">Completed</option>
                          <option value="enrolled">Enrolled</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* --- CONSULTATIONS TAB --- */}
      {activeAdminTab === 'consultations' && (
        <div className="bg-white p-6 rounded-3xl border border-gray-200/80 space-y-4 shadow-sm">
          <h2 className="font-serif text-2xl font-bold text-gray-900">All Consultation Bookings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {consultations.map(c => (
              <div key={c.id} className="p-5 rounded-2xl border border-gray-200 bg-academy-cream-light space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-gray-900">{c.fullName}</h3>
                    <p className="text-xs text-gray-500">{c.email} • {c.phone}</p>
                  </div>
                  <span className="bg-academy-emerald text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                    {c.status}
                  </span>
                </div>
                <div className="text-xs text-gray-700 space-y-1">
                  <p><strong>Focus:</strong> {c.preferredInstrument}</p>
                  <p><strong>Age & Level:</strong> {c.ageGroup} ({c.experienceLevel})</p>
                  <p><strong>Goals:</strong> "{c.goals || 'No specific goals provided.'}"</p>
                </div>
                <div className="pt-2 flex items-center justify-between border-t border-gray-200 text-xs">
                  <span className="text-gray-400">{new Date(c.createdAt).toLocaleDateString()}</span>
                  <select
                    value={c.status}
                    onChange={e => updateConsultationStatus(c.id, e.target.value as any)}
                    className="px-3 py-1 rounded-lg border border-gray-300 bg-white font-semibold text-xs"
                  >
                    <option value="new">Mark New</option>
                    <option value="contacted">Mark Contacted</option>
                    <option value="scheduled">Mark Scheduled</option>
                    <option value="completed">Mark Completed</option>
                    <option value="enrolled">Enrolled in Academy</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- INSTRUCTORS TAB --- */}
      {activeAdminTab === 'instructors' && (
        <div className="bg-white p-6 rounded-3xl border border-gray-200/80 space-y-4 shadow-sm">
          <h2 className="font-serif text-2xl font-bold text-gray-900">Tutor Applicants Review Pipeline</h2>
          <div className="space-y-4">
            {instructorApps.map(app => (
              <div key={app.id} className="p-6 rounded-2xl border border-gray-200 bg-academy-cream-light space-y-3">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-gray-900">{app.fullName}</h3>
                    <p className="text-xs text-gray-600">{app.email} • {app.phone}</p>
                  </div>
                  <span className="bg-academy-emerald text-academy-gold text-xs font-bold px-3 py-1 rounded-full uppercase">
                    Status: {app.status}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
                  <p><strong>Primary Instrument:</strong> {app.primaryInstrument}</p>
                  <p><strong>Secondary Instruments:</strong> {app.secondaryInstruments || 'N/A'}</p>
                  <p><strong>Teaching Experience:</strong> {app.yearsExperience} Years</p>
                  <p><strong>Qualifications:</strong> {app.qualifications}</p>
                </div>
                <p className="text-xs text-gray-600 italic bg-white p-3 rounded-xl border border-gray-200">
                  "{app.bio}"
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-gray-200">
                  <span className="text-xs text-emerald-800 font-semibold">
                    Attached Document: {app.resumeFileName || 'Resume.pdf'}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateInstructorAppStatus(app.id, 'shortlisted')}
                      className="px-3 py-1.5 rounded-full bg-blue-700 text-white text-xs font-bold"
                    >
                      Shortlist Candidate
                    </button>
                    <button
                      onClick={() => updateInstructorAppStatus(app.id, 'accepted')}
                      className="px-3 py-1.5 rounded-full bg-emerald-700 text-white text-xs font-bold"
                    >
                      Accept Tutor
                    </button>
                    <button
                      onClick={() => updateInstructorAppStatus(app.id, 'rejected')}
                      className="px-3 py-1.5 rounded-full bg-red-700 text-white text-xs font-bold"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- LEARNER LMS ADMIN TAB --- */}
      {activeAdminTab === 'learners' && (
        <div className="space-y-6">
          <h2 className="font-serif text-2xl font-bold text-gray-900">Manage Enrolled Learners & LMS Content</h2>
          {learners.map(l => (
            <div key={l.id} className="bg-white p-6 rounded-3xl border border-gray-200/80 space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-gray-100 pb-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-gray-900">{l.fullName} ({l.email})</h3>
                  <p className="text-xs text-gray-500">Enrolled Programme: <strong className="text-academy-emerald">{l.programmeTitle}</strong> • Tutor: {l.instructorName}</p>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3.5 py-1 rounded-full uppercase">
                  Status: {l.status} ({l.progressPercentage}%)
                </span>
              </div>

              {/* Form to Post New Lesson Note */}
              <div className="bg-academy-cream-light p-5 rounded-2xl border border-gray-200/80 space-y-3">
                <h4 className="font-serif text-base font-bold text-gray-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-academy-emerald" /> Post Lesson Note for {l.fullName}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Lesson Title (e.g. Lesson 8: Major Chords)"
                    value={newNoteData.title}
                    onChange={e => setNewNoteData({ ...newNoteData, title: e.target.value })}
                    className="px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white"
                  />
                  <input
                    type="text"
                    placeholder="Topic Summary"
                    value={newNoteData.topic}
                    onChange={e => setNewNoteData({ ...newNoteData, topic: e.target.value })}
                    className="px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white"
                  />
                </div>
                <textarea
                  rows={2}
                  placeholder="Detailed tutor instructions & feedback..."
                  value={newNoteData.content}
                  onChange={e => setNewNoteData({ ...newNoteData, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white"
                ></textarea>
                <input
                  type="text"
                  placeholder="Practice Goals for next week (e.g. Practice scales at 80 BPM)"
                  value={newNoteData.practiceGoals}
                  onChange={e => setNewNoteData({ ...newNoteData, practiceGoals: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white"
                />
                <button
                  onClick={() => handlePostNote(l.id)}
                  className="px-5 py-2 rounded-full bg-academy-emerald text-white text-xs font-bold hover:bg-academy-emerald-hover"
                >
                  Publish Lesson Note
                </button>
              </div>

              {/* Form to Assign Homework */}
              <div className="bg-academy-cream-light p-5 rounded-2xl border border-gray-200/80 space-y-3">
                <h4 className="font-serif text-base font-bold text-gray-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-academy-emerald" /> Assign Homework / Assignment
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Assignment Title"
                    value={newAssignData.title}
                    onChange={e => setNewAssignData({ ...newAssignData, title: e.target.value })}
                    className="px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white"
                  />
                  <input
                    type="date"
                    value={newAssignData.dueDate}
                    onChange={e => setNewAssignData({ ...newAssignData, dueDate: e.target.value })}
                    className="px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Assignment Description"
                  value={newAssignData.description}
                  onChange={e => setNewAssignData({ ...newAssignData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white"
                />
                <button
                  onClick={() => handlePostAssignment(l.id)}
                  className="px-5 py-2 rounded-full bg-academy-emerald text-white text-xs font-bold hover:bg-academy-emerald-hover"
                >
                  Create Assignment
                </button>
              </div>

              {/* Button to Issue Official Certificate */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    issueCertificate({
                      learnerId: l.id,
                      learnerName: l.fullName,
                      programmeTitle: l.programmeTitle
                    });
                    alert(`Issued new certificate of completion for ${l.fullName}!`);
                  }}
                  className="px-6 py-2.5 rounded-full bg-academy-gold text-academy-emerald font-bold text-xs shadow"
                >
                  Issue Digital Completion Certificate
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- PROGRAMMES CRUD TAB --- */}
      {activeAdminTab === 'programmes' && (
        <div className="bg-white p-6 rounded-3xl border border-gray-200/80 space-y-6 shadow-sm">
          <div className="flex justify-between items-center">
            <h2 className="font-serif text-2xl font-bold text-gray-900">Manage Music Programmes</h2>
            <button
              onClick={() => setShowAddProgramme(true)}
              className="px-5 py-2 rounded-full bg-academy-emerald text-white text-xs font-bold flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add New Programme
            </button>
          </div>

          {showAddProgramme && (
            <form onSubmit={handleCreateProgramme} className="bg-academy-cream-light p-6 rounded-2xl border border-gray-200 space-y-4">
              <h3 className="font-serif text-lg font-bold text-gray-900">Create Programme</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Programme Title"
                  value={newProg.title}
                  onChange={e => setNewProg({ ...newProg, title: e.target.value })}
                  className="px-3 py-2 rounded-xl border border-gray-300 text-xs"
                />
                <select
                  value={newProg.category}
                  onChange={e => setNewProg({ ...newProg, category: e.target.value as any })}
                  className="px-3 py-2 rounded-xl border border-gray-300 text-xs"
                >
                  <option value="Keyboard">Keyboard</option>
                  <option value="Guitar">Guitar</option>
                  <option value="Vocals">Vocals</option>
                  <option value="Drums">Drums</option>
                  <option value="Production">Production</option>
                  <option value="Exam Prep">Exam Prep</option>
                </select>
              </div>
              <textarea
                rows={2}
                placeholder="Description"
                value={newProg.description}
                onChange={e => setNewProg({ ...newProg, description: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs"
              ></textarea>
              <div className="flex gap-2">
                <button type="submit" className="px-6 py-2 rounded-full bg-academy-emerald text-white text-xs font-bold">Save</button>
                <button type="button" onClick={() => setShowAddProgramme(false)} className="px-6 py-2 rounded-full bg-gray-200 text-xs">Cancel</button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {programmes.map(p => (
              <div key={p.id} className="p-4 rounded-2xl border border-gray-200 bg-academy-cream-light flex justify-between items-start">
                <div>
                  <span className="bg-academy-emerald text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{p.category}</span>
                  <h4 className="font-serif text-lg font-bold text-gray-900 mt-1">{p.title}</h4>
                  <p className="text-xs text-gray-600 line-clamp-2">{p.description}</p>
                </div>
                <button
                  onClick={() => deleteProgramme(p.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-xl"
                  title="Delete Programme"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- INSTRUMENTS CRUD TAB --- */}
      {activeAdminTab === 'instruments' && (
        <div className="bg-white p-6 rounded-3xl border border-gray-200/80 space-y-6 shadow-sm">
          <div className="flex justify-between items-center">
            <h2 className="font-serif text-2xl font-bold text-gray-900">Manage Instrument Catalogue</h2>
            <button
              onClick={() => setShowAddInstrument(true)}
              className="px-5 py-2 rounded-full bg-academy-emerald text-white text-xs font-bold flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add New Instrument
            </button>
          </div>

          {showAddInstrument && (
            <form onSubmit={handleCreateInstrument} className="bg-academy-cream-light p-6 rounded-2xl border border-gray-200 space-y-4">
              <h3 className="font-serif text-lg font-bold text-gray-900">Add Instrument Product</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Instrument Name"
                  value={newInst.name}
                  onChange={e => setNewInst({ ...newInst, name: e.target.value })}
                  className="px-3 py-2 rounded-xl border border-gray-300 text-xs"
                />
                <input
                  type="text"
                  placeholder="Price (e.g. $799 / ₦650,000)"
                  value={newInst.price}
                  onChange={e => setNewInst({ ...newInst, price: e.target.value })}
                  className="px-3 py-2 rounded-xl border border-gray-300 text-xs"
                />
                <select
                  value={newInst.category}
                  onChange={e => setNewInst({ ...newInst, category: e.target.value as any })}
                  className="px-3 py-2 rounded-xl border border-gray-300 text-xs"
                >
                  <option value="Keyboard">Keyboard</option>
                  <option value="Guitar">Guitar</option>
                  <option value="Strings">Strings</option>
                  <option value="Drums & Percussion">Drums & Percussion</option>
                  <option value="Wind">Wind</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>
              <textarea
                rows={2}
                placeholder="Product description..."
                value={newInst.description}
                onChange={e => setNewInst({ ...newInst, description: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs"
              ></textarea>
              <div className="flex gap-2">
                <button type="submit" className="px-6 py-2 rounded-full bg-academy-emerald text-white text-xs font-bold">Save Product</button>
                <button type="button" onClick={() => setShowAddInstrument(false)} className="px-6 py-2 rounded-full bg-gray-200 text-xs">Cancel</button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {instruments.map(i => (
              <div key={i.id} className="p-4 rounded-2xl border border-gray-200 bg-academy-cream-light flex justify-between items-start">
                <div>
                  <span className="bg-academy-emerald text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{i.category}</span>
                  <h4 className="font-serif text-lg font-bold text-gray-900 mt-1">{i.name}</h4>
                  <p className="text-xs font-bold text-gray-900">{i.price}</p>
                </div>
                <button
                  onClick={() => deleteInstrument(i.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-xl"
                  title="Delete Instrument"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- CONSULTANCY REQUESTS TAB --- */}
      {activeAdminTab === 'consultancy' && (
        <div className="bg-white p-6 rounded-3xl border border-gray-200/80 space-y-4 shadow-sm">
          <h2 className="font-serif text-2xl font-bold text-gray-900">Institutional Consultancy Requests</h2>
          <div className="space-y-4">
            {consultancyRequests.map(cr => (
              <div key={cr.id} className="p-5 rounded-2xl border border-gray-200 bg-academy-cream-light space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-gray-900">{cr.organizationName} ({cr.organizationType})</h3>
                    <p className="text-xs text-gray-600">Contact: {cr.contactPerson} • {cr.email} • {cr.phone}</p>
                  </div>
                  <span className="bg-academy-emerald text-academy-gold text-xs font-bold px-3 py-1 rounded-full uppercase">
                    Status: {cr.status}
                  </span>
                </div>
                <p className="text-xs font-bold text-gray-900">Service Needed: {cr.serviceNeeded}</p>
                <p className="text-xs text-gray-600 bg-white p-3 rounded-xl border border-gray-200">
                  "{cr.details}"
                </p>
                <div className="pt-2 flex justify-end">
                  <select
                    value={cr.status}
                    onChange={e => updateConsultancyStatus(cr.id, e.target.value as any)}
                    className="px-3 py-1 rounded-lg border border-gray-300 bg-white font-semibold text-xs"
                  >
                    <option value="new">Mark New</option>
                    <option value="in_discussion">In Discussion</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- SETTINGS TAB --- */}
      {activeAdminTab === 'settings' && (
        <div className="bg-white p-8 rounded-3xl border border-gray-200/80 space-y-6 shadow-sm max-w-xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900">Academy System Settings</h2>
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">WhatsApp Official Helpline Number</label>
            <input
              type="text"
              value={whatsappNumber}
              onChange={e => setWhatsappNumber(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald"
            />
            <p className="text-[11px] text-gray-500 mt-1">Used for instrument purchase enquiries and direct customer service routing.</p>
          </div>

          <div className="p-4 bg-academy-sage rounded-2xl text-xs text-academy-emerald space-y-1">
            <p className="font-bold">Database Connectivity Status:</p>
            <p>Supabase PostgreSQL Ready (Local Storage Fallback Active for Demo Execution).</p>
          </div>
        </div>
      )}

    </div>
  );
};
