# JZ54 二叉搜索树的第k个节点

![1](./img/JZ54%20二叉搜索树的第k个节点%201.jpg)
![2](./img/JZ54%20二叉搜索树的第k个节点%202.jpg)

[JZ54 二叉搜索树的第k个节点](https://www.nowcoder.com/practice/57aa0bab91884a10b5136ca2c087f8ff?tpId=13&tqId=2305268&ru=/exam/oj/ta&qru=/ta/coding-interviews/question-ranking&sourceUrl=%2Fexam%2Foj%2Fta%3FtpId%3D13)


为了找到二叉搜索树中的第k小的节点值，可以利用二叉搜索树的性质，中序遍历（左-根-右）二叉搜索树会得到一个递增的元素序列。
进行中序遍历的过程中，同时计数，当计数达到k时，就找到了第k小的节点值。

```js
function TreeNode(x) {
	this.val = x
	this.left = null
	this.right = null
}

/* 
递归求解
*/
function KthNode(proot, k) {
	if (!proot || k <= 0 || k > getNodeCount(proot)) {
		return -1 // 如果树为空、k小于等于0或k大于树的节点总数，返回-1
	}

	let count = 0 // 计数器，用于记录遍历过的节点数量
	let result = -1 // 存储找到的结果

	// 递归函数，进行中序遍历
	function inorderTraversal(node) {
		if (!node) return // 节点为空则直接返回

		inorderTraversal(node.left) // 遍历左子树

		count++ // 计数器递增
		if (count === k) {
			result = node.val // 找到第k小的节点值，保存结果
			return
		}

		inorderTraversal(node.right) // 遍历右子树
	}

	// 辅助函数，用于计算二叉树节点总数
	function getNodeCount(node) {
		if (!node) return 0
		return 1 + getNodeCount(node.left) + getNodeCount(node.right)
	}

	// 从根节点开始中序遍历
	inorderTraversal(proot)

	return result // 返回找到的第k小的节点值，或者未找到则返回-1
}
```

```js
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
```

