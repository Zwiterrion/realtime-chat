# Building a Realtime Chat with Otoroshi

Part One : https://zwiterrion.hashnode.dev/building-a-realtime-chat-with-otoroshi

# Frontend 

```sh
yarn && yarn run dev
```

# server

```sh
yarn && node index.js
```

# Otoroshi resources

```
curl -L -o otoroshi.jar 'https://github.com/MAIF/otoroshi/releases/download/v16.15.1/otoroshi.jar' &&
java -Dotoroshi.adminPassword=password -jar otoroshi.jar
```

Then navigate to the login page `http://otoroshi.oto.tools:8080/bo/dashboard/resources-loader` and drop one by one each file contained in the folder.