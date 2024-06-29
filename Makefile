include .env
export

.PHONY: build build-images rebuild-docker run clean down help

# Build the .NET solution
build: ## Build solution
	dotnet build eHealthscape.sln

# Build Docker images for different services
build-images: ## Build docker images
	docker build -t duynguyenbui/web-app:latest -f src/web-app/Dockerfile .
	docker build -t duynguyenbui/speech-svc:latest -f src/SpeechRecognition.API/Dockerfile .
	docker build -t duynguyenbui/healthrc-svc:latest -f src/HealthRecord.API/Dockerfile .
	docker build -t duynguyenbui/bff-svc:latest -f src/BFF/Dockerfile .
	docker build -t duynguyenbui/identity-svc:latest -f src/Identity.API/Dockerfile .

# Rebuild and restart Docker containers
rebuild-docker: ## Rebuilds and restarts docker containers
	docker-compose down
	docker-compose build --no-cache
	docker-compose up -d

# Run Docker containers
run: ## Run docker compose
	docker-compose up -d

# Stop Docker containers
stop: ## Stop docker compose
	docker-compose stop

# Release Docker containers
down: ## Release resources
	docker-compose down

# Clean build artifacts
clean: ## Clean build artifacts
	dotnet clean eHealthscape.sln

# Display target commands
help: ## Show this help.
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//' | awk 'BEGIN {FS = ":.*##"}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
