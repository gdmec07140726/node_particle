
// 操作数据库

// 增改删  查

// 数据库	===		表格		字段

// 操作：
// 1、创建表格
// 2、声明表格字段
// 3、操作增删改查













//引入student表格操作的模型
const Student = require('./StudentModel');


//新增数据
function addStudentInfo(obj){
	/*
	//创建学生信息
	let stuInfo = new Student({
		//填写学生信息字段
		name: '李四',
		age: 14,
		height: 140,
		sex: '女',
		year: 2005,
		like: ['玩', '睡']
	})
	*/
	console.log(obj);
	let stuInfo = new Student({
		//填写学生信息字段
		name: obj.name,
		age: obj.age,
		height: obj.height,
		sex: obj.sex,
		year: obj.year,
		like: obj.like
	})
	console.log(stuInfo);
	
	//将学生信息保存在数据库中
	return new Promise((resolve, reject)=>{
		stuInfo.save().then(
			(newStudentInfo)=>{
				var obj2 = {};
				if(newStudentInfo){
					console.log('保存成功');
					obj2.status = 1;
				}else{
					console.log('保存失败');
					obj2.status = 0;
				}
				console.log(newStudentInfo);
				resolve(obj2);
			}
		)
	})
}



//修改数据
function modifyStudentInfo(){
	//修改学生信息
	
	//update	查找满足条件的数据进行修改
	// 参数1： 查找的条件（找出需要修改的数据对象）
	// 参数2： 将要修改的值
	Student.update(
		{name: '李四'},
		{
			age: 14,
			year: 2004
		}
	).then(				//修改完成的回调
		(result)=>{
			if(result.nModified>0){
				console.log('修改成功');
			}else{
				console.log('修改失败');
			}
			console.log(result);		//{ n: 1, nModified: 1, ok: 1 }		or		{ n: 1, nModified: 0, ok: 1 }
		}
	)
	
	
	/*
	//findByIdAndUpdate		通过id查找相应的数据对象，并进行修改
	// 参数1：需要修改的对象的id
	// 参数2：需要修改的值
	Student.findByIdAndUpdate(
		'5a6021619b92483b90dea34f',
		{
			age: 14
		}
	).then(
		(result)=>{
			console.log('修改数据成功');
			console.log(result);		//result是修改前的数据对象	没修改对象时，返回null
		}
	)
	*/
	
	/*
	//fineOneAndUpdate		查找第一个满足条件的信息进行修改
	// 参数1：查找条件
	// 参数2：将要修改的值
	Student.findOneAndUpdate(
		{
			name: '李四',
			age: 15
		},
		{
			height: 144
		}
	).then(
		(result)=>{
			console.log('修改成功');
			console.log(result);			//result是修改前的数据对象	没修改对象时，返回null
		}
	)
	*/
	
}



// 删除操作
// Student.remove().then({删除条件});
// Student.findByIdAndRemove(id).then();
// Studnet.findOneAndRemove({删除条件}).then();

function removeStudentInfo(){
	
	/*
	//remove	查找满足条件的数据进行修改
	// 参数: 删除条件
	Student.remove(
		{
			name: '李四',
			age: 14,
			year: 2003
		}
	).then(
		(result)=>{
			if(result.n>0){
				console.log('删除成功');		//{ n: 1, ok: 1 }
			}else{
				console.log('删除失败');		//{ n: 0, ok: 1 }
			}
			console.log(result);			//{ n: 1, ok: 1 }		or 		{ n: 0, ok: 1 } n是指找到的符合条件的数据条数
		}
	)
	*/
	
	/*
	//findByIdAndRemove		通过id查找相应的数据对象，并进行删除
	// 参数： 删除的数据id
	Student.findByIdAndRemove('5a601e7c45af571968958def').then(
		(result)=>{
			console.log('删除成功');
			console.log(result);			//result是修改前的数据对象	没删除对象时，返回null
		}
	)
	*/
	
	//findOneAndRemove		查找第一个满足条件的信息进行删除
	// 参数：删除的条件
	Student.findOneAndRemove(
		{year: 2003}
	).then(
		(result)=>{
			console.log('删除成功');
			console.log(result);			//result是修改前的数据对象	没删除对象时，返回null
		}
	)
	
}




// Student.find查询所有
// Student.findById  根据id查询，只能得到一个结果
// Student.findOne	  查询第一个满足条件的数据
function findStudent(){
	return new Promise((resolve, reject)=>{
		//查询所有
		Student.find().then(
			(result)=>{
				//传递给成功的回调
				resolve(result);
			}
		)
	})
}



/*
1000
http	无状态，短连接
第一次进入页面展示20条数据	0-19
第二次加载展示后面的20条数据 	20-39

通过参数告诉服务器需要什么数据
page count

后台1000条数据
page=1; count=10;		(1-10)			下标(page-1)*count ~ page*count-1
page=2; count=10;		(11-20)
page=3; count=20;		(41-60)
*/




