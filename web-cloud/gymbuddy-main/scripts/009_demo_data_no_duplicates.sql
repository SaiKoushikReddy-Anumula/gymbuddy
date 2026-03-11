-- Demo Data Script - Handles Duplicates Gracefully
-- Instructions:
-- 1. First sign up for an account through your app's signup page
-- 2. Find your user ID by running: SELECT id FROM auth.users;
-- 3. Replace 'YOUR_USER_ID_HERE' below with your actual user ID
-- 4. Run this script in Supabase SQL Editor

-- Insert user profile (replace with your actual user ID from auth.users)
INSERT INTO public.user_profiles (id, full_name, weight, height, gender, date_of_birth, fitness_level, goals) 
VALUES ('YOUR_USER_ID_HERE', 'Demo User', 75.5, 175.0, 'male', '1990-01-15', 'intermediate', ARRAY['lose_weight', 'build_muscle'])
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  weight = EXCLUDED.weight,
  height = EXCLUDED.height,
  gender = EXCLUDED.gender,
  date_of_birth = EXCLUDED.date_of_birth,
  fitness_level = EXCLUDED.fitness_level,
  goals = EXCLUDED.goals;

-- Insert sample exercises (handles duplicates)
INSERT INTO public.exercises (id, name, category, muscle_groups, equipment, instructions) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Push-ups', 'strength', ARRAY['chest', 'triceps', 'shoulders'], 'bodyweight', 'Start in plank position, lower body to ground, push back up'),
('550e8400-e29b-41d4-a716-446655440002', 'Squats', 'strength', ARRAY['quadriceps', 'glutes', 'hamstrings'], 'bodyweight', 'Stand with feet shoulder-width apart, lower hips back and down, return to standing'),
('550e8400-e29b-41d4-a716-446655440003', 'Deadlifts', 'strength', ARRAY['hamstrings', 'glutes', 'back'], 'barbell', 'Stand with feet hip-width apart, bend at hips and knees to lower bar, return to standing'),
('550e8400-e29b-41d4-a716-446655440004', 'Bench Press', 'strength', ARRAY['chest', 'triceps', 'shoulders'], 'barbell', 'Lie on bench, lower bar to chest, press back up'),
('550e8400-e29b-41d4-a716-446655440005', 'Pull-ups', 'strength', ARRAY['back', 'biceps'], 'pull-up bar', 'Hang from bar, pull body up until chin over bar, lower back down'),
('550e8400-e29b-41d4-a716-446655440006', 'Bicep Curls', 'strength', ARRAY['biceps'], 'dumbbells', 'Hold dumbbells at sides, curl up to shoulders, lower slowly'),
('550e8400-e29b-41d4-a716-446655440007', 'Lunges', 'strength', ARRAY['quadriceps', 'glutes'], 'bodyweight', 'Step forward, lower back knee toward ground, return to standing'),
('550e8400-e29b-41d4-a716-446655440008', 'Plank', 'core', ARRAY['core', 'shoulders'], 'bodyweight', 'Hold push-up position, keep body straight, engage core'),
('550e8400-e29b-41d4-a716-446655440009', 'Running', 'cardio', ARRAY['legs', 'cardiovascular'], 'none', 'Maintain steady pace, focus on breathing and form'),
('550e8400-e29b-41d4-a716-446655440010', 'Jumping Jacks', 'cardio', ARRAY['full_body', 'cardiovascular'], 'bodyweight', 'Jump feet apart while raising arms, return to starting position')
ON CONFLICT (name) DO NOTHING;

