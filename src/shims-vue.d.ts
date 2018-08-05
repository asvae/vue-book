declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

// Hacky globals (should be fixed on library mantainer side)
declare module '@fortawesome/*'
