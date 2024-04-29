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

push(1)
push(2)
push(3)

console.log(pop());
console.log(pop());
console.log(pop());



