# GNIB Checker

This is a command script which checks every 15 seconds for GNIB appointments and shows a notification if there are some slots available.

## Install

Clone this repository and then run the command bellow:
```
npm install
```

## How to use
```
cd gnib-checker
npm run start
```

## Push Notifications Ready!
To enable push notifications you should:

1. Create an account and request developer access at https://pushed.co/#get-started
2. Create a channel on Pushed dashboard.
3. Create the **.env** file at root folder and setup the Pushed credentials.
4. Download Pushed app for [iOS](https://itunes.apple.com/us/app/get-pushed/id804777699?mt=8&uo=6&at=&ct=) or [Android](https://play.google.com/store/apps/details?id=co.pushed.GetPushed).
5. Using the app, subscribe for the channel which you created on step 2.

### Template for the .env file
```
PUSHED_ID=...
PUSHED_APP_SECRET=...
PUSHED_APP_KEY=...
PUSHED_CHANNEL_ALIAS=...

```

## Issues

Let me know at https://github.com/ricardodantas/gnib-checker/issues

## TODO:

* Write unit tests.
* Add code coverage.
* Add CI.
