CREATE TABLE Users (
  fName VARCHAR(30) NOT NULL,
  lName VARCHAR(30) NOT NULL,
  institution_id VARCHAR(15) NOT NULL,
  email VARCHAR(30) NOT NULL,
  pwd VARCHAR(100) NOT NULL,
  role VARCHAR(10) NOT NULL,
  PRIMARY KEY(institution_id)
);

CREATE TABLE Objects (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  date_found DATE NOT NULL,
  date_claimed DATE NULL,
  description VARCHAR(120) NOT NULL,
  -- imageURL BLOB NULL,
  imageURL VARCHAR(150) NULL,
  status VARCHAR(30) NOT NULL,
  claimed_by VARCHAR(15) NULL,
  found_by VARCHAR(15) NULL,
  posted_by VARCHAR(15) NULL,
  FOREIGN KEY(found_by) REFERENCES Users(institution_id),
  FOREIGN KEY(claimed_by) REFERENCES Users(institution_id),
  FOREIGN KEY(posted_by) REFERENCES Users(institution_id),
  PRIMARY KEY(id)
);

-- CREATE TABLE Img {
--   id INT NOT NULL,
--   name VARCHAR(50) NOT NULL,
--   image BLOB NULL,
--   FOREIGN KEY(id) REFERENCES Objects(id),
--   PRIMARY KEY(id)
-- }


-- INSERTS FOR USERS TABLE
INSERT INTO Users(fName, lName, institution_id, email, pwd, role)
VALUES  ("Admin", "Admin", "admin", "admin@itesm.mx", "admin", "admin");
INSERT INTO Users(fName, lName, institution_id, email, pwd, role)
VALUES  ("Jose", "Carvajal", "A01280704", "A01280704@itesm.mx", "user", "user");
INSERT INTO Users(fName, lName, institution_id, email, pwd, role)
VALUES  ("Daniel", "Gonzalez", "A01280648", "A01280648@itesm.mx", "user", "user");
INSERT INTO Users(fName, lName, institution_id, email, pwd, role)
VALUES  ("Andres", "Sosa", "A01190548", "A01190548@itesm.mx", "user", "user");
INSERT INTO Users(fName, lName, institution_id, email, pwd, role)
VALUES  ("Jorge", "Gonzalez", "A01190549", "A01190549@itesm.mx", "user", "user");
INSERT INTO Users(fName, lName, institution_id, email, pwd, role)
VALUES  ("Luis", "Hernandez", "A00802497", "A00802497@itesm.mx", "user", "user");


-- INSERTS FOR OBJECTS TABLE
-- Objetos reclamados
INSERT INTO Objects(name, date_found, date_claimed, description, imageURL, status, claimed_by, found_by, posted_by)
VALUES ("Cartera", "2017-11-6", "2017-11-6", "Se encontró en una banca afuera de FoodBox", "url dummy", "claimed", "A01280704", "A01190548", "admin");
INSERT INTO Objects(name, date_found, date_claimed, description, imageURL, status, claimed_by, found_by, posted_by)
VALUES ("Mochila", "2017-11-6", "2017-11-10", "Mochila negra en Salon A3-304", "url dummy", "claimed", "A01280648", "A01190548", "admin");
INSERT INTO Objects(name, date_found, date_claimed, description, imageURL, status, claimed_by, found_by, posted_by)
VALUES ("Celular", "2017-11-8", "2017-11-4", "Celular olvidado en Jubileo", "url dummy", "claimed", "A00802497", "A01190549", "admin");

-- Objetos no reclamados
INSERT INTO Objects(name, date_found, description, imageURL, status, found_by, posted_by)
VALUES ("iPhone", "2017-11-10", "Estaba en una mesa de Centrales", "url dummy", "not_claimed", "A01280704", "admin");
INSERT INTO Objects(name, date_found, description, imageURL, status, found_by, posted_by)
VALUES ("Llavero", "2017-11-9", "Lo encontré en el camion entre A3 y Jubileo", "url dummy", "not_claimed", "A01190549", "admin");
INSERT INTO Objects(name, date_found, description, imageURL, status, found_by, posted_by)
VALUES ("MacBook", "2017-11-11", "Mac abandonada en 4to piso de Biblioteca", "url dummy", "not_claimed", "A01190548", "admin");

INSERT INTO Objects(name, date_found, description, imageURL, status, found_by, posted_by)
VALUES ("Cargador", "2017-11-0", "Cargador de celular en 2do piso Cetec", "url dummy", "not_claimed", "A01280648", "admin");
INSERT INTO Objects(name, date_found, description, imageURL, status, found_by, posted_by)
VALUES ("Sudadera", "2017-11-7", "Sudadera negra en salón A1-203", "url dummy", "not_claimed", "A01190548", "admin");
INSERT INTO Objects(name, date_found, description, imageURL, status, found_by, posted_by)
VALUES ("Lonchera", "2017-11-12", "Lonchera olvidada en Carreta", "url dummy", "not_claimed", "A00802497", "admin");
