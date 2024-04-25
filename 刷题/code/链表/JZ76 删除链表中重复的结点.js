function ListNode(x) {
	this.val = x
	this.next = null
}

/* 
双指针
*/
function deleteDuplication(pHead) {
	// 创建一个哑节点作为新链表的头部
	let dummy = new ListNode(0)
	dummy.next = pHead
	let prev = dummy // 前一个不重复的节点
	let curr = pHead // 当前遍历的节点

	while (curr) {
		// 有重复
		if (curr.next && curr.val === curr.next.val) {
			// 找到最后一个重复节点的下一个节点
			let temp = curr.next
			while (temp && curr.val === temp.val) {
				temp = temp.next
			}
			// 删除所有重复节点，将prev的next指向最后一个重复节点的下一个节点
			prev.next = temp
			curr = temp
		} else {
			// 没有重复
			prev = curr
			curr = curr.next
		}
	}

	return dummy.next
}
