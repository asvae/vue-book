In demo component you can use `beforeRouteUpdate` hook to wipe state before transition to another component.
For state set-up you can use `created` or `mounted`.

Other hooks are not available because demo components are not registered as routes in vue-router, part of url is parsed instead.
