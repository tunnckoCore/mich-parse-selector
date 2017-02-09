/*!
 * mich-parse-selector <https://github.com/tunnckoCore/mich-parse-selector>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (http://i.am.charlike.online)
 * Copyright (c) Titus Wormer <tituswormer@gmail.com> (http://wooorm.com)
 * Released under the MIT license.
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
