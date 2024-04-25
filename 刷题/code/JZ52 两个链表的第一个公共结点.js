function ListNode(x) {
	this.val = x
	this.next = null
}

/* 
双指针
分别遍历两个链表，获取它们的长度。
让较长的链表指针先移动多出的长度，使得两个链表的剩余部分长度相等。
同时移动两个指针，直到它们相遇。相遇点即为第一个公共节点。
*/
function FindFirstCommonNode(pHead1, pHead2) {
	let len1 = getLength(pHead1)
	let len2 = getLength(pHead2)

	let p1 = pHead1
	let p2 = pHead2

	// 如果链表1比链表2长，先让p1向前移动差值步数
	if (len1 > len2) {
		let diff = len1 - len2
		while (diff--) {
			p1 = p1.next
		}
	} else if (len2 > len1) {
		// 如果链表2比链表1长，先让p2向前移动差值步数
		let diff = len2 - len1
		while (diff--) {
			p2 = p2.next
		}
	}
	// 同时移动p1和p2，直到它们相遇
	while (p1 && p2 && p1 !== p2) {
		p1 = p1.next
		p2 = p2.next
	}
	// 当p1 === p2时，找到了第一个公共节点；否则，没有公共节点
	return p1
}

// 辅助函数：获取链表的长度
function getLength(head) {
	let length = 0
	let current = head
	while (current) {
		length++
		current = current.next
	}
	return length
}