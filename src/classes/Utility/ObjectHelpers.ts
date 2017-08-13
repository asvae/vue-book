export default class ObjectHelpers {
  /**
   * Find nested branch with object that meets criteria.
   * Branch is returned in form of array, where index means depth.
   *
   * Example:
   *
   * const parent =
   * [
   *   {
   *     one: {name: 1},
   *     two: {name: 2},
   *   },
   *   {
   *     one: {name: 3},
   *     two: {name: 4},
   *   },
   * ]
   *
   * ObjectHelpers.traverseBranch(parent, {name: 4})
   * [
   *   parent,
   *   {one: {name: 3}, two: {name: 4}},
   *   {name: 4},
   * ]
   *
   * @param parent object|array
   * @param criteria object
   * @returns {*}
   */
  static traverseBranch (parent, criteria) {
    const result = ObjectHelpers.findNestedRecursive(parent, criteria)
    return result ? [parent, ...result] : []
  }

  /**
   * @protected
   * @param parent
   * @param criteria
   * @returns {*}
   */
  static findNestedRecursive (parent, criteria) {
    if (!(Array.isArray(parent) || typeof parent === 'object')) {
      return null
    }

    for (const index in parent) {
      const item = parent[index]

      if (item && typeof item === 'object' && ObjectHelpers.meetsCriteria(item, criteria)) {
        return [item]
      }
      const result = ObjectHelpers.findNestedRecursive(item, criteria)
      if (result) {
        return [item, ...result]
      }
    }
    return null
  }

  /**
   * Object meets criteria.
   *
   * @protected
   * @param object Object
   * @param criteria Object
   * @returns {boolean}
   */
  static meetsCriteria (object, criteria) {
    for (const index in criteria) {
      if (criteria[index] !== object[index]) {
        return false
      }
    }
    return true
  }
}