# JZ23 链表中环的入口结点

![1](./img/JZ23%20链表中环的入口结点%201.jpg)
![2](./img/JZ23%20链表中环的入口结点%202.jpg)


[JZ23 链表中环的入口结点](https://www.nowcoder.com/practice/253d2c59ec3e4bc68da16833f79a38e4?tpId=13&tqId=23449&ru=/exam/oj/ta&qru=/ta/coding-interviews/question-ranking&sourceUrl=%2Fexam%2Foj%2Fta%3FtpId%3D13)

```js
/* 
哈希表缓存
时间复杂度为O(N)，N为链表长度，因为HashSet的查找时间复杂度为O(1)。
空间复杂度为O(N)，因为需要使用HashSet存储遍历过的节点。

创建一个以节点为键的HashSet集合，用来存储曾经遍历过的节点。
从头节点开始，依次遍历链表的每一个节点。
每遍历到一个新节点，就用新节点和HashSet集合当中存储的节点作比较。
如果发现HashSet当中存在相同节点，则说明链表有环；如果不存在，就把这个新节点存入HashSet，之后进入下一节点，继续重复操作。

*/
function EntryNodeOfLoop(pHead) {
	// 创建一个Set来存储遍历过的节点
	const visitedNodes = new Set()
	let currentNode = pHead

	// 遍历链表，直到找到环的入口或者链表结束
	while (currentNode) {
		// 如果当前节点已经在Set中，说明找到了环的入口
		if (visitedNodes.has(currentNode)) {
			return currentNode
		}
		// 将当前节点添加到Set中
		visitedNodes.add(currentNode)

		// 移动到下一个节点
		currentNode = currentNode.next
	}
	// 如果没有找到环，返回null
	return null
}
```



```js
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
```
