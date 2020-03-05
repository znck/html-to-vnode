const {
  baseParse: parse,
  transform,
  generate,
  createCallExpression,
  createArrayExpression,
  createObjectExpression,
  createObjectProperty,
  createSimpleExpression,
} = require('@vue/compiler-core')

module.exports = { compile }

/**
 * @param {string} source
 */
function compile(source) {
  const ast = parse(source)

  transform(ast, {
    hoistStatic: false,
    isBuiltInComponent() {
      return false
    },
    cacheHandlers: false,
    ssr: false,
    nodeTransforms: [transformElement],
  })

  // override root codegenNode
  ast.codegenNode =
    ast.children.length === 1
      ? ast.children[0]
      : createArrayExpression(ast.children)

  // clear out helpers as we are not using any
  ast.helpers = []

  return generate(ast, { mode: 'module', sourceMap: false })
    .code.trim()
    .replace(
      /^export function render\(_ctx, _cache\)/,
      'export function render()'
    )
}

/**
 *
 * @param {import('@vue/compiler-core').ElementNode} node
 * @param {import('@vue/compiler-core').TransformContext} context
 */
function transformElement(node, context) {
  if (node.type !== 1) return // Not an element, return.

  return () => {
    const props = createObjectExpression(
      node.props.map(prop =>
        createObjectProperty(
          prop.name,
          prop.value ? createSimpleExpression(prop.value.content, true) : 'true'
        )
      )
    )

    node.codegenNode = createCallExpression('h', [
      createSimpleExpression(node.tag, true),
      props,
      createArrayExpression(node.children),
    ])
  }
}
