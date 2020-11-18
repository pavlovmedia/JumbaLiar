<p align="center">
    <img src="./frontend/src/assets/logo.png" width="100" height="100">
</p>

<h1>JumbaLiar</h1>
JumbaLiar is a frontend and backend that allows the user to quickly generate mockdata using dynamically generated express endpoints.

<h1>🚧 Work in Progress 🚧</h1>

## Prerequisites
• Angular CLI (`npm install @angular/cli -g` if you do not already have it.)<br>
• Docker Compose

## Default Ports

• Backend `http://localhost`<br>
• Frontend `http://localhost:8086`

## Docker

Example docker-compose.yml

    version: "3.8"
    services:
      backend:
        build: ./backend
        restart: always
        container_name: jumbaliar-backend
        environment:
          - COUCHDB_URL=couchdb:5984
          - COUCHDB_USER=admin
          - COUCHDB_PASSWORD=admin
        volumes:
          - ./uploads:/node/uploads
        depends_on:
          - couchdb
        links:
          - "couchdb"
        ports:
          - 80:80
      frontend:
        build: ./frontend
        restart: always
        container_name: jumbaliar-frontend
        environment:
          - BACKEND_URL=http://localhost
        depends_on:
          - couchdb
        ports:
          - 8086:80
      couchdb:
        image: couchdb
        restart: always
        container_name: couchdb
        environment:
          - COUCHDB_USER=admin
          - COUCHDB_PASSWORD=admin
        ports:
          - "5984:5984"
        volumes:
          - couchdb:/opt/couchdb/data
    volumes:
      couchdb:

**Note**
- `restart:always` on the backend is essential to how the system works. Express must be restarted when new endpoints are added.
- `BACKEND_URL` must match the URL of the backend.

## TODO
- SSE events when data is manipulated
- Required and optional fields
- Additional Swagger UI entries
- Ability to configure additional metadata fields on data
- Ask for "used by" when generating endpoints

