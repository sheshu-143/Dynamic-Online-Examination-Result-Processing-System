USE online_exam_system;

-- Insert Subjects
INSERT IGNORE INTO subjects (subject_id, subject_name)
VALUES 
(1, 'Java'),
(2, 'Python'),
(3, 'C');

-- Insert Exams
INSERT IGNORE INTO exams (exam_id, subject_id, exam_title, exam_description, total_marks, duration_minutes, passing_score, is_published, created_by)
VALUES 
(1, 1, 'Java Programming', 'Test your foundational knowledge in Java programming.', 20, 45, 12, 1, 1),
(2, 2, 'Python Programming', 'Test your foundational knowledge in Python programming.', 20, 45, 12, 1, 1),
(3, 3, 'C Programming', 'Test your foundational knowledge in C programming.', 20, 45, 12, 1, 1);

-- Insert Questions for Java (Exam 1)
INSERT IGNORE INTO questions (question_id, exam_id, question_text, question_type, marks)
VALUES 
(1, 1, 'Which keyword is used to create an object in Java?', 'mcq', 1),
(2, 1, 'What is the default value of a boolean variable in Java?', 'mcq', 1),
(3, 1, 'Which method is used to find the length of a string?', 'mcq', 1),
(4, 1, 'What is the index of the first element in a Java array?', 'mcq', 1),
(5, 1, 'Which concept of OOP allows one class to inherit properties from another class?', 'mcq', 1);

-- Insert Options for Java Questions
INSERT IGNORE INTO options (option_id, question_id, option_text, is_correct, option_number)
VALUES 
(1, 1, 'new', 1, 1),
(2, 1, 'class', 0, 2),
(3, 1, 'object', 0, 3),
(4, 1, 'create', 0, 4),
(5, 2, 'false', 1, 1),
(6, 2, 'true', 0, 2),
(7, 2, '0', 0, 3),
(8, 2, 'null', 0, 4),
(9, 3, 'length()', 1, 1),
(10, 3, 'size()', 0, 2),
(11, 3, 'getSize()', 0, 3),
(12, 3, 'len()', 0, 4),
(13, 4, '0', 1, 1),
(14, 4, '1', 0, 2),
(15, 4, '-1', 0, 3),
(16, 4, '2', 0, 4),
(17, 5, 'Inheritance', 1, 1),
(18, 5, 'Polymorphism', 0, 2),
(19, 5, 'Abstraction', 0, 3),
(20, 5, 'Encapsulation', 0, 4);

-- Insert Questions for Python (Exam 2)
INSERT IGNORE INTO questions (question_id, exam_id, question_text, question_type, marks)
VALUES 
(6, 2, 'Which keyword is used to define a function in Python?', 'mcq', 1),
(7, 2, 'Which data type is used to store multiple values in a single variable?', 'mcq', 1),
(8, 2, 'What is the output of the following code?\nprint(2 + 3 * 4)', 'mcq', 1),
(9, 2, 'Which symbol is used for comments in Python?', 'mcq', 1),
(10, 2, 'Which function is used to get input from the user in Python?', 'mcq', 1);

-- Insert Options for Python Questions
INSERT IGNORE INTO options (option_id, question_id, option_text, is_correct, option_number)
VALUES 
(21, 6, 'def', 1, 1),
(22, 6, 'func', 0, 2),
(23, 6, 'define', 0, 3),
(24, 6, 'function', 0, 4),
(25, 7, 'list', 1, 1),
(26, 7, 'int', 0, 2),
(27, 7, 'float', 0, 3),
(28, 7, 'string', 0, 4),
(29, 8, '14', 1, 1),
(30, 8, '20', 0, 2),
(31, 8, '24', 0, 3),
(32, 8, '10', 0, 4),
(33, 9, '#', 1, 1),
(34, 9, '//', 0, 2),
(35, 9, '/* */', 0, 3),
(36, 9, '--', 0, 4),
(37, 10, 'input()', 1, 1),
(38, 10, 'get()', 0, 2),
(39, 10, 'read()', 0, 3),
(40, 10, 'scan()', 0, 4);

