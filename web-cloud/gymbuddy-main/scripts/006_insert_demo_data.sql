-- Insert demo user profile data
INSERT INTO user_profiles (id, full_name, weight, height, gender, bmi, created_at, updated_at) VALUES
('00000000-0000-0000-0000-000000000001', 'John Doe', 75.5, 180, 'male', 23.3, NOW(), NOW()),
('00000000-0000-0000-0000-000000000002', 'Sarah Johnson', 62.0, 165, 'female', 22.8, NOW(), NOW()),
('00000000-0000-0000-0000-000000000003', 'Mike Wilson', 82.3, 175, 'male', 26.9, NOW(), NOW());

-- Insert demo workouts
INSERT INTO workouts (id, user_id, name, date, duration_minutes, notes, created_at) VALUES
('workout-1', '00000000-0000-0000-0000-000000000001', 'Push Day - Chest & Triceps', '2024-01-15', 75, 'Great session, felt strong today', NOW()),
('workout-2', '00000000-0000-0000-0000-000000000001', 'Pull Day - Back & Biceps', '2024-01-17', 68, 'Focused on form and control', NOW()),
('workout-3', '00000000-0000-0000-0000-000000000001', 'Leg Day', '2024-01-19', 85, 'Intense leg session, legs are sore', NOW()),
('workout-4', '00000000-0000-0000-0000-000000000002', 'Full Body Strength', '2024-01-16', 60, 'First week back to gym', NOW()),
('workout-5', '00000000-0000-0000-0000-000000000002', 'Cardio & Core', '2024-01-18', 45, 'Good cardio session', NOW());

-- Insert demo workout exercises
INSERT INTO workout_exercises (id, workout_id, exercise_id, sets, reps, weight, rest_seconds, notes, created_at) VALUES
-- John's Push Day
('we-1', 'workout-1', 1, 4, 8, 80.0, 120, 'Felt strong, good form', NOW()),
('we-2', 'workout-1', 2, 3, 10, 35.0, 90, 'Controlled movement', NOW()),
('we-3', 'workout-1', 15, 3, 12, 25.0, 60, 'Great pump', NOW()),
('we-4', 'workout-1', 16, 3, 15, 15.0, 60, 'Burnout set on last', NOW()),

-- John's Pull Day  
('we-5', 'workout-2', 3, 4, 6, 70.0, 150, 'Heavy deadlifts today', NOW()),
('we-6', 'workout-2', 4, 3, 8, 60.0, 120, 'Wide grip focus', NOW()),
('we-7', 'workout-2', 17, 3, 10, 20.0, 90, 'Slow negatives', NOW()),
('we-8', 'workout-2', 18, 3, 12, 15.0, 60, 'Good bicep activation', NOW()),

-- John's Leg Day
('we-9', 'workout-3', 5, 4, 10, 100.0, 180, 'Deep squats, felt great', NOW()),
('we-10', 'workout-3', 6, 3, 12, 80.0, 120, 'Controlled descent', NOW()),
('we-11', 'workout-3', 7, 3, 15, 60.0, 90, 'High reps for burn', NOW()),
('we-12', 'workout-3', 8, 4, 20, 0.0, 60, 'Bodyweight, tough set', NOW()),

-- Sarah's workouts
('we-13', 'workout-4', 1, 3, 10, 40.0, 90, 'Getting back into it', NOW()),
('we-14', 'workout-4', 5, 3, 12, 50.0, 120, 'Focusing on form', NOW()),
('we-15', 'workout-4', 9, 3, 10, 25.0, 90, 'Good shoulder activation', NOW()),
('we-16', 'workout-5', 19, 1, 30, 0.0, 0, '30 minutes steady state', NOW()),
('we-17', 'workout-5', 20, 3, 60, 0.0, 30, 'Core burnout', NOW());

-- Insert demo meals
INSERT INTO meals (id, user_id, name, meal_type, date, calories, protein, carbs, fat, fiber, created_at) VALUES
-- John's meals
('meal-1', '00000000-0000-0000-0000-000000000001', 'Protein Oatmeal Bowl', 'breakfast', '2024-01-20', 450, 25, 55, 12, 8, NOW()),
('meal-2', '00000000-0000-0000-0000-000000000001', 'Grilled Chicken Salad', 'lunch', '2024-01-20', 380, 35, 15, 18, 6, NOW()),
('meal-3', '00000000-0000-0000-0000-000000000001', 'Salmon with Sweet Potato', 'dinner', '2024-01-20', 520, 40, 45, 20, 5, NOW()),
('meal-4', '00000000-0000-0000-0000-000000000001', 'Greek Yogurt with Berries', 'snack', '2024-01-20', 180, 15, 20, 5, 4, NOW()),

-- Sarah's meals
('meal-5', '00000000-0000-0000-0000-000000000002', 'Avocado Toast', 'breakfast', '2024-01-20', 320, 12, 35, 18, 10, NOW()),
('meal-6', '00000000-0000-0000-0000-000000000002', 'Quinoa Buddha Bowl', 'lunch', '2024-01-20', 420, 18, 50, 16, 12, NOW()),
('meal-7', '00000000-0000-0000-0000-000000000002', 'Lean Beef Stir Fry', 'dinner', '2024-01-20', 380, 28, 25, 20, 6, NOW());

-- Insert demo daily nutrition
INSERT INTO daily_nutrition (id, user_id, date, total_calories, total_protein, total_carbs, total_fat, total_fiber, water_intake, created_at) VALUES
('dn-1', '00000000-0000-0000-0000-000000000001', '2024-01-20', 1530, 115, 135, 55, 23, 2.5, NOW()),
('dn-2', '00000000-0000-0000-0000-000000000001', '2024-01-19', 1680, 125, 150, 62, 28, 3.0, NOW()),
('dn-3', '00000000-0000-0000-0000-000000000001', '2024-01-18', 1420, 105, 120, 48, 20, 2.2, NOW()),
('dn-4', '00000000-0000-0000-0000-000000000002', '2024-01-20', 1120, 58, 110, 54, 28, 2.8, NOW()),
('dn-5', '00000000-0000-0000-0000-000000000002', '2024-01-19', 1250, 65, 125, 48, 25, 2.5, NOW());

-- Insert demo chat messages
INSERT INTO chat_messages (id, user_id, message, response, created_at) VALUES
('chat-1', '00000000-0000-0000-0000-000000000001', 'What should I eat after my workout?', 'After your workout, focus on consuming protein and carbohydrates within 30-60 minutes. Based on your recent training, I recommend a protein shake with banana, or Greek yogurt with berries. This will help with muscle recovery and replenish glycogen stores.', NOW() - INTERVAL '2 hours'),
('chat-2', '00000000-0000-0000-0000-000000000001', 'How can I improve my bench press?', 'To improve your bench press: 1) Focus on proper form - retract shoulder blades, maintain arch, 2) Progressive overload - gradually increase weight, 3) Strengthen supporting muscles like triceps and shoulders, 4) Practice pause reps to build strength off the chest. Your current 80kg for 8 reps shows good strength!', NOW() - INTERVAL '1 day'),
('chat-3', '00000000-0000-0000-0000-000000000002', 'I want to lose weight, what should I focus on?', 'For weight loss, create a caloric deficit through: 1) Balanced nutrition - aim for 1200-1400 calories daily, 2) Regular cardio 3-4x per week, 3) Strength training to preserve muscle, 4) Stay hydrated (2.5-3L water daily). Your current routine is great - keep up the consistency!', NOW() - INTERVAL '3 hours');
