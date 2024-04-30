/* 
递归+回溯

每当我们选取一个字符以后，就确定了其位置，相当于对字符串中剩下的元素进行全排列添加在该元素后面，
给剩余部分进行全排列就是一个子问题，因此可以使用递归
*/
function permutation(str) {
	const res = []

	if (!str || str.length === 0) return res

	// 转字符数组并排序
	const charStr = [...str].sort((a, b) => a.localeCompare(b)).join('')

	// 标记每个位置的字符是否被使用过
	const vis = new Array(str.length).fill(false)
	const temp = new Array(str.length)

	// 递归获取
	recursion(res, charStr, temp, vis, 0)

	return res
}

function recursion(res, str, temp, vis, index) {
	// 临时字符串满了加入输出
	if (index === str.length) {
		res.push(temp.join(''))
		return
	}

	// 遍历所有元素选取一个加入
	for (let i = 0; i < str.length; i++) {
		// 如果该元素已经被加入了则不需要再加入了
		if (vis[i]) continue

		if (i > 0 && str[i] === str[i - 1] && !vis[i - 1]) {
			// 当前的元素str[i]与同一层的前一个元素str[i-1]相同且str[i-1]已经用过了
			continue
		}

		// 标记为使用过
		vis[i] = true

		// 加入临时字符串
		temp[index] = str[i]

		recursion(res, str, temp, vis, index + 1)

		// 回溯
		vis[i] = false
	}
}

const str = 'abc'
const res = permutation(str)
console.log(res)
