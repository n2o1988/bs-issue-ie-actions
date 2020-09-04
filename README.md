# Testing Issue with Actions and Browserstack IE

## How to run
Make sure you have `node` and `yarn` installed globally.
Install dependencies:

```
yarn install
```

Run the tests, passing credentials:
```
BROWSERSTACK_USER=<...> BROWSERSTACK_KEY=<...> yarn test
```

## The problem
The Actions commands are not working anymore on Internet Explorer on Browserstack, using `selenium-webdriver` v4alpha7. We've been using this version for a while without a problem until September 3rd 2020 where we started to receive the following error: 
```
UnknownCommandError: Unrecognized command: actions
```

Targeting a locally running VM with IE11 and Windows 10 (x32) works as expected.
