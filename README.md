# nextjs_examples

NextJS Demo Examples

# To Start the application

## Create .env file in backend folder and .env.local in frontend folder

Copy paste the values from .env.example and put your own values where required
for vapid keys you can

```bash
cd backend
node generateVAPIDKeys.js
```

paste the private key in VAPID_PRIVATE_KEY in backend .env
paste the public key in VAPID_PUBLIC_KEY in backend .env and NEXT_PUBLIC_VAPID_PUBLIC_KEY in frontend .env.local

## Running the application in development

Build the docker container by running

```bash
docker-compose build
```

You can start the application with the following command

```bash
docker-compose up
```
