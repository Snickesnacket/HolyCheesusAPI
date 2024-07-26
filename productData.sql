

USE holyProducts;

CREATE TABLE Product (
     Id INT PRIMARY KEY AUTO_INCREMENT,
     Name VARCHAR(255) NOT NULL,
     Description VARCHAR(255) NOT NULL,
     Image VARCHAR(255) NOT NULL,
     Price INT NOT NULL,
     CreatedAt DATETIME DEFAULT NOW(),
     UpdatedAt DATETIME DEFAULT NOW()
);

CREATE TABLE Property (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL
);

CREATE TABLE Property_Value (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    PropertyId Int NOT NULL,
    Name VARCHAR(255) NOT NULL,
    FOREIGN KEY (PropertyId) REFERENCES Property(Id)
);

CREATE TABLE Product_Property_Value (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    ProductId Int NOT NULL,
    FOREIGN KEY (ProductId) REFERENCES Product(Id),
    PropertyId Int NOT NULL,
    FOREIGN KEY (PropertyId) REFERENCES Property(Id),
    ProductValueId Int NOT NULL,
    FOREIGN KEY (ProductValueId) REFERENCES Property_Value(Id)
);

INSERT INTO Product (Name, Description, Image, Price)
VALUES
    ('Cheddar', 'Aged cheddar cheese', 'cheddar.jpg', 50),
    ('Brie', 'Soft and creamy brie cheese', 'brie.jpg', 70),
    ('Gouda', 'Mild and nutty gouda cheese', 'gouda.jpg', 60),
    ('Parmesan', 'Hard and granular parmesan cheese', 'parmesan.jpg', 80),
    ('Roquefort', 'Blue veined roquefort cheese', 'roquefort.jpg', 90),
    ('Camembert', 'Creamy camembert cheese', 'camembert.jpg', 75),
    ('Mozzarella', 'Fresh mozzarella cheese', 'mozzarella.jpg', 40),
    ('Emmental', 'Swiss emmental cheese', 'emmental.jpg', 65),
    ('Feta', 'Salty and tangy feta cheese', 'feta.jpg', 55),
    ('Gorgonzola', 'Blue veined gorgonzola cheese', 'gorgonzola.jpg', 85),
    ('Gruyere', 'Sweet and salty gruyere cheese', 'gruyere.jpg', 95),
    ('Ricotta', 'Soft and moist ricotta cheese', 'ricotta.jpg', 45),
    ('Stilton', 'English blue stilton cheese', 'stilton.jpg', 100),
    ('Provolone', 'Semi-hard provolone cheese', 'provolone.jpg', 70),
    ('Pecorino', 'Hard and salty pecorino cheese', 'pecorino.jpg', 90),
    ('Mascarpone', 'Creamy mascarpone cheese', 'mascarpone.jpg', 60),
    ('Halloumi', 'Firm and salty halloumi cheese', 'halloumi.jpg', 65),
    ('Queso Blanco', 'Fresh and crumbly queso blanco cheese', 'queso_blanco.jpg', 50),
    ('Manchego', 'Nutty and tangy manchego cheese', 'manchego.jpg', 85),
    ('Burrata', 'Soft and creamy burrata cheese', 'burrata.jpg', 70);



INSERT INTO Property (Name) VALUES ("Consistency");
INSERT INTO Property_Value (PropertyId, Name) VALUES (1, "Hård");
INSERT INTO Property_Value (PropertyId, Name) VALUES (1, "Mjuk");
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (1, 1, 1);

INSERT INTO Property (Name) VALUES ("Country");
INSERT INTO Property_Value (PropertyId, Name) VALUES (2, "Italien");
INSERT INTO Property_Value (PropertyId, Name) VALUES (2, "Frankrike");
INSERT INTO Property_Value (PropertyId, Name) VALUES (2, "USA");
INSERT INTO Property_Value (PropertyId, Name) VALUES (2, "Nederländerna");
INSERT INTO Property_Value (PropertyId, Name) VALUES (2, "Schweiz");
INSERT INTO Property_Value (PropertyId, Name) VALUES (2, "England");
INSERT INTO Property_Value (PropertyId, Name) VALUES (2, "Spanien");
INSERT INTO Property_Value (PropertyId, Name) VALUES (2, "Grekland");
INSERT INTO Property_Value (PropertyId, Name) VALUES (2, "Cypern");
INSERT INTO Property_Value (PropertyId, Name) VALUES (2, "Mexico");

