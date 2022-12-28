// @ts-check
import { pack } from "./lists.mjs"

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

/**
 *
 * @param {any[]} xs
 * @returns {any[]}
 * @example replicate([]) = []
 * @example replicate([1,2,3], 0) = []
 * @example replicate(["a", "b", "c"], 1) =  ["a", "b", "c"]
 * @example replicate([1,2,3], 3) = [1,1,1,2,2,2,3,3,3]
 */
function replicate(xs, n) {
  if (xs.length === 0 || n === 0) return []
  let [y, ...ys] = xs
  return [...fill(y, n), ...replicate(ys, n)]
}

/**
 *
 * @param {any[]} xs
 * @param {Number} n
 * @returns {any[]}
 * @example dropNth([], 1) = []
 * @example dropNth([1], 0) = [1]
 * @example dropNth(["a", "b", "c"], 1) = []
 * @example dropNth(["a", "b", "c", "d"], 2) = ["a", "c"]
 * @example dropNth(["a","b","c","d","e","f","g","h","i","k"], 3) = ["a","b","d","e","g","h","k"]
 */
function dropNth(xs, n) {
  if (xs.length === 0 || n === 1) return []
  if (n === 0) return xs
  let [headList, [_, ...tailList]] = split(xs, n - 1)
  return [...headList, ...dropNth(tailList, n)]
}

/**
 *
 * @param {any[]} xs
 * @param {Number} n
 * @returns {any[][]}
 * @example split([], 1)) = []
 * @example split(["a", "b", "c"], 1)) = [["a"], ["b","c"]]
 * @example split(["a", "b", "c"], 0)) = [[],["a","b","c"]]
 * @example split(["a", "b", "c"], 2)) = [["a","b"],["c"]]
 * @example split(["a","b","c","d","e","f","g","h","i","k"], 3) = [["a","b","c"],["d","e","f","g","h","i","k"]]
 */
function split(xs, n) {
  if (xs.length === 0) return []
  return [take(xs, n), drop(xs, n)]
}

/**
 *
 * @param {any[]} xs
 * @param {Number} start
 * @param {Number} end
 * @returns {any[]}
 * @example slice([], 1, 2) = []
 * @example slice(["a", "b", "c"], 1,1) = []
 * @example slice(["a", "b", "c"], 2,1) = []
 * @example slice(["a", "b", "c"], 0,1) = ["a"]
 * @example slice(['a','b','c','d','e','f','g','h','i','k'], 2, 7) = ['c','d','e','f','g']
 */
function slice(xs, start, end) {
  if (xs.length === 0 || start >= end) return []
  let [y, ...ys] = xs
  if (start > 0) return slice(ys, start - 1, end - 1)
  return [y, ...slice(ys, start, end - 1)]
}

function take(xs, n) {
  if (xs.length === 0 || n === 0) return []
  let [y, ...ys] = xs
  return [y, ...take(ys, n - 1)]
}

function drop(xs, n) {
  if (xs.length === 0) return []
  if (n === 0) return xs
  let [_, ...ys] = xs
  return drop(ys, n - 1)
}

function countWhile(xs, p, init = [0]) {
  if (xs.length === 0) return init
  if (!p(xs[0])) return [init[0], xs[0]]
  let [y, ...ys] = xs
  return countWhile(ys, p, [1 + init[0], init[1]])
}

function fill(x, n) {
  if (n === 0) return []
  return [x, ...fill(x, n - 1)]
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
