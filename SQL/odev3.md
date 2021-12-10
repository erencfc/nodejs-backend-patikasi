Soru 1:
- SELECT * FROM country WHERE country LIKE 'A%a';

Soru 2:
- SELECT * FROM country WHERE country LIKE '%n' AND length(country) >= 6;

Soru 3:
- SELECT * FROM film WHERE title ILIKE '%T%T%T%T%';

Soru 4:
- SELECT * FROM film WHERE title LIKE 'C%' AND length(title) > 90 AND rental_rate = 2.99;
