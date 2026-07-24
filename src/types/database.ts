export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          role: 'admin' | 'learner';
          avatar_url: string | null;
          phone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      programmes: {
        Row: {
          id: string;
          title: string;
          category: string;
          description: string;
          level: string;
          age_group: string;
          duration: string;
          featured: boolean;
          image_url: string;
          syllabus_highlights: string[];
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['programmes']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['programmes']['Insert']>;
      };
      instruments: {
        Row: {
          id: string;
          name: string;
          category: string;
          price: string;
          description: string;
          specifications: string[];
          in_stock: boolean;
          image_url: string;
          condition: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['instruments']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['instruments']['Insert']>;
      };
      consultations: {
        Row: {
          id: string;
          user_id: string | null;
          full_name: string;
          email: string;
          phone: string;
          preferred_instrument: string;
          age_group: string;
          experience_level: string;
          goals: string;
          status: 'new' | 'contacted' | 'scheduled' | 'completed' | 'enrolled' | 'cancelled';
          notes: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['consultations']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['consultations']['Insert']>;
      };
      instructor_applications: {
        Row: {
          id: string;
          user_id: string | null;
          full_name: string;
          email: string;
          phone: string;
          primary_instrument: string;
          secondary_instruments: string | null;
          years_experience: number;
          qualifications: string;
          bio: string;
          resume_file_name: string | null;
          status: 'pending' | 'under_review' | 'shortlisted' | 'accepted' | 'rejected';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['instructor_applications']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['instructor_applications']['Insert']>;
      };
      consultancy_requests: {
        Row: {
          id: string;
          organization_name: string;
          organization_type: string;
          contact_person: string;
          email: string;
          phone: string;
          service_needed: string;
          details: string;
          status: 'new' | 'in_discussion' | 'completed';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['consultancy_requests']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['consultancy_requests']['Insert']>;
      };
      enrollments: {
        Row: {
          id: string;
          user_id: string;
          programme_id: string;
          instructor_name: string;
          enrolled_date: string;
          progress_percentage: number;
          status: 'active' | 'completed' | 'paused';
        };
        Insert: Omit<Database['public']['Tables']['enrollments']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['enrollments']['Insert']>;
      };
      lesson_notes: {
        Row: {
          id: string;
          enrollment_id: string;
          title: string;
          topic: string;
          content: string;
          practice_goals: string;
          date_assigned: string;
        };
        Insert: Omit<Database['public']['Tables']['lesson_notes']['Row'], 'id' | 'date_assigned'>;
        Update: Partial<Database['public']['Tables']['lesson_notes']['Insert']>;
      };
      assignments: {
        Row: {
          id: string;
          enrollment_id: string;
          title: string;
          description: string;
          due_date: string;
          status: 'pending' | 'submitted' | 'reviewed';
          feedback: string | null;
        };
        Insert: Omit<Database['public']['Tables']['assignments']['Row'], 'id' | 'status'>;
        Update: Partial<Database['public']['Tables']['assignments']['Insert']>;
      };
      resources: {
        Row: {
          id: string;
          programme_id: string;
          title: string;
          file_type: 'pdf' | 'audio' | 'sheet_music';
          file_url: string;
          category: string;
        };
        Insert: Omit<Database['public']['Tables']['resources']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['resources']['Insert']>;
      };
      certificates: {
        Row: {
          id: string;
          user_id: string;
          learner_name: string;
          programme_title: string;
          issue_date: string;
          certificate_code: string;
        };
        Insert: Omit<Database['public']['Tables']['certificates']['Row'], 'id' | 'issue_date' | 'certificate_code'>;
        Update: Partial<Database['public']['Tables']['certificates']['Insert']>;
      };
      announcements: {
        Row: {
          id: string;
          title: string;
          message: string;
          date: string;
          important: boolean;
        };
        Insert: Omit<Database['public']['Tables']['announcements']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['announcements']['Insert']>;
      };
    };
  };
};
