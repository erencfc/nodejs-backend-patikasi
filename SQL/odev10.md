Soru 1:
- SELECT city, country FROM city LEFT JOIN country ON city.country_id = country.country_id;

Soru 2:
- SELECT payment_id, first_name, last_name FROM customer RIGHT JOIN payment ON customer.customer_id = payment.customer_id;

Soru 3:
- SELECT rental_id, first_name, last_name FROM rental FULL JOIN customer ON rental.customer_id = customer.customer_id;
