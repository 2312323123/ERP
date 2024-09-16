/*
this is an example showing how to create databases for your microservices on startup
as I can't show the real credentials here, you have to edit this file yourself according to your needs

replace service_name_1 with the name of the first microservice database
replace user_name_1 with the name of the first microservice user
replace password_1 with the password of the first microservice user

and so on for the other services, put the credentials same as in the .env files of the microservices

to see effect you can do:
docker exec -it db_postgres-db-1 psql -U main_user_you_have_set -d main_db
*/

/* first microservice */
-- Create a database
CREATE DATABASE service_name_1;
-- Create a user with a password
CREATE USER 'user_name_1'@'localhost' IDENTIFIED BY 'password_1';
-- Grant privileges on the first database
GRANT ALL PRIVILEGES ON service_name_1.* TO 'user_name_1'@'localhost';

/* second microservice */
CREATE DATABASE service_name_2;
-- Create a user with a password
CREATE USER 'user_name_2'@'localhost' IDENTIFIED BY 'password_2';
-- Grant privileges on the second database
GRANT ALL PRIVILEGES ON service_name_2.* TO 'user_name_2'@'localhost';

-- Apply changes
FLUSH PRIVILEGES;
