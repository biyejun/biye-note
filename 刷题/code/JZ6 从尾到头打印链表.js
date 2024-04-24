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
  从尾到头打印
  1. 先遍历一遍链表 遍历的过程中 将下个节点的pre指向前一个节点，变成一个双向链表，遍历到最后保存尾指针
  2. 再从尾指针遍历一遍，保存结果
*/
function printListFromTailToHead(head) {
	const result = []

	let cur = head
	let tail = null // 尾指针
	let next = null // 下一个指针

	while (cur) {
		if (cur) {
			tail = cur
		}

		next = cur.next

		if (next) {
			next.pre = cur
		}

		cur = cur.next
	}


  while (tail) {
    result.push(tail.val)
		tail = tail.pre
	}

	return result
}

const r1 = printListFromTailToHead(n1)
console.log(r1)
