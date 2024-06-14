'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	
	//返回数据给客户端
	return await uniCloud.database().collection('task').where({
		datetimesingle:uniCloud.database().command.gt(Date.now()),
		helperid:uniCloud.database().command.eq(0)
	}).get()
};