-- Insert Questions for C (Exam 3)
INSERT IGNORE INTO questions (question_id, exam_id, question_text, question_type, marks)
VALUES 
(11, 3, 'Who developed the C programming language?', 'mcq', 1),
(12, 3, 'Which symbol is used to end a statement in C?', 'mcq', 1),
(13, 3, 'Which function is used to print output in C?', 'mcq', 1),
(14, 3, 'What is the correct file extension for a C program?', 'mcq', 1),
(15, 3, 'What will be the output of the following code?\n\n#include<stdio.h>\nint main()\n{\n    int a = 5;\n    printf("%d", a++);\n    return 0;\n}', 'mcq', 1);

-- Insert Options for C Questions
INSERT IGNORE INTO options (option_id, question_id, option_text, is_correct, option_number)
VALUES 
(41, 11, 'Dennis Ritchie', 1, 1),
(42, 11, 'James Gosling', 0, 2),
(43, 11, 'Bjarne Stroustrup', 0, 3),
(44, 11, 'Guido van Rossum', 0, 4),
(45, 12, ';', 1, 1),
(46, 12, '.', 0, 2),
(47, 12, ',', 0, 3),
(48, 12, ':', 0, 4),
(49, 13, 'printf()', 1, 1),
(50, 13, 'print()', 0, 2),
(51, 13, 'display()', 0, 3),
(52, 13, 'output()', 0, 4),
(53, 14, '.c', 1, 1),
(54, 14, '.java', 0, 2),
(55, 14, '.py', 0, 3),
(56, 14, '.cpp', 0, 4),
(57, 15, '5', 1, 1),
(58, 15, '6', 0, 2),
(59, 15, '4', 0, 3),
(60, 15, 'Error', 0, 4);

-- Insert Sample Student Answers
INSERT IGNORE INTO student_answers (answer_id, exam_id, user_id, question_id, selected_option_id, answer_text, is_correct, marks_obtained)
VALUES 
-- student1 takes Exam 1 (Java)
(1, 1, 2, 1, 1, NULL, 1, 1),
(2, 1, 2, 2, 5, NULL, 1, 1),
(3, 1, 2, 3, 9, NULL, 1, 1),
(4, 1, 2, 4, 13, NULL, 1, 1),
(5, 1, 2, 5, 17, NULL, 1, 1),

-- student2 takes Exam 2 (Python)
(6, 2, 3, 6, 21, NULL, 1, 1),
(7, 2, 3, 7, 25, NULL, 1, 1),
(8, 2, 3, 8, 29, NULL, 1, 1),
(9, 2, 3, 9, 33, NULL, 1, 1),
(10, 2, 3, 10, 37, NULL, 1, 1),

-- student3 takes Exam 3 (C)
(11, 3, 4, 11, 41, NULL, 1, 1),
(12, 3, 4, 12, 45, NULL, 1, 1),
(13, 3, 4, 13, 49, NULL, 1, 1),
(14, 3, 4, 14, 53, NULL, 1, 1),
(15, 3, 4, 15, 57, NULL, 1, 1);


-- Insert Sample Results
INSERT IGNORE INTO results (result_id, exam_id, user_id, total_marks, marks_obtained, percentage, status, started_at, completed_at, time_taken_minutes)
VALUES 
(1, 1, 2, 5, 5, 100.00, 'passed', NOW() - INTERVAL 1 HOUR, NOW(), 10),
(2, 2, 3, 5, 5, 100.00, 'passed', NOW() - INTERVAL 1 HOUR, NOW(), 10),
(3, 3, 4, 5, 5, 100.00, 'passed', NOW() - INTERVAL 2 HOUR, NOW() - INTERVAL 1 HOUR, 10);
