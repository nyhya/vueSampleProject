import { borderInstance } from '@/api/index.js';

/**
 *
 * @param {*} data
 * @returns
 */
function fetchListLoad(data) {
	return borderInstance.post('GetBoardList', data);
}
/**
 *
 * @param {*} data
 * @returns
 */
function fetchDetailView(data) {
	return borderInstance.post('ViewBoard', data);
}
/**
 *
 * @param {*} data
 * @returns
 */
function fetchCommentList(data) {
	return borderInstance.post('GetCmntList', data);
}
/**
 *
 * @param {*} data
 * @returns
 */
function PutBorderComment(data) {
	return borderInstance.post('SaveCmnt', data);
}
/**
 * @function deleteComment
 * @param {*} data
 * @returns
 * @description 댓글 삭제
 */
function deleteComment(data) {
	return borderInstance.post('DeleteCmnt', data);
}

export {
	fetchListLoad,
	fetchDetailView,
	fetchCommentList,
	PutBorderComment,
	deleteComment,
};
