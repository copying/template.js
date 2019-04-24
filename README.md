# template.js
Simple HTML template engine

## How to & features
```js
const greatings = template('Hello, {}!')

greatings('John')
// < "Hello, John!"
greatings('world')
// < "Hello, world!"
```

Can also use objects and its properties

```js
const render = template('a: {a}, b.x: {b.x}')
render({
  a: 'simple',
  b: {
    x: 'nested'
  }
})
// < "a: simple, b.x: nested"
```

By default outputs HTML

```js
const escaped = template('&: {}')

escaped('&')
// < "&: &amp;"
```

## Docs
`template(templateStr, detectRegex, toEscapedString)`
 - `templateStr`: string with the template to be templated.
 - `detectRegex`: regtex that finds the arguments to inject. By default is `/\{\s*([\S\s]*?)\s*\}/g` (matching the part inside `{}`).
 - `toEscapedString`: functions that takes the referenced object and returns the already scaped string.
