function isPopOrder(inorder, sequence) {
	const len = inorder.length
	const stack = []

	let i = 0
	let j = 0

	while (i < len) {
		stack.push(inorder[i])

		while (stack.length && stack[stack.length - 1] === sequence[j]) {
			j++
			stack.pop()
		}

		i++
	}

	// 检查所有元素都匹配过了 说明后序遍历的的结果合法
	return j === len
}
/* 
栈
二叉树的中序遍历和后序遍历对应着一种栈的压入、弹出序列, 
而对后序遍历序列从小到大排序就得到了中序遍历序列

得到中序遍历序列后, 将其作为入栈序列, 检查后序遍历序列是不是一个合法的出栈序列
*/
function VerifySquenceOfBST(sequence) {
	if (sequence.length === 0) return false

	// 创建一个序列的副本并排序，以模拟中序遍历
	const inorder = [...sequence].sort((a, b) => a - b)

	return isPopOrder(inorder, sequence)
}
