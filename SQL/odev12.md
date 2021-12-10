Soru 1:
- SELECT COUNT(*) FROM film WHERE length > (SELECT AVG(length) FROM film);

Soru 2:
- SELECT COUNT(*) FROM film WHERE rental_rate = (SELECT MAX(rental_rate) FROM film);

Soru 3:
- SELECT * FROM film WHERE (rental_rate = (SELECT MIN(rental_rate) FROM film)) AND (replacement_cost = (SELECT MIN(replacement_cost) FROM film));

Soru 4:
- SELECT COUNT(payment_id), customer_id FROM payment GROUP BY customer_id ORDER BY customer_id;
