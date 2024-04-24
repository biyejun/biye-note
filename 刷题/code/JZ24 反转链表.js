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
反转链表 递归
*/
function ReverseList(head) {
	if (head === null || head.next === null) {
		return head
	}

	const newHead = ReverseList(head.next) // 递归反转子链表，newHead是反转后的子链表头节点

	head.next.next = head // 将当前节点的下一个节点指向前一个节点，实现反转
	head.next = null // 将当前节点的next置为null，防止循环引用

	return newHead // 返回反转后的链表头节点
}

const newHead = ReverseList(n1)

console.log(newHead)
