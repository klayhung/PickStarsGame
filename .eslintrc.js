module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "airbnb-base",
    "globals": {
         "Atomics": "readonly",
         "SharedArrayBuffer": "readonly",
         'wz3': false,
         'cc': false,
         'Editor': false,
         'jsb': false,
         'CC_EDITOR': false,
         'CC_PREVIEW': false,
         'CC_DEV': false,
         'CC_DEBUG': false,
         'CC_BUILD': false,
         'CC_JSB': false,
         'CC_TEST': false,
         },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
    }
};