/**
 *
 * @param {any[]} xs
 * @returns {any[][]}
 * @example pack([]) = []
 * @example pack(['a', 'a', 'a', 'a', 'b', 'c', 'c', 'a', 'a', 'd', 'e', 'e', 'e', 'e'])
 *                = [["a","a","a","a"],["b"],["c","c"],["a","a"],["d"],["e","e","e","e"]]
 * @example pack(["a", "b", "c", "d"]) = [["a"], ["b"], ["c"], ["d"]]
 */
function pack(xs) {
  if (xs.length === 0) return []
  if (xs.length === 1) return [xs]

  let [y, z, ...zs] = xs
  if (y !== z) return [[y], ...pack([z, ...zs])]

  let different = xs.find((v) => v !== z)
  if (different === undefined) return [xs]

  return [
    [...xs.slice(0, xs.indexOf(different))],
    ...pack(xs.slice(xs.indexOf(different), xs.length)),
  ]
}

/**
 *
 * @param {any[]} xs
 * @returns {any[][]}
 * @example encodeModified([]) = []
 * @example encodeModified(['a', 'a', 'a', 'a', 'b', 'c', 'c', 'a', 'a', 'd', 'e', 'e', 'e', 'e'])
 *                        = [[4, "a"], "b", [2, "c"], [2, "a"], "d", [4, "e]]
 * @example encodeModified(["a", "b", "c", "d"]) = ["a", "b", "c", "d"]
 */
function encodeModified(xs) {
  if (xs.length === 0) return []
  let yss = pack(xs)
  return yss.map((ys) => {
    if (ys.length === 1) return ys[0]
    return [ys.length, ys[0]]
  })
}

/**
 *
 * @param {any[][]} xss
 * @returns {any[]}
 * @example decodeModified([]) = []
 * @example decodeModified([[4, "a"], "b", [2, "c"], [2, "a"], "d", [4, "e"]])
 *                         = ['a', 'a', 'a', 'a', 'b', 'c', 'c', 'a', 'a', 'd', 'e', 'e', 'e', 'e']
 * @example decodeModified(["a", "b", "c", "d"]) = ["a", "b", "c", "d"]
 */
function decodeModified(xss) {
  if (xss.length === 0) return []
  let [ys, ...yss] = xss
  if (!Array.isArray(ys)) return [ys, ...decodeModified(yss)]
  else {
    let [n, e] = ys
    let ysUnpacked = Array(n).fill(e)
    return [...ysUnpacked, ...decodeModified(yss)]
  }
}

/**
 *
 * @param {any[]} xs
 * @returns {any[][]}
 * @example encodeDirect([]) = []
 * @example encodeModified(['a', 'a', 'a', 'a', 'b', 'c', 'c', 'a', 'a', 'd', 'e', 'e', 'e', 'e'])
 *                        = [[4, "a"], "b", [2, "c"], [2, "a"], "d", [4, "e]]
 * @example encodeModified(["a", "b", "c", "d"]) = ["a", "b", "c", "d"]
 */
function encodeDirect(xs) {
  if (xs.length === 0) return []
  if (xs.length === 1) return xs

  let [y, z, ...zs] = xs
  if (y !== z) return [y, ...encodeDirect([z, ...zs])]

  let [n, diff] = countWhile(xs, (x) => x === y)
  if (diff === undefined) return xs

  return [[n, y], ...encodeDirect(xs.slice(xs.indexOf(diff), xs.length))]
}

/**
 *
 * @param {any[]} xs
 * @returns {any[]}
 * @example duplicate([]) = []
 * @example duplicate([1,2,3]) = [1,1,2,2,3,3]
 * @example duplicate(["a", "b", "c", "c", "d"]) = ["a", "a", "b", "b", "c", "c", "c", "c", "d", "d"]
 */
function duplicate(xs) {
  if (xs.length === 0) return []
  let [y, ...ys] = xs
  return [y, y, ...duplicate(ys)]
}

function countWhile(xs, p, init = [0]) {
  if (xs.length === 0) return init
  if (!p(xs[0])) return [init[0], xs[0]]
  let [y, ...ys] = xs
  return countWhile(ys, p, [1 + init[0], init[1]])
}

function doUntil(f, p, init) {
  if (p(init)) return init
  return doUntil(f, p, f(init))
}

function takeWhile(xs, p) {
  if (xs.length === 0) []
  if (!p(xs[0])) return []
  let [y, ...ys] = xs
  return [y, ...takeWhile(ys, p)]
}

// const p = (x) => x < 10
// console.log(countWhile([2, 4, 6, 10], p))
// console.log(countWhile(["a", "a", "a", "b"], (x) => x === "a"))

console.log(duplicate([]))
console.log(duplicate([1, 2, 3]))
console.log(duplicate(["a", "b", "c", "c", "d"]))
