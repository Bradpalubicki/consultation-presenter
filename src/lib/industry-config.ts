import type { Industry, IndustryConfig } from '@/types'

export const INDUSTRY_CONFIGS: Record<Industry, IndustryConfig> = {
  dental: {
    name: 'Dental Practice',
    industry: 'dental',
    primaryColor: 'blue',
    categories: [
      { id: 'preventive', label: 'Preventive', icon: '🦷', industry: 'dental' },
      { id: 'restorative', label: 'Restorative', icon: '🔧', industry: 'dental' },
      { id: 'cosmetic', label: 'Cosmetic', icon: '✨', industry: 'dental' },
      { id: 'orthodontics', label: 'Orthodontics', icon: '📐', industry: 'dental' },
      { id: 'implants', label: 'Implants', icon: '🔩', industry: 'dental' },
      { id: 'oral-surgery', label: 'Oral Surgery', icon: '🏥', industry: 'dental' },
    ],
    consentTemplate: 'dental-standard',
    terminology: {
      patient: 'Patient',
      provider: 'Dentist',
      procedure: 'Treatment',
      session: 'Consultation',
    },
  },
  salon: {
    name: 'Salon & Studio',
    industry: 'salon',
    primaryColor: 'pink',
    categories: [
      { id: 'color', label: 'Color Services', icon: '🎨', industry: 'salon' },
      { id: 'cuts', label: 'Cuts & Style', icon: '✂️', industry: 'salon' },
      { id: 'chemical', label: 'Chemical Services', icon: '🧪', industry: 'salon' },
      { id: 'extensions', label: 'Extensions', icon: '💁', industry: 'salon' },
      { id: 'treatments', label: 'Treatments', icon: '💆', industry: 'salon' },
    ],
    consentTemplate: 'salon-chemical',
    terminology: {
      patient: 'Client',
      provider: 'Stylist',
      procedure: 'Service',
      session: 'Consultation',
    },
  },
  cosmetic: {
    name: 'Cosmetic Practice',
    industry: 'cosmetic',
    primaryColor: 'purple',
    categories: [
      { id: 'facial', label: 'Facial Procedures', icon: '👄', industry: 'cosmetic' },
      { id: 'body', label: 'Body Contouring', icon: '💃', industry: 'cosmetic' },
      { id: 'breast', label: 'Breast Procedures', icon: '🏥', industry: 'cosmetic' },
      { id: 'hair', label: 'Hair Restoration', icon: '💈', industry: 'cosmetic' },
      { id: 'injectables', label: 'Injectables', icon: '💉', industry: 'cosmetic' },
      { id: 'skin', label: 'Skin Treatments', icon: '🌟', industry: 'cosmetic' },
    ],
    consentTemplate: 'cosmetic-surgical',
    terminology: {
      patient: 'Patient',
      provider: 'Surgeon',
      procedure: 'Procedure',
      session: 'Consultation',
    },
  },
  landscaping: {
    name: 'Landscaping & Design',
    industry: 'landscaping',
    primaryColor: 'green',
    categories: [
      { id: 'design', label: 'Landscape Design', icon: '🌿', industry: 'landscaping' },
      { id: 'hardscape', label: 'Hardscaping', icon: '🪨', industry: 'landscaping' },
      { id: 'lawn', label: 'Lawn Services', icon: '🌱', industry: 'landscaping' },
      { id: 'irrigation', label: 'Irrigation', icon: '💧', industry: 'landscaping' },
      { id: 'seasonal', label: 'Seasonal Services', icon: '🍂', industry: 'landscaping' },
    ],
    consentTemplate: 'project-agreement',
    terminology: {
      patient: 'Client',
      provider: 'Designer',
      procedure: 'Service',
      session: 'Consultation',
    },
  },
}

export function getIndustryConfig(industry: Industry): IndustryConfig {
  return INDUSTRY_CONFIGS[industry]
}

export const CURRENT_INDUSTRY: Industry =
  (process.env.NEXT_PUBLIC_INDUSTRY as Industry) ?? 'dental'
