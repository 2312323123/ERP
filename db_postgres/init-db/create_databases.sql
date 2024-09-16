/*
this is an example showing how to create databases for your microservices on startup
as I can't show the real credentials here, you have to edit this file yourself according to your needs

replace service_name_1 with the name of the first microservice database
replace user_name_1 with the name of the first microservice user
replace password_1 with the password of the first microservice user

and so on for the other services, put the credentials same as in the .env files of the microservices

to see effect you can do:
docker exec -it db_postgres-db-1 psql -U <user_name_from_docker_compose_env_file>
(it works without password because local connections are trusted by default)

WARNING: if you change this later on, you lose all data in the database (can't login)
*/

/* first microservice */
-- Create a database
CREATE DATABASE service_name_1;
-- Create a user with a password
CREATE USER user_name_1 WITH PASSWORD 'password_1';
-- Grant privileges on the first database
GRANT ALL PRIVILEGES ON DATABASE service_name_1 TO user_name_1;

/* second microservice */
-- Create a database
CREATE DATABASE service_name_2;
-- Create a user with a password
CREATE USER user_name_2 WITH PASSWORD 'password_2';
-- Grant privileges on the second database
GRANT ALL PRIVILEGES ON DATABASE service_name_2 TO user_name_2;

/* ... */
