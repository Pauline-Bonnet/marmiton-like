DROP DATABASE IF EXISTS marmiton_db;
CREATE DATABASE marmiton_db;

USE marmiton_db;

CREATE TABLE user (
    user_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(50),
    lastname VARCHAR(100),
    pseudo VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(2500) NOT NULL,
    register_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    role enum('user', 'admin') DEFAULT 'user'
);

CREATE TABLE recipe (
    recipe_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT, 
    instructions TEXT NOT NULL,
    preparation_time INT NOT NULL,
    cooking_time INT NOT NULL,
    nb_eaters INT,
    image VARCHAR(255),
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    modification_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    user_id INT UNSIGNED,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE category(
    category_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE 
);

CREATE TABLE ingredient(
    ingredient_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100)
);

CREATE TABLE ingredient_recipe(
    recipe_id INT,
    ingredient_id INT,
    quantiy DECIMAL(6, 2),
    unity VARCHAR(20),
    PRIMARY KEY (recipe_id, ingredient_id),
    FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredient(ingredient_id)
);

CREATE TABLE category_recipe(
    recipe_id INT,
    category_id INT,
    PRIMARY KEY (recipe_id, category_id),
    FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id),
    FOREIGN KEY (category_id) REFERENCES category(category_id) 
);

CREATE TABLE comment(
    comment_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    content TEXT NOT NULL,
    note INT CHECK (note >= 0 AND note <= 5),
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    modification_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    user_id INT UNSIGNED, 
    recipe_id INT,
    FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id) 
);

CREATE TABLE favoris(
    user_id INT UNSIGNED, 
    recipe_id INT,
    adding_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, recipe_id),
    FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id) 
);


