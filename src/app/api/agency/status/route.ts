import { type NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Consultation Presenter — chairside sales tool. Mostly static with AI generation.
export async function GET(req: NextRequest) {
  const secret = process.env.AGENCY_SNAPSHOT_SECRET;
  const auth = req.headers.get('authorization');
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const now = new Date();

  return NextResponse.json({
    engine: 'consultation-presenter',
    practice: 'Consultation Presenter — Chairside Sales',
    generatedAt: now.toISOString(),
    leads: { today: 0, thisWeek: 0, thisMonth: 0, pending: 0, avgResponseSeconds: null },
    appointments: { today: 0, thisWeek: 0, confirmed: 0, noShows: 0, cancellations: 0 },
    patients: { total: 0, active: 0, new30d: 0 },
    aiActions: { pending: 0, approvedToday: 0, rejectedToday: 0, totalToday: 0 },
    outreach: { sentToday: 0, deliveredToday: 0, failedToday: 0, activeSequences: 0 },
    integrations: {
      anthropic: { configured: !!process.env.ANTHROPIC_API_KEY, status: process.env.ANTHROPIC_API_KEY ? 'connected' : 'not_configured' },
      clerk: { configured: !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, status: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? 'connected' : 'not_configured' },
    },
    health: { dbOk: true, lastCronRun: null, cronHealthy: true },
  });
}
