-- backend/src/db/init.sql
create extension if not exists "uuid-ossp";

create table if not exists votes (
  id uuid primary key default uuid_generate_v4(),
  name text not null check (length(name) between 1 and 80),
  option smallint not null check (option in (1,2,3)),
  country_code char(2) not null,
  created_at timestamptz not null default now()
);

-- índices útiles
create index if not exists idx_votes_created_at on votes (created_at desc);
create index if not exists idx_votes_option on votes (option);
create index if not exists idx_votes_country on votes (country_code);
