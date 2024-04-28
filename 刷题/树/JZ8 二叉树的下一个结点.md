# JZ8 二叉树的下一个结点

![1](./img/JZ8%20二叉树的下一个结点%201.jpg)
![2](./img/JZ8%20二叉树的下一个结点%202.jpg)

[JZ8 二叉树的下一个结点](https://www.nowcoder.com/practice/9023a0c988684a53960365b889ceaf5e?tpId=13&tqId=23451&ru=/exam/oj/ta&qru=/ta/coding-interviews/question-ranking&sourceUrl=%2Fexam%2Foj%2Fta%3FtpId%3D13)

```js
/* 
中序遍历
*/
function GetNext(pNode) {
	let root = pNode

	while (root.next) {
		root = root.next
	}

	const list = []
	inOrder(list, root)

	for (let i = 0; i < list.length; i++) {
		const curNode = list[i]
		if (curNode === pNode) {
			return list[i + 1]
		}
	}

	return null
}

function inOrder(list, root) {
	if (root === null) {
		return
	}
	inOrder(list, root.left)
	list.push(root)
	inOrder(list, root.right)
}
```
