function TreeNode(x) {
	this.val = x
	this.left = null
	this.right = null
}
/* 
层次遍历
*/
function Print(pRoot) {
	const result = []
	if (!pRoot) {
		return result
	}

	const queue = [pRoot] // 使用数组作为队列

	while (queue.length) {
		const currentLevel = []

		const levelSize = queue.length

		for (let i = 0; i < levelSize; i++) {
			const currentNode = queue.shift() // 出队

			currentLevel.push(currentNode.val)

			if (currentNode.left) {
				queue.push(currentNode.left)
			}
			if (currentNode.right) {
				queue.push(currentNode.right)
			}
		}
		result.push(currentLevel)
	}

	return result
}
