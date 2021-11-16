/**
 * @function settingBoardList
 * @descrition 게시글 버튼 리스트 세팅
 */
function settingBoardList(range, totalNum, listViewNum) {
	/**
	 * 나머지구하기
	 */
	const remainder = totalNum % listViewNum;
	/**
	 * 현재 전체 게시글 페이지 길이 구하기
	 */
	let tempTotal = totalNum - range * listViewNum;
	/**
	 * 화면에 뿌릴 게시글 페이지 길이 구하기
	 */
	let totalPage =
		Math.floor(tempTotal / listViewNum) > 10
			? 9
			: Math.floor(tempTotal / listViewNum);

	if (remainder > 0) {
		totalPage += 1;
	}
	/**
	 * 버튼 초기화하여 세팅하고 active 클래스 세팅해서 리턴
	 */
	let boaderBtnArr = [];
	for (var i = 1; i < totalPage + 1; i++) {
		boaderBtnArr.push({ page: i + range, active: 0 });
	}
	boaderBtnArr[0].active = 1;
	return boaderBtnArr;
}
/**
 * @function todayDate
 * @returns 오늘날짜 리턴
 */
function todayDate() {
	var date = new Date();
	var year = date.getFullYear();
	var month = ('0' + (1 + date.getMonth())).slice(-2);
	var day = ('0' + date.getDate()).slice(-2);

	return year + '-' + month + '-' + day;
}

export { settingBoardList, todayDate };
