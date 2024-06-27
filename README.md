# Project for CT474 - Internship Summer 2024

## Overview

A reference .NET application implemented by Duy Nguyen

## Technology Stack

- **dotnet8**: Primary framework for backend development.
- **Next.js 14**: Frontend framework for building React applications.
- **NextAuth 4**: Authentication library for Next.js applications.
- **YARP BFF**: Backend for Frontend pattern using YARP (Yet Another Reverse Proxy) to distribute incoming network
  traffic across multiple servers.
- **Rate Limit**: Rate Limit using Yarp.
- **Redis**: In-memory data structure store used as a database, cache, and message broker.
- **PostgreSQL**: Relational database for data storage.
- **Prometheus / Grafana**: Monitoring and metrics collection tools.
- **OIDC (OpenID Connect)**: Authentication layer based on OAuth 2.0 protocol.
- **OpenAPI**: Specification for building and documenting APIs.
- **Docker**: Containerization platform for packaging applications and dependencies.
- **Nginx**: Web server and reverse proxy server.
- **CI using GitHub Workflows**: Continuous integration setup for automated builds and tests.
- **Cron PgDump (Backup)**: Scheduled database backups using cron jobs.
- **Testing using xUnit**: Framework for unit and integration testing.
- **Git / GitHub**: Version control and repository hosting platform.
- **Taskfile**: Task automation tool for defining and running tasks.
- **Kubernetes (Optional)**: Container orchestration tool for managing containerized applications.
- **AI (Optional)**: Integration of artificial intelligence capabilities.

## Missing Lots of Resources

- **Pagination**
- **Optimization**
- **Logic - Domain Driven Design**
- **Should Try Activity OpenTelemetry**
- **Should Try Marten**
- **Should Try Mediator to implement CQRS**
- **Should apply as much design patterns as possible for flexibility**
- **Service Discovery**
- **I can't do everything as I am a mediocre person 🤤🤤🤤**

## Services

1. **healthrc-svc**: HealthRecord.API Service
2. **speech-svc**: SpeechRecognition.API Service
3. **identity-svc**: Identity.API Service
4. **BFF**: Backend for Frontend Service

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository.
2. Install Docker and Docker Compose.
3. Configure your `/etc/hosts`
   with `mkcert -key-file ehealthscape.com.key -cert-file ehealthscape.com.crt monitor.ehealthscape.com app.ehealthscape.com api.ehealthscape.com id.ehealthscape.com`
   in the `certs` folder.
4. Run `docker-compose up` to start the application and its dependencies.
5. Access the application.

## Contributing

For contributions, please contact Duy Nguyen Bui via email: buiduy.ng@gmail.com
