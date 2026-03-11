-- Insert common exercises
insert into public.exercises (name, category, muscle_groups, equipment, instructions) values
-- Chest exercises
('Bench Press', 'chest', '{"chest", "triceps", "shoulders"}', 'barbell', 'Lie on bench, lower bar to chest, press up explosively'),
('Incline Dumbbell Press', 'chest', '{"chest", "shoulders", "triceps"}', 'dumbbell', 'Set bench to 30-45 degrees, press dumbbells up and together'),
('Push-ups', 'chest', '{"chest", "triceps", "shoulders", "core"}', 'bodyweight', 'Keep body straight, lower chest to ground, push up'),
('Dumbbell Flyes', 'chest', '{"chest", "shoulders"}', 'dumbbell', 'Lie flat, arc dumbbells out and down, squeeze chest together'),

-- Back exercises
('Deadlift', 'back', '{"back", "glutes", "hamstrings", "traps"}', 'barbell', 'Hip hinge movement, keep bar close to body, drive through heels'),
('Pull-ups', 'back', '{"back", "biceps", "shoulders"}', 'bodyweight', 'Hang from bar, pull chest to bar, control descent'),
('Bent-over Row', 'back', '{"back", "biceps", "shoulders"}', 'barbell', 'Hinge at hips, row bar to lower chest, squeeze shoulder blades'),
('Lat Pulldown', 'back', '{"back", "biceps", "shoulders"}', 'machine', 'Pull bar to upper chest, focus on lat engagement'),

-- Leg exercises
('Squat', 'legs', '{"quadriceps", "glutes", "hamstrings", "core"}', 'barbell', 'Feet shoulder-width apart, sit back and down, drive through heels'),
('Romanian Deadlift', 'legs', '{"hamstrings", "glutes", "back"}', 'barbell', 'Hip hinge movement, feel stretch in hamstrings, drive hips forward'),
('Leg Press', 'legs', '{"quadriceps", "glutes", "hamstrings"}', 'machine', 'Feet shoulder-width apart, lower with control, press through heels'),
('Lunges', 'legs', '{"quadriceps", "glutes", "hamstrings", "core"}', 'bodyweight', 'Step forward, lower back knee, push off front foot'),

-- Shoulder exercises
('Overhead Press', 'shoulders', '{"shoulders", "triceps", "core"}', 'barbell', 'Press bar overhead, keep core tight, full lockout'),
('Lateral Raises', 'shoulders', '{"shoulders"}', 'dumbbell', 'Raise arms to sides until parallel to floor, control descent'),
('Face Pulls', 'shoulders', '{"shoulders", "upper back"}', 'cable', 'Pull rope to face level, squeeze shoulder blades together'),

-- Arm exercises
('Bicep Curls', 'arms', '{"biceps"}', 'dumbbell', 'Keep elbows stationary, curl weight up, squeeze bicep at top'),
('Tricep Dips', 'arms', '{"triceps", "shoulders", "chest"}', 'bodyweight', 'Lower body by bending elbows, press back up'),
('Close-grip Bench Press', 'arms', '{"triceps", "chest", "shoulders"}', 'barbell', 'Narrow grip, focus on tricep engagement'),

-- Core exercises
('Plank', 'core', '{"core", "shoulders"}', 'bodyweight', 'Hold straight line from head to heels, engage core'),
('Russian Twists', 'core', '{"core", "obliques"}', 'bodyweight', 'Sit with knees bent, rotate torso side to side'),
('Dead Bug', 'core', '{"core"}', 'bodyweight', 'Lie on back, extend opposite arm and leg, maintain neutral spine'),

-- Cardio exercises
('Treadmill Run', 'cardio', '{"legs", "cardiovascular"}', 'machine', 'Maintain steady pace, focus on breathing rhythm'),
('Rowing Machine', 'cardio', '{"back", "legs", "arms", "cardiovascular"}', 'machine', 'Drive with legs, pull with arms, reverse the motion'),
('Burpees', 'cardio', '{"full body", "cardiovascular"}', 'bodyweight', 'Squat down, jump back to plank, jump forward, jump up')

on conflict (name) do nothing;
