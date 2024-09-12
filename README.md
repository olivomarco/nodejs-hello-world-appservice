# Node.js Hello World - with npm run build and zip-deploy

This simple web application exposes different types of content:

- static content (HTML, CSS, JS, images) served by the web server, under folder [src/client](src/client)
- dynamic, local APIs, exposed by the [src/server/server.js](src/server/server.js) file (for example, the `/local-api/hello` endpoint for a simple hello-world)
- dynamic, remote APIs, exposed by the [src/server/server.js](src/server/server.js) file (for example, the `/api/get` endpoint which fetches data from a remote API exposed by [httpbin](https://httpbin.org/))

## Develop and test locally

To develop and test locally:

```bash
npm install
npm run start:dev
```

and then connect to `http://localhost:9000` to see the static webpages, and connect to `http://localhost:3000` to see dynamic (nodejs) backend content.

To simulate that you are running in production, but still run locally, you can run:

```bash
npm run build
npx webpack --config webpack.config.js --mode production
NODE_ENV=production npm run start
```

## Deploy

Deploy this code to Azure App Service with the following command:

```bash
APPNAME=nodejs-hello-world-$(date +%s)
RESOURCEGROUP=nodejs-hello-world

# create the app service
az group create --name $RESOURCEGROUP --location italynorth
az appservice plan create --name $APPNAME --resource-group $RESOURCEGROUP --sku B1 --is-linux
az webapp create --name $APPNAME --resource-group $RESOURCEGROUP --plan $APPNAME --runtime "NODE|18-lts"

# set NODE_ENV to production in the app settings
az webapp config appsettings set --name $APPNAME --resource-group $RESOURCEGROUP --settings NODE_ENV=production

# deploy the code via zip-deploy
npx webpack --config webpack.config.js --mode production
npm install && npm run build && npm run zip
az webapp deployment source config-zip -g $RESOURCEGROUP -n $APPNAME --src $APPNAME.zip && rm app-service-hello-world.zip

# verify the deployment
curl https://$APPNAME.azurewebsites.net # hello world from index.js
curl https://$APPNAME.azurewebsites.net/public  # static file
curl https://$APPNAME.azurewebsites.net/api/accounts/test   # api response from index.js

# destroy the app service
az group delete --name $RESOURCEGROUP --yes --no-wait
```
