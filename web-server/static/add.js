

onload = ()=>{
	var aInp = document.getElementsByTagName("input");
	var btn = document.querySelector("button");
	
	btn.onclick = ()=>{
		var like = aInp[5].value.split(",");
		var obj = {
			name: aInp[0].value,
			age: aInp[1].value-0,
			//sex: aInp[2].value,
			height: aInp[3].value-0,
			year: aInp[4].value,
			like: like
		}
		if(aInp[2].value!=""){
			obj.sex = aInp[2].value;
		}
		console.log(JSON.stringify(obj));
		var xhr = createXHR();
		xhr.open('GET', 'http://localhost:8001/addStudent?obj='+ JSON.stringify(obj), true);
		xhr.send(null);
		xhr.onreadystatechange = ()=>{
			if(xhr.readyState==4 && xhr.status==200){
				console.log(xhr.responseText);
				var obj = JSON.parse(xhr.responseText);
				if(obj.status==1){
					alert('添加成功');
					location.href = 'http://localhost:8001';
				}else{
					alert('添加失败');
				}
			}
		}
	}
	
	function createXHR(){
		if(window.XMLHttpRequest){
			return new XMLHttpRequest();
		}
		return new ActiveXObject('Microsoft XMLHTTP');
	}
	
}


