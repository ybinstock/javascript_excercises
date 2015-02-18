function objectEquals( x, y ) {
  if ( x === y ) return true;
    // if both x and y are null or undefined and exactly the same

  if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) return false;
    // if they are not strictly equal, they both need to be Objects

  if ( x.constructor !== y.constructor ) return false;
    // they must have the exact same prototype chain, the closest we can do is
    // test there constructor.

  for ( var p in x ) {
    if ( ! x.hasOwnProperty( p ) ) continue;
      // other properties were tested using x.constructor === y.constructor

    if ( ! y.hasOwnProperty( p ) ) return false;
      // allows to compare x[ p ] and y[ p ] when set to undefined

    if ( x[ p ] === y[ p ] ) continue;
      // if they have the same strict value or identity then they are equal

    if ( typeof( x[ p ] ) !== "object" ) return false;
      // Numbers, Strings, Functions, Booleans must be strictly equal

   if ( ! objectEquals( x[ p ],  y[ p ] ) ) return false;

      // Objects and Arrays must be tested recursively
  }

  for ( p in y ) {
    if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) return false;
      // allows x[ p ] to be set to undefined
  }
  return true;
}

var dedup = function (array) {
    var valuesSoFar = [];
    for (var i = 0; i < array.length; ++i) {
        var value = array[i];

        if(!(value instanceof Object)) {

            if (valuesSoFar.indexOf(value) == -1) {
                     valuesSoFar.push(value);
            }
        } else {

          var dup = false;
          for(var j = i-1; j >= 0; j--) {

            if(objectEquals(value, array[j])) {
                //console.log(value);
                dup = true;
            }

          }
          if(!dup)
            valuesSoFar.push(value);
        }
    }
    return valuesSoFar;
};

console.log(dedup([1, 2, 2, 5, 2, 7, 3, 9, 1, 9]));
console.log(dedup([1, '1', 2, 0, false, true]));
console.log(dedup([8, 3, [1, 2], [1, 2, 3], [1, 2], true]));
console.log(dedup([1, {a: 'b', c: 'd'}, {c: 'd', a: 'b'}, {e: 'f'}, 'b']));
