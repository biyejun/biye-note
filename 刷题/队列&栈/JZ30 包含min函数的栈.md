# JZ30 包含min函数的栈

![1](./img/JZ30%20包含min函数的栈.jpg)

[JZ30 包含min函数的栈](https://www.nowcoder.com/practice/4c776177d2c04c2494f2555c9fcc1e49?tpId=13&tqId=23268&ru=/exam/oj/ta&qru=/ta/coding-interviews/question-ranking&sourceUrl=%2Fexam%2Foj%2Fta%3FtpId%3D13)

```js
const stack = []
function push(node) {
	stack.push(node)
}
function pop() {
	return stack.pop()
}
function top() {
	return stack[stack.length - 1]
}
function min() {
	return Math.min(...stack)
}
```
