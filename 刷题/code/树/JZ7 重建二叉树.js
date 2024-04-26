function TreeNode(x) {
	this.val = x
	this.left = null
	this.right = null
}
/*
栈
前序遍历序列 {1,2,4,7,3,5,6,8}
中序遍历序列 {4,7,2,1,5,3,8,6}

二叉树的前序遍历：根左右；中序遍历：左根右
借助栈来解决问题需要关注一个问题，就是前序遍历挨着的两个值比如m和n，它们会有下面两种情况之一的关系。
1、n是m左子树节点的值。
2、n是m右子树节点的值或者是m某个祖先节点的右节点的值。
对于第一种情况很容易理解，如果m的左子树不为空，那么n就是m左子树节点的值。
对于第二种情况，如果一个结点没有左子树只有右子树，那么n就是m右子树节点的值，
如果一个结点既没有左子树也没有右子树，那么n就是m某个祖先节点的右节点，只要找到这个祖先节点就可以
*/
function reConstructBinaryTree(preOrder, inOrder) {
	if (preOrder.length === 0 || inOrder.length === 0) {
		return null
	}

	let stack = []
	// 前序遍历的第一个节点是跟节点
	let root = new TreeNode(preOrder[0])
	let currentNode = root

	for (let i = 1, j = 0; i < preOrder.length; i++) {
		// 第一种情况
		if (currentNode.val !== inOrder[j]) {
			currentNode.left = new TreeNode(preOrder[i])
			stack.push(currentNode)
			currentNode = currentNode.left
		} else {
			// 第二种情况
			j++
			// 找到合适的currentNode 确定它的右节点
			while (stack.length > 0 && stack[stack.length - 1].val === inOrder[j]) {
				currentNode = stack.pop()
				j++
			}
			// 给currentNode添加右节点
			currentNode.right = new TreeNode(preOrder[i])
			currentNode = currentNode.right
		}
	}

	return root
}
