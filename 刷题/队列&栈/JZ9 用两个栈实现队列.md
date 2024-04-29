# JZ9 用两个栈实现队列

![1](./img/JZ9%20用两个栈实现队列.jpg)

[JZ9 用两个栈实现队列](https://www.nowcoder.com/practice/54275ddae22f475981afa2244dd448c6?tpId=13&tqId=23281&ru=/exam/oj/ta&qru=/ta/coding-interviews/question-ranking&sourceUrl=%2Fexam%2Foj%2Fta%3FtpId%3D13)

```js
const stack1 = []
const stack2 = []

function push(node) {
	stack1.push(node)
}
function pop() {
	if (stack2.length === 0) {
		while(stack1.length) {
			stack2.unshift(stack1.shift())
		}
	}

	return stack2.pop()
}
```
