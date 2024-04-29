function TreeNode(x) {
	this.val = x
	this.left = null
	this.right = null
}

/* 
非递归，利用二叉搜索树的特点。左子树<根节点<右子树

若p,q都比当前结点的值小，说明最近公共祖先结点在当前结点的左子树上，继续检查左子树；
若p,q都比当前结点的值大，说明最近公共祖先结点在当前结点的右子树上，继续检查右子树；
若p,q中一个比当前结点的值大，另一个比当前结点的值小，则当前结点为最近公共祖先结点

https://blog.nowcoder.net/n/1ba95e56ca924db5aeb176bfbacf86ca?f=comment
*/
function lowestCommonAncestor(root, p, q) {
	let currentNode = root
	while (true) {
		if (p < currentNode.val && q < currentNode.val) {
			currentNode = currentNode.left
		} else if (p > currentNode.val && q > currentNode.val) {
			currentNode = currentNode.right
		} else {
			return currentNode.val
		}
	}
}
