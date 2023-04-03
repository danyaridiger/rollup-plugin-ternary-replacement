/**
 * @typedef {object} Plugins
 * @property {boolean} jsx - jsx syntax flag
 */

/**
 * @type {object}
 * @property {boolean} allowReserved - reserved keyword restriction flag
 * @property {boolean} allowImportExportEverywhere - esm operator restriction flag
 * @property {boolean} allowHashBang - hashbang comments restriction flag
 * @property {number} ecmaVersion - ECMAScript version
 * @property {string} sourceType - source program type
 * @property {Plugins} plugins - plugin options
 */
export default {
  allowReserved: true,
  allowImportExportEverywhere: true,
  allowHashBang: true,
  ecmaVersion: 13,
  sourceType: 'module',
  plugins: {
    jsx: true,
  },
};