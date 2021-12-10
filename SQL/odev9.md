Soru 1:
- SELECT city, country FROM CITY INNER JOIN country ON city.country_id = country.country_id;

Soru 2:
- SELECT payment_id, first_name, last_name FROM customer INNER JOIN payment ON payment.customer_id = customer.customer_id;

Soru 3:
- SELECT rental_id, first_name, last_name FROM rental INNER JOIN customer ON rental.customer_id = customer.customer_id;
