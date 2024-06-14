'use strict';

const db = uniCloud.database()
const appId = 'wxea10293a8503ff4e'
const appSecret ='230ced359fca4b02106a0e2ba759dd26'
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {code} =event
	const res = await uniCloud.httpclient.request(
	"https://api.weixin.qq.com/sns/jscode2session?appid="+appId+"&secret="+appSecret+"&js_code="+code + "&grant_type=authorization_code",
	{
		dataType:"json"
	}
	)
	const token = await uniCloud.httpclient.request(
	`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`,
	{
		dataType:"json"
	}
	)
	const openid = res.data.openid
	//返回数据给客户端
	return {openid,token}
};
