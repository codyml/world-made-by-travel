#!/usr/bin/env bash

docker-compose exec db sh -c "mysql -u wordpress -pwordpress wordpress < /dumps/db.sql"
docker-compose exec db sh -c "mysql -u wordpress -pwordpress wordpress < /setup-dev-db.sql"
