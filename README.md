# Crypto War

## Run the development server

Run:

```npm run dev```

This will run a server so you can run the game in a browser. It will also start a watch process, so you can change the source and the process will recompile and refresh the browser automatically.

To run the game, open your browser and enter http://localhost:3000 into the address bar.


## Build for deployment

Run:

```npm run deploy```

This will optimize and minimize the compiled bundle.

## Deploy for cordova

Make sure to uncomment the cordova.js file in the src/index.html and to update config.xml with your informations. (name/description...)

More informations about the cordova configuration:
https://cordova.apache.org/docs/en/latest/config_ref/

There is 3 platforms actually tested and supported:

- browser

- ios

- android

First run (ios example):

```
npm run cordova
cordova platform add ios
cordova run ios
```

Update (ios example):

```
npm run cordova
cordova platform update ios
cordova run ios
```

This will optimize and minimize the compiled bundle.