function TreeNode(x) {
	this.val = x
	this.left = null
	this.right = null
}

function dfs(root, o1, o2) {
	if (!root || root.val === o1 || root.val === o2) {
		return root
	}

	let left = dfs(root.left, o1, o2)
	let right = dfs(root.right, o1, o2)

	//如果left为空，说明这两个节点在root结点的右子树上，我们只需要返回右子树查找的结果即可
	if (!left) {
		return right
	}
	// 同上
	if (!right) {
		return left
	}

	//如果left和right都不为空，说明这两个节点一个在root的左子树上一个在root的右子树上，
	//我们只需要返回cur结点即可。
	return root
}

/* 
递归

https://blog.nowcoder.net/n/43706e8eb6c6486183d5016b9eb78dc9?f=comment
*/
function lowestCommonAncestor(root, o1, o2) {
	return dfs(root, o1, o2).val
}
