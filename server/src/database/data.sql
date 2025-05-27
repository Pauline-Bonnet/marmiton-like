-- on part du principe que les catégories existent déjà en base (on verra plus tard si les admins peuvent en rajouter)
-- creation de catégories prédéfinies : 

CREATE TABLE IF NOT EXISTS category (
  category_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

INSERT IGNORE INTO category (name) VALUES 
  ('Entrée'),
  ('Plat principal'),
  ('Dessert'),
  ('Apéritif'),
  ('Boisson'),
  ('Soupe'),
  ('Salade'),
  ('Pâtes'),
  ('Végétarien'),
  ('Vegan'),
  ('Sans gluten'),
  ('Petit déjeuner'),
  ('Goûter'),
  ('Sauce'),
  ('Recette du monde');

-- Insertion de 3 utilisateurs de test
INSERT INTO user (firstname, lastname, pseudo, email, password, role)
VALUES 
  ('Alice', 'Dupont', 'alicou', 'alice@example.com', 'hashed_password_1', 'user'),
  ('Bob', 'Martin', 'bobinho', 'bob@example.com', 'hashed_password_2', 'user'),
  ('Claire', 'Durand', 'clacla', 'claire@example.com', 'hashed_password_3', 'admin');
