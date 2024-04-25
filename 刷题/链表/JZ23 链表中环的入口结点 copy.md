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