INSERT INTO Property (Name) VALUES ("Flavor");
INSERT INTO Property_Value  (PropertyId, Name) VALUES (3, 'Skarp');
INSERT INTO Property_Value  (PropertyId, Name) VALUES (3, 'Krämig');
INSERT INTO Property_Value  (PropertyId, Name) VALUES (3, 'Nötig');
INSERT INTO Property_Value  (PropertyId, Name) VALUES (3, 'Syrlig');
INSERT INTO Property_Value  (PropertyId, Name) VALUES (3, 'Salt');
INSERT INTO Property_Value  (PropertyId, Name) VALUES (3, 'Söt');
INSERT INTO Property_Value  (PropertyId, Name) VALUES (3, 'Mild');
INSERT INTO Property_Value  (PropertyId, Name) VALUES (3, 'Fruktig');

-- Koppla Cheddar till egenskaper
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (1, 1, 1); -- Hard
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (1, 2, 1); -- USA
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (1, 3, 1); -- Sharp

-- Koppla Brie till egenskaper
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (2, 1, 2); -- Soft
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (2, 2, 2); -- France
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (2, 3, 2); -- Creamy

-- Koppla Gouda till egenskaper
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (3, 1, 3); -- Semi-hard
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (3, 2, 3); -- Netherlands
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (3, 3, 3); -- Nutty

-- Koppla Parmesan till egenskaper
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (4, 1, 1); -- Hard
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (4, 2, 4); -- Italy
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (4, 3, 1); -- Sharp

-- Koppla Roquefort till egenskaper
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (5, 1, 4); -- Blue
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (5, 2, 2); -- France
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (5, 3, 4); -- Tangy

-- Koppla Camembert till egenskaper
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (6, 1, 2); -- Soft
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (6, 2, 2); -- France
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (6, 3, 2); -- Creamy

-- Koppla Mozzarella till egenskaper
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (7, 1, 2); -- Soft
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (7, 2, 4); -- Italy
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (7, 3, 7); -- Mild

-- Koppla Emmental till egenskaper
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (8, 1, 3); -- Semi-hard
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (8, 2, 5); -- Switzerland
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (8,  3, 3); -- Nutty

-- Koppla Feta till egenskaper
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (9, 1, 1); -- Hard
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (9, 2, 6); -- Greece
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (9, 3, 5); -- Salty

-- Koppla Gorgonzola till egenskaper
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (10, 1, 4); -- Blue
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (10, 2, 4); -- Italy
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (10, 3, 2); -- Creamy

-- Koppla Gruyere till egenskaper
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (11, 1, 1); -- Hard
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (11, 2, 5); -- Switzerland
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (11, 3, 6); -- Sweet

-- Koppla Ricotta till egenskaper
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (12, 1, 2); -- Soft
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (12, 2, 4); -- Italy
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (12, 3, 7); -- Mild

-- Koppla Stilton till egenskaper
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (13, 1, 4); -- Blue
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (13, 2, 7); -- England
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (13, 3, 4); -- Tangy

-- Koppla Provolone till egenskaper
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (14, 1, 3); -- Semi-hard
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (14, 2, 4); -- Italy
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (14, 3, 3); -- Nutty

-- Koppla Pecorino till egenskaper
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (15, 1, 1); -- Hard
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (15, 2, 4); -- Italy
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (15, 3, 5); -- Salty

-- Koppla Mascarpone till egenskaper
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (16, 1, 2); -- Soft
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (16, 2, 4); -- Italy
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (16, 3, 2); -- Creamy

-- Koppla Halloumi till egenskaper
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (17, 1, 1); -- Hard
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (17, 2, 8); -- Cyprus
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (17, 3, 5); -- Salty

-- Koppla Queso Blanco till egenskaper
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (18, 1, 2); -- Soft
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (18, 2, 10); -- Mexico
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (18, 3, 7); -- Mild

-- Koppla Manchego till egenskaper
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (19, 1, 1); -- Hard
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (19, 2, 9); -- Spain
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (19, 3, 3); -- Nutty

-- Koppla Burrata till egenskaper
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (20, 1, 2); -- Soft
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (20, 2, 4); -- Italy
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (20, 3, 2); -- Creamy


ALTER TABLE Product
    ADD COLUMN deletedAt TIMESTAMP NULL DEFAULT NULL;




CREATE DATABASE holyProducts;
SHOW DATABASES;

USE holyProducts;

CREATE TABLE Product (
                         Id INT PRIMARY KEY AUTO_INCREMENT,
                         Name VARCHAR(255) NOT NULL,
                         Description VARCHAR(255) NOT NULL,
                         Image VARCHAR(255) NOT NULL,
                         Price INT NOT NULL,
                         CreatedAt DATETIME DEFAULT NOW(),
                         UpdatedAt DATETIME DEFAULT NOW()
);


CREATE TABLE Image (
                       Id INT PRIMARY KEY AUTO_INCREMENT,
                       file VARCHAR(255) UNIQUE
);

