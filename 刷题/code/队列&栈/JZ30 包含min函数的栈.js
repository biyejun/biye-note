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
