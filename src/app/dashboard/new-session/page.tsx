'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { DENTAL_PROCEDURES, SALON_PROCEDURES, COSMETIC_PROCEDURES } from '@/lib/procedures'
import { INDUSTRY_CONFIGS } from '@/lib/industry-config'
import type { Industry, Procedure } from '@/types'
import { ArrowRight, Plus, X, Play } from 'lucide-react'
import { toast } from 'sonner'

const ALL_PROCEDURES = [...DENTAL_PROCEDURES, ...SALON_PROCEDURES, ...COSMETIC_PROCEDURES]

export default function NewSessionPage() {
  const router = useRouter()
  const [step, setStep] = useState<'patient' | 'procedures'>('patient')
  const [patientName, setPatientName] = useState('')
  const [patientEmail, setPatientEmail] = useState('')
  const [patientPhone, setPatientPhone] = useState('')
  const [providerName, setProviderName] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>('dental')
  const [selectedProcedures, setSelectedProcedures] = useState<Procedure[]>([])
  const [categoryFilter, setCategoryFilter] = useState('all')

  const config = INDUSTRY_CONFIGS[selectedIndustry]
  const procedures = ALL_PROCEDURES.filter((p) => p.industry === selectedIndustry)
  const filtered = categoryFilter === 'all' ? procedures : procedures.filter((p) => p.category === categoryFilter)

  function toggleProcedure(p: Procedure) {
    setSelectedProcedures((prev) =>
      prev.find((x) => x.id === p.id) ? prev.filter((x) => x.id !== p.id) : [...prev, p]
    )
  }

  function handleStartSession() {
    if (!patientName || !providerName) {
      toast.error('Patient name and provider name are required.')
      return
    }
    if (selectedProcedures.length === 0) {
      toast.error('Select at least one procedure to present.')
      return
    }
    sessionStorage.setItem('cp_session', JSON.stringify({
      patientName,
      patientEmail,
      patientPhone,
      providerName,
      industry: selectedIndustry,
      procedures: selectedProcedures,
      startedAt: new Date().toISOString(),
    }))
    router.push(`/present/${selectedProcedures[0].id}`)
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">New Consultation</h1>
        <p className="text-gray-500 text-sm mt-1">Set up patient info, then select procedures to present.</p>
      </div>

      {step === 'patient' && (
        <Card>
          <CardHeader><CardTitle>Patient & Provider Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="mb-2 block text-sm">Industry</Label>
              <div className="flex gap-2 flex-wrap">
                {(Object.keys(INDUSTRY_CONFIGS) as Industry[]).map((ind) => (
                  <button
                    key={ind}
                    onClick={() => { setSelectedIndustry(ind); setSelectedProcedures([]) }}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                      selectedIndustry === ind
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    {INDUSTRY_CONFIGS[ind].name}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="patient-name" className="mb-1.5 block text-sm">{config.terminology.patient} Name *</Label>
                <Input id="patient-name" value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="Jane Smith" />
              </div>
              <div>
                <Label htmlFor="provider-name" className="mb-1.5 block text-sm">{config.terminology.provider} Name *</Label>
                <Input id="provider-name" value={providerName} onChange={(e) => setProviderName(e.target.value)} placeholder="Dr. Alex Lee" />
              </div>
              <div>
                <Label htmlFor="patient-email" className="mb-1.5 block text-sm">Email (for Patient Pack)</Label>
                <Input id="patient-email" type="email" value={patientEmail} onChange={(e) => setPatientEmail(e.target.value)} placeholder="jane@email.com" />
              </div>
              <div>
                <Label htmlFor="patient-phone" className="mb-1.5 block text-sm">Phone</Label>
                <Input id="patient-phone" value={patientPhone} onChange={(e) => setPatientPhone(e.target.value)} placeholder="(702) 555-0100" />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <Button onClick={() => {
                if (!patientName || !providerName) { toast.error('Name and provider required.'); return }
                setStep('procedures')
              }} className="gap-2">
                Select Procedures <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 'procedures' && (
        <div className="space-y-4">
          {selectedProcedures.length > 0 && (
            <Card>
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Selected ({selectedProcedures.length})</span>
                  <Button onClick={handleStartSession} className="gap-2"><Play className="w-4 h-4" /> Start Presenting</Button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {selectedProcedures.map((p) => (
                    <Badge key={p.id} variant="secondary" className="gap-1 pr-1">
                      {p.name}
                      <button onClick={() => toggleProcedure(p)} className="ml-1 hover:text-red-500">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">
                  {config.terminology.procedure} Library
                  <span className="text-sm font-normal text-gray-400 ml-2">— {config.name}</span>
                </CardTitle>
                <button onClick={() => setStep('patient')} className="text-xs text-gray-400 hover:text-gray-700">Back</button>
              </div>
              <div className="flex gap-2 flex-wrap pt-2">
                <button
                  onClick={() => setCategoryFilter('all')}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${categoryFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  All
                </button>
                {config.categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategoryFilter(cat.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${categoryFilter === cat.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {cat.icon} {cat.label}
                  </button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {filtered.map((p) => {
                  const selected = !!selectedProcedures.find((x) => x.id === p.id)
                  return (
                    <button
                      key={p.id}
                      onClick={() => toggleProcedure(p)}
                      className={`text-left p-4 rounded-xl border-2 transition-all ${
                        selected ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-blue-200 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="font-medium text-sm text-gray-900">{p.name}</span>
                        {selected
                          ? <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center"><span className="text-white text-xs">✓</span></div>
                          : <div className="w-5 h-5 border-2 border-gray-200 rounded-full flex items-center justify-center"><Plus className="w-3 h-3 text-gray-400" /></div>
                        }
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-2">{p.plain_english}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-gray-400">{p.duration_min} min</span>
                        {p.consent_required && <Badge variant="outline" className="text-xs py-0">Consent required</Badge>}
                      </div>
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
