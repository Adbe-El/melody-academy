# Product Requirements Document (PRD)

## Music Academy & Services Platform (MVP)

### Version

v1.0 (MVP)

---

## 1. Product Summary

The Music Academy & Services Platform is a web application that serves as the digital front office for a professional music academy. It enables prospective learners, parents, instructors, schools, and churches to discover the academy's services, book consultations, enquire about programmes, apply as instructors, browse musical instruments, and access learning resources after enrolment.

The platform does **not** host live classes or process payments. Lessons, consultations, and payments are handled externally through the academy's preferred channels (e.g., physical classes, Zoom, WhatsApp, or bank transfer).

---

## 2. Problem Statement

The academy currently relies on manual communication to manage enquiries, consultations, instructor recruitment, learner administration, and programme information. This makes it difficult to scale operations and provide a consistent experience.

A centralized platform is required to:

* Simplify enquiries and consultation bookings.
* Organize instructor applications.
* Support enrolled learners with learning resources.
* Showcase available programmes and instruments.
* Improve operational efficiency.

---

## 3. Goals

* Increase consultation bookings.
* Simplify learner onboarding.
* Digitize instructor recruitment.
* Provide enrolled learners with learning resources.
* Centralize academy operations.
* Improve the academy's online presence.

---

## 4. Target Users

### Primary Users

* Parents
* Students
* Adult learners

### Secondary Users

* Professional music instructors
* Schools
* Churches
* Choirs
* Organizations

### Internal Users

* Academy Administrator
* Trainers

---

## 5. Core Features

### Public Website

* Landing page
* Programme catalogue
* Professional music examinations
* Instrument catalogue
* Music consultancy
* Meet the instructors
* Contact page

### Consultation System

* Consultation booking form
* General enquiry form
* Appointment management

### Instructor Recruitment

* Instructor application form
* CV and certificate uploads
* Application review

### Instrument Enquiries

* Instrument catalogue
* Instrument detail pages
* WhatsApp enquiry integration

### Learning Management System (LMS)

* Learner login
* Lesson notes
* Assignments
* Learning resources
* Progress tracking
* Certificates
* Announcements

### Administration

* Dashboard
* Programme management
* Learner management
* Consultation management
* Instructor application management
* Instrument management
* Consultancy requests
* Website content management
* Reports
* Settings

---

## 6. User Roles

## Visitor

* Browse programmes
* Browse instruments
* Book consultations
* Submit enquiries
* Apply as instructor

## Learner

* Access enrolled programme
* View lesson notes
* Download resources
* Submit assignments
* View progress
* Download certificates

## Admin

* Manage website
* Manage learners
* Manage programmes
* Manage LMS
* Review instructor applications
* Manage consultations
* Manage instrument catalogue
* Manage content

---

## 7. Key User Flows

### Learner Journey

Explore Programmes → Book Consultation → Academy Contacts Learner → Programme Recommendation → Offline Payment → Enrolment → LMS Access

### Instructor Journey

Visit Website → Submit Instructor Application → Academy Reviews → Contact Successful Applicants

### Instrument Purchase Journey

Browse Instruments → View Instrument → Enquire via WhatsApp → Academy Handles Sale

### Consultancy Journey

Browse Consultancy Services → Submit Request → Academy Contacts Client

---

## 8. Functional Requirements

### Consultation Booking

* Online booking form
* Admin notification
* Booking status tracking

### Programme Management

* Create and edit programmes
* Categorize programmes
* Publish/unpublish programmes

### LMS

* Upload lesson notes
* Upload assignments
* Upload resources
* Record learner progress
* Issue certificates

### Instrument Catalogue

* Categories
* Images
* Specifications
* WhatsApp enquiry button

### Instructor Applications

* Online application
* Document uploads
* Status management

---

## 9. Non-Functional Requirements

* Mobile responsive
* Fast page load
* Secure authentication
* Simple and intuitive navigation
* Accessible design
* Scalable architecture

---

## 10. Technical Stack

### Frontend

* React
* TypeScript
* Tailwind CSS

### Backend

* Supabase

### Database

* PostgreSQL (Supabase)

### Authentication

* Supabase Auth

### Storage

* Supabase Storage

### Deployment

* Vercel

---

## 11. Integrations

* WhatsApp Click-to-Chat
* Google Maps (Contact page)
* Email notifications (Supabase)

---

## 12. Out of Scope (MVP)

The following features are intentionally excluded from the MVP:

* Live video classes
* Video conferencing
* In-app messaging
* Online payment processing
* Course purchases
* Instrument checkout
* Marketplace transactions
* Tutor scheduling portal

---

## 13. Success Metrics

* Consultation bookings
* Programme enquiries
* Instructor applications
* Instrument enquiries
* Learner enrolments
* LMS engagement
* Website conversion rate

---

## 14. Deliverables

* Marketing website
* Consultation booking system
* Instructor recruitment portal
* Instrument catalogue
* Lightweight LMS
* Admin dashboard
* Responsive UI
* Production-ready deployment

---

## 15. MVP Summary

The MVP delivers a streamlined platform that helps the academy attract prospective learners, manage consultations, recruit instructors, support enrolled learners through a lightweight LMS, and administer its operations efficiently. By intentionally keeping teaching, consultations, and payments outside the platform, the solution remains simple, cost-effective, and aligned with the academy's current operating model while leaving room for future enhancements.
