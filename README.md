# JavaScript Hooks
A Powerful Hook system for Javascript (Like WordPress Hook system): [JavaScript Hooks](https://github.com/EmpireWorld/javascript-hooks)

# How to Use?
You can use it in diffrent ways:
* __Objective__, in this way all functions are under a specified object like: Hooks, see below:
```javascript
const Hooks = require( 'javascript-hooks/objective' );
Hooks.addAction( 'log_to_console_something', logHello );
function logHello() {
  console.log( 'Hello' );
}
Hooks.doAction( 'log_to_console_something' ); // logs "Hello"
```
* __Functional__, in this way all functions are global:
```javascript
require( 'javascript-hooks' ); // The default is functional
// require( 'javascript-hooks/functional' );
addFilter( 'array_of_names', removeJames );
function removeJames( arrayOfNames ) {
  arrayOfNames.splice( 0, 1 );
  return arrayOfNames;
}

var arrayOfNames = applyFilters( 'array_of_names', [
  'James',
  'John',
  'Matt'
] );
console.log( arrayOfNames );
```

# Documentation
For documentation go to the website of repository: 
[Documentation](https://empireworld.github.io/javascript-hooks)