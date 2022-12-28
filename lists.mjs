// @ts-check
/**
 *
 * @param {any[]} xs
 * @returns {any} last element of xs
 * @example last([])        = null
 * @example last([1])       = 1
 * @example last([1, 2, 3]) = 3
 */
function last(xs) {
  if (xs.length === 0) return null
  let [y, ...ys] = xs
  if (ys.length === 0) return y
  return last(ys)
}

/**
 *
 * @param {any[]} xs
 * @returns {any} second last element of xs
 * @example seconsLast([])        = null
 * @example seconsLast([1])       = null
 * @example seconsLast([1, 2, 3]) = 2
 */
function secondLast(xs) {
  if (xs.length === 0) return null
  if (xs.length === 1) return null
  let [y, z, ...ys] = xs
  if (ys.length === 0) return y
  return secondLast([z, ...ys])
}

/**
 *
 * @param {any[]} xs
 * @returns {any} element at kth position in xs
 * @example kthElement([], 1)        = null
 * @example kthElement([1], 1)       = 1
 * @example kthElement([1, 2, 3], 2) = 2
 */
function kthElement(xs, k) {
  if (xs.length === 0 || k === 0) return null
  if (k === 1) return xs[0]
  let [_, ...ys] = xs
  return kthElement(ys, k - 1)
}

/**
 *
 * @param {Number[]} xs
 * @returns {Number} the length of xs
 * @example len([1]) = 1
 * @example len([1,2]) = 2
 * @example len([]) = 0
 */
function len(xs) {
  if (xs.length === 0) return 0
  let [_, ...ys] = xs
  return 1 + len(ys)
}

/**
 *
 * @param {any[]} xs
 * @returns {any[]} elements of xs in reverse order
 * @example rev([1]) = [1]
 * @example rev([1,2]) = [2,1]
 * @example rev([]) = []
 */
function rev(xs) {
  function aux(ys, acc) {
    if (ys.length === 0) return acc
    let [z, ...zs] = ys
    return aux(zs, [z, ...acc])
  }
  return aux(xs, [])
}

/**
 *
 * @param {any[]} xs
 * @returns {Boolean}
 * @example isPalindrome([1,2,3]) = false
 * @example isPalindrome([1,2,4,8,16,8,4,2,1]) = true
 * @example isPalindrome([1, 2, 2, 1]) = true
 * @example isPalindrome(["m", "a", "d", "a", "m", "i", "m", "a", "d", "a", "m"]) = true
 */
function isPalindrome(xs) {
  function isOdd(n) {
    return n % 2 !== 0
  }
  function arraysEqual(xs, ys) {
    return xs.every((e, i) => e === ys[i])
  }

  const LIST_LENGTH = len(xs)
  const FIRST_HALF_START = 0
  const FIRST_HALF_END = LIST_LENGTH / 2
  const SECOND_HALF_START = isOdd(LIST_LENGTH)
    ? LIST_LENGTH / 2 + 1
    : LIST_LENGTH / 2
  const SECOND_HALF_END = LIST_LENGTH

  return arraysEqual(
    xs.slice(FIRST_HALF_START, FIRST_HALF_END),
    rev(xs.slice(SECOND_HALF_START, SECOND_HALF_END))
  )
}

/**
 *
 * @param {any[]} xs possibly contains nested arrays
 * @returns {any[]} all elements of xs and its sub-arrays
 * @example flatten ([]) = []
 * @example flatten([1,2,3]) = [1,2,3]
 * @example flatten([1,[2,3]]) = [1,2,3]
 * @example flatten([1,[2,[3]]]) = [1,2,3]
 * @example flatten([[1], [2, [3]]]) = [1,2,3]
 */
function flatten(xs) {
  if (xs.length === 0) return []
  let [y, ...ys] = xs
  if (Array.isArray(y)) return [...flatten(y), ...flatten(ys)]
  return [y, ...flatten(ys)]
}

/**
 *
 * @param {any[]} xs possibly contains consecutive duplicates
 * @returns {any[]} elements of xs with all consecutive duplicates of an element replaced by one copy
 * @example compress([]) = []
 * @example compress(["a","a","a","a","b","c","c","a","a","d","e","e","e","e"]) = ["a", "b", "c", "a", "d", "e"]
 * @example compress(["a", "b", "c", "a", "d", "e"]) = ["a", "b", "c", "a", "d", "e"]
 */
function compress(xs) {
  if (xs.length === 0) return []
  if (xs.length === 1) return xs
  let [y, z, ...zs] = xs
  if (y === z) return compress([z, ...zs])
  return [y, ...compress([z, ...zs])]
}

/**
 *
 * @param {any[]} xs
 * @returns {any[][]}
 * @example pack([]) = []
 * @example pack(['a', 'a', 'a', 'a', 'b', 'c', 'c', 'a', 'a', 'd', 'e', 'e', 'e', 'e'])
 *                = [["a","a","a","a"],["b"],["c","c"],["a","a"],["d"],["e","e","e","e"]]
 * @example pack(["a", "b", "c", "d"]) = [["a"], ["b"], ["c"], ["d"]]
 */
export function pack(xs) {
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
 * @example encode([]) = []
 * @example encode(['a', 'a', 'a', 'a', 'b', 'c', 'c', 'a', 'a', 'd', 'e', 'e', 'e', 'e']) = [[4, "a"], [1, "b"], [2, "c"], [2, "a"], [1, "d"], [4, "e]]
 * @example encode(["a", "b", "c", "d"]) = [[1, "a"], [1, "b"], [1, "c"], [1, "d"]]
 */
function encode(xs) {
  if (xs.length === 0) return []
  let yss = pack(xs)
  return yss.map((ys) => [ys.length, ys[0]])
}
