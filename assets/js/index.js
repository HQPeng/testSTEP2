/**
 * 
 * @authors cherish yii2 (cherish@cherish.pw)
 * @date    2020-12-10 16:48:28
 * @version v1.0
 * @description the core js of todolist project
 * 
 * ━━━━━━神兽出没━━━━━━
 * 　　   ┏┓　 ┏┓
 * 　┏━━━━┛┻━━━┛┻━━━┓
 * 　┃              ┃
 * 　┃       ━　    ┃
 * 　┃　  ┳┛ 　┗┳   ┃
 * 　┃              ┃
 * 　┃       ┻　    ┃
 * 　┃              ┃
 * 　┗━━━┓      ┏━━━┛ Code is far away from bugs with the animal protecting.
 *       ┃      ┃     神兽保佑,代码无bug。
 *       ┃      ┃
 *       ┃      ┗━━━┓
 *       ┃      　　┣┓
 *       ┃      　　┏┛
 *       ┗━┓┓┏━━┳┓┏━┛
 *     　  ┃┫┫　┃┫┫
 *     　  ┗┻┛　┗┻┛
 *
 * ━━━━━━感觉萌萌哒━━━━━━
 */

// 请根据考试说明文档中列出的需求进行作答
// 预祝各位顺利通过本次考试，see you next week！
// ...


//添加事件
$('.ceshi').click(function(){
   const value=$('#title').val()//获取到文本框的的内容
    add(value)
    $('#title').val('')
})

//添加
function add(item){
    const lii=$(` <li>
    <input type="checkbox" />
    <p>${item}</p>
    <a href="javascript:remove(1)">-</a>
</li>`)
    $('#todolist').append(lii)
}



//根据li的数量变化，变化右上角
function numChange(){
    $('#todocount').html($('#todolist>li').length)
    $('#donecount').html($('#donelist>li').length)
}



// 点击复选框后将其移动到已经完成的列表(成功后总是默认是选中的状态)

    $('#todolist').on( 'click' , 'input',function(){
       if($(this).prop('checked')){
          // $(this).attr('checked' , 'false')
         $('#donelist').append($(this).parent())
         }
        
         numChange()
    })

    $('#donelist').on( 'click' , 'input',function(){
       
           // $(this).attr('checked' , 'false')
          $('#todolist').append($(this).parent())
          
         
          numChange()
     })



//点击编辑文本
    $('#todolist').on('click' , 'li>p' ,function(){
            // console.log($(this).parent()[0].nodeName)
            if($(this).parent()[0].nodeName=='INPUT') return
        const inp=$('<input type="text"  placeholder="添加ToDo"></input>')
        $(this).html('')
        $(this).wrap('<input class="ee" type="text"></input>')
        $(this).off('click')
    })

    $('#todolist').on('blur' , 'li .ee' ,function(){
            console.log(11)
            const value=$(this).val()
            const p=$(`<p>${value}</p>`)
            const par=$(this).parent()
            $(this).find('p').html(value)
            $(this).remove()
            par.append(p)
        
        }
    )
   
// function edit(1){
//     const inp=$('<input type="text"></input>')
//     $(this).html('')
//     $(this).append(inp)
// }

var cnt = $(".remove-just-this").contents();
$(".remove-just-this").replaceWith(cnt);


// 删除小按钮
$('ul a').click(function(e){
    e.stopPropagation()
    console.log($(this))
    $(this).parent().remove()
    numChange()
})

$('ol a').click(function(e){
    e.stopPropagation()
    console.log($(this))
    $(this).parent().remove()
    numChange()
})



// 跨域
// function a(item){
//     console.log(1)
//     console.log(JSON.parent(item))
// }