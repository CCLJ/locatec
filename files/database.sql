CREATE TABLE Users (
  fName VARCHAR(30) NOT NULL,
  lName VARCHAR(30) NOT NULL,
  username VARCHAR(30) NOT NULL,
  email VARCHAR(30) NOT NULL,
  pwd VARCHAR(30) NOT NULL,
  country VARCHAR(30) NOT NULL,
  gender VARCHAR(6) NOT NULL,
  PRIMARY KEY(email)
);

CREATE TABLE Comments (
  email VARCHAR(30) NOT NULL,
  comment VARCHAR(100) NOT NULL,
  FOREIGN KEY (email) REFERENCES Users(email)
);

CREATE TABLE Friends (
  email VARCHAR(30) NOT NULL,
  friend VARCHAR(30) NOT NULL,
  FOREIGN KEY (email) REFERENCES Users(email),
  FOREIGN KEY (friend) REFERENCES Users(email)
);

-- email: quien soy y who: quien me la envio
CREATE TABLE Requests (
  email VARCHAR(30) NOT NULL,
  who VARCHAR(30) NOT NULL,
  FOREIGN KEY (email) REFERENCES Users(email),
  FOREIGN KEY (who) REFERENCES Users(email)
);

-- INSERTS FOR USERS TABLE
INSERT INTO Users(fName, lName, username, email, pwd, country, gender)
VALUES  ("Jose", "Carvajal", "jose04", "jose@gmail.com", "jose", "Mexico", "M");
INSERT INTO Users(fName, lName, username, email, pwd, country, gender)
VALUES  ("Alfredo", "Salazar", "alfredo80", "alfredo@gmail.com", "alfredo", "Mexico", "M");
INSERT INTO Users(fName, lName, username, email, pwd, country, gender)
VALUES  ("Diana", "Garza", "diana25", "diana@gmail.com", "diana", "Argentina", "F");

-- INSERTS FOR COMMENTS TABLE
INSERT INTO Comments(email, comment)
VALUES ("jose@gmail.com", "Comentario 1 de usuario Jose");
INSERT INTO Comments(email, comment)
VALUES ("jose@gmail.com", "Comentario 2 de usuario Jose");
INSERT INTO Comments(email, comment)
VALUES ("jose@gmail.com", "Comentario 3 de usuario Jose");
INSERT INTO Comments(email, comment)
VALUES ("alfredo@gmail.com", "Comentario 1 de usuario Alfredo");
INSERT INTO Comments(email, comment)
VALUES ("alfredo@gmail.com", "Comentario 2 de usuario Alfredo");
INSERT INTO Comments(email, comment)
VALUES ("diana@gmail.com", "Comentario 1 de usuario Diana");

-- INSERTS FOR FRIENDS TABLE
INSERT INTO Friends(email, friend)
VALUES ("jose@gmail.com", "alfredo@gmail.com");
INSERT INTO Friends(email, friend)
VALUES ( "alfredo@gmail.com", "jose@gmail.com");
INSERT INTO Friends(email, friend)
VALUES ("diana@gmail.com", "alfredo@gmail.com");
INSERT INTO Friends(email, friend)
VALUES ( "alfredo@gmail.com", "diana@gmail.com");

-- INSERTS FOR REQUESTS TABLE
INSERT INTO Requests(email, who)
VALUES ("jose@gmail.com", "diana@gmail.com");
