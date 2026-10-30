create table if not exists code_subscribers (
  id bigserial primary key,
  email text not null unique,
  created_at timestamptz not null default now()
);
