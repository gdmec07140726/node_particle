
const express = require('express');
const swig = require('swig');
const url = require('url');

//引入mongoose插件操作MongoDB数据库
const mongoose = require('mongoose');

//对象的结构赋值
// const obj = {
//     name: '123',
//     name2: '456',
//     name3: '789'
// }
// const {name, name1, name2, name3} = obj;
// //===>>>
// const name = obj.name;//'123'
// const name1 = obj.name1;//undefined
// const name2 = obj.name2;//'456'
// const name3 = obj.name3;//'789'

//const {addStudentInfo} = require('./HandleMongo');
//==>>
//const {addStudentInfo} = HandleMongo = require('./HandleMongo');
//const HandleMongo = require('./HandleMongo');
//const {addStudentInfo} = HandleMongo;
//==>> const addStudentInfo = [Function: addStudentInfo]

const {addStudentInfo, modifyStudentInfo, removeStudentInfo, findStudent, findStudentByPage, findStudentAndSort, removeStudentInfoById, findStudentById, updateById} = require('./HandleMongo');

const {add, find} = require('./HandleMongo/language');

//创建服务器
const server = express();

//配置模板引擎
server.engine('html', swig.renderFile);
server.set('views', './html');
server.set('view engine', 'html');
//关闭模板缓存
swig.setDefaults({cache: false});


// 配置静态资源目录
server.use('/ss', express.static('./static'));

//首页
server.get('/', (request, response)=>{
	console.log('首页');
	
	//执行查询学生信息
	findStudent().then(result=>{
		//查找到以后，在执行回调渲染页面
		//console.log(result);
		response.render('index', {
			infoList: result
		});
	})
})

/*
//显示相应条数数据页面
server.get('/findByPage', (request, response)=>{
	let {query} = url.parse(request.url, true);			//参数2： true，表示拆分query属性为对象
	
	//执行查询学生信息
	findStudentByPage(query.page, query.count).then(
		(result)=>{
			//再渲染页面
			response.render('index', {
				infoList: result
			})
		}
	)
})
*/

//显示相应的条数数据页面
server.get('/findByPage', (request, response)=>{
	let {query} = url.parse(request.url, true);			//参数2： true，表示拆分query属性为对象
	
	//执行查询学生信息
	findStudentByPage(query.page, query.count).then(
		([pages, result])=>{
			let pageArr = [];
			for(var i=1; i<=pages; i++){
				if(i==query.page){
					pageArr.push({i, active: "active"});
					continue;
				}
				pageArr.push({i, active: ""});
			}
			let prev = (query.page-1)>=1 ? query.page-1 : "";
			let next = (query.page-0+1)<=pages ? query.page-0+1 : "";
			//再渲染页面
			response.render('index', {
				infoList: result,
				showPage: true,
				pageArr,
				count: query.count,
				prev,
				next
			})
		}
	)
})


//跳转到添加数据页面请求
server.get('/add', (request, response)=>{
	response.render('add');
})


//数据插入数据库请求
server.get('/addStudent', (request, response)=>{
	let {query} = url.parse(request.url, true);
	addStudentInfo(JSON.parse(query.obj)).then(
		(obj)=>{
			response.write(JSON.stringify(obj));
			response.end();
		}
	)
})


//查找相应条件数据，并排序之后渲染页面的请求
server.get('/findAndSort', (request, response)=>{
	let {sort, method} = url.parse(request.url, true).query;
	findStudentAndSort(sort, method).then(result=>{
		response.render('index', {
			infoList: result
		});
	})
})



//删除相应的数据
server.get('/remove', (request, response)=>{
	let {id} = url.parse(request.url, true).query;
	removeStudentInfoById(id).then(
		()=>{
			findStudent().then(result=>{
				//查找到以后，在执行回调渲染页面
				//console.log(result);
				response.render('index', {
					infoList: result
				});
			})
		}
	);
})


//跳转到修改页面
server.get('/update', (request, response)=>{
	let {id} = url.parse(request.url, true).query;
	findStudentById(id).then(
		(result)=>{
			response.render('update', {
				stu: result
			})
		}
	)
})


//ajax请求更新（修改）数据
server.get('/api/update', (request, response)=>{
	let {id, obj} = url.parse(request.url, true).query;
	updateById(id, JSON.parse(obj)).then(
		(obj)=>{
			response.write(JSON.stringify(obj));
			response.end();
		}
	)
})



//使用promise将异步操作包裹，依赖执行
new Promise((resolve, reject)=>{
	//连接数据库
	mongoose.connect('mongodb://localhost:27026', (error)=>{
		if(error){
			console.log('数据库连接失败');
			console.log(error);
		}else{
			console.log('数据库连接成功，可以开始操作数据库了');
			resolve();	//连接上了数据库之后才启动服务器，失败了就不启动了
		}
	});
}).then(
	()=>{
		//启动服务器开始监听
		server.listen(8001, 'localhost', (error)=>{
			if(error){
				console.log('服务器启动失败');
			}else{
				console.log('服务器启动成功');
				console.log('http://localhost:8001');
				//addStudentInfo();
				//modifyStudentInfo();
				//removeStudentInfo();
				//add();
				//find();
			}
		})
	},
	(error)=>{
		console.log('错了');
		console.log(error);
	}
)








