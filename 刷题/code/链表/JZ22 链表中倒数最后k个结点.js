function ListNode(x) {
	this.val = x
	this.next = null
}

/* 
顺序查找（两次遍历）
查找倒数第K个节点 实际就是查找正数第 n-k+1 的节点
先遍历一遍 获取链表总长度 n，长度小于 k 的话，直接返回null
然后再遍历一遍 获取第 n-k+1 的节点

*/
function FindKthToTail(pHead, k) {
	if (!pHead || k <= 0) {
		return null
	}

	let currentNode = pHead
	let len = 0
	// 计算长度
	while (currentNode) {
		len++
		currentNode = currentNode.next
	}
	// 长度小于K的话 直接返回null
	if (len < k) {
		return null
	}

	let targentIndex = len - k

	// 第二次遍历 找到目标
	currentNode = pHead
	for (let i = 0; i < targentIndex; i++) {
		currentNode = currentNode.next
	}

	return currentNode
}
