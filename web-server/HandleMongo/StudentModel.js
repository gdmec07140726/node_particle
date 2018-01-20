
//引入mongoose插件操作MongoDB数据库
const mongoose = require('mongoose');

//创建表格
const studentSchema = new mongoose.Schema({
	//写表格字段
	// key: 字段名字
	// value: 字段的类型/配置项
	
	name: String,
	age: Number,
	height: Number,
	sex: {
		type: String,
		default: '男'
	},
	year: String,
	like: Array
	
})


//根据表格对象，生成外部可以操作数据库的数据库模型
// 参数1：数据库表格名称
// 参数2：表格对象
module.exports = mongoose.model('student', studentSchema);		//将数据库模型暴露给外面使用

//console.log(mongoose.model('student', studentSchema));			//对象
