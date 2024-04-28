function TreeNode(x) {
	this.val = x
	this.left = null
	this.right = null
}

/* 
栈
层次遍历
*/
function PrintFromTopToBottom(root) {
	const result = []

	if (root === null) {
		return result
	}

	const stack = [] // 使用栈 模拟队列
	stack.push(root)

	while (stack.length) {
		const currentNode = stack.shift() // 队列 先入先出

		result.push(currentNode.val)

		if (currentNode.left) {
			stack.push(currentNode.left)
		}

		if (currentNode.right) {
			stack.push(currentNode.right)
		}
	}

	return result
}
