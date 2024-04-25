function TreeNode(x) {
	this.val = x
	this.left = null
	this.right = null
}

/* 
层序遍历 （广度优先搜索）
*/
function TreeDepth(pRoot) {
	if (!pRoot) {
		return 0
	}
	let depth = 0 // 初始化深度为0
	let queue = [] // 用于层序遍历的队列
	queue.push(pRoot) // 将根节点入队

	while (queue.length > 0) {
		let levelSize = queue.length // 当前层的节点数

		// 遍历当前层的所有节点
		for (let i = 0; i < levelSize; i++) {
			// 出队一个节点
			let currentNode = queue.shift()

			// 将当前节点的子节点入队
			if (currentNode.left) {
				queue.push(currentNode.left)
			}

			if (currentNode.right) {
				queue.push(currentNode.right)
			}
		}

		// 处理完一层 深度+1
		depth++
	}

	return depth
}
