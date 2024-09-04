# Node.js Hello World

Deploy this code to Azure App Service with the following command:

```bash
APPNAME=nodejs-hello-world-$(date +%s)
RESOURCEGROUP=nodejs-hello-world

# create the app service
az group create --name $RESOURCEGROUP --location italynorth
az appservice plan create --name $APPNAME --resource-group $RESOURCEGROUP --sku FREE
az webapp create --name $APPNAME --resource-group $RESOURCEGROUP --plan $APPNAME --runtime "NODE|16-lts"

# deploy the code via zip-deploy
npm install
rm -f $APPNAME.zip ; zip -r $APPNAME.zip .
az webapp deployment source config-zip -g $RESOURCEGROUP -n $APPNAME --src $APPNAME.zip && rm $APPNAME.zip

# verify the deployment
curl https://$APPNAME.azurewebsites.net # hello world from index.js
curl https://$APPNAME.azurewebsites.net/public  # static file
curl https://$APPNAME.azurewebsites.net/api/accounts/test   # api response from index.js

# destroy the app service
az group delete --name $RESOURCEGROUP --yes --no-wait
```
