// 根据 id 、类名、标签名查找元素
function $(param, obj){
	obj = obj || document;
	if (param.indexOf("#") === 0) // 根据 id 查找元素
		return obj.getElementById(param.substring(1));
	
	if (param.indexOf(".") === 0)  // 根据 className 查找元素
		return getByClass(param.substring(1), obj);
	
	return obj.getElementsByTagName(param); // 根据标签名查找元素
}

// 根据类名查找元素
function getByClass(className, obj) {
	console.log("a");
	obj = obj || document;
	if (obj.getElementsByClassName) // 支持使用 getElementsByClassName 方法
		return obj.getElementsByClassName(className);
		
	/* 不支持 getElementsByClassName 时 */
	var result = []; // 保存所有找到的元素
	// 根据标签*将所有元素获取到
	var tags = obj.getElementsByTagName("*");
	// 遍历所有的标签
	for (var i = 0, len = tags.length; i < len; i++) {
		// 获取当前遍历到的标签所使用的所有 class 类名
		var classNames = tags[i].className.split(" ");
		// 循环遍历所有的 class 类名
		for (var j = 0, l = classNames.length; j < l; j++) {
			if (className === classNames[j]) { // 当前元素使用过参数中的类名
				result.push(tags[i]); // 将当前元素添加到结果集数组中
				break;
			}
		}
	}
	
	// 返回找到的元素数组
	return result;
}

// 获取指定元素的指定CSS样式属性值
// element:元素对象
// attr:属性名（字符串）
function getStyle(element, attr) {	
	return element.currentStyle ? element.currentStyle[attr] : getComputedStyle(element)[attr];
}

// 保存 cookie 信息
function setCookie(key, value, options) {
	// 基本 key=value
	var cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value);
	// 有配置可选参数：expires=?; path=?; domain=?; secure
	if (options){
		// 失效时间
		if (typeof options.expires === "number"){
			var days = options.expires;
			options.expires = new Date();
			options.expires.setDate(options.expires.getDate() + days);
		}	
		if (options.expires){
			cookie += "; expires=" + options.expires.toUTCString();
		}
		// 路径
		if (options.path)
			cookie += "; path=" + options.path;
		// 域名
		if (options.domain)
			cookie += "; domain=" + options.domain;
		// isSecure
		if (options.isSecure)
			cookie += "; secure";
	}
	// 保存
	document.cookie = cookie;
}

// 获取 cookie 
function getCookie(key) {
	var cookies = document.cookie.split("; ");
	for (var i = 0, len = cookies.length; i < len; i++) {
		var parts = cookies[i].split("=");
		var cookieName = decodeURIComponent(parts.shift());
		if (cookieName === key) {
			var cookieValue = parts.join("=");
			return decodeURIComponent(cookieValue);
		}
	}
	
	return null;
}

// 删除 cookie
function removeCookie(key) {
	setCookie(key, "", {"expires":-1});
}

/* ajax */
// success ---- 函数，用于处理响应成功后的数据
function ajax(method, url, param, success){
	var xhr = new XMLHttpRequest();
	xhr.open(method, url, true);
	if (method.toLowerCase() == "post") {
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	}
	xhr.send(param);
	xhr.onreadystatechange = function(){
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				var txt = xhr.responseText;
				
				success && success(txt); // 如果有传递 success 函数，则调用该函数，传递 txt 参数
			}
		}
	}
}

/*
function test(handle){
	var txt = "test 函数中的字符串";
	handle && handle(txt);
}
function handle(txt){
	alert(txt);
}
test(function(txt){
	alert(txt);
});
*/
/*
function handle(data){
}

ajax("get", "xxxxx", null, handle);
*/



















