"use strict";

/**
 * Function that imitates module behavior for tests.
 * Can be excluded from conversion using "exclude" option.
 * @function
 * @returns {number} - result
 */
const testFunction = () => {
  let testVariable1 = 100;
  let testVariable2 = 110;
  
  testVariable1 = testVariable1 ?? testVariable2;

  return testVariable1;
};

export default testFunction;
