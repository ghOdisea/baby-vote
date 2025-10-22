-- para gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1) options primero
CREATE TABLE IF NOT EXISTS public.options (
  id           TEXT PRIMARY KEY,        -- ej: 'opt_1', 'opt_2', 'opt_3'
  label        TEXT NOT NULL,           -- ej: 'Opción 1'
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

-- 2) votes después (sin FK a countries)
CREATE TABLE IF NOT EXISTS public.votes (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name           TEXT NOT NULL,
  country_code   CHAR(2) NOT NULL,                 -- viene del front, sin FK
  option_id      TEXT NOT NULL REFERENCES public.options(id),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- índices básicos
CREATE INDEX IF NOT EXISTS idx_votes_created_at ON public.votes (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_votes_option     ON public.votes (option_id);
CREATE INDEX IF NOT EXISTS idx_votes_country    ON public.votes (country_code);
