function* fn(arr) {
	for (let i = 0; i < arr.length; i++) {
		yield arr[i]
	}
}
let gg = fn([1, 2])
console.log(gg.next())
console.log(gg.next())
