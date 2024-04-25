function TreeNode(x) {
	this.val = x
	this.left = null
	this.right = null
}

/* 
使用栈辅助中序遍历
*/
function KthNode(proot, k) {
	let stack = [] // 使用栈辅助中序遍历
	let currentNode = proot // 当前遍历的节点
	let count = 0 // 计数器，记录已经遍历的节点数量
	let result = -1 // 存储结果的值，初始为-1

	while (currentNode || stack.length > 0) {
		// 先将左子树全部入栈
		while (currentNode) {
			stack.push(currentNode)
			currentNode = currentNode.left
		}
		// 出栈并处理栈顶元素
		currentNode = stack.pop()
		count++ // 计数器增加
		if (count === k) {
			result = currentNode.val // 找到第k小的值
			break // 退出循环
		}

		currentNode = currentNode.right // 处理右子树
	}
	// 如果k大于树中节点的数量或者树为空，则返回-1
	if (count < k || !proot) {
		return -1
	}

	return result // 返回找到的结果
}

// 示例用法：
const n1 = new TreeNode(5)
const n2 = new TreeNode(3)
const n3 = new TreeNode(7)
const n4 = new TreeNode(6)
const n5 = new TreeNode(8)

n1.left = n2
n1.right = n3
n3.left = n4
n3.right = n5

console.log(KthNode(n1, 3))
