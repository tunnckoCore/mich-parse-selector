/*!
 * mich-parse-selector <https://github.com/tunnckoCore/mich-parse-selector>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Copyright (c) Titus Wormer <tituswormer@gmail.com> (http://wooorm.com)
 * Released under the MIT license.
 */

/**
 * > Parse a simple CSS selector like `p.foo#hero.btn-large.btn` into
 * a [HAST](https://github.com/syntax-tree/hast) node, which is a specification
 * for the Html (or Hypertext) Abstract Syntax Tree.
 * If "tag name" is omitted it defaults to `div`.
 *
 * **Example**
 *
 * ```js
 * const parseSelector = require('mich-parse-selector')
 *
 * const divNode = parseSelector('.bar')
 * const node = parseSelector('p.foo#hero.btn-large.btn')
 *
 * console.log(divNode)
 * // => {
 * //  type: 'element',
 * //  tagName: 'div',
 * //  properties: { className: [ 'bar' ] },
 * //  children: []
 * // }
 *
 * console.log(node)
 * // => {
 * //  type: 'element',
 * //  tagName: 'p',
 * //  properties: { id: 'hero', className: [ 'foo', 'btn-large', 'btn' ] },
 * //  children: []
 * // }
 * ```
 *
 * @name   michParseSelector
 * @param  {String} `selector` a css selector
 * @return {Object} a [HAST](https://github.com/syntax-tree/hast)-compliant node object
 * @api public
 */

module.exports = function parse (selector) {
  var type
  var lastIndex

  var index = 0
  var className = []

  var node = {
    type: 'element',
    tagName: 'div',
    properties: {},
    children: []
  }

  selector = selector || ''

  while (index <= selector.length) {
    var ch = selector[index++]

    if (!ch || ch === '.' || ch === '#') {
      var value = selector.slice(lastIndex, index - 1)

      if (value) {
        if (type === '.') {
          className.push(value)
        } else if (type === '#') {
          node.properties.id = value
        } else {
          node.tagName = value
        }
      }

      lastIndex = index
      type = ch
    }
  }

  if (className.length) {
    node.properties.className = className
  }

  return node
}
