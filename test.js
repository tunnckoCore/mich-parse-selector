/*!
 * mich-parse-selector <https://github.com/tunnckoCore/mich-parse-selector>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (http://i.am.charlike.online)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

const test = require('mukla')
const michParseSelector = require('./index')

test('mich-parse-selector', (done) => {
  michParseSelector()
  done()
})
