/*
For a given list of integers, 
return the index of the element where the sums of the 
integers to the left and right of the current element are equal.

Example:
  ints = [4, 1, 7, 9, 3, 9]
  Since 4 + 1 + 7 = 12 and 3 + 9 = 12,
  the returned index would be 3

  ints = [1, 0, -1]
  Returns None/nil/undefined/etc (depending on the language) 
  as there are no indices where the left and right sums are equal

Here are the two important rules:
  The element at the index to be returned is 
  not included in either of the sum calculations!
  Both the first and last index cannot be considered 
  as a "midpoint" (So None for [X] and [X, X])
*/


// Solution

const midpointSum = function(n) {
  if (n.length < 3) {return null}
  for (let i = 1; i < n.length - 1; i++) {
    let left = n.slice(0, i).reduce((x, y) => x + y);
    let right = n.slice(i + 1).reduce((x, y) => x + y);
    if (left === right) {
      return i;
    }
  }
};

// or

function midpointSum(arr) {
  let n = arr.length
  
  // No midpoint
  if (n < 3) return void 0

  let sum = 0
  let mid = arr[0]
  
  // Compute sum only once
  for (let i = 0; i < n; i++) {
    sum += arr[i]
  }
  
  // Compute sums of left and right parts
  for (let i = 1; i < n - 1; i++) {
    let cur = arr[i]
    if (mid === sum - mid - cur) return i
    mid += arr[i]
  }
  
  return void 0
}

// or

const midpointSum = list => {
  let n = list.length;
  
  if ( n < 3 ) return;
  if ( n === 3 && list[0] !== list[2] ) return;
  
  let median = n >> 1;
  // sum of bunch elements calculates only initially
  let left = list.slice(0, median).reduce((a, b) => a + b);
  let right = list.slice(median + 1).reduce((a, b) => a + b);
  /**
   * It's the key for this optimization.
   * When we define that one side is less than other we traverse by one to the largest direction
   * to gain a "ballance" or equality of both sides. If the next step forces us to move opposite, 
   * it means that we stuck and ballance/equality is unreachable.
   */
  let direction;
  
  while ( median > 0 ) {
    if ( left === right ) return median;
    
    if ( left < right ) {
      if ( direction === -1 ) return;
      direction = 1;
      left += list[median++];
      right -= list[median];
    } else {
      if ( direction === 1 ) return;
      direction = -1;
      left -= list[median--];
      right += list[median];
    }
  }
};