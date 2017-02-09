/*!
 * mich-parse-selector <https://github.com/tunnckoCore/mich-parse-selector>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

const test = require('mukla')
const michParseSelector = require('./index')

const expected = (obj) => Object.assign({
  type: 'element',
  tagName: 'div',
  properties: {},
  children: []
}, obj || {})

test('should return a div node without selector', (done) => {
  const node = michParseSelector()
  test.deepStrictEqual(node, expected())
  done()
})

test('should return an element with a tag name when given a tag name', (done) => {
  const node = michParseSelector('foo')
  test.deepStrictEqual(node, expected({
    tagName: 'foo'
  }))
  done()
})

test('should return a div with a class', (done) => {
  test.deepStrictEqual(michParseSelector('.quxie'), expected({
    tagName: 'div',
    properties: { className: ['quxie'] }
  }))
  done()
})

test('should return a section element with an id', (done) => {
  const section = michParseSelector('section#hero')
  test.deepStrictEqual(section, expected({
    tagName: 'section',
    properties: { id: 'hero' }
  }))
  done()
})

test('should support to define multiple classes', (done) => {
  const paragraph = michParseSelector('p.foo#header.btn-large.btn')
  test.deepStrictEqual(paragraph, expected({
    tagName: 'p',
    properties: {
      id: 'header',
      className: ['foo', 'btn-large', 'btn']
    }
  }))
  done()
})

test('should only respect last defined id', (done) => {
  const link = michParseSelector('a#bar#qux')
  test.deepStrictEqual(link, expected({
    tagName: 'a',
    properties: {
      id: 'qux'
    }
  }))
  done()
})