CREATE TABLE Product_Image (
                               Id INT PRIMARY KEY AUTO_INCREMENT,
                               ProductId Int NOT NULL,
                               FOREIGN KEY (ProductId) REFERENCES Product(Id),
                               ImageId INt NOT NULL,
                               FOREIGN KEY (ImageId) REFERENCES Image(Id)
);

CREATE TABLE Property (
                          Id INT PRIMARY KEY AUTO_INCREMENT,
                          Name VARCHAR(255) NOT NULL
);

CREATE TABLE Property_Value (
                                Id INT PRIMARY KEY AUTO_INCREMENT,
                                PropertyId Int NOT NULL,
                                Name VARCHAR(255) NOT NULL,
                                FOREIGN KEY (PropertyId) REFERENCES Property(Id)
);

CREATE TABLE Product_Property_Value (
                                        Id INT PRIMARY KEY AUTO_INCREMENT,
                                        ProductId Int NOT NULL,
                                        FOREIGN KEY (ProductId) REFERENCES Product(Id),
                                        PropertyId Int NOT NULL,
                                        FOREIGN KEY (PropertyId) REFERENCES Property(Id),
                                        ProductValueId Int NOT NULL,
                                        FOREIGN KEY (ProductValueId) REFERENCES Property_Value(Id)
);

INSERT INTO Product (Name, Description, Image, Price)
VALUES
    ('Cheddar', 'Aged cheddar cheese', 'cheddar.jpg', 50),
    ('Brie', 'Soft and creamy brie cheese', 'brie.jpg', 70),
    ('Gouda', 'Mild and nutty gouda cheese', 'gouda.jpg', 60),
    ('Parmesan', 'Hard and granular parmesan cheese', 'parmesan.jpg', 80),
    ('Roquefort', 'Blue veined roquefort cheese', 'roquefort.jpg', 90),
    ('Camembert', 'Creamy camembert cheese', 'camembert.jpg', 75),
    ('Mozzarella', 'Fresh mozzarella cheese', 'mozzarella.jpg', 40),
    ('Emmental', 'Swiss emmental cheese', 'emmental.jpg', 65),
    ('Feta', 'Salty and tangy feta cheese', 'feta.jpg', 55),
    ('Gorgonzola', 'Blue veined gorgonzola cheese', 'gorgonzola.jpg', 85),
    ('Gruyere', 'Sweet and salty gruyere cheese', 'gruyere.jpg', 95),
    ('Ricotta', 'Soft and moist ricotta cheese', 'ricotta.jpg', 45),
    ('Stilton', 'English blue stilton cheese', 'stilton.jpg', 100),
    ('Provolone', 'Semi-hard provolone cheese', 'provolone.jpg', 70),
    ('Pecorino', 'Hard and salty pecorino cheese', 'pecorino.jpg', 90),
    ('Mascarpone', 'Creamy mascarpone cheese', 'mascarpone.jpg', 60),
    ('Halloumi', 'Firm and salty halloumi cheese', 'halloumi.jpg', 65),
    ('Queso Blanco', 'Fresh and crumbly queso blanco cheese', 'queso_blanco.jpg', 50),
    ('Manchego', 'Nutty and tangy manchego cheese', 'manchego.jpg', 85),
    ('Burrata', 'Soft and creamy burrata cheese', 'burrata.jpg', 70);


INSERT INTO Image ()

INSERT INTO Property (Name) VALUES ('Konsistens');
INSERT INTO Property_Value (PropertyId, Name) VALUES (1, 'Hård');
INSERT INTO Property_Value (PropertyId, Name) VALUES (1, 'Mjuk');

INSERT INTO Property (Name) VALUES ('Land');
INSERT INTO Property_Value (PropertyId, Name) VALUES (2, 'Italien');
INSERT INTO Property_Value (PropertyId, Name) VALUES (2, 'Frankrike');
INSERT INTO Property_Value (PropertyId, Name) VALUES (2, 'USA');
INSERT INTO Property_Value (PropertyId, Name) VALUES (2, 'Nederländerna');
INSERT INTO Property_Value (PropertyId, Name) VALUES (2, 'Schweiz');
INSERT INTO Property_Value (PropertyId, Name) VALUES (2, 'England');
INSERT INTO Property_Value (PropertyId, Name) VALUES (2, 'Spanien');
INSERT INTO Property_Value (PropertyId, Name) VALUES (2, 'Grekland');
INSERT INTO Property_Value (PropertyId, Name) VALUES (2, 'Cypern');
INSERT INTO Property_Value (PropertyId, Name) VALUES (2, 'Mexico');

