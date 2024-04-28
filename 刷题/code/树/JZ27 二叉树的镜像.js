function TreeNode(x) {
	this.val = x
	this.left = null
	this.right = null
}

/* 
使用栈
层次遍历 遍历所有节点 交换
*/
function Mirror(pRoot) {
	if (pRoot === null) {
		return null
	}

	const stack = []
	stack.push(pRoot)

	while (stack.length) {
		const currentNode = stack.pop()

		// 交换左右两个节点
		const leftNode = currentNode.left
		currentNode.left = currentNode.right
		currentNode.right = leftNode

		if (currentNode.left) {
			stack.push(currentNode.left)
		}
		if (currentNode.right) {
			stack.push(currentNode.right)
		}
	}

	return pRoot
}
