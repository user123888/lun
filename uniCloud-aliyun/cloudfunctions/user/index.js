'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	
	//返回数据给客户端
	return uniCloud.database().collection('user').get()
	// return uniCloud.database().collection('user').where({
	// 	_id:"6644bf0c213929f866e17b75"
	// }).get()
};
