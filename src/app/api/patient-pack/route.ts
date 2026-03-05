import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const schema = z.object({
  patientName: z.string().min(1),
  patientEmail: z.string().email(),
  providerName: z.string().min(1),
  industry: z.string(),
  procedures: z.array(z.object({
    name: z.string(),
    plain_english: z.string(),
    steps: z.array(z.string()),
    benefits: z.array(z.string()),
    aftercare: z.array(z.string()),
    faq: z.array(z.object({ q: z.string(), a: z.string() })),
    duration_min: z.number(),
    consent_required: z.boolean(),
  })),
})

function buildEmailHtml(data: z.infer<typeof schema>): string {
  const procedureBlocks = data.procedures.map((p) => `
    <div style="margin-bottom:32px;padding:24px;background:#f8fafc;border-radius:12px;border-left:4px solid #2563eb;">
      <h2 style="color:#1e293b;margin:0 0 8px 0;font-size:20px;">${p.name}</h2>
      <p style="color:#475569;margin:0 0 16px 0;">${p.plain_english}</p>
      <h3 style="color:#1e293b;font-size:14px;margin:0 0 8px 0;">How It Works</h3>
      <ol style="color:#475569;font-size:14px;padding-left:20px;margin:0 0 16px 0;">
        ${p.steps.map((s) => `<li style="margin-bottom:4px;">${s}</li>`).join('')}
      </ol>
      <h3 style="color:#1e293b;font-size:14px;margin:0 0 8px 0;">Key Benefits</h3>
      <ul style="color:#475569;font-size:14px;padding-left:20px;margin:0 0 16px 0;">
        ${p.benefits.map((b) => `<li style="margin-bottom:4px;">${b}</li>`).join('')}
      </ul>
      ${p.consent_required ? '<p style="background:#fef3c7;padding:8px 12px;border-radius:6px;font-size:13px;color:#92400e;margin:0;">A signed consent form will be required before proceeding with this treatment.</p>' : ''}
    </div>
  `).join('')

  return `
    <!DOCTYPE html>
    <html>
    <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1e293b;">
      <div style="text-align:center;margin-bottom:32px;">
        <h1 style="font-size:24px;font-weight:700;color:#1e293b;margin:0 0 4px 0;">Your Consultation Summary</h1>
        <p style="color:#64748b;margin:0;">Prepared by ${data.providerName} · ${new Date().toLocaleDateString()}</p>
      </div>
      <p style="color:#475569;margin-bottom:24px;">Hi ${data.patientName}, thank you for your consultation today. Here is a summary of the procedures we discussed to help you make an informed decision.</p>
      ${procedureBlocks}
      <div style="margin-top:32px;padding:20px;background:#1e40af;border-radius:12px;text-align:center;">
        <p style="color:white;margin:0 0 12px 0;font-size:16px;font-weight:600;">Ready to move forward?</p>
        <p style="color:#bfdbfe;margin:0;font-size:14px;">Contact us to schedule your next appointment.</p>
      </div>
      <p style="color:#94a3b8;font-size:12px;text-align:center;margin-top:24px;">This summary was automatically generated following your consultation. All procedures discussed are subject to a full clinical assessment.</p>
    </body>
    </html>
  `
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    await resend.emails.send({
      from: `${data.providerName} <noreply@nustack.digital>`,
      to: data.patientEmail,
      subject: `Your Consultation Summary — ${data.procedures.map((p) => p.name).join(', ')}`,
      html: buildEmailHtml(data),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('patient-pack error:', err)
    return NextResponse.json({ error: 'Failed to send patient pack' }, { status: 500 })
  }
}
