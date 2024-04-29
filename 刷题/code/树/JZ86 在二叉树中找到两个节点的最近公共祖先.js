function TreeNode(x) {
	this.val = x
	this.left = null
	this.right = null
}

/* 
层次遍历
*/
function lowestCommonAncestor(root, o1, o2) {
	// 使用一个对象来模拟HashMap记录每个节点的父节点
	const parent = {}
	const queue = []

	// 根节点没有父节点 给一个特殊测值
	parent[root.val] = null
	queue.push(root)

	// 层次遍历树 记录每个父节点 直到找到 o1和o2
	while (queue.length > 0 && !(parent.hasOwnProperty(o1) && parent.hasOwnProperty(o2))) {
		const currentNode = queue.shift()

		if (currentNode.left) {
			parent[currentNode.left.val] = currentNode.val
			queue.push(currentNode.left)
		}

		if (currentNode.right) {
			parent[currentNode.right.val] = currentNode.val
			queue.push(currentNode.right)
		}
	}

	// 如果没有找到o1 o2，则返回null
	if (!(parent.hasOwnProperty(o1) && parent.hasOwnProperty(o2))) {
		return null
	}

	// 使用一个集合来记录o1及其所有祖先节点
	const ancestors = new Set()
	let currentNodeVal = o1
	while (currentNodeVal !== null) {
		ancestors.add(currentNodeVal)
		currentNodeVal = parent[currentNodeVal]
	}

	currentNodeVal = o2
	while (!ancestors.has(currentNodeVal)) {
		currentNodeVal = parent[currentNodeVal]
	}

	return currentNodeVal
}
