# react-native-reminders
Mobile app written in React Native with a Reminders List view and a Reminders Calendar view.

## Getting Started

This project requires: 
1. The latest version of NodeJS: https://nodejs.org/en/
2. NPM: https://www.npmjs.com/
3. Ability to run a mobile emulator (either with Android Studio or XCode).
4. The React Native CLI: https://facebook.github.io/react-native/docs/getting-started

#### To Run the Application
1. `cd` into `react-native-reminders/Reminders-Server` and run the `WebServer.js` file via `node WebServer.js`. The server will start and you'll see `Server running at http://127.0.0.1:7779/` in the console.
2. `cd` into `react-native-reminders/Reminders-App` and execute `npm install`. Once done, run `react-native start` to start the react-native client. In a separate console window, run `react-native run-android` or `react-native run-ios` to launch the mobile emulator and the application.

Once everything is launched, you should be on the `Reminders` landing page. You can freely add/complete reminders, as well as open the calendar view from the bottom calendar button.
