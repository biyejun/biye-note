function TreeNode(x) {
	this.val = x
	this.left = null
	this.right = null
}

function dfs(root, sum, last, mp) {
	//last为到上一层为止的累加和
	if (!root) {
		//空结点直接返回
		return 0
	}

	let res = 0
	let temp = root.val + last //到目前结点为止的累加和

	if (mp.hasOwnProperty(temp - sum)) {
		//如果该累加和减去sum在哈希表中出现过，相当于减去前面的分支
		res += mp[temp - sum] //加上有的路径数
	}

	if (!mp.hasOwnProperty(temp)) {
		mp[temp] = 0
	}
	mp[temp]++ //增加该次路径和

	res += dfs(root.left, sum, temp, mp) //进入子结点
	res += dfs(root.right, sum, temp, mp)

	mp[temp]-- //回退该路径和，因为别的树枝不需要这边存的路径和

	if (mp[temp] === 0) {
		delete mp[temp]
	}

	return res
}

/* 
一次dfs + 哈希表

https://blog.nowcoder.net/n/9f3db96916704e1cae1b7ff4956d1bd2?f=comment

*/
function FindPath(root, sum) {
	let mp = {} //记录路径和及条数
	mp[0] = 1 //路径和为0的有1条
	return dfs(root, sum, 0, mp)
}

const root = new TreeNode(1)
const n2 = new TreeNode(2)
const n3 = new TreeNode(3)
const n0 = new TreeNode(0)

root.left = n2
n2.right = n0
root.right = n3

const result = FindPath(root, 3)
console.log(result, 'result')
