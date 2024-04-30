/* 
位数减法

小于10的数字一位数，1～9，共9个数字，9位；
小于100的数字两位数，10～99，共90个数字，180位；
小于1000的数字三位数，100～999，共900个数字，2700位；

我们可以用这样的方式，不断减去减去前面位数较少的数字的那些位，锁定第n位所在的区间，
即第n位是几位数。这个区间的起点值加上剩余部分除以这个区间的位数就可以定位n在哪个数字上，
再通过n对位数取模可以定位是哪一位。（下标从0开始，需要对n减1）
*/

//  0123456789101112131415...
function findNthDigit(n) {
	let digit = 1 // 记录n是几位数
	let start = 1 // 记录当前位数区间的起始数字：1, 10, 100...
	let sum = 9 // 记录当前区间之前总共有多少位数字

	// 将n定位在某个位数的区间中
	while (n > sum) {
		n -= sum
		start *= 10
		digit++
		sum = 9 * start * digit // 该区间的总共位数
	}

	// 定位n在哪个数字上
	let num = start + Math.floor((n - 1) / digit)
	num = num.toString() // 转换为字符串以便索引

	// 定位n在数字的哪一位上
	let index = (n - 1) % digit

	// 返回该位的数字
	return parseInt(num[index])
}

const res = findNthDigit(10)
console.log(res)
