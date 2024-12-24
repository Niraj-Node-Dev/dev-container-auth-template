#!/bin/bash

# shellcheck disable=SC1091
# shellcheck disable=SC2086
source ${NVM_DIR}/nvm.sh

nvm use

npm i -g pnpm

pnpm install

pnpm run -r build

# shellcheck disable=SC2046
git config --global --add safe.directory $(pwd)

# Optionally, remove backup files created by sed
sed -i.bak "s|^DB_PORT=.*|DB_PORT=5432|g" .env
sed -i.bak "s|^DB_HOST=.*|DB_HOST=pgsql|g" .env

sed -i.bak "s|^REDIS_HOST=.*|REDIS_HOST=redis|g" .env

rm -rf .env.bak | true

#run the migrations
#for backend
DB_LOGGING=all pnpm run migration:up
DB_LOGGING=all pnpn run seed

pnpm run start:debug &
wait
