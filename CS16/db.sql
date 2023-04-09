CREATE DATABASE test;

USE test;

DROP TABLE user_log;
DROP TABLE tables;


CREATE TABLE user_log (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  start_time DATETIME NOT NULL,
  end_time DATETIME,
  table_id INT  NOT NULL
);

CREATE TABLE tables (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  is_available BOOLEAN NOT NULL
);

INSERT INTO tables (is_available) VALUES (true);
INSERT INTO tables (is_available) VALUES (true);
INSERT INTO tables (is_available) VALUES (true);
INSERT INTO tables (is_available) VALUES (true);
INSERT INTO tables (is_available) VALUES (true);
INSERT INTO tables (is_available) VALUES (true);
INSERT INTO tables (is_available) VALUES (true);
INSERT INTO tables (is_available) VALUES (true);
INSERT INTO tables (is_available) VALUES (true);
INSERT INTO tables (is_available) VALUES (true);
INSERT INTO tables (is_available) VALUES (true);
INSERT INTO tables (is_available) VALUES (true);
INSERT INTO tables (is_available) VALUES (true);
INSERT INTO tables (is_available) VALUES (true);
INSERT INTO tables (is_available) VALUES (true);
INSERT INTO tables (is_available) VALUES (true);



