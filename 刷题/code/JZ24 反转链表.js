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
	let prev = null
	let current = head
	while (current !== null) {
		const nextTemp = current.next // 暂存下一个节点
		current.next = prev // 反转指向
		prev = current // 前移prev
		current = nextTemp // 前移current
	}
	return prev // 当current为空时，prev就是新的头节点
}


const newHead = ReverseList(n1)

console.log(newHead);
