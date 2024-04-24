/* 
栈
*/
function printListFromTailToHead(head) {
	const stack = []
	let currentNode = head

	// 遍历链表，将所有节点的值压入栈中
	while (currentNode !== null) {
		stack.push(currentNode.val)
		currentNode = currentNode.next
	}

	const result = []

	// 将栈中的值依次弹出并添加到结果数组中
	while (stack.length > 0) {
		result.push(stack.pop())
	}

	return result
}
