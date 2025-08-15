CREATE TABLE courses (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  duration_hours INTEGER NOT NULL DEFAULT 0,
  difficulty_level TEXT NOT NULL DEFAULT 'beginner',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE lessons (
  id BIGSERIAL PRIMARY KEY,
  course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  video_url TEXT,
  order_index INTEGER NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE student_progress (
  id BIGSERIAL PRIMARY KEY,
  student_id TEXT NOT NULL,
  course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  lesson_id BIGINT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(student_id, lesson_id)
);

CREATE TABLE course_enrollments (
  id BIGSERIAL PRIMARY KEY,
  student_id TEXT NOT NULL,
  course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(student_id, course_id)
);

-- Insert sample courses
INSERT INTO courses (title, description, image_url, duration_hours, difficulty_level) VALUES
('AI Fundamentals for Professionals', 'Master the basics of artificial intelligence and machine learning concepts that every professional should know.', '/images/ai-fundamentals.jpg', 8, 'beginner'),
('Machine Learning in Business', 'Learn how to apply machine learning techniques to solve real business problems and drive decision-making.', '/images/ml-business.jpg', 12, 'intermediate'),
('Natural Language Processing Essentials', 'Understand how computers process human language and build practical NLP applications.', '/images/nlp-essentials.jpg', 10, 'intermediate'),
('AI Ethics and Governance', 'Navigate the ethical considerations and governance frameworks essential for responsible AI implementation.', '/images/ai-ethics.jpg', 6, 'beginner');

-- Insert sample lessons for AI Fundamentals course
INSERT INTO lessons (course_id, title, content, order_index, duration_minutes) VALUES
(1, 'Introduction to Artificial Intelligence', 'Welcome to the world of AI! In this lesson, we will explore what artificial intelligence really means and how it impacts our daily lives.', 1, 30),
(1, 'Types of AI Systems', 'Learn about different categories of AI systems including narrow AI, general AI, and superintelligence.', 2, 25),
(1, 'Machine Learning Basics', 'Understand the fundamentals of machine learning and how computers learn from data.', 3, 35),
(1, 'AI in the Workplace', 'Discover how AI is transforming various industries and job functions.', 4, 40);

-- Insert sample lessons for Machine Learning in Business course
INSERT INTO lessons (course_id, title, content, order_index, duration_minutes) VALUES
(2, 'Business Applications of ML', 'Explore real-world applications of machine learning in business contexts.', 1, 45),
(2, 'Data Preparation for ML', 'Learn how to prepare and clean data for machine learning projects.', 2, 50),
(2, 'Choosing the Right Algorithm', 'Understand how to select appropriate ML algorithms for different business problems.', 3, 40),
(2, 'Measuring ML Success', 'Learn how to evaluate and measure the success of machine learning implementations.', 4, 35);
