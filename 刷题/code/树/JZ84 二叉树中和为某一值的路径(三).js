function TreeNode(x) {
	this.val = x
	this.left = null
	this.right = null
}

/* 使用一个对象来封装结果，以便在递归调用中传递和修改 */
let res = {
	value: 0,
}

/* 
深度优先搜索 根左右
*/
function dfs(root, sum, res) {
	if (!root) {
		return
	}

	if (root.val === sum) {
		res.value++ // 符合目标值，增加结果计数
	}

	dfs(root.left, sum - root.val, res)
	dfs(root.right, sum - root.val, res)
}

/* 
两次dfs
第一次： 遍历二叉树的每个结点
第二次： 遍历以每个结点为根的子树
*/
function FindPath(root, sum) {
	if (!root) {
		return res.value // 如果根为空，则返回当前的结果计数
	}

	dfs(root, sum, res) // 查询某节点为根的路径数
	FindPath(root.left, sum, res) // 继续查询其他节点为根的路径数
	FindPath(root.right, sum, res)

	return res.value
}