/*
//参数page：第几页
//参数count：页面显示数据条数
function findStudentByPage(page, count){
	//查询总数， 方式1
//	Student.find().then(result=>{
//		console.log(result).length;
//	})
	//查询总数， 方式2
//	Student.count().then(num=>{
//		console.log('总数为：' + num);		//17
//	})
	
	//数据库查询是异步操作，将异步操作的查询到的结果通过promise的形式返回(回调)
	return new Promise((resolve, reject)=>{
		// 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14
		// 查找相应页面数据
		let s = (page-1)*count;
		let l = count-0;
		// skip() 从查询的所有结果中，跳过skip个之后， 选取数据返回(参数：跳过个数)
		// limit() 从跳过的skip个数据之后返回limit个数据(参数：返回个数)
		Student.find().skip(s).limit(l).then(result=>{
			//将查询到的结果传递给页面进行渲染
			resolve(result);
		})
	})
}
*/


/*
//参数page：第几页
//参数count：页面显示数据条数
function findStudentByPage(page, count){
	return new Promise((resolve, reject)=>{
		//先查总数，然后再查找页面数据
		Student.count().then(num=>{			//查总数
			//查找相应页面数据
			let s = (page-1)*count;
			let l = count-0;
			let pages = Math.ceil(num/l);	//计算页面数量
			Student.find().skip(s).limit(l).then(result=>{
				resolve({		//resolve只能传一个值，写成对象形式， 将值传给页面渲染
					result,
					pages
				});
			})
		})
	})
}
*/

//2个promise同步请求
function findStudentByPage(page, count){
	let s = (page-1)*count;
	let l = count-0;
	let p1 = new Promise((resolve, reject)=>{
		//先查总数，然后再查找页面数据
		Student.count().then(num=>{			//查总数
			//查找相应页面数据
			let pages = Math.ceil(num/l);	//计算页面数量
			resolve(pages);
		})
	})
	
	let p2 = new Promise((resolve, reject)=>{
		Student.find().skip(s).limit(l).then(result=>{
			resolve(result);
		})
	})
	
	return Promise.all([p1, p2]);		//.then的参数是一个数组，数组中有2个元素，第一个是p1的传参，第二个是p2的传参
}


function findStudentAndSort(sortName, method){
	return new Promise((resolve, reject)=>{
		//查询并且排序
//		Student.find().sort({[sortName]: Number(method), age: -1}).then(
//			(result)=>{
//				//传递给成功的回调
//				resolve(result);
//			}
//		)
		
		
		//查询所有然后筛选出符合条件的
		//查询key为一个固定值
		//	find(): 方法可以接收一个参数（对象），表示查询条件，对象属性名称是筛选字段，属性值是筛选条件（写值是固定范围查找，写对象可以写查找范围）
		//	where(): 在find()方法之前调用，表示查询条件（对象形式），查询条件（对象）用法与直接写在find()中作为参数一致
		//Student.find({height: 140});
		//Student.where({height: 140}).find();
		
		//查询范围
		//	$gt: 大于
		//	$lt: 小于
		//	$gte: 大于等于
		//	$lte: 小于等于
		//	$regex: 正则匹配（模糊查询）
//		Student.find({age: 13}).sort({"height": -1}).then(
//		Student.find({height: {$gt:140, $lt: 160}}).sort({"height": -1}).then(
//		Student.where({height: 140}).find().sort({age: -1}).then(
//		Student.where({height: {$gt:140, $lt: 160}}).find().sort({age: -1}).then(
//		Student.where({height: {$gte:150, $lte: 160}}).find().sort({age: -1}).then(
		Student.where({name: {$regex: /张三/}}).find().sort({age: -1}).then(
			(result)=>{
				//传递给成功的回调
				resolve(result);
			}
		)
		
	})
}


//删除对应id的信息
function removeStudentInfoById(id){
	return new Promise((resolve, reject)=>{
		console.log(id);
		Student.findByIdAndRemove(id).then(
			(result)=>{
				console.log('删除成功');
				console.log(result);			//result是修改前的数据对象	没删除对象时，返回null
				resolve();
			}
		)
	})
}

//查找对应的id的学生
function findStudentById(id){
	return new Promise((resolve, reject)=>{
		console.log(id);
		Student.findById(id).then(
			(result)=>{
				resolve(result);
			}
		)
	})
}


//修改对应的id的学生信息
function updateById(id, obj){
	return new Promise((resolve, reject)=>{
		Student.findByIdAndUpdate(id, {
			name: obj.name,
			age: obj.age,
			sex: obj.sex,
			height: obj.height,
			year: obj.year,
			like: obj.like
		}).then(
			(result)=>{
				console.log(result);
				var obj2 = {};
				if(result){
					console.log('修改成功');
					obj2.status = 1;
				}else{
					console.log('修改失败');
					obj2.status = 0;
				}
				resolve(obj2);
			}
		)
	})
}


//向外暴露模块
module.exports = {
	addStudentInfo,
	modifyStudentInfo,
	removeStudentInfo,
	findStudent,
	findStudentByPage,
	findStudentAndSort,
	removeStudentInfoById,
	findStudentById,
	updateById
}

