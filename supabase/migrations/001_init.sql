-- Consultation Presenter — Initial Schema

create table if not exists cp_sessions (
  id uuid primary key default gen_random_uuid(),
  practice_id text not null,
  patient_name text not null,
  patient_email text,
  patient_phone text,
  provider_name text not null,
  industry text not null default 'dental',
  procedures_shown jsonb not null default '[]',
  notes text,
  consent_signed boolean not null default false,
  consent_signed_at timestamptz,
  patient_pack_sent boolean not null default false,
  patient_pack_sent_at timestamptz,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  created_at timestamptz not null default now()
);

create index on cp_sessions (practice_id);
create index on cp_sessions (created_at desc);

alter table cp_sessions enable row level security;

create policy "practice members can manage their sessions"
  on cp_sessions for all
  using (practice_id = auth.jwt() ->> 'org_id');

-- Custom procedures per practice
create table if not exists cp_procedures (
  id uuid primary key default gen_random_uuid(),
  practice_id text not null,
  industry text not null,
  category text not null,
  name text not null,
  description text,
  plain_english text,
  steps jsonb default '[]',
  benefits jsonb default '[]',
  aftercare jsonb default '[]',
  faq jsonb default '[]',
  duration_min integer default 60,
  consent_required boolean default false,
  tags text[] default '{}',
  active boolean default true,
  created_at timestamptz not null default now()
);

create index on cp_procedures (practice_id, industry);

alter table cp_procedures enable row level security;

create policy "practice members can manage their procedures"
  on cp_procedures for all
  using (practice_id = auth.jwt() ->> 'org_id');
