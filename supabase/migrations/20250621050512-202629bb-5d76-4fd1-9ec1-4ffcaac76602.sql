
-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  aadhaar TEXT NOT NULL UNIQUE,
  address TEXT NOT NULL,
  profile_photo_url TEXT,
  reward_points INTEGER DEFAULT 0,
  problems_reported INTEGER DEFAULT 0,
  problems_solved INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0.0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create reports table for problem reports
CREATE TABLE public.reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  urgency TEXT NOT NULL CHECK (urgency IN ('low', 'medium', 'high', 'critical')),
  location TEXT NOT NULL,
  photos TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'resolved', 'rejected')),
  points_awarded INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- RLS policies for profiles
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- RLS policies for reports
CREATE POLICY "Users can view their own reports" 
  ON public.reports 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own reports" 
  ON public.reports 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reports" 
  ON public.reports 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name, email, aadhaar, address)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data ->> 'name', ''),
    COALESCE(new.email, ''),
    COALESCE(new.raw_user_meta_data ->> 'aadhaar', ''),
    COALESCE(new.raw_user_meta_data ->> 'address', '')
  );
  RETURN new;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to update reward points when report is created
CREATE OR REPLACE FUNCTION public.update_reward_points()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  points_to_award INTEGER;
BEGIN
  -- Calculate points based on urgency
  CASE NEW.urgency
    WHEN 'critical' THEN points_to_award := 50;
    WHEN 'high' THEN points_to_award := 40;
    WHEN 'medium' THEN points_to_award := 30;
    WHEN 'low' THEN points_to_award := 25;
    ELSE points_to_award := 25;
  END CASE;

  -- Update the report with points awarded
  NEW.points_awarded := points_to_award;

  -- Update user's profile with new points and report count
  UPDATE public.profiles 
  SET 
    reward_points = reward_points + points_to_award,
    problems_reported = problems_reported + 1,
    updated_at = now()
  WHERE user_id = NEW.user_id;

  RETURN NEW;
END;
$$;

-- Trigger to award points when report is created
CREATE TRIGGER on_report_created
  BEFORE INSERT ON public.reports
  FOR EACH ROW EXECUTE PROCEDURE public.update_reward_points();

-- Function to update solved count when report status changes to resolved
CREATE OR REPLACE FUNCTION public.update_solved_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  -- If status changed to resolved, increment solved count
  IF OLD.status != 'resolved' AND NEW.status = 'resolved' THEN
    UPDATE public.profiles 
    SET 
      problems_solved = problems_solved + 1,
      updated_at = now()
    WHERE user_id = NEW.user_id;
  END IF;

  RETURN NEW;
END;
$$;

-- Trigger to update solved count
CREATE TRIGGER on_report_status_changed
  AFTER UPDATE ON public.reports
  FOR EACH ROW EXECUTE PROCEDURE public.update_solved_count();
