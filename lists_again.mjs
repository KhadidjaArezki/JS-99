/**
 *
 * @param {any[]} xs
 * @param {Number} i
 * @returns {any[]}
 * @example insertAt("a", [], 0)           = ["a"]
 * @example insertAt("a", [], 1)           = ["a"]
 * @example insertAt("a",["b","c"], 0)     = ["a", "b", "c"]
 * @example insertAt("b",["a","c"], 1)     = ["a", "b", "c"]
 * @example insertAt("c", ["a","b"], 2)    = ["a", "b", "c"]
 * @example insertAt("c", ["a","b"], 4)    = ["a", "b", "c"]
 * @example insertAt("c", ["a","b"], (-1)) = ["a", "b", "c"]
 * @example insertAt("b", ["a","c"], (-2)) = ["a", "b", "c"]
 * @example insertAt("a", ["b","c"], -4)   = ["a", "b", "c"]
 */
function insertAt(e, xs, i) {
  if (i === 0) return [e, ...xs]
  if (i === -1) return xs.concat(e)

  if (i > 0) {
    let [y, ...ys] = xs
    if (y === undefined) {
      return insertAt(e, ys, i - 1)
    }
    return [y, ...insertAt(e, ys, i - 1)]
  }

  let ys = xs.slice(0, xs.length - 1)
  let y = xs[xs.length - 1]
  if (y === undefined) return insertAt(e, ys, i + 1)
  return [...insertAt(e, ys, i + 1), y]
}

/**
 *
 * @param {Number} start
 * @param {Number} end
 * @returns {Number[]}
 * @example range(4, 3) = []
 * @example range(4, 4) = [4]
 * @example range(1, 3) = [1,2,3]
 * @example range(4, 9) = [4,5,6,7,8,9]
 */
function range(start, end) {
  if (end < start) return []
  if (end === start) return [end]
  return [start, ...range(start + 1, end)]
}
