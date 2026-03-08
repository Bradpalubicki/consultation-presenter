import { type NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Consultation Presenter — agency snapshot endpoint. Mostly static — AI generation tool.
// Auth: Bearer token matching AGENCY_SNAPSHOT_SECRET env var.
export async function POST(req: NextRequest) {
  const secret = process.env.AGENCY_SNAPSHOT_SECRET;
  const auth = req.headers.get('authorization');
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const now = new Date();

  return NextResponse.json({
    timestamp: now.toISOString(),
    site_up: true,
    users_total: 0,
    active_today: 0,
    cron_healthy: true,
    last_cron_run: null,
    engine_type: 'saas/tool',
    engine_version: '1.0.0',
  });
}
