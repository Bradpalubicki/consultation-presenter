import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle } from 'lucide-react'

const industries = ['dental', 'salon', 'cosmetic', 'landscaping']

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Configure your practice details and industry.</p>
      </div>
      <Card className="mb-4">
        <CardHeader><CardTitle className="text-base">Practice Info</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Practice Name</span>
            <span className="font-medium text-gray-900">{process.env.NEXT_PUBLIC_PRACTICE_NAME ?? 'My Practice'}</span>
          </div>
          <div className="flex justify-between">
            <span>Industry</span>
            <Badge variant="secondary">{process.env.NEXT_PUBLIC_INDUSTRY ?? 'dental'}</Badge>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-base">Available Industries</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {industries.map((ind) => (
              <div key={ind} className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="capitalize">{ind}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4">Industry is set via NEXT_PUBLIC_INDUSTRY env var per deployment.</p>
        </CardContent>
      </Card>
    </div>
  )
}
