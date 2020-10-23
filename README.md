# Node.js keepalive test

- Build Docker image for server: `npm run docker-build`
- Build: `npm run build` or `npm run build-watch`
- Run server: `npm run start-server`
- Run client: `npm run start-client`
- Check out socket states in the container: `docker exec -it keepalive-test-server netstat -tno`
