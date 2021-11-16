import { videoInstance } from '@/api/index.js';
/**
 * @function fetchCowayVideoList
 * @description 코웨이 비디오 리스트 API
 * @param {*} userData
 * @returns
 */
function fetchCowayVideoList(userData) {
	return videoInstance.post('GettvMovList', userData);
}
/**
 * @function fetchCowaySeriesVideo
 * @description 코웨이 상세페이지  시리즈 비디오 리스트 API
 * @param {*} seriesCode
 * @returns
 */
function fetchCowaySeriesVideo(seriesCode) {
	return videoInstance.post('GetTvSeriesList', seriesCode);
}
/**
 * @function fetchCowayRelativeVideo
 * @description 코웨이 상세페이지 관련비디오 리스트 API
 * @param {*} userData
 * @returns
 */
function fetchCowayRelativeVideo(userData) {
	return videoInstance.post('GettvMovList', userData);
}
/**
 * @function fetchCommentList
 * @description 코웨이 상세페이지 코멘트 리스트 API
 * @param {*} userData
 * @returns
 */
function fetchCowayCommentList(userData) {
	return videoInstance.post('GetTvCmntList', userData);
}
/**
 * @function putCowayComment
 * @description 코웨이 댓글 쓰기
 * @param {*} userData
 * @returns
 */
function putCowayComment(userData) {
	return videoInstance.post('SaveTvCmnt', userData);
}
/**
 * @function deleteCowayComment
 * @description 코웨이 댓글 삭제
 * @param {*} userData
 * @returns
 */
function deleteCowayComment(userData) {
	return videoInstance.post('DeleteTvCmnt', userData);
}

function putCowayHitLikeIncrease(userData) {
	return videoInstance.post('UpdateLikeViewCnt', userData);
}

export {
	fetchCowayVideoList,
	fetchCowaySeriesVideo,
	fetchCowayRelativeVideo,
	fetchCowayCommentList,
	putCowayComment,
	deleteCowayComment,
	putCowayHitLikeIncrease,
};
