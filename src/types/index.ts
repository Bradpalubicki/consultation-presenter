export type Industry = 'dental' | 'salon' | 'cosmetic' | 'landscaping'

export interface Procedure {
  id: string
  industry: Industry
  category: string
  name: string
  description: string
  duration_min: number
  plain_english: string
  steps: string[]
  benefits: string[]
  aftercare: string[]
  faq: { q: string; a: string }[]
  image_query: string
  consent_required: boolean
  tags: string[]
  created_at: string
}

export interface ConsultationSession {
  id: string
  practice_id: string
  patient_name: string
  patient_email: string
  patient_phone: string
  provider_name: string
  procedures_shown: string[]
  notes: string
  consent_signed: boolean
  consent_signed_at: string | null
  patient_pack_sent: boolean
  patient_pack_sent_at: string | null
  started_at: string
  ended_at: string | null
  created_at: string
}

export interface ProcedureCategory {
  id: string
  label: string
  icon: string
  industry: Industry
}

export interface IndustryConfig {
  name: string
  industry: Industry
  primaryColor: string
  categories: ProcedureCategory[]
  consentTemplate: string
  terminology: {
    patient: string
    provider: string
    procedure: string
    session: string
  }
}
