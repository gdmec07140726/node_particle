
//引入mongoose插件，操作MongoDB数据库
const mongoose = require('mongoose');


//创建表格
const LanguageSchema = new mongoose.Schema({
	score: Number,
	stu: {
		ref: 'student',							//这个字段关联的表格名字
		type: mongoose.SchemaTypes.ObjectId		//js没有MongoDB的这个id数据类型，需要通过mongoose获取
	}
})


//根据表格对象，生成外部可以操作数据库的数据库模型
// 参数1：数据库表格名字
// 参数2：表格对象
module.exports = mongoose.model('language', LanguageSchema);