-- Insert sample foods (handles duplicates)
INSERT INTO public.foods (id, name, brand, calories_per_100g, protein_per_100g, carbs_per_100g, fat_per_100g, fiber_per_100g, sugar_per_100g, sodium_per_100g) VALUES
('660e8400-e29b-41d4-a716-446655440001', 'Chicken Breast', 'Generic', 165, 31.0, 0.0, 3.6, 0.0, 0.0, 74),
('660e8400-e29b-41d4-a716-446655440002', 'Brown Rice', 'Generic', 111, 2.6, 23.0, 0.9, 1.8, 0.4, 5),
('660e8400-e29b-41d4-a716-446655440003', 'Broccoli', 'Generic', 34, 2.8, 7.0, 0.4, 2.6, 1.5, 33),
('660e8400-e29b-41d4-a716-446655440004', 'Banana', 'Generic', 89, 1.1, 23.0, 0.3, 2.6, 12.0, 1),
('660e8400-e29b-41d4-a716-446655440005', 'Oats', 'Generic', 389, 16.9, 66.0, 6.9, 10.6, 0.0, 2),
('660e8400-e29b-41d4-a716-446655440006', 'Salmon', 'Generic', 208, 25.4, 0.0, 12.4, 0.0, 0.0, 59),
('660e8400-e29b-41d4-a716-446655440007', 'Sweet Potato', 'Generic', 86, 1.6, 20.0, 0.1, 3.0, 4.2, 5),
('660e8400-e29b-41d4-a716-446655440008', 'Greek Yogurt', 'Generic', 59, 10.0, 3.6, 0.4, 0.0, 3.2, 36),
('660e8400-e29b-41d4-a716-446655440009', 'Almonds', 'Generic', 579, 21.2, 22.0, 49.9, 12.5, 4.4, 1),
('660e8400-e29b-41d4-a716-446655440010', 'Spinach', 'Generic', 23, 2.9, 3.6, 0.4, 2.2, 0.4, 79)
ON CONFLICT (id) DO NOTHING;

