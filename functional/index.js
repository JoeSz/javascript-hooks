var hooksFunctions = require( '../hooks' ).HooksFunctions;
for ( hookFunction in hooksFunctions ) {
    if ( !global.hasOwnProperty( hookFunction ) ) {
        global[ hookFunction ] = hooksFunctions[ hookFunction ];
    }
}

var hooks = require( '../hooks' ).hooks;
if ( !global.hasOwnProperty( 'hooks' ) ) {
    global[ 'hooks' ] = hooks;
}