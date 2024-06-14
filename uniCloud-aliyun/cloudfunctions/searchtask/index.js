'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	
	//返回数据给客户端
	return uniCloud.database().collection('task').where({
		hall:event.hallname,
		title:event.titlename,
		datetimesingle:uniCloud.database().command.gt(Date.now())
	}).get()
};
