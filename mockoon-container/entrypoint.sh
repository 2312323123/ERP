#!/bin/sh

# Starts the mockoon-cli with the 'start' command.
# The '--data' flag specifies the JSON files containing the mock data for users, products, and orders.
# The '--port' flag specifies the ports to use for the mock APIs.
mockoon-cli start --data users.json products.json orders.json --port 3003 3004 3005