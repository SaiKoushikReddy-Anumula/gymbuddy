-- Analytics Demo Data for Charts and Visualizations
-- Run this after the main demo data script

-- Insert comprehensive workout data for analytics (last 30 days)
INSERT INTO workouts (id, user_id, name, duration_minutes, calories_burned, created_at) VALUES
-- Week 1
('a1111111-1111-1111-1111-111111111111', 'YOUR_USER_ID_HERE', 'Push Day', 65, 420, '2024-12-01 08:00:00'),
('a2222222-2222-2222-2222-222222222222', 'YOUR_USER_ID_HERE', 'Pull Day', 70, 380, '2024-12-03 09:00:00'),
('a3333333-3333-3333-3333-333333333333', 'YOUR_USER_ID_HERE', 'Leg Day', 80, 520, '2024-12-05 07:30:00'),
('a4444444-4444-4444-4444-444444444444', 'YOUR_USER_ID_HERE', 'Cardio Session', 45, 350, '2024-12-07 18:00:00'),

-- Week 2
('a5555555-5555-5555-5555-555555555555', 'YOUR_USER_ID_HERE', 'Upper Body', 75, 450, '2024-12-08 08:00:00'),
('a6666666-6666-6666-6666-666666666666', 'YOUR_USER_ID_HERE', 'Lower Body', 85, 480, '2024-12-10 09:00:00'),
('a7777777-7777-7777-7777-777777777777', 'YOUR_USER_ID_HERE', 'Full Body', 90, 550, '2024-12-12 07:30:00'),
('a8888888-8888-8888-8888-888888888888', 'YOUR_USER_ID_HERE', 'HIIT Training', 40, 400, '2024-12-14 18:00:00'),

-- Week 3
('a9999999-9999-9999-9999-999999999999', 'YOUR_USER_ID_HERE', 'Strength Training', 70, 420, '2024-12-15 08:00:00'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'YOUR_USER_ID_HERE', 'Functional Fitness', 60, 380, '2024-12-17 09:00:00'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'YOUR_USER_ID_HERE', 'Core & Abs', 35, 250, '2024-12-19 07:30:00'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'YOUR_USER_ID_HERE', 'Endurance Run', 50, 450, '2024-12-21 18:00:00'),

-- Week 4
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'YOUR_USER_ID_HERE', 'Power Lifting', 80, 500, '2024-12-22 08:00:00'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'YOUR_USER_ID_HERE', 'Yoga Flow', 60, 200, '2024-12-24 09:00:00'),
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'YOUR_USER_ID_HERE', 'Boxing Training', 55, 480, '2024-12-26 07:30:00'),
('gggggggg-gggg-gggg-gggg-gggggggggggg', 'YOUR_USER_ID_HERE', 'Swimming', 45, 350, '2024-12-28 18:00:00'),

-- Recent workouts
('hhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh', 'YOUR_USER_ID_HERE', 'Morning Workout', 65, 420, '2024-12-30 08:00:00'),
('iiiiiiii-iiii-iiii-iiii-iiiiiiiiiiii', 'YOUR_USER_ID_HERE', 'Evening Session', 70, 450, '2024-12-31 18:00:00')
ON CONFLICT (id) DO NOTHING;

-- Insert daily nutrition data for analytics (last 30 days)
INSERT INTO daily_nutrition (id, user_id, date, calories, protein, carbs, fats, fiber, sugar, sodium, water_intake) VALUES
-- Week 1
('n1111111-1111-1111-1111-111111111111', 'YOUR_USER_ID_HERE', '2024-12-01', 2200, 150, 220, 80, 35, 45, 2100, 2.5),
('n2222222-2222-2222-2222-222222222222', 'YOUR_USER_ID_HERE', '2024-12-02', 2150, 145, 210, 75, 32, 40, 2000, 2.8),
('n3333333-3333-3333-3333-333333333333', 'YOUR_USER_ID_HERE', '2024-12-03', 2300, 160, 240, 85, 38, 50, 2200, 3.0),
('n4444444-4444-4444-4444-444444444444', 'YOUR_USER_ID_HERE', '2024-12-04', 2100, 140, 200, 70, 30, 35, 1900, 2.2),
('n5555555-5555-5555-5555-555555555555', 'YOUR_USER_ID_HERE', '2024-12-05', 2250, 155, 225, 82, 36, 48, 2150, 2.7),
('n6666666-6666-6666-6666-666666666666', 'YOUR_USER_ID_HERE', '2024-12-06', 2180, 148, 215, 78, 34, 42, 2050, 2.4),
('n7777777-7777-7777-7777-777777777777', 'YOUR_USER_ID_HERE', '2024-12-07', 2320, 165, 245, 88, 40, 52, 2250, 3.2),

