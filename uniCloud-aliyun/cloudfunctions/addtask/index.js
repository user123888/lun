'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	
	//返回数据给客户端
	return  uniCloud.database().collection('task').add({
		way:event.way,
		number:event.number,
		datetimesingle:event.datetimesingle,
		hall:event.hall,
		money:event.money,
		title:event.title,
		userid:event.userid,
		helperid:0,
	})
};
