# Run Project

npm run dev

## 🛠 SonarCloud Setup & Code Analysis

### Project key for Sonar cloud:

nihalsherkar1_react-project

### Organization key:

nihalsherkar1

### Command Prompt

`set SONAR_TOKEN=834bf1643bb3421db74180325dd356f4e6aa5f96`

### To Run Sonar

`sonar-scanner`

# sonar-project.properties

### install dependency of eslint:

```
npm install --save-dev eslint eslint-plugin-react eslint-plugin-react-hooks
```

### the key of your SonarCloud organization

sonar.organization=nihalsherkar1

### must be organization key + underscore + your project key

```
sonar.projectKey=nihalsherkar1_react-project
sonar.projectName=React Project
sonar.projectVersion=1.0
sonar.sources=src
sonar.exclusions=**/node_modules/**,**/\*.test.js,**/**tests**/\*\*
```

### .eslintrc.json

{
"env": {
"browser": true,
"es2021": true
},
"extends": ["eslint:recommended", "plugin:react/recommended"],
"parserOptions": {
"ecmaFeatures": {
"jsx": true
},
"ecmaVersion": "latest",
"sourceType": "module"
},
"plugins": ["react"],
"rules": {
"react/prop-types": "off"
}
}

```

```
