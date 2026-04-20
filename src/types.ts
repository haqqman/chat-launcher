export interface ChatOption {
  label: string;
  value: string;
}

export interface ChatLauncherConfig {
  // Branding
  brandName?: string;
  brandSubtitle?: string;
  logoUrl?: string;
  showHaqqmanBranding?: boolean;

  // Channels
  whatsappNumber?: string;
  messengerUsername?: string;

  // Colors
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;

  // Form
  options?: ChatOption[];
  placeholders?: {
    name?: string;
    email?: string;
    subject?: string;
  };
  labels?: {
    name?: string;
    email?: string;
    subject?: string;
    whatsappButton?: string;
    messengerButton?: string;
  };
}

export const OPTIONS: ChatOption[] = [
  { label: 'Option One', value: 'option-1' },
  { label: 'Option Two', value: 'option-2' },
];

export const DEFAULT_CONFIG: Required<ChatLauncherConfig> = {
  brandName: 'Agency by Haqqman',
  brandSubtitle: 'Chat with us for any inquiries',
  logoUrl: 'https://res.cloudinary.com/seapane-cloud/haqqman-bucket/meta/haqqman-logomark.svg',
  showHaqqmanBranding: true,
  whatsappNumber: '2348000000000',
  messengerUsername: 'example',
  primaryColor: '#1C2742',
  secondaryColor: '#79C142',
  accentColor: '#9ccc48',
  options: OPTIONS,
  placeholders: {
    name: 'Your name',
    email: 'name@example.com',
    subject: 'Select an option',
  },
  labels: {
    name: 'First Name',
    email: 'Email Address',
    subject: 'I want to chat about...',
    whatsappButton: 'WhatsApp',
    messengerButton: 'Messenger',
  },
};