-- Insert sample workouts (replace YOUR_USER_ID_HERE with your actual user ID)
INSERT INTO public.workouts (id, user_id, name, description, status, duration_minutes, calories_burned, started_at, completed_at) VALUES
('770e8400-e29b-41d4-a716-446655440001', 'YOUR_USER_ID_HERE', 'Upper Body Strength', 'Focus on chest, shoulders, and arms', 'completed', 45, 320, NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days' + INTERVAL '45 minutes'),
('770e8400-e29b-41d4-a716-446655440002', 'YOUR_USER_ID_HERE', 'Lower Body Power', 'Leg day with squats and deadlifts', 'completed', 50, 380, NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day' + INTERVAL '50 minutes'),
('770e8400-e29b-41d4-a716-446655440003', 'YOUR_USER_ID_HERE', 'Cardio Blast', 'High intensity cardio session', 'completed', 30, 250, NOW() - INTERVAL '3 hours', NOW() - INTERVAL '2.5 hours')
ON CONFLICT (id) DO NOTHING;

-- Insert workout exercises
INSERT INTO public.workout_exercises (id, workout_id, exercise_id, order_index, target_sets, target_reps, target_weight) VALUES
('880e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 1, 3, 15, NULL),
('880e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440004', 2, 3, 10, 60.0),
('880e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 1, 4, 12, 80.0),
('880e8400-e29b-41d4-a716-446655440004', '770e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', 2, 3, 8, 100.0),
('880e8400-e29b-41d4-a716-446655440005', '770e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440009', 1, 1, 1, NULL),
('880e8400-e29b-41d4-a716-446655440006', '770e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440010', 2, 3, 30, NULL)
ON CONFLICT (id) DO NOTHING;

-- Insert sample sets
INSERT INTO public.sets (id, workout_exercise_id, set_number, reps, weight, duration_seconds, rest_seconds, completed) VALUES
('990e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440001', 1, 15, NULL, 30, 60, true),
('990e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440001', 2, 14, NULL, 32, 60, true),
('990e8400-e29b-41d4-a716-446655440003', '880e8400-e29b-41d4-a716-446655440001', 3, 12, NULL, 35, 90, true),
('990e8400-e29b-41d4-a716-446655440004', '880e8400-e29b-41d4-a716-446655440002', 1, 10, 60.0, 25, 90, true),
('990e8400-e29b-41d4-a716-446655440005', '880e8400-e29b-41d4-a716-446655440002', 2, 9, 60.0, 27, 90, true),
('990e8400-e29b-41d4-a716-446655440006', '880e8400-e29b-41d4-a716-446655440002', 3, 8, 60.0, 30, 120, true)
ON CONFLICT (id) DO NOTHING;

-- Insert sample meals (replace YOUR_USER_ID_HERE with your actual user ID)
INSERT INTO public.meals (id, user_id, name, meal_type, date, total_calories, total_protein, total_carbs, total_fat) VALUES
('aa0e8400-e29b-41d4-a716-446655440001', 'YOUR_USER_ID_HERE', 'Healthy Breakfast', 'breakfast', CURRENT_DATE, 420, 25.0, 45.0, 12.0),
('aa0e8400-e29b-41d4-a716-446655440002', 'YOUR_USER_ID_HERE', 'Power Lunch', 'lunch', CURRENT_DATE, 580, 45.0, 35.0, 18.0),
('aa0e8400-e29b-41d4-a716-446655440003', 'YOUR_USER_ID_HERE', 'Protein Dinner', 'dinner', CURRENT_DATE, 650, 55.0, 40.0, 22.0),
('aa0e8400-e29b-41d4-a716-446655440004', 'YOUR_USER_ID_HERE', 'Post-Workout Snack', 'snack', CURRENT_DATE, 180, 15.0, 20.0, 3.0)
ON CONFLICT (id) DO NOTHING;

-- Insert meal foods
INSERT INTO public.meal_foods (id, meal_id, food_id, quantity_grams, calories, protein, carbs, fat) VALUES
('bb0e8400-e29b-41d4-a716-446655440001', 'aa0e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440005', 80, 311, 13.5, 52.8, 5.5),
('bb0e8400-e29b-41d4-a716-446655440002', 'aa0e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440004', 120, 107, 1.3, 27.6, 0.4),
('bb0e8400-e29b-41d4-a716-446655440003', 'aa0e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440001', 200, 330, 62.0, 0.0, 7.2),
('bb0e8400-e29b-41d4-a716-446655440004', 'aa0e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440002', 150, 167, 3.9, 34.5, 1.4),
('bb0e8400-e29b-41d4-a716-446655440005', 'aa0e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440006', 180, 374, 45.7, 0.0, 22.3),
('bb0e8400-e29b-41d4-a716-446655440006', 'aa0e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440007', 200, 172, 3.2, 40.0, 0.2)
ON CONFLICT (id) DO NOTHING;

-- Insert daily nutrition summary (replace YOUR_USER_ID_HERE with your actual user ID)
INSERT INTO public.daily_nutrition (id, user_id, date, total_calories, total_protein, total_carbs, total_fat, water_intake_ml) VALUES
('cc0e8400-e29b-41d4-a716-446655440001', 'YOUR_USER_ID_HERE', CURRENT_DATE, 1830, 140.0, 140.0, 55.0, 2800),
('cc0e8400-e29b-41d4-a716-446655440002', 'YOUR_USER_ID_HERE', CURRENT_DATE - INTERVAL '1 day', 1950, 125.0, 165.0, 68.0, 2500),
('cc0e8400-e29b-41d4-a716-446655440003', 'YOUR_USER_ID_HERE', CURRENT_DATE - INTERVAL '2 days', 1720, 135.0, 150.0, 48.0, 3000)
ON CONFLICT (id) DO NOTHING;

-- Insert sample chat messages (replace YOUR_USER_ID_HERE with your actual user ID)
INSERT INTO public.chat_messages (id, user_id, message, response) VALUES
('dd0e8400-e29b-41d4-a716-446655440001', 'YOUR_USER_ID_HERE', 'What should I eat for breakfast?', 'For a healthy breakfast, I recommend oatmeal with banana and berries, or eggs with whole grain toast and avocado. These provide good protein and complex carbs to fuel your morning workout!'),
('dd0e8400-e29b-41d4-a716-446655440002', 'YOUR_USER_ID_HERE', 'How can I improve my squat form?', 'Focus on keeping your chest up, knees tracking over your toes, and sitting back into your hips. Start with bodyweight squats and gradually add weight as your form improves.'),
('dd0e8400-e29b-41d4-a716-446655440003', 'YOUR_USER_ID_HERE', 'What is the best time to workout?', 'The best time to workout is when you can be consistent! Some people prefer morning workouts for energy, while others prefer evening sessions. Choose a time that fits your schedule and stick to it.')
ON CONFLICT (id) DO NOTHING;

-- Success message
SELECT 'Demo data inserted successfully! Remember to replace YOUR_USER_ID_HERE with your actual user ID from auth.users table.' as message;
