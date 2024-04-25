function ListNode(x) {
	this.val = x
	this.next = null
}

function Merge(pHead1, pHead2) {
	// 创建一个哑节点，它将作为合并后链表的头部
	let dummy = new ListNode(0)
	let current = dummy // 用于遍历新链表的指针

	// 当两个链表都不为空时，选择较小的节点添加到新链表中
	while (pHead1 && pHead2) {
		if (pHead1.val <= pHead2.val) {
			current.next = pHead1
			pHead1 = pHead1.next
		} else {
			current.next = pHead2
			pHead2 = pHead2.next
		}
		current = current.next // 移动新链表的指针
	}

	// 如果pHead1还有剩余节点，将它们全部添加到新链表的末尾
	if (pHead1) {
		current.next = pHead1
	}

	// 如果pHead2还有剩余节点，将它们全部添加到新链表的末尾
	if (pHead2) {
		current.next = pHead2
	}

	return dummy.next
}
