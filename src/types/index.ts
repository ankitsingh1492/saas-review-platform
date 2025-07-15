// Session and Auth Types
export interface SessionUser {
  id: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
}

// Client Types
export interface Client {
  id: string;
  name: string;
  domain: string;
}

export interface ClientFormData {
  name: string;
  domain: string;
  subscriptionTier: string;
}

export interface CreateClientRequest {
  name: string;
  domain: string;
  subscriptionTier: string;
  brandingConfig?: {
    primaryColor: string;
    secondaryColor: string;
    logoUrl: string;
    companyName: string;
  };
  apiKeys?: {
    public: string;
    secret: string;
  };
}

// Review Types
export interface Review {
  id: string;
  userId: string;
  clientId: string;
  rating: number;
  content: string;
  mediaUrls?: string[] | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

// User Types
export interface User {
  id: string;
  email?: string | null;
  name?: string | null;
  role?: string | null;
  createdAt: string;
  updatedAt: string;
  emailVerified?: string | null;
  image?: string | null;
}

// API Response Types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// Component Props Types
export interface SearchInputProps {
  onSearch: (query: string) => void;
}

export interface ClientListProps {
  clients: Client[];
}

export interface ClientCardProps {
  client: Client;
}

export interface ClientsSectionProps {
  clients: Client[];
}

export interface CreateClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClientCreated: () => void;
}

export interface DashboardHeaderProps {
  userEmail?: string;
  children?: React.ReactNode;
}

// Testimonial Types
export interface Testimonial {
  initial: string;
  name: string;
  title: string;
  company: string;
  content: string;
  avatarGradient: string;
  borderHoverColor: string;
  shadowHoverColor: string;
}
