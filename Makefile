
#### DEV ####
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

api-test:
	clear && docker-compose exec api yarn test


#### PROD ####

prod-up:
	docker-compose -f docker-compose.prod.yml up -d

prod-rebuild:
	docker-compose -f docker-compose.prod.yml up -d --build
