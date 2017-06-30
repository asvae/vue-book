# vue-component-tree
Tree view for your demo components

### Install
```
npm install vue-component-tree
```

### Config
Usage example.
```
import Router from 'vue-router'
import VueComponentTree from 'vue-component-tree'

const router = new Router({
  routes: [
    VueComponentTree.create(require.context('./../tree', true, /.vue$/), '/demo'),
  ]
})
```


