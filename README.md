# full-stack-web-app

To run the app, use the following command:
```
docker-compose up --build
```

If you run the app for the first time, the server container might stop, saying the database is not ready to be used. You can safely ignore the message because it only occurs when mounting the volume for mysql and the server container will eventually run when the database container is ready.
