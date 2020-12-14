

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";



-- products ddl

CREATE TABLE products (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), 
	title text NOT NULL,
	description text DEFAULT NULL,
	price integer NOT NULL DEFAULT 0
);


-- products data

INSERT INTO products (title, description, price) VALUES
('You Don''t Know JS by Kyle Simpson', 'It’s easy to learn parts of JavaScript, but much harder to learn it completely—or even sufficiently—whether you’re new to the language or have used it for years. With the "You Don’t Know JS" book series, you’ll get a more complete understanding of JavaScript, including trickier parts of the language that many experienced JavaScript programmers simply avoid.', 10),
('Eloquent JavaScript, 3rd Edition: A Modern Introduction to Programming Kindle Edition by Marijn Haverbeke', 'JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.', 100),
('JavaScript: The Definitive Guide: Master the World''s Most-Used Programming Language 7th Edition by David Flanagan', 'For web developers and other programmers interested in using JavaScript, this bestselling book provides the most comprehensive JavaScript material on the market. The seventh edition represents a significant update, with new information for ECMAScript 2020, and new chapters on language-specific features.', 50);




-- stocks ddl

CREATE TABLE stocks (
	product_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), 
	count integer NOT NULL DEFAULT 0,
	FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
);


COMMENT ON COLUMN stocks.product_id is 'foreign key from products.id';
COMMENT ON COLUMN stocks.count is 'There are no more products than this count in stock';


-- stocks data

INSERT INTO stocks 
SELECT 
	id AS product_id,
	floor(random() * 100 + 1)::int AS count
FROM products;





-- dateteime_created
ALTER TABLE products ADD datetime_created timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP;

