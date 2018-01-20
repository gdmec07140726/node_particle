
//引入language表格操作的模型
const Language = require('./LanguageModel');

function add(){
	new Language({
		score: 77,
		stu: '5a6057ddd6d5c10610883a08'
	}).save();
	
	new Language({
		score: 88,
		stu: '5a60587bdd743b061b40232a'
	}).save();
	
	new Language({
		score: 66,
		stu: '5a60589add743b061b402332'
	}).save();
	
	new Language({
		score: 55,
		stu: '5a6058aadd743b061b402337'
	}).save();
	
	new Language({
		score: 45,
		stu: '5a6058f5dd743b061b40235c'
	}).save();
	
	new Language({
		score: 99,
		stu: '5a605940dd743b061b402376'
	}).save();
	
	new Language({
		score: 75,
		stu: '5a60910d6363941cd0c98a60'
	}).save();
}


function find(){
	//populate得到查询的结果后，在对关联的字段进行关联表格数据的查询
	Language.find().populate(['stu']).then(result=>{
		console.log(result);
	})
}



module.exports = {
	add,
	find
}
