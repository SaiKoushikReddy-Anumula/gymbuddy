-- First, you need to create a user account through the Supabase Auth UI or signup page
-- Then replace 'YOUR_USER_ID_HERE' with your actual user ID from auth.users table

-- Insert user profile (replace with your actual user ID)
INSERT INTO public.user_profiles (id, full_name, weight, height, gender, date_of_birth, fitness_level, goals) VALUES
('YOUR_USER_ID_HERE', 'Demo User', 75.5, 175.0, 'male', '1990-01-15', 'intermediate', ARRAY['lose_weight', 'build_muscle']);

-- Insert sample exercises (these should work as-is)
INSERT INTO public.exercises (id, name, category, muscle_groups, equipment, instructions) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Push-ups', 'strength', ARRAY['chest', 'triceps', 'shoulders'], 'bodyweight', 'Start in plank position, lower body to ground, push back up'),
('550e8400-e29b-41d4-a716-446655440002', 'Squats', 'strength', ARRAY['quadriceps', 'glutes', 'hamstrings'], 'bodyweight', 'Stand with feet shoulder-width apart, lower hips back and down, return to standing'),
('550e8400-e29b-41d4-a716-446655440003', 'Deadlifts', 'strength', ARRAY['hamstrings', 'glutes', 'back'], 'barbell', 'Stand with feet hip-width apart, bend at hips and knees to lower bar, return to standing'),
('550e8400-e29b-41d4-a716-446655440004', 'Bench Press', 'strength', ARRAY['chest', 'triceps', 'shoulders'], 'barbell', 'Lie on bench, lower bar to chest, press back up'),
('550e8400-e29b-41d4-a716-446655440005', 'Pull-ups', 'strength', ARRAY['back', 'biceps'], 'pull-up bar', 'Hang from bar, pull body up until chin over bar, lower back down');

-- Insert sample foods
INSERT INTO public.foods (id, name, brand, calories_per_100g, protein_per_100g, carbs_per_100g, fat_per_100g, fiber_per_100g, sugar_per_100g, sodium_per_100g) VALUES
('660e8400-e29b-41d4-a716-446655440001', 'Chicken Breast', 'Generic', 165, 31.0, 0.0, 3.6, 0.0, 0.0, 74),
('660e8400-e29b-41d4-a716-446655440002', 'Brown Rice', 'Generic', 111, 2.6, 23.0, 0.9, 1.8, 0.4, 5),
('660e8400-e29b-41d4-a716-446655440003', 'Broccoli', 'Generic', 34, 2.8, 7.0, 0.4, 2.6, 1.5, 33),
('660e8400-e29b-41d4-a716-446655440004', 'Banana', 'Generic', 89, 1.1, 23.0, 0.3, 2.6, 12.0, 1),
('660e8400-e29b-41d4-a716-446655440005', 'Oats', 'Generic', 389, 16.9, 66.0, 6.9, 10.6, 0.0, 2);

-- Insert sample workout (replace YOUR_USER_ID_HERE with your actual user ID)
INSERT INTO public.workouts (id, user_id, name, description, status, duration_minutes, calories_burned, started_at, completed_at) VALUES
('770e8400-e29b-41d4-a716-446655440001', 'YOUR_USER_ID_HERE', 'Upper Body Strength', 'Focus on chest, shoulders, and arms', 'completed', 45, 320, NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days' + INTERVAL '45 minutes');

-- Insert workout exercises for the sample workout
INSERT INTO public.workout_exercises (id, workout_id, exercise_id, order_index, target_sets, target_reps, target_weight) VALUES
('880e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 1, 3, 15, NULL),
('880e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440004', 2, 3, 10, 60.0);

-- Insert sample sets
INSERT INTO public.sets (id, workout_exercise_id, set_number, reps, weight, duration_seconds, rest_seconds, completed) VALUES
('990e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440001', 1, 15, NULL, 30, 60, true),
('990e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440001', 2, 14, NULL, 32, 60, true),
('990e8400-e29b-41d4-a716-446655440003', '880e8400-e29b-41d4-a716-446655440001', 3, 12, NULL, 35, 90, true);

-- Insert sample meal (replace YOUR_USER_ID_HERE with your actual user ID)
INSERT INTO public.meals (id, user_id, name, meal_type, date, total_calories, total_protein, total_carbs, total_fat) VALUES
('aa0e8400-e29b-41d4-a716-446655440001', 'YOUR_USER_ID_HERE', 'Healthy Lunch', 'lunch', CURRENT_DATE, 450, 35.0, 45.0, 8.0);

-- Insert meal foods
INSERT INTO public.meal_foods (id, meal_id, food_id, quantity_grams, calories, protein, carbs, fat) VALUES
('bb0e8400-e29b-41d4-a716-446655440001', 'aa0e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', 150, 248, 46.5, 0.0, 5.4),
('bb0e8400-e29b-41d4-a716-446655440002', 'aa0e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440002', 100, 111, 2.6, 23.0, 0.9),
('bb0e8400-e29b-41d4-a716-446655440003', 'aa0e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440003', 200, 68, 5.6, 14.0, 0.8);

-- Insert daily nutrition summary (replace YOUR_USER_ID_HERE with your actual user ID)
INSERT INTO public.daily_nutrition (id, user_id, date, total_calories, total_protein, total_carbs, total_fat, water_intake_ml) VALUES
('cc0e8400-e29b-41d4-a716-446655440001', 'YOUR_USER_ID_HERE', CURRENT_DATE, 1850, 120.0, 180.0, 65.0, 2500);

-- Insert sample chat message (replace YOUR_USER_ID_HERE with your actual user ID)
INSERT INTO public.chat_messages (id, user_id, message, response) VALUES
('dd0e8400-e29b-41d4-a716-446655440001', 'YOUR_USER_ID_HERE', 'What should I eat for breakfast?', 'For a healthy breakfast, I recommend oatmeal with banana and berries, or eggs with whole grain toast and avocado. These provide good protein and complex carbs to fuel your morning workout!');

-- Instructions:
-- 1. First run script 007_create_missing_user_profiles.sql
-- 2. Sign up for an account through your app's signup page
-- 3. Find your user ID by running: SELECT id FROM auth.users;
-- 4. Replace all instances of 'YOUR_USER_ID_HERE' in this script with your actual user ID
-- 5. Then run this script
