/* 
暴力解法
遍历所有的滑动窗口 比较窗口中的最大值 保存
*/
function maxInWindows(num, size) {
	const res = []
	if (num.length === 0 || size < 1 || num.length < size) {
		return res
	}

	for (let i = 0; i < num.length - size + 1; i++) {
		res.push(Math.max(...num.slice(i, i + size)))
	}

	return res
}
