import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, CheckCircle, Send } from 'lucide-react'

const mockSessions = [
  { id: '1', patient: 'Jane Doe', provider: 'Dr. Smith', procedures: ['Dental Implant', 'Crown'], date: '2026-03-05 10:30', status: 'pack_sent', industry: 'dental' },
  { id: '2', patient: 'Mark Torres', provider: 'Dr. Smith', procedures: ['Invisalign'], date: '2026-03-05 14:00', status: 'consent_signed', industry: 'dental' },
  { id: '3', patient: 'Sarah Miller', provider: 'Dr. Lee', procedures: ['Teeth Whitening', 'Veneers'], date: '2026-03-04 09:15', status: 'pack_sent', industry: 'dental' },
  { id: '4', patient: 'Client A', provider: 'Alex S.', procedures: ['Balayage'], date: '2026-03-03 11:00', status: 'completed', industry: 'salon' },
]

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  pack_sent: { label: 'Pack Sent', color: 'bg-green-50 text-green-700' },
  consent_signed: { label: 'Consent Signed', color: 'bg-blue-50 text-blue-700' },
  completed: { label: 'Completed', color: 'bg-gray-50 text-gray-700' },
}

export default function SessionsPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Past Sessions</h1>
        <p className="text-gray-500 text-sm mt-1">All consultation sessions with timestamps and status.</p>
      </div>
      <Card>
        <CardHeader><CardTitle className="text-base">Session History</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-1">
            {mockSessions.map((s) => {
              const status = STATUS_MAP[s.status] ?? { label: s.status, color: 'bg-gray-50 text-gray-700' }
              return (
                <div key={s.id} className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-700 text-sm">
                      {s.patient[0]}
                    </div>
                    <div>
                      <div className="font-medium text-sm text-gray-900">{s.patient}</div>
                      <div className="text-xs text-gray-500">{s.provider} · {s.procedures.join(', ')}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs capitalize">{s.industry}</Badge>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${status.color}`}>{status.label}</span>
                    <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{s.date}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
