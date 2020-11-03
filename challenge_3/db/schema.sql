CREATE DATABASE IF NOT EXISTS multistep_checkout

USE multistep_checkout

CREATE TABLE IF NOT EXISTS user_accounts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50),
  email VARCHAR(50),
  password VARCHAR(50),
  address1 VARCHAR(255),
  address2 VARCHAR(255),
  city VARCHAR(50),
  state VARCHAR(50),
  zipcode INT,
  phoneNumber INT,
  creditCard INT,
  expiryDate DATE,
  cvv INT,
  billingZipcode INT
);

-- CREATE TABLE IF NOT EXISTS users (
--   id INT PRIMARY KEY AUTO_INCREMENT,
--   name VARCHAR(50),
--   email VARCHAR(50),
--   password VARCHAR(50),
--   shipping_id INT,
--   billing_id INT,
--   FOREIGN KEY (shipping_id) REFERENCES shippings(id),
--   FOREIGN KEY (billing_id) REFERENCES billings(id)
-- );

-- CREATE TABLE IF NOT EXISTS shippings (
--   id INT PRIMARY KEY AUTO_INCREMENT,
--   address1 VARCHAR(255),
--   address2 VARCHAR(255),
--   city VARCHAR(50),
--   state VARCHAR(50),
--   zipcode INT,
--   phoneNumber INT
-- );

-- CREATE TABLE IF NOT EXISTS billings (
--   id INT PRIMARY KEY AUTO_INCREMENT,
--   creditCard INT,
--   expiryDate DATE,
--   cvv INT,
--   billingZipcode INT
-- );