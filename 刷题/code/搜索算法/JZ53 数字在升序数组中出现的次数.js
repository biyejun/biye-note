// [1, 2, 3, 3, 3, 3, 4, 5]

function branrySearch(array, k) {
	let l = 0
	let r = array.length

	while (l < r) {
		let m = l + Math.floor((r - l) / 2)
		if (array[m] >= k) {
			r = m
		} else {
			l = m + 1
		}
	}

	return l
}

/* 二分查找 */
function GetNumberOfK(nums, k) {
	// 找到左边界
	const first = branrySearch(nums, k)
	// 找到右边界
	const last = branrySearch(nums, k + 1)
	// 若超出数组范围，或第一个找到的索引对应的值不是k，则证明目标值出现的次数为0
	// 否则，右边界减去左边界即能统计出目标出现的次数
	return first === nums.length || nums[first] !== k ? 0 : last - first
}

const arr = [1, 2, 3, 3, 3, 3, 4, 5]
GetNumberOfK(arr, -1)
