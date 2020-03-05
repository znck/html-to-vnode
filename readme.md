# HTML to VDOM

Convert HTML to VDOM tree.

## Example

```sh
node test.js
```

### Input

```html
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
```

### Output

```js
export function render() {
  return [
    h("h1", {}, ["Tasks"]),
    h("ul", {}, [
      h("li", {}, [
        h("input", {
          type: "checkbox",
          id: "task1"
        }, []),
        h("label", { for: "task1" }, ["Buy milk"])
      ]),
      h("li", {}, [
        h("input", {
          type: "checkbox",
          id: "task2"
        }, []),
        h("label", { for: "task2" }, ["Buy eggs"])
      ]),
      h("li", {}, [
        h("input", {
          type: "checkbox",
          id: "task2"
        }, []),
        h("label", { for: "task2" }, ["Make omelette"])
      ])
    ])
  ]
}
```
