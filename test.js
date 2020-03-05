const { compile } = require('./compiler')
const { highlight } = require('cli-highlight')

console.log(
  highlight(
    compile(
      `
<h1>Tasks</h1>

<ul>
  <li>
    <input type="checkbox" id="task1" />
    <label for="task1">Buy milk</label>
  </li>
  <li>
    <input type="checkbox" id="task2" />
    <label for="task2">Buy eggs</label>
  </li>
  <li>
    <input type="checkbox" id="task2" />
    <label for="task2">Make omelette</label>
  </li>
</ul>
    `
    ),
    { language: 'js' }
  )
)
