function ListNode(x) {
	this.val = x
	this.next = null
}

const n1 = new ListNode(1)
const n2 = new ListNode(2)
const n3 = new ListNode(3)

n1.next = n2
n2.next = n3

/* 
反转链表
*/
function ReverseList(head) {
	let pre = null
	let cur = head

	while (cur) {
		let tempNext = cur.next
		cur.next = pre
		pre = cur
		cur = tempNext
	}
	return pre
}

const newHead = ReverseList(n1)

console.log(newHead)
