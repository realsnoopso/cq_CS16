CREATE DATABASE test;

USE test;

CREATE TABLE user_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nickname VARCHAR(64),
    money DECIMAL(10, 2),
    last_visit DATETIME
);

DESCRIBE user_log;

INSERT INTO user_log (nickname, money, last_visit) VALUES ('snoop', 122, NOW());

SELECT * FROM user_log;


DELIMITER $$
CREATE PROCEDURE insert_loop() 
BEGIN
    DECLARE i INT DEFAULT 1; 
    WHILE (i <= 1000000) DO 
        SET @word = (SELECT value FROM word ORDER BY RAND() LIMIT 1);
        SET @random_string = SUBSTRING(MD5(RAND()), 1, 3);
        SET @random_number = LPAD(FLOOR(RAND() * 10000), 4, '0');
        SET @nickname = CONCAT(@word, '_', @random_string, @random_number);
        SET @money = FLOOR(RAND() * 100000) + 1;
        SET @last_visit = DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 30) DAY);

        INSERT INTO user_log (nickname, money, last_visit)
        VALUES (@nickname, @money, @last_visit);
        SET i = i + 1; 
    END WHILE;
END $$
DELIMITER ;

CALL insert_loop();

SELCT * FROM user_log;