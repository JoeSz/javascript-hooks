var HooksFunctions = {};

/**
 * Hooks
 *
 * @description Reference of Registered hooks in specified hook type
 *
 * @property {Object} action Action hooks
 * @property {Object} filter Filter hooks
 *
 * @name hooks
 *
 * @type {Object}
 */
var hooks = {
    action: {},
    filter: {}
};

/**
 * @description Individual arguments
 * @typedef {Arguments}
 * @example
 * function someFunction( arg1, arg2, arg3, arg4, ... ) {}
 */

/**
 * Add Hook
 *
 * @description Adds a new hook to action reference
 *
 * @method addHook
 * @name addHook
 * @function
 *
 * @param  {String}   hookType The hook type
 * @param  {String}   action   The action
 * @param  {Function} callable The callback for action
 * @param  {String}   tag      The tag for hook
 *
 * @example
 * addHook( 'action', 'action_name', myCallback );
 * function myCallback( actionArguments ) {
 *     console.log( 'Callback Runs!' );
 * }
 */
HooksFunctions.addHook = function ( hookType, action, callable, tag ) {
    if ( undefined == hooks[ hookType ][ action ] ) {
        hooks[ hookType ][ action ] = [];
    }
    if ( undefined == tag ) {
        tag = action + '_' + hooks[ hookType ][ action ].length;
    }
    hooks[ hookType ][ action ].push( { 
        tag: tag, 
        callable: callable 
    } );
}

/**
 * Do Hook
 *
 * @description Do a hook at specified position from a action reference
 *
 * @method doHook
 * @name doHook
 * @function
 *
 * @param  {String}    hookType The hook type
 * @param  {String}    action   The action name
 * @param  {String}    value    The value to be filtered
 * @param  {Arguments} args     Arguments to pass to the hooks of action
 *
 * @return {Mixed}              Returns filtered data
 *
 * @example
 * var myValue;
 * myValue = doHook( 'action', 'action_name', null, 'Argument 1', 'Argument 2' ); // pass empty value because we don't want filter any value
 */
HooksFunctions.doHook = function ( hookType, action, value, args ) {
    var theArgsArray = Array.prototype.slice.call( arguments );
    var passArgs = [];
    if ( !Array.isArray( args ) ) {
        for ( var i = 0; i < theArgsArray.length; i++ ) {
            if ( i > 3 ) {
                passArgs.push( theArgsArray[ i ] );
            }
        }
    } else {
        passArgs = args;
    }
    if ( undefined != hooks[ hookType ][ action ] ) {
        var theHooks = hooks[ hookType ][ action ];
        for( var i = 0; i < theHooks.length; i++ ) {
            if ( 'action' == hookType ) {
                theHooks[ i ].callable.apply( this, passArgs );
            } else {
                passArgs.unshift( value );
                value = theHooks[ i ].callable.apply( this, passArgs );
            }
        }
    }
    if ( 'filter' == hookType ) {
        return value;
    }
}

/**
 * Remove Hook
 *
 * @description Removes a hook from a action reference
 *
 * @method removeHook
 * @name removeHook
 * @function
 *
 * @param  {String}    hookType The hook type
 * @param  {String}    action   The action name
 * @param  {String}    tag      The hook tag
 *
 * @example
 * removeHook( 'action', 'action_name', 'action_name_1' ); // removes first hook from action_name
 */
HooksFunctions.removeHook = function ( hookType, action, tag ) {
    if ( undefined != hooks[ hookType ][ action ] ) {
        var theHooks = hooks[ hookType ][ action ];
        for ( var i = theHooks.length - 1; i >= 0; i-- ) {
            if ( undefined == tag || tag == hooks[ hookType ][ action ].tag ) {
                theHooks.splice( i, 1 );
            }
        }
    }
}

/**
 * Add Action
 *
 * @description Adds a new hook to reference of action
 *
 * @method addAction
 * @name addAction
 * @function
 *
 * @param  {String}   action   The action name
 * @param  {Function} callable The callback
 * @param  {String}   tag      The hook tag
 *
 * @example
 * addAction( 'action_name', myCallback );
 * function myCallback( arg1, arg2 ) {
 *     console.log( arg1, arg2 );
 *     console.info( 'Callback Runs' );
 * }
 */
HooksFunctions.addAction = function ( action, callable, tag ) {
    this.addHook( 'action', action, callable, tag );
}

/**
 * Do Action
 *
 * @description Do a hook at specified position and time
 *
 * @method doAction
 * @name doAction
 * @function
 *
 * @param  {String}   action   The action name
 * @param  {Function} args     The Argument to pass to hook
 *
 * @example
 * doAction( 'action_name', 'Argument 1', 'Argument 2' );
 */
HooksFunctions.doAction = function ( action, args ) {
    var theArgsArray = Array.prototype.slice.call( arguments );
    var passArgs = [];
    if ( !Array.isArray( args ) ) {
        for ( var i = 0; i < theArgsArray.length; i++ ) {
            if ( i > 1 ) {
                passArgs.push( theArgsArray[ i ] );
            }
        }
    } else {
        passArgs = args;
    }
    this.doHook( 'action', action, null, passArgs );
}

/**
 * Remove Action
 *
 * @description Removes a hook from a action reference
 *
 * @method removeAction
 * @name removeAction
 * @function
 *
 * @param  {String}   action   The action name
 * @param  {String}   tag      The hook tag
 *
 * @example
 * removeAction( 'action_name', 'action_name_1' );
 */
HooksFunctions.removeAction = function ( action, tag ) {
    this.removeHook( 'action', action, tag ); 
}

/**
 * Add Filter
 *
 * @description Adds a new filter to a filter reference
 *
 * @method addFilter
 * @name addFilter
 * @function
 *
 * @param  {String}   action   The action name
 * @param  {Function} callable The callback
 * @param  {String}   tag      The hook tag
 *
 * @example
 * addFilter( 'action_name', myCallback );
 * function myCallback( arg1, arg2 ) {
 *     console.log( arg1, arg2 );
 *     console.info( 'Callback Runs' );
 * }
 */
HooksFunctions.addFilter = function ( action, callable, tag ) {
    this.addHook( 'filter', action, callable, tag );
}

/**
 * Apply Filters
 *
 * @description Applies filters to a specified value (variable) and returns the filtered value (variable)
 *
 * @method applyFilters
 * @name applyFilters
 * @function
 *
 * @param  {String}   action   The action name
 * @param  {Function} args     The Argument to pass to hook
 *
 * @example
 * applyFilters( 'action_name', 'Argument 1', 'Argument 2' );
 */
HooksFunctions.applyFilters = function ( action, value, args ) {
    var theArgsArray = Array.prototype.slice.call( arguments );
    var passArgs = [];
    if ( !Array.isArray( args ) ) {
        for ( var i = 0; i < theArgsArray.length; i++ ) {
            if ( i > 2 ) {
                passArgs.push( theArgsArray[ i ] );
            }
        }
    } else {
        passArgs = args;
    }
    return this.doHook( 'filter', action, value, passArgs );
}

/**
 * Remove Filter
 *
 * @description Removes a filter from a filter reference
 *
 * @method removeFilter
 * @name removeFilter
 * @function
 *
 * @param  {String}   action   The action name
 * @param  {String}   tag      The hook tag
 *
 * @example
 * removeFilter( 'action_name', 'action_name_1' );
 */
HooksFunctions.removeFilter = function ( action, tag ) {
    this.removeHook( 'filter', action, tag );
}

// Exporting
module.exports.HooksFunctions = HooksFunctions;
module.exports.hooks = hooks;