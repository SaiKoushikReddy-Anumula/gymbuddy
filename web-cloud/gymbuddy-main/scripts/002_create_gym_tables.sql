-- Create workouts table
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

-- Create exercises table (predefined exercises)
create table if not exists public.exercises (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  category text not null, -- 'chest', 'back', 'legs', 'shoulders', 'arms', 'core', 'cardio'
  muscle_groups text[] not null,
  equipment text, -- 'barbell', 'dumbbell', 'machine', 'bodyweight', 'cable'
  instructions text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create workout_exercises table (exercises in a specific workout)
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

-- Create sets table (individual sets performed)
create table if not exists public.sets (
  id uuid primary key default gen_random_uuid(),
  workout_exercise_id uuid not null references public.workout_exercises(id) on delete cascade,
  set_number integer not null,
  reps integer not null,
  weight numeric,
  duration_seconds integer, -- for time-based exercises
  rest_seconds integer,
  completed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on all tables
alter table public.workouts enable row level security;
alter table public.exercises enable row level security;
alter table public.workout_exercises enable row level security;
alter table public.sets enable row level security;

-- Create RLS policies for workouts
create policy "workouts_select_own" on public.workouts for select using (auth.uid() = user_id);
create policy "workouts_insert_own" on public.workouts for insert with check (auth.uid() = user_id);
create policy "workouts_update_own" on public.workouts for update using (auth.uid() = user_id);
create policy "workouts_delete_own" on public.workouts for delete using (auth.uid() = user_id);

-- Create RLS policies for exercises (public read, admin write)
create policy "exercises_select_all" on public.exercises for select to authenticated using (true);

-- Create RLS policies for workout_exercises
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

-- Create RLS policies for sets
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
