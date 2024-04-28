function TreeNode(x) {
	this.val = x
	this.left = null
	this.right = null
}

function check(sequence, leftIndex, rightIndex) {
	// 当只剩一个节点的时候，返回true
	if (leftIndex >= rightIndex) {
		return true
	}

	const root = sequence[rightIndex] // 根节点

	let j = rightIndex - 1

	// 找到左右子树的分界点
	while (j >= 0 && sequence[j] > root) {
		j--
	}

	for (let i = leftIndex; i <= j; i++) {
		// 左子树的值应该都小于根
		if (sequence[i] > root) {
			return false
		}
	}

	return check(sequence, leftIndex, j) && check(sequence, j + 1, rightIndex - 1)
}

/* 
递归
分治求解

后序遍历 左 右 根
二叉搜索树 左边的值 小于根 小于右边的值

给一个后序遍历的数组 最后一个值肯定是跟 然后根据大小 可以将前面的值分为两组 左子树（比根小） 和 右子树（比根大）
例如[4, 8, 6, 12, 16, 14, 10]可以根据根节点的值将其划分为左子树[4, 8, 6], 右子树[12, 16, 14], 根[10], 
采用分治的思想，检查左子树和右子树，当且仅当左右子树都符合时，返回true
*/
function VerifySquenceOfBST(sequence) {
	const len = sequence.length

	if (len === 0) {
		return false
	}

	return check(sequence, 0, len - 1)
}
