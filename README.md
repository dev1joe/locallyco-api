# Locallyco API

## setup
- node docker image: 24-alpine (Node LTS 24.11.0)
- tsx: Typescript compiler
- nodemon: automatically restarts the server on code modification
- @types/node for node.js types support in Typescript
- @types/express for express.js types support in Typescript

## Quick Start (development)
- make your own `.env` file using `.env.example` template file.
- install `node` AKA Node.js and `docker`.
- run `npm install` for installing the application dependencies.
- run the backend and database only:
    - run `docker compose up -d --build`
- run frontend, backend, and database:
    - make sure you're following the "Recommended File Structure"
    - run `docker compose --profile frontend up -d --build`
- you only need the `--build` flag if:
    - it's your first time running the application, which means you don't have the docker images yet.
    - your changed one of the Dockerfiles in the backend or frontend directories, hence you'll need docker to generate new images, so you use the `--build` flag.
- to see the application logs run `docker logs -f <container_name>` but instead of `<container_name>`:
    - use `backend.ozyra` for backend logs
    - or use `frontend.ozyra` for frontend logs

## Recommended File Structure
```
ozyra
├── backend/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── package.json
│   └── ...
└── frontend/
    ├── Dockerfile
    ├── package.json
    └── ...
```
**where the frontend directory is a clone of the [frontend repository](https://github.com/mohamedmohab619/locallyCo.git) and the backend directory is a clone of this repository**