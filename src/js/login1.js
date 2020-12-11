//卡号
var card = document.querySelector(".login-id>input")
//密码

var pwd = document.querySelector(".login-pwd>input");
var eye = document.querySelector(".login-pwd>span");


//按钮
var btn = document.querySelector(".login-btn");
var loginBg = document.querySelector(".login-bg img");


function show(str, TagInput) {
    TagInput.value = str + "有误";
    TagInput.style.color = "red";
    TagInput.style.fontSize = "14px";
    setTimeout(function () {
        TagInput.value = "";
        TagInput.placeholder = str;
        TagInput.style.fontSize = "18px";
        TagInput.style.color = "#000";
    }, 2000);
}
//验证

var id = false;
var flagpwd = false;



// 正则判断
card.onblur = function () {
    id = /^[a-zA-Z][0-9a-zA-Z]{1,10}$/.test(card.value);//字母开头，后面是1到5
    if (!id) {
        let str = "卡号";
        show(str, card);
    }
}

pwd.onblur = function () {
    flagpwd = /^\w{1,7}$/.test(pwd.value);
    if (!flagpwd) {
        let str = "密码";
        show(str, pwd);
    }
}


// 密码显示与隐藏
var flag = 0;
eye.onclick = function () {

    if (flag == 0) {
        pwd.type = 'text';
        eye.className = "iconfont icon-xianshimima";
        flag = 1;
    } else {
        pwd.type = 'password';
        eye.className = "iconfont icon-yincangmima";
        flag = 0;
    }
}



//点击下一步
btn.addEventListener('click',function(){SQluser();})
//获取账号和密码
function SQluser() {
   $.post('../php/login1.php', `name=${card.value}&password=${pwd.value}`, null, 'json')
   .then(res => {
       console.log(res.code)
      if(res.code==1){
          window.location.href=`../pages/index1.html? `
          localStorage.setItem('name',card.value); 
          
      }
   })
}
