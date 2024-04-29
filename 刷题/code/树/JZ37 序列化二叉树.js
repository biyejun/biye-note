function TreeNode(x) {
	this.val = x
	this.left = null
	this.right = null
}
const null_str = '#'

/*
层次遍历 序列化
*/
function serialize(root) {
	if (!root) {
		return ''
	}

	let str = ''
	let queue = [root]

	while (queue.length) {
		let currentNode = queue.shift()
		str += currentNode.val + '_'

		if (currentNode.val !== null_str) {
			queue.push(currentNode.left || new TreeNode(null_str))
			queue.push(currentNode.right || new TreeNode(null_str))
		}
	}

	return str
}

/*
层次遍历 反序列化
*/
function deserialize(data) {
	if (data === '') {
		return null
	}
	const values = data.split('_')
	const root = new TreeNode(parseInt(values[0]))
	const queue = [root]

	let i = 1
	while (i < values.length - 1) {
		const currentNode = queue.shift()
		const leftVal = values[i++]
		const rightVal = values[i++]

		if (leftVal !== null_str) {
			currentNode.left = new TreeNode(+leftVal)
			queue.push(currentNode.left)
		}
		if (rightVal !== null_str) {
			currentNode.right = new TreeNode(+rightVal)
			queue.push(currentNode.right)
		}
	}

	return root
}

const root = new TreeNode(1)
const n2 = new TreeNode(2)
const n3 = new TreeNode(3)

root.left = n2
root.right = n3

const str = serialize(root)
console.log(str)

const tree = deserialize(str)
console.log(tree)
