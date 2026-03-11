-- Create tables for diet tracking and nutrition
CREATE TABLE IF NOT EXISTS foods (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(255),
  calories_per_100g DECIMAL(8,2) NOT NULL,
  protein_per_100g DECIMAL(8,2) NOT NULL DEFAULT 0,
  carbs_per_100g DECIMAL(8,2) NOT NULL DEFAULT 0,
  fat_per_100g DECIMAL(8,2) NOT NULL DEFAULT 0,
  fiber_per_100g DECIMAL(8,2) DEFAULT 0,
  sugar_per_100g DECIMAL(8,2) DEFAULT 0,
  sodium_per_100g DECIMAL(8,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS meals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  meal_type VARCHAR(50) NOT NULL CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  total_calories DECIMAL(8,2) DEFAULT 0,
  total_protein DECIMAL(8,2) DEFAULT 0,
  total_carbs DECIMAL(8,2) DEFAULT 0,
  total_fat DECIMAL(8,2) DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS meal_foods (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  meal_id UUID REFERENCES meals(id) ON DELETE CASCADE,
  food_id UUID REFERENCES foods(id) ON DELETE CASCADE,
  quantity_grams DECIMAL(8,2) NOT NULL,
  calories DECIMAL(8,2) NOT NULL,
  protein DECIMAL(8,2) NOT NULL,
  carbs DECIMAL(8,2) NOT NULL,
  fat DECIMAL(8,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS daily_nutrition (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  total_calories DECIMAL(8,2) DEFAULT 0,
  total_protein DECIMAL(8,2) DEFAULT 0,
  total_carbs DECIMAL(8,2) DEFAULT 0,
  total_fat DECIMAL(8,2) DEFAULT 0,
  water_intake_ml INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Enable RLS
ALTER TABLE foods ENABLE ROW LEVEL SECURITY;
ALTER TABLE meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_foods ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_nutrition ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Foods are viewable by everyone" ON foods FOR SELECT USING (true);
CREATE POLICY "Users can view own meals" ON meals FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own meal foods" ON meal_foods FOR ALL USING (
  EXISTS (SELECT 1 FROM meals WHERE meals.id = meal_foods.meal_id AND meals.user_id = auth.uid())
);
CREATE POLICY "Users can view own daily nutrition" ON daily_nutrition FOR ALL USING (auth.uid() = user_id);

-- Insert some common foods
INSERT INTO foods (name, calories_per_100g, protein_per_100g, carbs_per_100g, fat_per_100g) VALUES
('Chicken Breast (Cooked)', 165, 31, 0, 3.6),
('Brown Rice (Cooked)', 123, 2.6, 23, 0.9),
('Broccoli', 34, 2.8, 7, 0.4),
('Banana', 89, 1.1, 23, 0.3),
('Oats', 389, 16.9, 66.3, 6.9),
('Salmon (Cooked)', 206, 22, 0, 12),
('Sweet Potato', 86, 1.6, 20, 0.1),
('Greek Yogurt', 59, 10, 3.6, 0.4),
('Almonds', 579, 21.2, 21.6, 49.9),
('Eggs', 155, 13, 1.1, 11);
