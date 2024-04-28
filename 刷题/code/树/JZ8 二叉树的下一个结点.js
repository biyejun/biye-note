function TreeNode(x) {
	this.val = x
	this.left = null
	this.right = null
	this.next = null
}

/* 
中序遍历
*/
function GetNext(pNode) {
	let root = pNode

	while (root.next) {
		root = root.next
	}

	const list = []
	inOrder(list, root)

	for (let i = 0; i < list.length; i++) {
		const curNode = list[i]
		if (curNode === pNode) {
			return list[i + 1]
		}
	}

	return null
}

function inOrder(list, root) {
	if (root === null) {
		return
	}
	inOrder(list, root.left)
	list.push(root)
	inOrder(list, root.right)
}
