-- Create user profiles table for additional fitness data
create table if not exists public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  weight numeric,
  height numeric,
  gender text check (gender in ('male', 'female', 'other')),
  bmi numeric,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.user_profiles enable row level security;

-- Create RLS policies
create policy "user_profiles_select_own"
  on public.user_profiles for select
  using (auth.uid() = id);

create policy "user_profiles_insert_own"
  on public.user_profiles for insert
  with check (auth.uid() = id);

create policy "user_profiles_update_own"
  on public.user_profiles for update
  using (auth.uid() = id);

create policy "user_profiles_delete_own"
  on public.user_profiles for delete
  using (auth.uid() = id);

-- Create function to handle new user profile creation
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.user_profiles (id, full_name, weight, height, gender, bmi)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce((new.raw_user_meta_data ->> 'weight')::numeric, null),
    coalesce((new.raw_user_meta_data ->> 'height')::numeric, null),
    coalesce(new.raw_user_meta_data ->> 'gender', null),
    coalesce((new.raw_user_meta_data ->> 'bmi')::numeric, null)
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

-- Create trigger for auto-creating profiles
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
