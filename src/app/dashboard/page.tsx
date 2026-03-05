import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Play, Clock, TrendingUp, Users, ArrowRight, CheckCircle } from 'lucide-react'

const stats = [
  { title: 'Sessions This Month', value: '24', icon: Users, change: '+12%' },
  { title: 'Procedures Presented', value: '67', icon: Play, change: '+8%' },
  { title: 'Patient Packs Sent', value: '21', icon: CheckCircle, change: '+18%' },
  { title: 'Est. Acceptance Rate', value: '73%', icon: TrendingUp, change: '+5pp' },
]

const recentSessions = [
  { patient: 'Jane D.', provider: 'Dr. Smith', procedures: ['Dental Implant', 'Crown'], time: '2h ago', status: 'Pack Sent' },
  { patient: 'Mark T.', provider: 'Dr. Smith', procedures: ['Invisalign'], time: '4h ago', status: 'Consent Signed' },
  { patient: 'Sarah M.', provider: 'Dr. Lee', procedures: ['Teeth Whitening', 'Veneers'], time: 'Yesterday', status: 'Pack Sent' },
]

export default function DashboardPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Ready to present? Start a new consultation.</p>
        </div>
        <Link href="/dashboard/new-session">
          <Button className="gap-2"><Play className="w-4 h-4" /> New Consultation</Button>
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <Card key={s.title}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <s.icon className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-green-600 font-medium">{s.change}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.title}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Recent Sessions</CardTitle>
          <Link href="/dashboard/sessions">
            <Button variant="ghost" size="sm" className="gap-1 text-xs">View All <ArrowRight className="w-3 h-3" /></Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentSessions.map((s, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-semibold text-blue-700">
                    {s.patient[0]}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{s.patient}</div>
                    <div className="text-xs text-gray-500">{s.provider} · {s.procedures.join(', ')}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">{s.status}</span>
                  <span className="text-xs text-gray-400">{s.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
