-- First, let's get the actual exercise IDs from the database and create proper demo data
-- This script ensures all foreign key relationships are valid

-- Insert user profile (replace YOUR_USER_ID_HERE with your actual user ID from auth.users)
INSERT INTO user_profiles (id, full_name, weight, height, gender, bmi, created_at, updated_at)
VALUES ('YOUR_USER_ID_HERE', 'Demo User', 75.5, 175.0, 'male', 24.7, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Get existing exercise IDs and create workouts with proper references
-- First, let's create a workout
INSERT INTO workouts (id, user_id, name, date, duration_minutes, notes, created_at)
VALUES 
  ('workout-001', 'YOUR_USER_ID_HERE', 'Morning Push Workout', '2024-01-15', 45, 'Great morning session!', '2024-01-15 08:00:00'),
  ('workout-002', 'YOUR_USER_ID_HERE', 'Leg Day', '2024-01-16', 60, 'Intense leg workout', '2024-01-16 18:00:00'),
  ('workout-003', 'YOUR_USER_ID_HERE', 'Full Body', '2024-01-17', 50, 'Complete body workout', '2024-01-17 07:30:00')
ON CONFLICT (id) DO NOTHING;

-- Insert workout exercises using existing exercise names (we'll use the actual IDs from the exercises table)
-- Note: You'll need to replace these with actual exercise IDs from your exercises table
-- Run this query first to get exercise IDs: SELECT id, name FROM exercises LIMIT 10;

-- Sample meals and foods
INSERT INTO meals (id, user_id, name, date, meal_type, created_at)
VALUES 
  ('meal-001', 'YOUR_USER_ID_HERE', 'Protein Breakfast', '2024-01-15', 'breakfast', '2024-01-15 08:00:00'),
  ('meal-002', 'YOUR_USER_ID_HERE', 'Post-Workout Lunch', '2024-01-15', 'lunch', '2024-01-15 13:00:00'),
  ('meal-003', 'YOUR_USER_ID_HERE', 'Healthy Dinner', '2024-01-15', 'dinner', '2024-01-15 19:00:00')
ON CONFLICT (id) DO NOTHING;

-- Insert daily nutrition tracking
INSERT INTO daily_nutrition (id, user_id, date, calories, protein, carbs, fat, fiber, sugar, sodium, created_at)
VALUES 
  ('nutrition-001', 'YOUR_USER_ID_HERE', '2024-01-15', 2200, 150, 200, 80, 25, 50, 2000, '2024-01-15 23:59:00'),
  ('nutrition-002', 'YOUR_USER_ID_HERE', '2024-01-16', 2100, 140, 180, 85, 30, 45, 1800, '2024-01-16 23:59:00'),
  ('nutrition-003', 'YOUR_USER_ID_HERE', '2024-01-17', 2300, 160, 220, 75, 28, 55, 2100, '2024-01-17 23:59:00')
ON CONFLICT (id) DO NOTHING;

-- Insert chat messages
INSERT INTO chat_messages (id, user_id, message, response, created_at)
VALUES 
  ('chat-001', 'YOUR_USER_ID_HERE', 'What should I eat after my workout?', 'After your workout, focus on consuming protein and carbohydrates within 30-60 minutes. A protein shake with banana, Greek yogurt with berries, or chicken with rice are excellent options to help with muscle recovery and replenish glycogen stores.', '2024-01-15 09:00:00'),
  ('chat-002', 'YOUR_USER_ID_HERE', 'How can I improve my bench press?', 'To improve your bench press: 1) Focus on proper form with controlled movements, 2) Strengthen supporting muscles like triceps and shoulders, 3) Practice progressive overload by gradually increasing weight, 4) Ensure adequate rest between sessions, and 5) Consider variations like incline and decline bench press.', '2024-01-16 10:30:00'),
  ('chat-003', 'YOUR_USER_ID_HERE', 'What are the best exercises for abs?', 'Effective ab exercises include: planks (builds core stability), bicycle crunches (targets obliques), dead bugs (improves core control), mountain climbers (adds cardio), and hanging leg raises (targets lower abs). Focus on quality over quantity and maintain proper form throughout each movement.', '2024-01-17 14:15:00')
ON CONFLICT (id) DO NOTHING;
