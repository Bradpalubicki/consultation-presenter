'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { getProcedureById, ALL_PROCEDURES } from '@/lib/procedures'
import type { Procedure } from '@/types'
import { ChevronLeft, ChevronRight, CheckCircle, Clock, Send, X, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'

type Tab = 'overview' | 'steps' | 'benefits' | 'aftercare' | 'faq'

interface SessionData {
  patientName: string
  patientEmail: string
  patientPhone: string
  providerName: string
  industry: string
  procedures: Procedure[]
  startedAt: string
}

export default function PresentPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [session, setSession] = useState<SessionData | null>(null)
  const [currentProcedure, setCurrentProcedure] = useState<Procedure | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [sending, setSending] = useState(false)

  useEffect(() => {
    const raw = sessionStorage.getItem('cp_session')
    if (!raw) { router.push('/dashboard/new-session'); return }
    const data: SessionData = JSON.parse(raw)
    setSession(data)
    const idx = data.procedures.findIndex((p) => p.id === id)
    setCurrentIndex(idx >= 0 ? idx : 0)
    setCurrentProcedure(data.procedures[idx >= 0 ? idx : 0])
    setActiveTab('overview')
  }, [id, router])

  function goTo(index: number) {
    if (!session) return
    const p = session.procedures[index]
    setCurrentIndex(index)
    setCurrentProcedure(p)
    setActiveTab('overview')
    router.replace(`/present/${p.id}`)
  }

  async function sendPatientPack() {
    if (!session?.patientEmail) {
      toast.error('No email on file for this patient.')
      return
    }
    setSending(true)
    try {
      await fetch('/api/patient-pack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(session),
      })
      toast.success('Patient pack sent!')
    } catch {
      toast.error('Failed to send pack. Try again.')
    } finally {
      setSending(false)
    }
  }

  function endSession() {
    sessionStorage.removeItem('cp_session')
    router.push('/dashboard')
  }

  if (!session || !currentProcedure) return null

  const totalProcedures = session.procedures.length
  const progress = ((currentIndex + 1) / totalProcedures) * 100

  const TABS: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'steps', label: 'How It Works' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'aftercare', label: 'Aftercare' },
    { id: 'faq', label: 'FAQ' },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-gray-800">
        <div className="flex items-center gap-4">
          <button onClick={endSession} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
          <div>
            <span className="text-sm font-medium text-white">{session.patientName}</span>
            <span className="text-sm text-gray-400 ml-2">with {session.providerName}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-400">
            {currentIndex + 1} of {totalProcedures}
          </span>
          {session.patientEmail && (
            <Button
              onClick={sendPatientPack}
              disabled={sending}
              size="sm"
              variant="outline"
              className="gap-2 border-gray-600 text-gray-300 hover:text-white"
            >
              <Send className="w-3 h-3" />
              {sending ? 'Sending...' : 'Send Pack'}
            </Button>
          )}
          <Button onClick={endSession} size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:text-white">
            End Session
          </Button>
        </div>
      </div>

      {/* Progress bar */}
      {totalProcedures > 1 && (
        <div className="px-8 py-2 bg-gray-900">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-gray-400">Progress</span>
            <span className="text-xs text-blue-400">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-1.5 bg-gray-800" />
        </div>
      )}

      {/* Procedure nav pills */}
      {totalProcedures > 1 && (
        <div className="flex gap-2 px-8 py-3 bg-gray-900 border-b border-gray-800 overflow-x-auto">
          {session.procedures.map((p, i) => (
            <button
              key={p.id}
              onClick={() => goTo(i)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                i === currentIndex
                  ? 'bg-blue-600 text-white'
                  : i < currentIndex
                  ? 'bg-green-900 text-green-300'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {i < currentIndex && <CheckCircle className="w-3 h-3 inline mr-1" />}
              {p.name}
            </button>
          ))}
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-8 py-10">
        <div className="mb-8">
          <Badge variant="outline" className="border-blue-500 text-blue-400 mb-3">
            {currentProcedure.category}
          </Badge>
          <h1 className="text-4xl font-bold text-white mb-3">{currentProcedure.name}</h1>
          <p className="text-xl text-gray-300 leading-relaxed">{currentProcedure.plain_english}</p>
          <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> ~{currentProcedure.duration_min} min procedure</span>
            {currentProcedure.consent_required && (
              <Badge variant="outline" className="border-yellow-600 text-yellow-400 text-xs">Consent required</Badge>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-gray-800">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-900 rounded-xl p-6">
                <h3 className="font-semibold text-white mb-3">What is it?</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{currentProcedure.description}</p>
              </div>
              <div className="bg-gray-900 rounded-xl p-6">
                <h3 className="font-semibold text-white mb-3">Quick Facts</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Duration</span>
                    <span className="text-white">{currentProcedure.duration_min} min</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Consent</span>
                    <span className={currentProcedure.consent_required ? 'text-yellow-400' : 'text-green-400'}>
                      {currentProcedure.consent_required ? 'Required' : 'Not required'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Tags</span>
                    <span className="text-gray-300">{currentProcedure.tags.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'steps' && (
            <div className="space-y-3">
              {currentProcedure.steps.map((step, i) => (
                <div key={i} className="flex items-start gap-4 bg-gray-900 rounded-xl p-5">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-gray-200 pt-0.5">{step}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'benefits' && (
            <div className="grid grid-cols-2 gap-4">
              {currentProcedure.benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-3 bg-gray-900 rounded-xl p-5">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-200 text-sm">{b}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'aftercare' && (
            <div className="space-y-3">
              {currentProcedure.aftercare.map((a, i) => (
                <div key={i} className="flex items-start gap-3 bg-gray-900 rounded-xl p-5">
                  <span className="text-blue-400 font-bold text-sm flex-shrink-0 mt-0.5">#{i + 1}</span>
                  <p className="text-gray-200 text-sm">{a}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-3">
              {currentProcedure.faq.map((item, i) => (
                <div key={i} className="bg-gray-900 rounded-xl p-5">
                  <h4 className="font-semibold text-white mb-2">{item.q}</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation footer */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-800">
          <Button
            variant="outline"
            onClick={() => goTo(currentIndex - 1)}
            disabled={currentIndex === 0}
            className="gap-2 border-gray-700 text-gray-300 hover:text-white"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </Button>

          {currentIndex < totalProcedures - 1 ? (
            <Button onClick={() => goTo(currentIndex + 1)} className="gap-2">
              Next: {session.procedures[currentIndex + 1]?.name} <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={sendPatientPack} disabled={sending} className="gap-2 bg-green-600 hover:bg-green-700">
              <Send className="w-4 h-4" /> {sending ? 'Sending Pack...' : 'Send Patient Pack'}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
