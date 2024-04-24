# JZ6 从尾到头打印链表

![题目](./img/JZ6%20从尾到头打印链表.jpg)
[JZ6 从尾到头打印链表](https://www.nowcoder.com/practice/d0267f7f55b3412ba93bd35cfa8e8035?tpId=13&tqId=23278&ru=/exam/oj/ta&qru=/ta/coding-interviews/question-ranking&sourceUrl=%2Fexam%2Foj%2Fta%3FtpId%3D13)


```js

function ListNode(x) {
	this.val = x
	this.next = null
}

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
```
