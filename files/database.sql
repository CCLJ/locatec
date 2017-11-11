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
  imageURL VARCHAR (150) NOT NULL,
  status VARCHAR(30) NOT NULL,
  claimed_by VARCHAR(15) NULL,
  found_by VARCHAR(15) NULL,
  posted_by VARCHAR(15) NULL,
  FOREIGN KEY(found_by) REFERENCES Users(institution_id),
  FOREIGN KEY(claimed_by) REFERENCES Users(institution_id),
  FOREIGN KEY(posted_by) REFERENCES Users(institution_id),
  PRIMARY KEY(id)
);


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


-- INSERTS FOR OBJECTS TABLE
-- Objetos reclamados
INSERT INTO Objects(name, date_found, date_claimed, description, imageURL, status, claimed_by, found_by, posted_by)
VALUES ("Objecto 1", "2017-11-5", "2017-11-6", "Descripcion de objeto 1", "url dummy", "claimed", "A01280704", "A01190548", "admin");
INSERT INTO Objects(name, date_found, date_claimed, description, imageURL, status, claimed_by, found_by, posted_by)
VALUES ("Objecto 2", "2017-11-8", "2017-11-10", "Descripcion de objeto 2", "url dummy", "claimed", "A01280648", "A01190549", "admin");
INSERT INTO Objects(name, date_found, date_claimed, description, imageURL, status, claimed_by, found_by, posted_by)
VALUES ("Objecto 3", "2017-11-2", "2017-11-4", "Descripcion de objeto 3", "url dummy", "claimed", "A01280648", "A01190549", "admin");

-- Objetos no reclamados
INSERT INTO Objects(name, date_found, description, imageURL, status, found_by, posted_by)
VALUES ("Objecto 4", "2017-11-11", "Descripcion de objeto 4", "url dummy", "not_claimed", "A01280704", "admin");
INSERT INTO Objects(name, date_found, description, imageURL, status, found_by, posted_by)
VALUES ("Objecto 5", "2017-11-2", "Descripcion de objeto 5", "url dummy", "not_claimed", "A01190549", "admin");
INSERT INTO Objects(name, date_found, description, imageURL, status, found_by, posted_by)
VALUES ("Objecto 6", "2017-11-13", "Descripcion de objeto 6", "url dummy", "not_claimed", "A01280704", "admin");
