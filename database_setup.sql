-- =====================================================
-- Online Examination System Database
-- =====================================================

-- Create the database
CREATE DATABASE IF NOT EXISTS `online_exam_system`;
USE `online_exam_system`;

-- =====================================================
-- Users Table (Students and Admins)
-- =====================================================
CREATE TABLE IF NOT EXISTS `users` (
    `user_id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(50) NOT NULL UNIQUE,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(50),
    `last_name` VARCHAR(50),
    `user_type` ENUM('student', 'admin') DEFAULT 'student',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `is_active` BOOLEAN DEFAULT TRUE
);

-- =====================================================
-- Subjects Table
-- =====================================================
CREATE TABLE IF NOT EXISTS `subjects` (
    `subject_id` INT AUTO_INCREMENT PRIMARY KEY,
    `subject_name` VARCHAR(100) NOT NULL,
    `subject_code` VARCHAR(20) UNIQUE,
    `description` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- Exams/Products Table
-- =====================================================
CREATE TABLE IF NOT EXISTS `exams` (
    `exam_id` INT AUTO_INCREMENT PRIMARY KEY,
    `subject_id` INT NOT NULL,
    `exam_title` VARCHAR(200) NOT NULL,
    `exam_description` TEXT,
    `total_questions` INT DEFAULT 0,
    `duration_minutes` INT DEFAULT 60,
    `passing_score` INT DEFAULT 40,
    `total_marks` INT DEFAULT 100,
    `start_time` DATETIME,
    `end_time` DATETIME,
    `created_by` INT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `is_published` BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`subject_id`),
    FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`)
);

-- =====================================================
-- Questions Table
-- =====================================================
CREATE TABLE IF NOT EXISTS `questions` (
    `question_id` INT AUTO_INCREMENT PRIMARY KEY,
    `exam_id` INT NOT NULL,
    `question_text` TEXT NOT NULL,
    `question_type` ENUM('mcq', 'true_false', 'short_answer') DEFAULT 'mcq',
    `marks` INT DEFAULT 1,
    `difficulty_level` ENUM('easy', 'medium', 'hard') DEFAULT 'medium',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`exam_id`) REFERENCES `exams` (`exam_id`) ON DELETE CASCADE
);

-- =====================================================
-- Options Table (for multiple choice questions)
-- =====================================================
CREATE TABLE IF NOT EXISTS `options` (
    `option_id` INT AUTO_INCREMENT PRIMARY KEY,
    `question_id` INT NOT NULL,
    `option_text` TEXT NOT NULL,
    `is_correct` BOOLEAN DEFAULT FALSE,
    `option_number` INT,
    FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`) ON DELETE CASCADE
);

-- =====================================================
-- Student Answers Table
-- =====================================================
CREATE TABLE IF NOT EXISTS `student_answers` (
    `answer_id` INT AUTO_INCREMENT PRIMARY KEY,
    `exam_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `question_id` INT NOT NULL,
    `selected_option_id` INT,
    `answer_text` TEXT,
    `is_correct` BOOLEAN,
    `marks_obtained` INT DEFAULT 0,
    `answered_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`exam_id`) REFERENCES `exams` (`exam_id`),
    FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
    FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`),
    FOREIGN KEY (`selected_option_id`) REFERENCES `options` (`option_id`)
);

-- =====================================================
-- Results Table
-- =====================================================
CREATE TABLE IF NOT EXISTS `results` (
    `result_id` INT AUTO_INCREMENT PRIMARY KEY,
    `exam_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `total_marks` INT DEFAULT 0,
    `marks_obtained` INT DEFAULT 0,
    `percentage` DECIMAL(5,2) DEFAULT 0,
    `status` ENUM('passed', 'failed', 'incomplete') DEFAULT 'incomplete',
    `started_at` DATETIME,
    `completed_at` DATETIME,
    `time_taken_minutes` INT,
    FOREIGN KEY (`exam_id`) REFERENCES `exams` (`exam_id`),
    FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
    INDEX `idx_exam_user` (`exam_id`, `user_id`)
);

-- =====================================================
-- Create Indexes for Better Performance
-- =====================================================
CREATE INDEX `idx_user_username` ON `users` (`username`);
CREATE INDEX `idx_exam_subject` ON `exams` (`subject_id`);
CREATE INDEX `idx_question_exam` ON `questions` (`exam_id`);
CREATE INDEX `idx_answer_exam_user` ON `student_answers` (`exam_id`, `user_id`);

-- =====================================================
-- Sample Data (Optional - Remove if not needed)
-- =====================================================

-- Insert sample subjects
INSERT INTO `subjects` (`subject_name`, `subject_code`, `description`) VALUES
('Mathematics', 'MATH101', 'Basic Mathematics'),
('English', 'ENG101', 'English Language Fundamentals'),
('Science', 'SCI101', 'General Science');

-- Insert sample users (Note: In production, use hashed passwords!)
INSERT INTO `users` (`username`, `email`, `password`, `first_name`, `last_name`, `user_type`) VALUES
('admin', 'admin@exam.com', 'admin@123', 'Admin', 'User', 'admin'),
('student1', 'student1@exam.com', 'student123', 'John', 'Doe', 'student'),
('student2', 'student2@exam.com', 'student123', 'Jane', 'Smith', 'student');
