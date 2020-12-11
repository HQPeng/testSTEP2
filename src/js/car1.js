// 获取到storage里面的数据
let carList=JSON.parse(window.localStorage.getItem('car'))
bandFoot()

// 渲染购物车列表
bandCar()
function bandCar(){
    let str=``
    carList.forEach(item => {
        str+=`
        <li class="main-content">
        <div class="fir"><input type="checkbox" class="check" >
            <img src="${item.gi}">
        </div>
        <div class="target"><a href="">${item.gn}</a></div>
        <div>￥${parseInt(item.gp*item.total)}</div>
        <div><button class="sub">-</button><input type="number" value="${item.total}" class="num" max=10 min=0><button class="add">+</button></div>
        <div></div>
        <div class="del">删除</div>
        `
    })
    $('.main').html(str)


    
}

// 增减按钮

// $('.main').on( 'click', '.add' , function(){
//     const target =$(this).parent().prev().prev().find('a').html()
//     const target2=$(this).parent().prevAll('.fir').find('input').prop('checked')
//     console.log(target2)
//     carList.forEach(function(item){
//         item.che=target2
//         if(item.gn==target){
//             item.total++
//         }
//     })
   
//     window.localStorage.setItem('car', JSON.stringify(carList))
//     bandCar()
//     bandFoot()
// })



$('.main').on( 'click', '.add' , function(){
    const target =$(this).parent().prev().prev().find('a').html()
    carList.forEach(function(item){
        if(item.gn==target){
            item.total++
        }
    })
    window.localStorage.setItem('car', JSON.stringify(carList))
    bandCar()
    bandFoot()
})


$('.main').on( 'click', '.sub' , function(){
    const target =$(this).parent().prev().prev().find('a').html()
    carList.forEach(function(item){
        if(item.gn==target){
            item.total--
           if(item.total==0){
            carList= carList.filter(function(items){
                  return items!=item
              })  
            }
        }
    })
    window.localStorage.setItem('car', JSON.stringify(carList))
    bandCar()
    bandFoot()
})

//删除按钮

$('.main').on('click' , '.del' , function(){

    const target=$(this).prevAll('.target').find('a').html()
    carList.forEach(function(item){
        if(item.gn==target){
         carList= carList.filter(function(items){
                return items!=item
            })
        }
    })
    window.localStorage.setItem('car', JSON.stringify(carList))
    bandCar()
    bandFoot()
})

// 判断全选
const checks=document.querySelectorAll('.check')
check=Array.from(checks)
let cheall=document.querySelector('.checall')

check.forEach(function(item){
    item.onclick=function(){
//         const checks=document.querySelectorAll('.check')
// check=Array.from(checks)
        let res=check.every(function(item){
            return item.checked
        })
        console.log(res)
        cheall.checked=res

    }
})

cheall.onclick=function(){
   for(let i=0 ; i<check.length ; i++){
        checks[i].checked=this.checked
    }
}



// $('.checall').click(function(){
//     $('.check').prop('checked' , $(this).prop('checked'))
// })

// $('.check').click(function(){
//     for(let i=0 ; i<$('.check').length ; i++){
//         if($($('.check')[i]).prop('checked')==false){
//             $('.checall').prop('checked' , 'false')
//         }
//     }
// })


// 计算总价格
function total(){
    let all=0
carList.forEach(function(item){
    const price=(item.gp*item.total).toFixed(1)-0
   
    all+=price
})

return all
}
//渲染页脚的部分
function bandFoot(){
    let to=total()
 
    let 
    str=`
    <div class="footer-check">
            </div>
            <div class="footer-count">
                <div>合计(不含运费):<div class="price">${parseInt(to)}</div>
                </div>
                <div>去结算</div>
            </div>
    `
    $('.footer').html(str)
}