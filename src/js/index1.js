// 把用户名随着登陆的用户更新用户
let user = localStorage.getItem('name')
if (user) {


    $('.up').css('display', 'none')
    $('.down').html(user)
} else {
    $('.up').html(user)
    $('.down').css('display', 'none')
}


// 轮播图配置
var swiper = new Swiper('.swiper-container-bannerlun', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    speed: 300,
    autoplay: {
        disableOnInteraction: false, //手动滑动之后不打断播放
        delay: 2000
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.btn-right',
        prevEl: '.btn-left',
    },
})


//点击搜索框

const search = document.querySelector('.search-input')
$('#search-sea').click(function () {
    const script = document.createElement('script')
    const url = `https://search-x.jd.com/Search?callback=bandHtml&area=1&enc=utf-8&keyword=${search.value}&adType=7&page=1&ad_ids=291%3A33&xtest=new_search&_=1607407438417`
    script.src = url
    document.body.appendChild(script)
    script.remove()
})

// 点击列表搜索
$('.left-sub a').click(function (e) {
    const script = document.createElement('script')
    const url = `https://search-x.jd.com/Search?callback=bandHtml&area=1&enc=utf-8&keyword=${$(this).text()}&adType=7&page=1&ad_ids=291%3A33&xtest=new_search&_=1607407438417`
    script.src = url
    document.body.appendChild(script)
    script.remove()
    document.documentElement.scrollTop = 700
    search.value = $(this).text()
})


//渲染结构
function bandHtml(a) {

    let data = a['291']
    if (data) {
        let str = ''
        data.forEach(element => {
            str += `
        <li class="main">
            <a href="#"  onclick=" return false;"><img src="//img10.360buyimg.com/n7/${element.image_url}"></a>
            <div class="main-detail">
                <div class="detail-title">${element.ad_title}</div>
                <div class="detail-price"><b class="price">￥${element.pc_price}</b class="price">
                    <div class="detail-car">加入购物车</div>
            </div>
        </li>
        `
        })
        $('.shopwrap').html(str)
        console.log(data)
    }


    // 返回的数据做一个数组，给详情页用的
}




// 分页器
var pageCount = 20;
icon_load(pageCount);
$(document).on("click", "#pageGro li", function () {
    var pageNum = parseInt($(this).html()); //获取当前页数
    var selector = $(this);
    const script = document.createElement('script')
    const url = `https://search-x.jd.com/Search?callback=bandHtml&area=1&enc=utf-8&keyword=${search.value}&adType=7&page=${pageNum}&ad_ids=291%3A33&xtest=new_search&_=1607407438417`
    script.src = url
    document.body.appendChild(script)
    script.remove()
    num_click(pageCount, pageNum, selector)
    document.documentElement.scrollTop = 700


})

//点击上一页触发
$(document).on("click", "#pageGro .pageUp", function () {
    var pageNum = parseInt($("#pageGro li.on").html()); //获取当前页
    var index = $("#pageGro ul li.on").index(); //获取index


    const script = document.createElement('script')
    const url = `https://search-x.jd.com/Search?callback=bandHtml&area=1&enc=utf-8&keyword=${search.value}&adType=7&page=${pageNum}&ad_ids=291%3A33&xtest=new_search&_=1607407438417`
    script.src = url
    document.body.appendChild(script)
    script.remove()

    pageUp_click(pageCount, pageNum, index);
    document.documentElement.scrollTop = 700


});

//点击下一页触发
$(document).on("click", "#pageGro .pageDown", function () {
    var pageNum = parseInt($("#pageGro li.on").html());
    var index = $("#pageGro ul li.on").index();
    const script = document.createElement('script')
    const url = `https://search-x.jd.com/Search?callback=bandHtml&area=1&enc=utf-8&keyword=${search.value}&adType=7&page=${pageNum}&ad_ids=291%3A33&xtest=new_search&_=1607407438417`
    script.src = url
    document.body.appendChild(script)
    script.remove()

    pageDown_click(pageCount, pageNum, index);
    document.documentElement.scrollTop = 700

});




let carList = []
if (window.localStorage.getItem('car')) {
    let tem = window.localStorage.getItem('car')
    let tem1 = JSON.parse(tem)
    tem1.forEach(item => {
        carList.push(item)
    })
}

//商品点击加入购物车时候数据储存到storage
$('.wrap').on('click', ' .detail-car', function () {
    goodImg = $(this).parent().parent().prev().find('img').attr('src')
    goodName = $(this).parent().prev().text()
    goodPrice = $(this).prev().html().replace('￥', '')

    // console.log(!(window.localStorage.getItem(goodName)))
    let flag = carList.some(function (item) {
        return item.gn == goodName
    })

    if (flag) {
        carList.filter(function (item) {
            if (item.gn == goodName) {
                item.total++
            }
        })
    } else {
        carList.push({
            gn: goodName,
            gi: goodImg,
            gp: goodPrice,
            total: 1
        })
    }

    window.localStorage.setItem('car', JSON.stringify(carList))

})


// 点击商品调到商品详情页的时候
    
$('.wrap').on('click', ' .detail-title', function ()  {
        let message=[]
     const goodImg = $(this).parent().prev().find('img').attr('src')
    const goodName = $(this).text()
    const goodPrice = $(this).next().find('b').html().replace('￥' ,'')
        console.log(goodName) 
        message.push({
           mingzi: goodName,
            tupian: goodImg,
            jiage: goodPrice,
          
        })
        
    window.localStorage.setItem('message', JSON.stringify(message))
    window.location.href='../pages/detail.html'

})
