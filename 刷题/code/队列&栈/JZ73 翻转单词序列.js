/* 
使用栈
*/
function ReverseSentence(str) {
	const result = []

	let stack = str.split(' ')

	while (stack.length) {
		result.push(stack.pop())
	}

	return result.join(' ')
}
