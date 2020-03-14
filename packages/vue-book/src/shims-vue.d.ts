declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

// Hacky globals (should be fixed on library maintainer side)
declare module '@fortawesome/*'
declare module 'vue-book'
declare module 'vuestic-ui/*'