INSERT INTO Property (Name) VALUES ('Smak');
INSERT INTO Property_Value  (PropertyId, Name) VALUES (3, 'Skarp');
INSERT INTO Property_Value  (PropertyId, Name) VALUES (3, 'Krämig');
INSERT INTO Property_Value  (PropertyId, Name) VALUES (3, 'Nötig');
INSERT INTO Property_Value  (PropertyId, Name) VALUES (3, 'Syrlig');
INSERT INTO Property_Value  (PropertyId, Name) VALUES (3, 'Salt');
INSERT INTO Property_Value  (PropertyId, Name) VALUES (3, 'Söt');
INSERT INTO Property_Value  (PropertyId, Name) VALUES (3, 'Mild');
INSERT INTO Property_Value  (PropertyId, Name) VALUES (3, 'Fruktig');

-- Koppla Cheddar till egenskaper
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (1, 1, 1); -- Hard
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (1, 2, 1); -- USA
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (1, 3, 1); -- Sharp

-- Koppla Brie till egenskaper
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (2, 1, 2); -- Soft
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (2, 2, 4); -- France
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (2, 3, 13); -- Creamy

-- Koppla Gouda till egenskaper
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (3, 1, 3); -- Semi-hard
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (3, 2, 3); -- Netherlands
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (3, 3, 3); -- Nutty

-- Koppla Parmesan till egenskaper
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (4, 1, 1); -- Hard
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (4, 2, 4); -- Italy
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (4, 3, 1); -- Sharp

-- Koppla Roquefort till egenskaper
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (5, 1, 4); -- Blue
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (5, 2, 2); -- France
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (5, 3, 4); -- Tangy

-- Koppla Camembert till egenskaper
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (6, 1, 2); -- Soft
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (6, 2, 2); -- France
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (6, 3, 2); -- Creamy

-- Koppla Mozzarella till egenskaper
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (7, 1, 2); -- Soft
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (7, 2, 4); -- Italy
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (7, 3, 7); -- Mild

-- Koppla Emmental till egenskaper
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (8, 1, 3); -- Semi-hard
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (8, 2, 5); -- Switzerland
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (8,  3, 3); -- Nutty

-- Koppla Feta till egenskaper
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (9, 1, 1); -- Hard
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (9, 2, 6); -- Greece
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (9, 3, 5); -- Salty

-- Koppla Gorgonzola till egenskaper
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (10, 1, 4); -- Blue
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (10, 2, 4); -- Italy
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (10, 3, 2); -- Creamy

-- Koppla Gruyere till egenskaper
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (11, 1, 1); -- Hard
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (11, 2, 5); -- Switzerland
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (11, 3, 6); -- Sweet

-- Koppla Ricotta till egenskaper
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (12, 1, 2); -- Soft
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (12, 2, 4); -- Italy
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (12, 3, 7); -- Mild

-- Koppla Stilton till egenskaper
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (13, 1, 4); -- Blue
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (13, 2, 7); -- England
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (13, 3, 4); -- Tangy

-- Koppla Provolone till egenskaper
INSERT INTO Product_Property_Value (ProductId,PropertyId, ProductValueId) VALUES (14, 1, 3); -- Semi-hard
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (14, 2, 4); -- Italy
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (14, 3, 3); -- Nutty

-- Koppla Pecorino till egenskaper
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (15, 1, 1); -- Hard
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (15, 2, 4); -- Italy
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (15, 3, 5); -- Salty

-- Koppla Mascarpone till egenskaper
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (16, 1, 2); -- Soft
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (16, 2, 4); -- Italy
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (16, 3, 2); -- Creamy

-- Koppla Halloumi till egenskaper
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (17, 1, 1); -- Hard
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (17, 2, 8); -- Cyprus
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (17, 3, 5); -- Salty

-- Koppla Queso Blanco till egenskaper
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (18, 1, 2); -- Soft
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (18, 2, 10); -- Mexico
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (18, 3, 7); -- Mild

-- Koppla Manchego till egenskaper
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (19, 1, 1); -- Hard
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (19, 2, 9); -- Spain
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (19, 3, 3); -- Nutty

-- Koppla Burrata till egenskaper
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (20, 1, 2); -- Soft
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (20, 2, 4); -- Italy
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (20, 3, 2); -- Creamy

/* -- Koppla Saint Agur till egenskaper
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (21, 1, 2); -- Soft
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (21, 2, 2); -- France
INSERT INTO Product_Property_Value (ProductId, PropertyId, ProductValueId) VALUES (21, 3, 5); -- Salty
*/

ALTER TABLE Product
    ADD COLUMN deletedAt TIMESTAMP NULL DEFAULT NULL;

ALTER TABLE Product
    ADD UNIQUE (Name);


ALTER TABLE Image
    ADD COLUMN deletedAt TIMESTAMP NULL DEFAULT NULL;



