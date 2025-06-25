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

-- Insertion de 15 recettes dans base recipe
INSERT INTO recipe (title, description, instructions, preparation_time, cooking_time, nb_eaters, image, user_id)
VALUES
('Pâtes à la carbonara', 'Recette traditionnelle italienne', 'Cuire les pâtes. Mélanger œufs, parmesan, lardons.', 10, 15, 4, 'carbonara.jpg', 1),
('Poulet rôti', 'Poulet croustillant au four', 'Assaisonner, enfourner à 180°C pendant 1h30.', 15, 90, 6, 'poulet_roti.jpg', 2),
('Salade César', 'Salade fraîche avec poulet grillé', 'Préparer la sauce, assembler les ingrédients.', 20, 0, 2, 'cesar.jpg', 3),
('Soupe de légumes', 'Soupe saine et réconfortante', 'Cuire les légumes, mixer.', 15, 30, 4, 'soupe_legumes.jpg', 1),
('Quiche lorraine', 'Quiche avec lardons et fromage', 'Préparer la pâte, garnir, enfourner.', 20, 40, 6, 'quiche.jpg', 2),
('Tarte aux pommes', 'Dessert classique', 'Préparer la pâte, disposer pommes, cuire.', 30, 45, 8, 'tarte_pommes.jpg', 3),
('Bœuf bourguignon', 'Ragoût de bœuf mijoté au vin rouge', 'Saisir viande, mijoter 3h.', 30, 180, 6, 'boeuf_bourguignon.jpg', 1),
('Ratatouille', 'Légumes mijotés', 'Cuire légumes séparément puis ensemble.', 25, 40, 4, 'ratatouille.jpg', 2),
('Crêpes', 'Pâte à crêpes simple', 'Mélanger, cuire sur poêle chaude.', 10, 15, 4, 'crepes.jpg', 3),
('Chili con carne', 'Plat épicé avec viande et haricots', 'Cuire viande, ajouter épices et haricots.', 20, 60, 6, 'chili.jpg', 1),
('Pizza maison', 'Pâte à pizza, sauce tomate, garniture', 'Préparer pâte, garnir, cuire 15 minutes.', 60, 15, 4, 'pizza.jpg', 2),
('Mousse au chocolat', 'Dessert léger', 'Monter blancs en neige, mélanger chocolat.', 15, 0, 4, 'mousse_choco.jpg', 3),
('Gratin dauphinois', 'Pommes de terre et crème', 'Disposer tranches, cuire au four.', 20, 90, 6, 'gratin.jpg', 1),
('Salade niçoise', 'Salade méditerranéenne', 'Assembler ingrédients frais.', 15, 0, 2, 'nicoise.jpg', 2),
('Baguette maison', 'Pain traditionnel français', 'Pétrir, laisser lever, cuire.', 180, 30, 8, 'baguette.jpg', 3);

SELECT * FROM recipe;

INSERT INTO category_recipe (recipe_id, category_id)
VALUES 
(1, 8), 
(2, 2),
(3, 9),  
(10, 9), 
(7, 10);