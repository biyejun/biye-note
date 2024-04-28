function TreeNode(x) {
	this.val = x
	this.left = null
	this.right = null
}
/* 
使用数组存储遍历的节点
中序遍历收集节点到list
从头到尾 建立节点的链接关系

*/
function Convert(pRootOfTree) {
	if (pRootOfTree === null) {
		return null
	}

	const list = []
	// 中序遍历 收集节点
	inOrderTraversal(list, pRootOfTree)
	// 构建双向链表
	return buildFlattenedTree(list)
}

function inOrderTraversal(list, root) {
	if (root === null) {
		return
	}

	inOrderTraversal(list, root.left)
	list.push(root)
	inOrderTraversal(list, root.right)
}

function buildFlattenedTree(list) {
	if (list.length === 0) {
		return null
	}
	const head = list[0]
	let cur = head
	for (let i = 1; i < list.length; i++) {
		const node = list[i]
		node.left = cur
		cur.right = node
		cur = node
	}

	return head
}
