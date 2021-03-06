

up:
	docker-compose up -d

api-logs:
	docker-compose logs -f api

db-logs:
	docker-compose logs -f mongo


access-api-sh:
	docker-compose exec api sh