-- Week 2
('n8888888-8888-8888-8888-888888888888', 'YOUR_USER_ID_HERE', '2024-12-08', 2200, 152, 220, 80, 35, 45, 2100, 2.6),
('n9999999-9999-9999-9999-999999999999', 'YOUR_USER_ID_HERE', '2024-12-09', 2150, 145, 210, 75, 32, 40, 2000, 2.9),
('naaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'YOUR_USER_ID_HERE', '2024-12-10', 2280, 158, 235, 84, 37, 49, 2180, 3.1),
('nbbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'YOUR_USER_ID_HERE', '2024-12-11', 2120, 142, 205, 72, 31, 38, 1950, 2.3),
('ncccccccc-cccc-cccc-cccc-cccccccccccc', 'YOUR_USER_ID_HERE', '2024-12-12', 2260, 156, 230, 83, 36, 47, 2160, 2.8),
('ndddddddd-dddd-dddd-dddd-dddddddddddd', 'YOUR_USER_ID_HERE', '2024-12-13', 2190, 149, 218, 79, 34, 43, 2080, 2.5),
('neeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'YOUR_USER_ID_HERE', '2024-12-14', 2310, 163, 242, 87, 39, 51, 2220, 3.3),

-- Week 3
('nffffffff-ffff-ffff-ffff-ffffffffffff', 'YOUR_USER_ID_HERE', '2024-12-15', 2220, 153, 225, 81, 35, 46, 2120, 2.7),
('ngggggggg-gggg-gggg-gggg-gggggggggggg', 'YOUR_USER_ID_HERE', '2024-12-16', 2170, 147, 212, 76, 33, 41, 2020, 2.4),
('nhhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh', 'YOUR_USER_ID_HERE', '2024-12-17', 2290, 159, 238, 85, 38, 50, 2190, 3.0),
('niiiiiiii-iiii-iiii-iiii-iiiiiiiiiiii', 'YOUR_USER_ID_HERE', '2024-12-18', 2140, 143, 208, 73, 32, 39, 1980, 2.2),
('njjjjjjjj-jjjj-jjjj-jjjj-jjjjjjjjjjjj', 'YOUR_USER_ID_HERE', '2024-12-19', 2270, 157, 232, 84, 37, 48, 2170, 2.9),
('nkkkkkkkk-kkkk-kkkk-kkkk-kkkkkkkkkkkk', 'YOUR_USER_ID_HERE', '2024-12-20', 2200, 151, 222, 80, 35, 44, 2110, 2.6),
('nllllllll-llll-llll-llll-llllllllllll', 'YOUR_USER_ID_HERE', '2024-12-21', 2330, 166, 248, 89, 41, 53, 2260, 3.4),

-- Week 4
('nmmmmmmm-mmmm-mmmm-mmmm-mmmmmmmmmmmm', 'YOUR_USER_ID_HERE', '2024-12-22', 2240, 154, 227, 82, 36, 47, 2140, 2.8),
('nnnnnnnnn-nnnn-nnnn-nnnn-nnnnnnnnnnnn', 'YOUR_USER_ID_HERE', '2024-12-23', 2180, 148, 215, 77, 34, 42, 2060, 2.5),
('noooooooo-oooo-oooo-oooo-oooooooooooo', 'YOUR_USER_ID_HERE', '2024-12-24', 2300, 161, 240, 86, 39, 51, 2200, 3.1),
('npppppppp-pppp-pppp-pppp-pppppppppppp', 'YOUR_USER_ID_HERE', '2024-12-25', 2160, 146, 210, 74, 33, 40, 2000, 2.3),
('nqqqqqqq-qqqq-qqqq-qqqq-qqqqqqqqqqq', 'YOUR_USER_ID_HERE', '2024-12-26', 2280, 158, 235, 85, 38, 49, 2180, 3.0),
('nrrrrrrrr-rrrr-rrrr-rrrr-rrrrrrrrrrrr', 'YOUR_USER_ID_HERE', '2024-12-27', 2210, 152, 223, 81, 36, 45, 2130, 2.7),
('nssssssss-ssss-ssss-ssss-ssssssssssss', 'YOUR_USER_ID_HERE', '2024-12-28', 2320, 164, 245, 88, 40, 52, 2240, 3.3),

-- Recent days
('ntttttttt-tttt-tttt-tttt-tttttttttttt', 'YOUR_USER_ID_HERE', '2024-12-29', 2250, 155, 228, 83, 37, 48, 2160, 2.9),
('nuuuuuuuu-uuuu-uuuu-uuuu-uuuuuuuuuuuu', 'YOUR_USER_ID_HERE', '2024-12-30', 2190, 149, 218, 79, 35, 43, 2090, 2.6),
('nvvvvvvvv-vvvv-vvvv-vvvv-vvvvvvvvvvvv', 'YOUR_USER_ID_HERE', '2024-12-31', 2270, 157, 232, 84, 38, 49, 2170, 3.0)
ON CONFLICT (id) DO NOTHING;

-- Insert workout exercises for detailed analytics
INSERT INTO workout_exercises (id, workout_id, exercise_id, sets_completed, total_reps, total_weight, notes) VALUES
-- Push Day exercises
('we111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', '550e8400-e29b-41d4-a716-446655440000', 4, 40, 800, 'Great form today'),
('we222222-2222-2222-2222-222222222222', 'a1111111-1111-1111-1111-111111111111', '550e8400-e29b-41d4-a716-446655440001', 3, 30, 600, 'Increased weight'),
('we333333-3333-3333-3333-333333333333', 'a1111111-1111-1111-1111-111111111111', '550e8400-e29b-41d4-a716-446655440002', 3, 36, 720, 'Solid workout'),

-- Pull Day exercises
('we444444-4444-4444-4444-444444444444', 'a2222222-2222-2222-2222-222222222222', '550e8400-e29b-41d4-a716-446655440003', 4, 32, 960, 'New PR!'),
('we555555-5555-5555-5555-555555555555', 'a2222222-2222-2222-2222-222222222222', '550e8400-e29b-41d4-a716-446655440004', 3, 45, 0, 'Bodyweight only'),
('we666666-6666-6666-6666-666666666666', 'a2222222-2222-2222-2222-222222222222', '550e8400-e29b-41d4-a716-446655440005', 3, 24, 720, 'Good progression'),

-- Leg Day exercises
('we777777-7777-7777-7777-777777777777', 'a3333333-3333-3333-3333-333333333333', '550e8400-e29b-41d4-a716-446655440006', 5, 25, 1250, 'Heavy squats'),
('we888888-8888-8888-8888-888888888888', 'a3333333-3333-3333-3333-333333333333', '550e8400-e29b-41d4-a716-446655440007', 4, 32, 960, 'Perfect form'),
('we999999-9999-9999-9999-999999999999', 'a3333333-3333-3333-3333-333333333333', '550e8400-e29b-41d4-a716-446655440008', 3, 36, 540, 'Great burn')
ON CONFLICT (id) DO NOTHING;

-- Insert sets for detailed progress tracking
INSERT INTO sets (id, workout_exercise_id, set_number, reps, weight, rest_seconds, completed_at) VALUES
-- Push-ups sets
('s1111111-1111-1111-1111-111111111111', 'we111111-1111-1111-1111-111111111111', 1, 12, 0, 60, '2024-12-01 08:05:00'),
('s2222222-2222-2222-2222-222222222222', 'we111111-1111-1111-1111-111111111111', 2, 10, 0, 60, '2024-12-01 08:07:00'),
('s3333333-3333-3333-3333-333333333333', 'we111111-1111-1111-1111-111111111111', 3, 10, 0, 60, '2024-12-01 08:09:00'),
('s4444444-4444-4444-4444-444444444444', 'we111111-1111-1111-1111-111111111111', 4, 8, 0, 90, '2024-12-01 08:12:00'),

-- Bench Press sets
('s5555555-5555-5555-5555-555555555555', 'we222222-2222-2222-2222-222222222222', 1, 12, 135, 90, '2024-12-01 08:15:00'),
('s6666666-6666-6666-6666-666666666666', 'we222222-2222-2222-2222-222222222222', 2, 10, 155, 120, '2024-12-01 08:18:00'),
('s7777777-7777-7777-7777-777777777777', 'we222222-2222-2222-2222-222222222222', 3, 8, 175, 120, '2024-12-01 08:22:00'),

-- Squats sets
('s8888888-8888-8888-8888-888888888888', 'we777777-7777-7777-7777-777777777777', 1, 8, 185, 120, '2024-12-05 07:35:00'),
('s9999999-9999-9999-9999-999999999999', 'we777777-7777-7777-7777-777777777777', 2, 6, 205, 150, '2024-12-05 07:40:00'),
('saaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'we777777-7777-7777-7777-777777777777', 3, 5, 225, 180, '2024-12-05 07:45:00'),
('sbbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'we777777-7777-7777-7777-777777777777', 4, 4, 245, 180, '2024-12-05 07:50:00'),
('scccccccc-cccc-cccc-cccc-cccccccccccc', 'we777777-7777-7777-7777-777777777777', 5, 2, 275, 240, '2024-12-05 07:55:00')
ON CONFLICT (id) DO NOTHING;

-- Insert meals for nutrition analytics
INSERT INTO meals (id, user_id, name, meal_type, total_calories, created_at) VALUES
('m1111111-1111-1111-1111-111111111111', 'YOUR_USER_ID_HERE', 'Protein Pancakes', 'breakfast', 450, '2024-12-01 07:00:00'),
('m2222222-2222-2222-2222-222222222222', 'YOUR_USER_ID_HERE', 'Chicken Salad', 'lunch', 520, '2024-12-01 12:30:00'),
('m3333333-3333-3333-3333-333333333333', 'YOUR_USER_ID_HERE', 'Salmon Dinner', 'dinner', 680, '2024-12-01 19:00:00'),
('m4444444-4444-4444-4444-444444444444', 'YOUR_USER_ID_HERE', 'Greek Yogurt', 'snack', 180, '2024-12-01 15:00:00'),

('m5555555-5555-5555-5555-555555555555', 'YOUR_USER_ID_HERE', 'Oatmeal Bowl', 'breakfast', 380, '2024-12-02 07:30:00'),
('m6666666-6666-6666-6666-666666666666', 'YOUR_USER_ID_HERE', 'Turkey Wrap', 'lunch', 480, '2024-12-02 13:00:00'),
('m7777777-7777-7777-7777-777777777777', 'YOUR_USER_ID_HERE', 'Steak & Veggies', 'dinner', 720, '2024-12-02 18:30:00'),
('m8888888-8888-8888-8888-888888888888', 'YOUR_USER_ID_HERE', 'Protein Shake', 'snack', 250, '2024-12-02 16:00:00'),

('m9999999-9999-9999-9999-999999999999', 'YOUR_USER_ID_HERE', 'Avocado Toast', 'breakfast', 420, '2024-12-03 08:00:00'),
('maaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'YOUR_USER_ID_HERE', 'Quinoa Bowl', 'lunch', 550, '2024-12-03 12:45:00'),
('mbbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'YOUR_USER_ID_HERE', 'Pasta Primavera', 'dinner', 640, '2024-12-03 19:15:00'),
('mcccccccc-cccc-cccc-cccc-cccccccccccc', 'YOUR_USER_ID_HERE', 'Mixed Nuts', 'snack', 200, '2024-12-03 14:30:00')
ON CONFLICT (id) DO NOTHING;

-- Add some chat messages for AI context
INSERT INTO chat_messages (id, user_id, message, response, created_at) VALUES
('c1111111-1111-1111-1111-111111111111', 'YOUR_USER_ID_HERE', 'How can I improve my bench press?', 'To improve your bench press, focus on progressive overload, proper form, and consistency. Based on your recent workouts, I see you''re making good progress! Try adding pause reps and varying your grip width.', '2024-12-01 20:00:00'),
('c2222222-2222-2222-2222-222222222222', 'YOUR_USER_ID_HERE', 'What should I eat after my workout?', 'Great question! Post-workout nutrition is crucial. Aim for a combination of protein and carbs within 30-60 minutes. Based on your nutrition data, you''re doing well with protein intake. Try chocolate milk, Greek yogurt with berries, or a protein shake with banana.', '2024-12-02 21:00:00'),
('c3333333-3333-3333-3333-333333333333', 'YOUR_USER_ID_HERE', 'I''m feeling tired during workouts', 'Fatigue during workouts can have several causes. Looking at your recent data, make sure you''re getting adequate sleep (7-9 hours), staying hydrated, and eating enough carbs for energy. Consider reducing workout intensity if you''ve been training hard consistently.', '2024-12-03 19:30:00')
ON CONFLICT (id) DO NOTHING;
