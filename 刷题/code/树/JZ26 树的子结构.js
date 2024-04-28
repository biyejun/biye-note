function TreeNode(x) {
	this.val = x
	this.left = null
	this.right = null
}

/* 传入两颗根节点相同的树，判断两棵树是否一样 */
function isTree1HasTree2(tree1, tree2) {
	if (tree2 === null) {
		return true
	}

	if (tree1 === null) {
		return false
	}

	if (tree1.val !== tree2.val) {
		return false
	}

	return isTree1HasTree2(tree1.left, tree2.left) && isTree1HasTree2(tree1.right, tree2.right)
}

/* 
递归遍历

遍历大树，找到和小树跟节点值相等的节点，然后调用 isTree1HasTree2 方法 判断两棵树是否一样
*/
function HasSubtree(pRoot1, pRoot2) {
	if (pRoot1 === null || pRoot2 === null) {
		return false
	}

	return isTree1HasTree2(pRoot1, pRoot2) || HasSubtree(pRoot1.left, pRoot2) || HasSubtree(pRoot1.right, pRoot2)
}
