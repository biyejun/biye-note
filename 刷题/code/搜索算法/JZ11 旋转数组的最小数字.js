//  [3, 4, 5, 1, 2]
/* 
二分查找
变形
*/
function minNumberInRotatenums(nums) {
	if (nums.length === 0) {
		return 0
	}

	let l = 0
	let r = nums.length - 1

	while (l < r) {
		let m = Math.floor((l + r) / 2)

		// 中间值比右边值大 说明旋转点在右侧 旋转点在 [m+1, r] 中
		if (nums[m] > nums[r]) {
			l = m + 1
		} else if (nums[m] < nums[r]) {
			// 中间值比右边值小 旋转点在左侧 旋转点在 [l, m]中
			r = m
		} else {
			// 缩小范围继续判断
			r--
		}
	}

	return nums[l]
}
