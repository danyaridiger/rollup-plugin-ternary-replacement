"use strict";

/**
 * Function that imitates module behavior for tests.
 * @function
 * @returns {number} - result
 */
const testFunction = () => {
  let testVariable1 = 100;
  let testVariable2 = 110;
  let testVariable3 = 120;
  let testVariable4 = 130;
  let testVariable5 = 140;
  let nullVariable = null;
  
  testVariable1 = nullVariable ?? testVariable2;
  testVariable2 &&= testVariable3;
  testVariable3 ||= testVariable4;
  testVariable4 ??= testVariable5;

  return testVariable1;
};

export default testFunction;
