function ListNode(x) {
	this.val = x
	this.next = null
}

/* 
为了删除单向链表中的一个节点，我们需要考虑一些边界情况和通用情况。边界情况包括：
	链表为空（即头节点为null）。
	要删除的节点是头节点。
*/
function deleteNode(head, val) {
	// 如果链表为空，则直接返回null
	if (!head) {
		return null
	}
	// 如果要删除的节点是头节点
	while (head && head.val === val) {
		head = head.next // 将头节点指向下一个节点，从而删除原头节点
	}

	// 如果链表不为空，且要删除的节点不是头节点
	if (head) {
		let current = head
		while (current.next) {
			if (current.next.val === val) {
				// 删除下一个节点
				current.next = current.next.next
				break // 删除的节点值在链表中是唯一的，退出循环
			}
			current = current.next
		}
	}

	return head
}
