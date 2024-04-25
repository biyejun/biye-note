function RandomListNode(x) {
	this.label = x
	this.next = null
	this.random = null
}

/* 
通过一个哈希表（或称为字典、映射）来实现，用于存储原始节点到新节点的映射关系。
*/
function Clone(pHead) {
	if (!pHead) {
		return null
	}

	// 第一步：复制每个节点并建立映射关系
	let nodeMapping = new Map() // 使用Map来存储原始节点和复制节点的映射关系
	let currentNode = pHead
	while (currentNode) {
		let cloneNode = new RandomListNode(currentNode.label) // 创建新节点
		nodeMapping.set(currentNode, cloneNode) // 存储映射关系

		currentNode = currentNode.next
	}

	// 第二步：设置复制节点的next和random指针
	currentNode = pHead
	while (currentNode) {
		let cloneNode = nodeMapping.get(currentNode) // 获取对应的复制节点
		cloneNode.next = nodeMapping.get(currentNode.next) || null // 设置next指针
		cloneNode.random = nodeMapping.get(currentNode.random) || null // 设置random指针
		currentNode = currentNode.next
	}

	return nodeMapping.get(pHead)
}
