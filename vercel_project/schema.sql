-- schema.sql
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);
-- Пример добавления пользователя (выполни через PlanetScale Console -> Query)
-- INSERT INTO users (username, password) VALUES ('admin', '12345');
