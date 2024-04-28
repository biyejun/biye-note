function TreeNode(x) {
	this.val = x
	this.left = null
	this.right = null
}

/* 
递归
先序遍历 根左右

*/
function Mirror(pRoot) {
	if (!pRoot) {
		return null
	}
	const leftNode = pRoot.left
	pRoot.left = pRoot.right
	pRoot.right = leftNode
	
	Mirror(pRoot.left)
	Mirror(pRoot.right)
	return pRoot
}
