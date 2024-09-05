# Use the mockoon/cli base image to create this image.
FROM mockoon/cli

# Copy the users.json, products.json, and orders.json files from the local directory into the container.
COPY users.json /users.json
COPY products.json /products.json
COPY orders.json /orders.json

# Copy the entrypoint.sh script from the local directory into the container.
COPY entrypoint.sh /entrypoint.sh

# Specify the entrypoint for the container, indicating that the entrypoint.sh script should be executed when the container starts.
ENTRYPOINT [ "/entrypoint.sh" ]