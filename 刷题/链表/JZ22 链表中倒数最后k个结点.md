# JZ22 链表中倒数最后k个结点

![1](./img/JZ22%20链表中倒数最后k个结点.jpg)

[JZ22 链表中倒数最后k个结点](https://www.nowcoder.com/practice/886370fe658f41b498d40fb34ae76ff9?tpId=13&tqId=1377477&ru=/exam/oj/ta&qru=/ta/coding-interviews/question-ranking&sourceUrl=%2Fexam%2Foj%2Fta%3FtpId%3D13)


```js
/* 
双指针

定义两个指针，都指向链表的头部。
让其中一个指针先向前移动k步。
如果此时这个指针已经到达链表末尾，说明链表长度小于k，直接返回null。
如果指针没有到达链表末尾，同时移动两个指针，直到先行的指针到达链表末尾。此时，后行的指针就指向了倒数第k个节点。

*/
function FindKthToTail(pHead, k) {
	if (!pHead || k <= 0) {
		return null
	}

	let fast = pHead
	let slow = pHead

	// 让fast指针先走k步
	for (let i = 0; i < k - 1; i++) {
		if (fast.next) {
			fast = fast.next
		} else {
			// 如果fast指针已经无法前进，说明链表长度小于k
			return null
		}
	}

	// 同时移动fast和slow指针，直到fast到达链表末尾
	while (fast.next) {
		fast = fast.next
		slow = slow.next
	}

	// slow指针现在指向倒数第k个节点
	return slow
}
```



```js
/* 
顺序查找（两次遍历）
查找倒数第K个节点 实际就是查找正数第 n-k+1 的节点
先遍历一遍 获取链表总长度 n，长度小于 k 的话，直接返回null
然后再遍历一遍 获取第 n-k+1 的节点

*/
function FindKthToTail(pHead, k) {
	if (!pHead || k <= 0) {
		return null
	}

	let currentNode = pHead
	let len = 0
	// 计算长度
	while (currentNode) {
		len++
		currentNode = currentNode.next
	}
	// 长度小于K的话 直接返回null
	if (len < k) {
		return null
	}

	let targentIndex = len - k

	// 第二次遍历 找到目标
	currentNode = pHead
	for (let i = 0; i < targentIndex; i++) {
		currentNode = currentNode.next
	}

	return currentNode
}
```
