

up:
	docker-compose up -d

rebuild:
	docker-compose up -d --build

api-logs:
	docker-compose logs -f api

db-logs:
	docker-compose logs -f mongo


access-api-sh:
	docker-compose exec api sh

access-ui-sh:
	docker-compose exec ui sh
