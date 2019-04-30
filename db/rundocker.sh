#!/bin/sh

echo "[i] running db..."
sudo docker run --name db -d -p 27017:27017 mongo
echo "[i] db is running on port 27017..."
