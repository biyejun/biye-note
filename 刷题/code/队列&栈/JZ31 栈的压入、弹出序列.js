// [1,2,3,4,5],[4,5,3,2,1] true
// [1,2,3,4,5],[4,3,5,1,2] false

/* 
使用辅助栈
*/
function IsPopOrder(pushV, popV) {
	const len = pushV.length
	const stack = [] // 辅助栈

	let j = 0 // 入栈数组下标

	for (let i = 0; i < len; i++) {
		// 入栈
		while (j < len && (stack.length === 0 || stack[stack.length - 1] !== popV[i])) {
			stack.push(pushV[j])
			j++
		}

		// 
		if (stack[stack.length - 1] === popV[i]) {
			stack.pop()
		} else {
			return false
		}
	}

	return true
}
