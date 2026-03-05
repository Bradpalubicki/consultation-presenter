import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Zap, Users, TrendingUp, ArrowRight, Brain, FileText, Send } from 'lucide-react'

const stats = [
  { value: '3×', label: 'Case Acceptance' },
  { value: '180', label: 'Minutes Saved / Week' },
  { value: '65%', label: 'Patients Learn Visually' },
  { value: '50%+', label: 'Implant Uptake Increase' },
]

const features = [
  { icon: Brain, title: 'AI-Powered Explainers', description: 'Claude generates plain-English explanations for every procedure — no jargon, just clarity.' },
  { icon: Zap, title: 'Chairside Presenter', description: 'Fullscreen patient-facing mode with step-by-step procedure breakdowns, benefits, and aftercare.' },
  { icon: FileText, title: 'Digital Consent', description: 'Auto-generate timestamped consent forms. Every interaction logged for compliance.' },
  { icon: Send, title: 'Patient Packs', description: 'After each consultation, automatically email a branded summary with procedure details and next steps.' },
  { icon: Users, title: 'Multi-Industry Ready', description: 'Configure for dental, cosmetic surgery, salon, or landscaping. One platform, every vertical.' },
  { icon: TrendingUp, title: 'Engagement Tracking', description: 'See when patients open their pack, what they read, and who is ready to book.' },
]

const industries = [
  { icon: '🦷', name: 'Dental', desc: 'Implants, veneers, orthodontics + more' },
  { icon: '✂️', name: 'Salon', desc: 'Color consultations, chemical services' },
  { icon: '🏥', name: 'Cosmetic Surgery', desc: 'Rhinoplasty, breast aug, hair restoration' },
  { icon: '🌿', name: 'Landscaping', desc: 'Design proposals, project visualization' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg">ConsultPresenter</span>
          <Badge variant="secondary" className="text-xs">by NuStack</Badge>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/sign-in"><Button variant="ghost" size="sm">Sign In</Button></Link>
          <Link href="/dashboard"><Button size="sm">Get Started</Button></Link>
        </div>
      </nav>

      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <Badge className="mb-4 bg-blue-50 text-blue-700 border-blue-200">Built for practices that close more cases</Badge>
        <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">Show patients exactly<br />what you mean.</h1>
        <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">AI-powered consultation presenter for modern practices. Walk patients through procedures visually, capture consent digitally, and send a branded follow-up — all in one flow.</p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/dashboard"><Button size="lg" className="gap-2">Start Presenting <ArrowRight className="w-4 h-4" /></Button></Link>
          <Button size="lg" variant="outline">Watch Demo</Button>
        </div>
        <div className="grid grid-cols-4 gap-8 mt-20 border border-gray-100 rounded-2xl p-8 bg-gray-50">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-bold text-blue-600">{s.value}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Built for every practice type</h2>
            <p className="text-gray-500">One platform, configured for your industry</p>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {industries.map((ind) => (
              <div key={ind.name} className="bg-white rounded-xl p-6 text-center border border-gray-100">
                <div className="text-4xl mb-3">{ind.icon}</div>
                <div className="font-semibold text-gray-900">{ind.name}</div>
                <div className="text-sm text-gray-500 mt-1">{ind.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Everything you need to close the case</h2>
          <p className="text-gray-500">From chairside to signed consent to sent follow-up</p>
        </div>
        <div className="grid grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title} className="p-6 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
              <f.icon className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blue-600 py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to 3× your case acceptance?</h2>
          <p className="text-blue-100 mb-8">Set up in minutes. No contracts. Cancel anytime.</p>
          <Link href="/dashboard"><Button size="lg" variant="secondary" className="gap-2">Start Free Trial <ArrowRight className="w-4 h-4" /></Button></Link>
        </div>
      </section>

      <footer className="border-t border-gray-100 px-6 py-8 flex items-center justify-between text-sm text-gray-500">
        <span>© 2026 NuStack Digital Ventures. All rights reserved.</span>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-gray-900">Privacy</Link>
          <Link href="/terms" className="hover:text-gray-900">Terms</Link>
        </div>
      </footer>
    </div>
  )
}
