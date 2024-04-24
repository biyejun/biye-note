# JZ6 从尾到头打印链表

![题目](./img/JZ6%20从尾到头打印链表.jpg)
[JZ6 从尾到头打印链表](https://www.nowcoder.com/practice/d0267f7f55b3412ba93bd35cfa8e8035?tpId=13&tqId=23278&ru=/exam/oj/ta&qru=/ta/coding-interviews/question-ranking&sourceUrl=%2Fexam%2Foj%2Fta%3FtpId%3D13)


```js
/* 
递归
*/
function printListFromTailToHead(head) {
	const result = []

	function traverse(node) {
		if (node === null) {
			return
		}
		traverse(node.next) // 递归到链表末尾
		result.push(node.val) // 到达链表末尾后开始添加到结果数组
	}

	traverse(head)

	return result
}
```

```js
/* 
栈
*/
function printListFromTailToHead(head) {
	const stack = []
	let currentNode = head

	// 遍历链表，将所有节点的值压入栈中
	while (currentNode !== null) {
		stack.push(currentNode.val)
		currentNode = currentNode.next
	}

	const result = []

	// 将栈中的值依次弹出并添加到结果数组中
	while (stack.length > 0) {
		result.push(stack.pop())
	}

	return result
}
```
