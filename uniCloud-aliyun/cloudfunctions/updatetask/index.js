'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	
	//返回数据给客户端
	return  await uniCloud.database().collection('task').where({_id:event.id}).update({
		way:event.way,
		number:event.number,
		datetimesingle:event.datetimesingle,
		hall:event.hall,
		money:event.money,
		title:event.title,
	})
};
