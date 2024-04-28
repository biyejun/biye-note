function TreeNode(x) {
	this.val = x
	this.left = null
	this.right = null
}
/* 
递归
*/
function IsBalanced_Solution(root) {
	return depth(root) !== -1
}

function depth(root) {
	if (!root) return 0

	const left = depth(root.left)
	if (left === -1) return -1 // 如果发现子树不平衡，则返回-1

	const right = depth(root.right)
	if (right === -1) return -1 // 如果发现子树不平衡，则返回-1

	if (Math.abs(left - right) > 1) {
		return -1
	} else {
		return 1 + Math.max(left, right)
	}
}
