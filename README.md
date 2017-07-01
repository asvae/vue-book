# vue-component-tree
Tree view for your demo components

![Interface](docs/main.gif)

## Features
* Display your components as a tree.
* Preview components on the page.
* Routing support.
* Colored statuses.

## The gist

I'll talk a bit about demo based workflow I employ in my projects.

Before doing any work on component I create a demo. Demo allows me to define an interface, like this:
```html
<vm-new-component v-model="dataItem" :some-prop="prop"/>
```
Only then I start to work on component.

You can think of demo as of semi-manual unit tests. But why not use actual unit tests, you'll ask. Let me explain.
* Demos are cheap. And you don't have to be a senior unit tester to create them.
* Demos are visual. In many cases you can *see* if something goes wrong. Unit tests also won't show you styling mistakes.
* Demos are developer friendly. You can instantly find usage examples or just glance over existing components. Which is crucial for teamwork.

Of course, this doesn't mean you have to dump unit tests. Leave them for appropriate tasks. Like logic heavy classes.

So, back to the library. It was created with intent of simplifying demo workflow as much as possible. Just toss your demos in folder and enjoy tree generation.

## Install
```
npm install vue-component-tree
```

## Config

Attach VueComponentTree to your router. And yes [vue-router](https://github.com/vuejs/vue-router) is required.
```
import Router from 'vue-router'
import VueComponentTree from 'vue-component-tree'

const router = new Router({
  routes: [
    VueComponentTree.create(require.context('./../tree', true, /.vue$/), '/demo'),
  ]
})
```

### Component status
Inside of your demo components you can set statuses, which'll colorize filenames on the tree in accordance.

```javascript
{
  status: 'wip',
  data () {
     // ...
  }
}
```

Supported statuses are:
 * 'wip' - yellow
 * 'hold' - purple
 * 'stable' - green
 * 'unstable' - red
 
You can add your own. They're just css classes. 

## Licence
MIT


