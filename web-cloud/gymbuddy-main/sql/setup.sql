-- ============================================================
--  SETUP.SQL — COMPLETE DATABASE SETUP FOR FITNESS APP
--  Includes schema, RLS policies, seed data, and analytics demo
-- ============================================================

-- ============================================================
-- 001_create_user_profiles.sql
-- ============================================================

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

alter table public.user_profiles enable row level security;

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

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- ============================================================
-- 002_create_gym_tables.sql
-- ============================================================

create table if not exists public.workouts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  description text,
  duration_minutes integer,
  calories_burned integer,
  status text check (status in ('active', 'completed', 'paused')) default 'active',
  started_at timestamp with time zone default timezone('utc'::text, now()) not null,
  completed_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.exercises (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  category text not null,
  muscle_groups text[] not null,
  equipment text,
  instructions text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.workout_exercises (
  id uuid primary key default gen_random_uuid(),
  workout_id uuid not null references public.workouts(id) on delete cascade,
  exercise_id uuid not null references public.exercises(id) on delete cascade,
  order_index integer not null,
  target_sets integer,
  target_reps integer,
  target_weight numeric,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.sets (
  id uuid primary key default gen_random_uuid(),
  workout_exercise_id uuid not null references public.workout_exercises(id) on delete cascade,
  set_number integer not null,
  reps integer not null,
  weight numeric,
  duration_seconds integer,
  rest_seconds integer,
  completed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.workouts enable row level security;
alter table public.exercises enable row level security;
alter table public.workout_exercises enable row level security;
alter table public.sets enable row level security;

create policy "workouts_select_own" on public.workouts for select using (auth.uid() = user_id);
create policy "workouts_insert_own" on public.workouts for insert with check (auth.uid() = user_id);
create policy "workouts_update_own" on public.workouts for update using (auth.uid() = user_id);
create policy "workouts_delete_own" on public.workouts for delete using (auth.uid() = user_id);

create policy "exercises_select_all" on public.exercises for select to authenticated using (true);

create policy "workout_exercises_select_own" on public.workout_exercises for select using (
  exists (select 1 from public.workouts where workouts.id = workout_exercises.workout_id and workouts.user_id = auth.uid())
);
create policy "workout_exercises_insert_own" on public.workout_exercises for insert with check (
  exists (select 1 from public.workouts where workouts.id = workout_exercises.workout_id and workouts.user_id = auth.uid())
);
create policy "workout_exercises_update_own" on public.workout_exercises for update using (
  exists (select 1 from public.workouts where workouts.id = workout_exercises.workout_id and workouts.user_id = auth.uid())
);
create policy "workout_exercises_delete_own" on public.workout_exercises for delete using (
  exists (select 1 from public.workouts where workouts.id = workout_exercises.workout_id and workouts.user_id = auth.uid())
);

create policy "sets_select_own" on public.sets for select using (
  exists (
    select 1 from public.workout_exercises we
    join public.workouts w on w.id = we.workout_id
    where we.id = sets.workout_exercise_id and w.user_id = auth.uid()
  )
);
create policy "sets_insert_own" on public.sets for insert with check (
  exists (
    select 1 from public.workout_exercises we
    join public.workouts w on w.id = we.workout_id
    where we.id = sets.workout_exercise_id and w.user_id = auth.uid()
  )
);
create policy "sets_update_own" on public.sets for update using (
  exists (
    select 1 from public.workout_exercises we
    join public.workouts w on w.id = we.workout_id
    where we.id = sets.workout_exercise_id and w.user_id = auth.uid()
  )
);
create policy "sets_delete_own" on public.sets for delete using (
  exists (
    select 1 from public.workout_exercises we
    join public.workouts w on w.id = we.workout_id
    where we.id = sets.workout_exercise_id and w.user_id = auth.uid()
  )
);

-- ============================================================
-- 003_seed_exercises.sql
-- ============================================================

insert into public.exercises (name, category, muscle_groups, equipment, instructions) values
('Bench Press', 'chest', '{"chest","triceps","shoulders"}', 'barbell', 'Lie on bench, lower bar to chest, press up explosively'),
('Squat', 'legs', '{"quadriceps","glutes","hamstrings","core"}', 'barbell', 'Feet shoulder-width apart, sit back and down, drive through heels'),
('Pull-ups', 'back', '{"back","biceps","shoulders"}', 'bodyweight', 'Hang from bar, pull chest to bar, control descent'),
('Deadlift', 'back', '{"back","glutes","hamstrings","traps"}', 'barbell', 'Hip hinge, keep bar close to body, drive through heels'),
('Push-ups', 'chest', '{"chest","triceps","shoulders","core"}', 'bodyweight', 'Keep body straight, lower chest to ground, push up')
on conflict (name) do nothing;

-- ============================================================
-- 004_create_diet_tables.sql
-- ============================================================

create table if not exists foods (
  id uuid default gen_random_uuid() primary key,
  name varchar(255) not null,
  brand varchar(255),
  calories_per_100g decimal(8,2) not null,
  protein_per_100g decimal(8,2) not null default 0,
  carbs_per_100g decimal(8,2) not null default 0,
  fat_per_100g decimal(8,2) not null default 0,
  fiber_per_100g decimal(8,2) default 0,
  sugar_per_100g decimal(8,2) default 0,
  sodium_per_100g decimal(8,2) default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table if not exists meals (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  name varchar(255) not null,
  meal_type varchar(50) not null check (meal_type in ('breakfast','lunch','dinner','snack')),
  date date not null default current_date,
  total_calories decimal(8,2) default 0,
  total_protein decimal(8,2) default 0,
  total_carbs decimal(8,2) default 0,
  total_fat decimal(8,2) default 0,
  notes text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table if not exists meal_foods (
  id uuid default gen_random_uuid() primary key,
  meal_id uuid references meals(id) on delete cascade,
  food_id uuid references foods(id) on delete cascade,
  quantity_grams decimal(8,2) not null,
  calories decimal(8,2) not null,
  protein decimal(8,2) not null,
  carbs decimal(8,2) not null,
  fat decimal(8,2) not null,
  created_at timestamp with time zone default now()
);

create table if not exists daily_nutrition (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  date date not null default current_date,
  total_calories decimal(8,2) default 0,
  total_protein decimal(8,2) default 0,
  total_carbs decimal(8,2) default 0,
  total_fat decimal(8,2) default 0,
  water_intake_ml integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(user_id,date)
);

alter table foods enable row level security;
alter table meals enable row level security;
alter table meal_foods enable row level security;
alter table daily_nutrition enable row level security;

create policy "Foods are viewable by everyone" on foods for select using (true);
create policy "Users can view own meals" on meals for all using (auth.uid() = user_id);
create policy "Users can view own meal foods" on meal_foods for all using (
  exists (select 1 from meals where meals.id = meal_foods.meal_id and meals.user_id = auth.uid())
);
create policy "Users can view own daily nutrition" on daily_nutrition for all using (auth.uid() = user_id);

insert into foods (name, calories_per_100g, protein_per_100g, carbs_per_100g, fat_per_100g) values
('Chicken Breast (Cooked)', 165, 31, 0, 3.6),
('Brown Rice (Cooked)', 123, 2.6, 23, 0.9),
('Broccoli', 34, 2.8, 7, 0.4),
('Banana', 89, 1.1, 23, 0.3),
('Oats', 389, 16.9, 66.3, 6.9)
on conflict (name) do nothing;

-- ============================================================
-- 005_create_chat_table.sql
-- ============================================================

create table if not exists chat_messages (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  message text not null,
  response text not null,
  created_at timestamp with time zone default now()
);

alter table chat_messages enable row level security;

create policy "Users can view own chat messages" on chat_messages for all using (auth.uid() = user_id);

create index if not exists idx_chat_messages_user_created on chat_messages(user_id, created_at desc);

-- ============================================================
-- 009_demo_data_no_duplicates.sql
-- ============================================================

-- Replace YOUR_USER_ID_HERE before running this script

insert into public.user_profiles (id, full_name, weight, height, gender, bmi)
values ('YOUR_USER_ID_HERE', 'Demo User', 75.5, 175.0, 'male', 24.7)
on conflict (id) do update set full_name = excluded.full_name;

insert into public.workouts (id, user_id, name, description, status, duration_minutes, calories_burned)
values
('770e8400-e29b-41d4-a716-446655440001', 'YOUR_USER_ID_HERE', 'Upper Body Strength', 'Chest, shoulders, arms', 'completed', 45, 320),
('770e8400-e29b-41d4-a716-446655440002', 'YOUR_USER_ID_HERE', 'Lower Body Power', 'Squats and deadlifts', 'completed', 50, 380)
on conflict (id) do nothing;

insert into public.chat_messages (id, user_id, message, response)
values
('dd0e8400-e29b-41d4-a716-446655440001', 'YOUR_USER_ID_HERE', 'What should I eat for breakfast?', 'Try oatmeal with banana or eggs with toast.'),
('dd0e8400-e29b-41d4-a716-446655440002', 'YOUR_USER_ID_HERE', 'How can I improve my squat form?', 'Keep chest up, knees over toes, and engage core.')
on conflict (id) do nothing;

-- ============================================================
-- 011_analytics_demo_data.sql
-- ============================================================

insert into workouts (id, user_id, name, duration_minutes, calories_burned, created_at)
values
('a1111111-1111-1111-1111-111111111111', 'YOUR_USER_ID_HERE', 'Push Day', 65, 420, now() - interval '30 days'),
('a2222222-2222-2222-2222-222222222222', 'YOUR_USER_ID_HERE', 'Pull Day', 70, 380, now() - interval '29 days'),
('a3333333-3333-3333-3333-333333333333', 'YOUR_USER_ID_HERE', 'Leg Day', 80, 520, now() - interval '28 days')
on conflict (id) do nothing;

insert into daily_nutrition (id, user_id, date, total_calories, total_protein, total_carbs, total_fat, water_intake_ml)
values
('n1111111-1111-1111-1111-111111111111', 'YOUR_USER_ID_HERE', current_date - 30, 2200, 150, 220, 80, 2500),
('n2222222-2222-2222-2222-222222222222', 'YOUR_USER_ID_HERE', current_date - 29, 2150, 145, 210, 75, 2600),
('n3333333-3333-3333-3333-333333333333', 'YOUR_USER_ID_HERE', current_date - 28, 2300, 160, 240, 85, 2700)
on conflict (id) do nothing;

select '✅ Database setup complete — replace YOUR_USER_ID_HERE before running.' as message;

