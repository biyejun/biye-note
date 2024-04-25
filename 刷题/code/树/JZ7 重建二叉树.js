function TreeNode(x) {
	this.val = x
	this.left = null
	this.right = null
}
/*
递归
前序遍历序列 {1,2,4,7,3,5,6,8}
中序遍历序列 {4,7,2,1,5,3,8,6}
*/
function reConstructBinaryTree(preOrder, inOrder) {
	if (preOrder.length === 0 || inOrder.length === 0) {
		return null
	}

	// 前序遍历的第一个节点是跟节点
	const rootVal = preOrder[0]
	const root = new TreeNode(rootVal)

	// 在中序遍历中找到根节点的索引
	const rootIndexInorder = inOrder.indexOf(rootVal)

	// 切割中序遍历数组，得到左、右子树的中序遍历结果
	const leftInorder = inOrder.slice(0, rootIndexInorder)
	const rightInorder = inOrder.slice(rootIndexInorder + 1)

	// 根据中序遍历左子树的长度 切割前序遍历数组 得到左右子树的前序遍历结果
	const leftPreorder = preOrder.slice(1, rootIndexInorder + 1)
	const rightPreorder = preOrder.slice(rootIndexInorder + 1)

	// 递归构建左、右子树
	root.left = reConstructBinaryTree(leftPreorder, leftInorder)
	root.right = reConstructBinaryTree(rightPreorder, rightInorder)

	return root
}
