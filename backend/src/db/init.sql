CREATE TABLE IF NOT EXISTS public.options (
  id           TEXT PRIMARY KEY,
  label        TEXT NOT NULL,
  sort_order   INT NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_options_sort_order ON public.options (sort_order);

INSERT INTO public.options (id, label, sort_order) VALUES
('opt_1', 'Opción 1', 1),
('opt_2', 'Opción 2', 2),
('opt_3', 'Opción 3', 3)
ON CONFLICT (id) DO NOTHING;

-- extensión para gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.votes (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name           TEXT NOT NULL,
  country_code   CHAR(2) NOT NULL,
  option_id      TEXT NOT NULL REFERENCES public.options(id),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT votes_cc_iso2 CHECK (country_code ~ '^[A-Z]{2}$')
);

CREATE INDEX IF NOT EXISTS idx_votes_created_at ON public.votes (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_votes_option     ON public.votes (option_id);
CREATE INDEX IF NOT EXISTS idx_votes_country    ON public.votes (country_code);
