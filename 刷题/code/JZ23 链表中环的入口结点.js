function ListNode(x) {
	this.val = x
	this.next = null
}

/* 
快慢指针
时间复杂度为O(N)，空间复杂度为O(1)

使用两个指针，一个快指针（每次移动两个节点）和一个慢指针（每次移动一个节点）。
如果链表中存在环，那么快指针和慢指针最终会在环内的某个位置相遇。
一旦它们相遇，将一个指针重新指向链表头部，并将两个指针的移动速度都调整为每次移动一个节点。当再次相遇时，相遇点就是环的入口。
*/
function EntryNodeOfLoop(pHead) {
	if (!pHead) {
		return null
	}

	let slow = pHead
	let fast = pHead
	let hasCycle = false

	// 使用快慢指针检测环
	while (fast && fast.next) {
		slow = slow.next
		fast = fast.next.next
		if (slow === fast) {
			hasCycle = true
			break
		}
	}

	// 如果没有环，返回null
	if (!hasCycle) {
		return null
	}

	// 将一个指针重新指向链表头部，并以相同的速度移动两个指针，直到它们再次相遇
	slow = pHead
	while (slow !== fast) {
		slow = slow.next
		fast = fast.next
	}

	// 相遇点即为环的入口
	return slow
}
