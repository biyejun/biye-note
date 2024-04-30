/* 
双端队列
*/
function maxInWindows(num, size) {
	const ret = []

	if (num.length === 0 || size < 1 || num.length < size) return ret

	const dq = [] // 使用数组来模拟双端队列

	for (let i = 0; i < num.length; i++) {
		// 移除队列尾部所有小于当前元素的索引
		while (dq.length > 0 && num[dq[dq.length - 1]] < num[i]) {
			dq.pop()
		}

		dq.push(i) // 将当前索引加入队列尾部

		// 判断队列的头部索引是否过期
		if (dq[0] + size <= i) {
			dq.shift() // 移除队列头部过期的索引
		}

		// 判断是否形成了窗口
		if (i + 1 >= size) {
			ret.push(num[dq[0]]) // 将当前窗口的最大值加入结果数组
		}
	}

	return ret
}

const arr = [2, 3, 4, 2, 6, 2, 5, 1]
const res = maxInWindows(arr, 3)
console.log(res)
