CREATE DATABASE IF NOT EXISTS sales_db;
USE sales_db;

CREATE TABLE sales (
    ProductID INT,
    SaleDate DATE,
    Quantity INT,
    TotalAmount DECIMAL(10,2),
    CustomerID INT,
    StoreID INT,
    SalesPersonID INT,
    PaymentMethod VARCHAR(50)
);

insert into sales(ProductID, SaleDate, Quantity, TotalAmount, CustomerID, StoreID, SalesPersonID, PaymentMethod)
values 
	(1, '2023-08-01', 10, 200.00, 101, 1, 201, 'Credit Card'),
    (1, '2023-08-01', 5, 150.00, 102, 1, 202, 'Cash');

SELECT * FROM sales;