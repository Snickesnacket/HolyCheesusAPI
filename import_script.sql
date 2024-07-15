USE cookie_orders;

CREATE TABLE IF NOT EXISTS orders (
    OrderID INT,
    OrderDate DATE,
    OrderTotal DECIMAL(10, 2),
    CookieID INT,
    CookieName VARCHAR(255),
    RevenuePerCookie DECIMAL(10, 2),
    CostPerCookie DECIMAL(10, 2),
    Quantity INT,
    CustomerID INT,
    CustomerName VARCHAR(255),
    Phone VARCHAR(20),
    Address VARCHAR(255),
    City VARCHAR(100),
    State VARCHAR(50),
    Zip VARCHAR(20),
    Country VARCHAR(100),
    Notes TEXT,
    PRIMARY KEY (OrderID, CookieID)
    );

LOAD DATA INFILE '/var/lib/mysql-files/data.csv'
INTO TABLE orders
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(OrderID, @OrderDate, OrderTotal, CookieID, CookieName, RevenuePerCookie, CostPerCookie, Quantity, CustomerID, CustomerName, Phone, Address, City, State, Zip, Country, Notes)
SET OrderDate = STR_TO_DATE(@OrderDate, '%m/%d/%Y');