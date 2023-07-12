module.exports = {
  "env": {
    "browser": true,
    "node": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],
  "overrides": [
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "prettier/prettier": [
      "error",
      {
        "singleQuote": true,
        "printWidth": 120,
      }
    ]
  }
}
