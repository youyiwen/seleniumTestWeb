/**
 * Created by lixuecheng on 2017/7/19.
 */
var baseuser={name:"",email:"",password:"",id:"",other:"",isused:"",lastlogintime:"",ismanager:"",isrem:"",alerttype:"",itemid:"",itemname:""};
var basedata={};

var tid=-1;
var pid=0;
var ass1=0;
var ass2=0;
var ass3=0;
var ass4=0;
var elements1={};
var pages1={};
var user1={};
var isshuaitem=true;
var cid=0;

var eles2={};
var acttionnum=0;
var adddatasource=0;
var stepid=0;
var alertftype=0;
var exptmp={a:-1,b:-1,c:-1,d:-1,e:-1,type:0};
var pretmp={a:-1,b:-1,c:-1,type:4};
var homeid=0;
var mele=0;
var int1=0;
var seriesold=[];
var int2=0;
var caseresold=[];
var labelid=0;
var fileid=0;
var isadd=0
var copyid=0;
var copyname="";









$(document).ready(function () {
    $(window).resize(function() {
        var ww=$(document.body).outerWidth(true);
      var vs=  $('.ui.sidebar').sidebar('is visible');
      if(vs){
          $('.pusher').animate({width:ww-150},10);
      }else {
          $('.pusher').animate({width:ww},10);
      }


    });



//关闭右键菜单，很简单
//     window.onclick=function(e){
//
// //用户触发click事件就可以关闭了，因为绑定在window上，按事件冒泡处理，不会影响菜单的功能
//         document.querySelector('#menu3').style.width=0;
//     }
    $.GetJSON('/com','version=0.2',function (a) {
        var c= localStorage.getItem('user');
        if(typeof(c)==="undefined"){
            alertf("账户异常");

        }else {
            var c3=uncompileStr(c);
            var  ju = s2j(c3);
            var u1=ju;
            baseuser.id=u1.id;
            baseuser.password=u1.password;
            baseuser.name=u1.name;
            baseuser.email=u1.email;
            baseuser.ismanager=u1.ismanager;
            baseuser.isused=u1.isused;
            baseuser.lastlogintime=u1.lastlogintime;
            baseuser.alerttype=ju.alerttype;
            baseuser.itemid=ju.itemid;
            baseuser.itemname=ju.itemname;
            baseuser.isrem=ju.isrem;

        }
            if(baseuser.name.length>0){
                $('#username').text(baseuser.name);
            }else {
                $('#username').text(baseuser.email);
            }
            if(baseuser.itemid!=-1){
                $('#choosei') .dropdown('set text',baseuser.itemname);
                tid=parseInt(baseuser.itemid);
            }else {
                tid=-1;
            }
            if(baseuser.ismanager==1){
                $('#u2').click(function () {
                    clickmanage();
                })
            }else {
                $('#log3').html('');
                $('#casehomemenu').html('');
            }
        $('.ui.modal').modal();
        $('.ui.accordion').accordion();
        $('.ui.dropdown').dropdown();
        var ww=$(document.body).outerWidth(true);
        $('.pusher').css('width', ww-150);
        switch(parseInt(baseuser.alerttype)){
            case 0:$('#al').text('alert提示');break;
            case 1:$('#al').text('页面提示');break;
            case 2:$('#al').text('console提示');break;
        }
        $.GetJSON("/item/userid/"+baseuser.id,"version=0.2",function (a) {
            var items=a;
                        var st='';
                        for(var i=0;i<items.length;i++){
                            st+="<div class=\"item\" data-value=\""+items[i].id+"\"  onclick='gettid("+items[i].id+",\""+items[i].name+"\")' >"+items[i].name+"</div>";
                        }
                        $('#itemc').html(st);
        },function (a) {
            switch (parseInt(a.status)){
                case 404:alertf(a.responseJSON.message);break;
                case 401:location.href='/';break;
                case 0:alertf("网络连接出错");break;
            }
        });


    },function (a) {
        alert("登录超时");
        location.href='/';

    });
});




$('#logout').click(function () {
    $.deleteJSON("/session", "time=" + Date.parse(new Date()), function (a) {
        location.href = '/';
    }, function (a) {
        location.reload();
    });
});

function gettid(a,b) {

    if(baseuser.itemid<0||baseuser.itemid==a){
        baseuser.itemid=a;
        baseuser.itemname=b;
    }else{
        baseuser.itemid=a;
        baseuser.itemname=b;
        $('#context').html("<h2 class=\"ui center aligned header\" style=\"margin-top: 7%\">已切换到项目："+b+"</h2>");
    }
    localStorage.setItem('user', compileStr(j2s(baseuser)));

}
function alertf(a) {
    if(alertftype==0){
        alert(a);
    }else {
        if(alertftype==1){
            $('#al2').text(a);
            showmsg1(1);

        }else {
            console.log(a);
        }

    }
}
function changealert() {



    if(baseuser.alerttype==0){
        $('#al').text('页面提示');
        baseuser.alerttype=1;
    }else {
        if(baseuser.alerttype==1){
            $('#al').text('console提示');
            baseuser.alerttype=2
        }else {
            baseuser.alerttype=0;
            $('#al').text('alert提示');
        }

    }

    localStorage.setItem('user', compileStr(j2s(baseuser)));
}
var aa={head:'1231',form:[{a0:[6,'名称','inpt','mname','名称','',''],a1:[12,'描述','inpt','mdes','描述','',''],size:2},{a0:[16,'111','se','sss','描述4','sss3','<div class="item" data-value="1">Mysql</div><div class="item" data-value="2">Sqlserver</div>'],size:1},{a0:[6,'名称','inpt','mname','名称','',''],a1:[12,'描述','inpt','mdes','描述','',''],size:2},{a0:[16,'111','se','sss','描述4','sss3','<div class="item" data-value="1">Mysql</div><div class="item" data-value="2">Sqlserver</div>'],size:1},{a0:[6,'名称','inpt','mname','名称','',''],a1:[12,'描述','inpt','mdes','描述','',''],size:2},{a0:[16,'111','se','sss','描述4','sss3','<div class="item" data-value="1">Mysql</div><div class="item" data-value="2">Sqlserver</div>'],size:1}]}
function openmodal(data) {


            $('#mhead').text(data.head);
var o=data.form;
var ss="";
for(var i=0;i<o.length;i++){
    ss+="<div class=\"fields\">";
        for(var j=0;j<o[i].size;j++){
            var s2='a'+j;
            var s1=o[i][s2];
            ss+="<div class=\""+num2en(s1[0])+" wide field\">";
            ss+="<label>"+s1[1]+"</label>";
            ss+=modaltype(s1[2],s1[3],s1[4],s1[5],s1[6]) +"</div>";
            
        }
        ss+=" </div>";
    }
    $('#mform').html(ss);
    $('.ui.dropdown') .dropdown();
    $('.ui.modal').modal('refresh');

    
}

function modaltype(a,id,c,seid,funse) {
    switch(a){
        case 'inpt':return "<input type=\"text\"" +" id=\""+id+"\""+" placeholder=\""+c +"\">";
        case 'inpp':return "<input type=\"password\"" +" id=\""+id+"\""+" placeholder=\""+c+"\">";
        case 'se': return "<div class=\"ui fluid search selection dropdown\" id=\""+id+"\">  <input type=\"hidden\"><i class=\"dropdown icon\"></i><div class=\"default text\">"+c+"</div> <div class=\"menu\"  id =\""+seid+"\"> "+funse+" </div> </div>";
        default: return "div";
    }
    
}

function num2en(a) {
    switch(a){
        case 1:return 'one';break;
        case 2:return 'two';break;
        case 3:return 'three';break;
        case 4:return 'four';break;
        case 5:return 'five';break;
        case 6:return 'six';break;
        case 7:return 'seven';break;
        case 8:return 'eight';break;
        case 9:return 'nine';break;
        case 10:return 'ten';break;
        case 11:return 'eleven';break;
        case 12:return 'twelve';break;
        case 13:return 'thirteen';break;
        case 14:return 'fourteen';break;
        case 15:return 'fifteen';break;
        case 16:return 'sixteen';break;
        default: return '';
    }
}
function base( table,addmethod,addname,tableid,isplus) {
    var table2=' <th style=\"width: 40px\">#</th>';
    var num=1;
    jQuery.each(table, function(i, val) {
        if(val.length<2){
            table2+="<th>"+i+"</th>";
        }else {
            table2+="<th style=\"width: "+val+"\">"+i+"</th>";
        }
        num++;


    });

    var re="<table class=\"ui very compact celled selectable  sortable single line table\"  style='z-index: 19' >\n" +
        "                    <thead>\n" +
        "                    <tr>\n" +
        table2+

        "                    </tr>\n" +
        "                    </thead>\n" +
        "                    <tbody id=\""+tableid+"\">\n" +
        "                    <tr>\n" +
        "\n" +
        "                        <td colspan=\""+num+"\">loading......</td>\n" +
        "                        \n" +
        "                    </tr>\n" +

        "\n" +
        "                    </tbody>\n" +
        "                    <tfoot class=\"full-width\">\n" +
        "\n" +
        "                    <tr>\n" +
        "\n" +
        "                        <th colspan=\""+num+"\">\n" +
        "                            <div class=\"ui right floated small primary labeled icon button\" id='myaddbutton' onclick='"+addmethod+"' ><i class=\""+(isplus?'plus icon':'radio icon')+"\"></i>"+addname+"</div>\n" +
        "                          \n" +
        "                        </th>\n" +
        "                    </tr>\n" +
        "                    </tfoot>\n" +
        "                </table>\n";

    return re;

}
/**
 *
 * @param name
 * @param url
 * @param act
 * @param id
 * @param before
 */
function shua(name,url,act,id,before) {
    $.GetJSON(url,'version=0.2',function (a) {
        var re= act(a);
        if(typeof(before)==="undefined" ||before.length==0 ){

            $('#'+id).html(re);
        }else{
            $('#'+id).html(before+re);
        }
        $('table').tablesort();
    },function (a) {
        switch (parseInt(a.status)){
            case 404:$('#'+id).html('无相关信息');break;
            case 401:location.href='/';break;
            case 0:alertf("网络连接出错");break;
            default:alertf(a.responseJSON.message);
        }
    });

}


function showmsg1(a) {
    if(a==1){
        $('#u2')
            .popup({
                popup : $('.custom.popup'),
                // on    : 'hover',
                 hoverable: false,
                inline     : true
                ,closable:true

                , delay: {
                    show: 100,
                    hide: 100
                }

            }).popup('show');
        pro1();
    }else {

       $('#u2').popup('hide');

    }
}
function pro1() {
    var
        $progress       = $(' .ui.progress')


    ;
    // restart to zero
    clearInterval(window.fakeProgress)

    $progress.progress('reset');

    // updates every 10ms until complete
    window.fakeProgress = setInterval(function() {
        $progress.progress('increment');

        // stop incrementing when complete
        if($progress.progress('is complete')) {
            clearInterval(window.fakeProgress);
            showmsg1(12);

        }
    }, 50);
    $(' .ui.progress')
        .progress({
            duration : 200,
            total    : 200
        });
}
;

function updateempty(a) {
    if(typeof(a)==="undefined"||a=='null'){
        return "";
    }else {
        return a;
    }
}
function is2cn(a,b) {
    if(a==b){
        return '是';
    }else {
        return '否';
    }
}

function celladd(a) {
    var ss='<tr>';
    jQuery.each(a, function(i, val) {

        if(i.charAt(0)=='z'){
            ss+="<td>"+val+"</td>";

        }else if(i.charAt(0)=='d'){
            ss+="<td>"+val.join(' ')+"</td>";


        }



    });
ss+='</tr>';
    return ss;
    
}
function clickmanage() {

    forfirstfun();
   var usertmp= base({用户名称:0,用户邮箱:0,最后登录时间:'200px',是否管理员:'80px',是否可用:'80px',操作:'80px'},'adduser()','添加用户','auser',true);
   var itemtmp= base({项目名称:0,首页链接:0,是否可用:'80px',操作:'80px'},'additem()','添加项目','aitem',true);

    var re="<div id='mett' class=\"ui top attached tabular menu\">\n" +
        "  <a class=\"active item\"  data-tab=\"first\">用户管理</a>\n" +
        "  <a class=\"item\" data-tab=\"second\" >项目管理</a>\n" +
        "  <a class=\"item  \" data-tab=\"third\"  >其他设置</a>\n" +
        "</div>\n" +
        "<div class=\"ui bottom attached active tab segment\" data-tab=\"first\">\n" +
        "(想要删除用户，请在数据表中操作)"+usertmp +
        "</div>\n" +
        "<div class=\"ui bottom attached tab segment\" data-tab=\"second\">\n" +
        "(想要删除项目，请在数据表中操作)"+
        itemtmp+
        "</div>\n" +
        "<div class=\"ui bottom attached tab segment\" data-tab=\"third\">\n" +
        "<div class=\"ui middle aligned divided list\">\n"+
        "  <div class=\"item\">\n"+
        "    <div class=\"right floated content\">\n"+
        "      <div class=\"ui button\"  onclick='clearIsused()'>清除</div>\n"+
        "    </div>\n"+

        "   <div class=\"header\">清除无用数据</div>为减少数据库的空间，清除isused字段为0的数据（用户和项目表除外），无法恢复，请慎重! "+
        "  </div>\n"+
        "  <div class=\"item\">\n"+
        "    <div class=\"right floated content\">\n"+
        "      <div class=\"ui button\"  onclick='stoprunningcase()'>强制处理</div>\n"+
        "    </div>\n"+

        "   <div class=\"header\">解决运行卡住的问题</div>在运行用例和调试用例时，会出现无法退出，或强制退出后，无法再运行的问题，此处强制终止。会影响到其他正在运行的用，请确保无人在使用，才去点击。 "+
        "  </div>\n"+
        "  <div class=\"item\">\n"+
        "    <div class=\"right floated content\">\n"+
        "      <div class=\"ui button disabled\">备用</div>\n"+
        "    </div>\n"+

        "   <div class=\"header\">备用</div>备用"+
        "  </div>\n"+
        "</div>"+
        "</div>";
    $('#context').html(re);
    $('#mett .item').tab();

    shua('usermaneger','/user',function (a) {
        var st='';
        var us={};
        var re='';
        for(var i=0;i<a.length;i++){

            var o=a[i];
            us['id'+a[i].id]=o;
            var cell={z1:i+1,z2:o.name,z3:o.email,z4:updateempty(o.lastlogintime),z5:is2cn(o.ismanager,1),z6:is2cn(o.isused,1),d1:["<button class=\"ui  circular basic icon button\" onclick=\"updateuser("+o.id+")\" title=\"修改用户\"><i class=\"paint brush icon\"></i></button>","<button class=\"ui circular basic icon button "+((o.isused=="0")?'disabled':'')+"\" onclick='removeuser("+o.id+")' title=\"禁用用户\"><i class=\"remove circle icon red\"></i></button>"]};
            re+=celladd(cell);


        }
        basedata['user']=us;

        return re;
    },'auser','');
    shua('itemmaneger','/item',function (a) {
        var st='';
        var us={};
        var re='';
        for(var i=0;i<a.length;i++){

            var o=a[i];
            us['id'+a[i].id]=o;
            //var itemtmp= base({项目名称:0,首页链接:0,参与用户:'200px',是否可用:'80px',操作:'80px'},'adduser','添加项目','aitem',true);

            var cell={z1:i+1,z2:o.name,z3:o.url,z6:is2cn(o.isused,1),d1:["<button class=\"ui  circular basic icon button\" onclick=\"updateuser("+o.id+"')\" title=\"修改项目\"><i class=\"paint brush icon\"></i></button>","<button class=\"ui circular basic icon button "+((o.isused=="0")?'disabled':'')+"\" onclick='removeuser("+o.id+")' title=\"禁用项目\"><i class=\"remove circle icon red\"></i></button>"]};
            re+=celladd(cell);


        }
        basedata['item']=us;

        return re;
    },'aitem','');
    $.GetJSON('/user/initem','version=0.2',function(a){
        basedata['userinitme']=a;

    },function (a){
        switch (parseInt(a.status)){
            case 404:alertf(a.responseJSON.message);break;
            case 401:location.href='/';break;
            case 0:alertf("网络连接出错");break;
            default:alertf(a.responseJSON.message);
        }
    } );


}



// function showidea(a) {
//     forfirstfun();
//     var rr=""
//     if(a=='1'){
//         rr=base("                        <th style=\"width: 40px\">#</th>\n" +
//             "                        <th >用户</th>\n" +
//             "                        <th >标题</th>\n" +
//             "                        <th >状态</th>\n" +
//             "                        <th >提交时间</th>\n" +
//             "                        <th >备注</th>\n" +
//             "                        <th >操作</th>\n"   ,7,'up()',"回到顶部",'tlog',"2a2");
//
//     }else {
//         rr=base("                        <th style=\"width: 40px\">#</th>\n" +
//             "                        <th >标题</th>\n" +
//             "                        <th >状态</th>\n" +
//             "                        <th >提交时间</th>\n" +
//             "                        <th >备注</th>\n" +
//             "                        <th >操作</th>\n",6,'up()',"回到顶部",'tlog',"2a2");
//     }
//
//     $('#context').html(rr);
//     $('#tlog').html('嘘~还没有写这个功能呢，等等');
//
//     //shualog();
//
//
// }

function showhelp(a) {
    if(a=='1'){
        //TODO
        window.open("/html/helpme.html");
    }else {
        window.open("/html/helpme.html");
    }

    
}

function ueswidth() {
    // var marginwidth= ($('#context').outerWidth(true)-$('#context'). outerWidth())/2;
    // if(marginwidth<=209){
    //     hidemenu();
    // }
}







function clickurl() {

    if(tid<1){
        alertf("请先选择项目~")

    }else {
        forfirstfun();
var re2="备注：可以使用正则表达式，正则部分使用（）包括，例如：http://www.baidu.com/(.*)"
        var re=base(  "                        <th style=\"width: 40px\">#</th>\n" +
            "                        <th  >URL</th>\n" +


            // "                        <th style=\"width: 60px\">查看用例</th>\n" +

            "                        <th style=\"width: 80px\">操作按钮</th>",4,'addURL()','添加链接','urlid');


        $('#context').html(re2+re);
        //    shuacasehome();
        shuaurl();

    }

}

function addURL() {
    if(isadd!=0){
        up();
    }else {
        if($('#urlid').html()=='无相关信息'){
            $('#urlid').html('');
        }

        $('#urlid').prepend("<tr><td>+</td><td><div class=\"ui input fluid\">\n"+
            "  <input type=\"text\" id='inu' placeholder=\"Url\">\n"+
            "</div></td><td><button class=\"ui  circular basic icon button\" onclick=\"updateeurl(-1)\" title=\"添加用例\"><i class=\"checkmark icon green\"></i></button>\n" +
            "                            <button class=\"ui circular basic icon button \" onclick='shuaurl()' title=\"返回\"><i class=\"reply icon\"></i></button></td></tr>");
        isadd=1;
        up();
    }




    
}
function openupdateeurl(a,b) {
    isadd=1;

 var url=$(b).parent().prev().text();
    $(b).parent().prev().html("<div class=\"ui input fluid\">\n"+
        "  <input type=\"text\" id='inu' value='"+url+"' placeholder=\"Url\">\n"+
        "</div>");
    $(b).parent().html("<button class=\"ui  circular basic icon button\" onclick=\"updateeurl("+a+")\" title=\"添加用例\"><i class=\"checkmark icon green\"></i></button>\n" +
        "                            <button class=\"ui circular basic icon button \" onclick='shuaurl()' title=\"返回\"><i class=\"reply icon\"></i></button>");



}

function removeeurl(a) {
    if (confirm("你确定要删除吗？")) {  $.get('/removeeurl/'+a,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
        var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
        alertf(o.msg);
        shuaurl();
    });}


}

function updateeurl(a){
    var inn=$.trim($('#inu').val());
    if(inn!=""){
        isadd=0;
        if(a==-1){
            a=0;

        }
        $.post('/updateeurl',{
            url:inn,
            tid:tid,
            type:a
        },function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
            var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}

            shuaurl();
            alertf(o.msg);

        });
    }else {
        alertf('输入信息不全，请检查');
    }





}

function shuaurl() {
    isadd=0;

    $.get('/geurls/'+tid,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
        var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
        if(o.isok!=0){
            alertf(o.msg);
        }else{
            var ccs=o.urls;

            if(ccs.length>0){
                var re="";

                for(var i=0;i<ccs.length;i++){

                    re+= "                    <tr>\n" +
                        "                        <td  >"+(i+1)+"</td>\n" +
                        "                        <td  >"+ccs[i].value2+"</td>\n" +


                        //  "                        <td  ><button class=\"ui  circular basic icon button\" onclick=\"choosecase("+cid2+")\" title=\"查看操作步骤\"><i class=\"indent icon\"></i></button></td>\n" +

                        "                        <td  ><button class=\"ui  circular basic icon button\" onclick=\"openupdateeurl("+ccs[i].value+",this)\" title=\"修改用例\"><i class=\"paint brush icon\"></i></button>\n" +
                        "                            <button class=\"ui circular basic icon button \" onclick='removeeurl("+ccs[i].value+")' title=\"删除用例\"><i class=\"remove circle icon red\"></i></button></td>" +


                        "                    </tr>\n";
                }
                $('#urlid').html(re);
                $('table').tablesort();
            }else{
                $('#urlid').html('无相关信息');
            }
        }
    });
    
}


function changeyan2() {
    var re=" <div class=\"ui segment\"><div class=\"ui form\">\n"+
        "            <div class=\"field\">\n"+
        "                <div class=\"fields\">\n"+
        "\n"+
        "                    <div class=\"four wide field\">\n"+
        "                        <div class=\"ui fluid search selection  dropdown\" id='sedatass'>\n"+
        "                            <input type=\"hidden\" name=\"country\" id='datass'>\n"+
        "                            <i class=\"dropdown icon\"></i>\n"+
        "                            <div class=\"default text\">选择数据库</div>\n"+
        "                            <div class=\"menu\" id='sedatas'>\n"+


        "\n"+
        "\n"+
        "                            </div>\n"+
        "                        </div>\n"+
        "                    </div>\n"+
        "\n"+
        "                    <div class=\"twelve wide field \" id='inputsql'>\n"+
        "                        <input type=\"text\"   placeholder=\"sql语句,例如：select a,b,c from d\" id='inputvsql'>\n"+
        "                    </div>\n"+
        "\n"+
        "                </div>\n"+
        "            <div class=\"field\">\n"+
        "                        <input type=\"text\"   placeholder=\"结果:多个结果验证，使用、（顿号）区分，例如：a=xxx、b=xxx、c=xxx\" id='vsql'>\n"+
        "                </div>\n"+

        "    </div></div>";


    $('#yanid').html(re);
    $.get('/getdatasource/'+tid,function (data,st) {
        if(st=="success"){

        }else {
            alertf("网站出错，请联系管理员");
            
        }
        var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
        if(o.isok!="0"){
            alertf(o.msg);
        }else {
            var v1=o.datasources;
            var v2="";
            for(var i=0;i<v1.length;i++){
                v2+="                                <div class=\"item\" data-value=\""+v1[i].id+"\">"+v1[i].name+"</div>\n"
            }
            $('#sedatas').html(v2);
            $('#sedatass').dropdown();
            if(exptmp.a!=-1&&exptmp.type==2){

                $('#sedatass').dropdown('set selected',exptmp.a);
                $('#inputvsql').val(exptmp.b);
                $('#vsql').val(exptmp.c);


            }



        }

$('#modal6').modal('refresh');
    });
    
}

function changeyan3() {
    var re=" <div class=\"ui segment\" style='margin: 1rem'><div class=\"ui form\">\n"+
        "            <div class=\"field\">\n"+
        "                <div class=\"fields\">\n"+
        "\n"+
        "                    <div class=\"four wide field\">\n"+
        "                        <div class=\"ui fluid search selection  dropdown\" id='sehttp'>\n"+
        "                            <input type=\"hidden\" name=\"country\" id='http'>\n"+
        "                            <i class=\"dropdown icon\"></i>\n"+
        "                            <div class=\"default text\">发送方式</div>\n"+
        "                            <div class=\"menu\" >\n"+
        "                                <div class=\"item\" data-value=\"1\">get</div>\n"+
        "                                <div class=\"item\" data-value=\"2\">post</div>\n"+


        "\n"+
        "\n"+
        "                            </div>\n"+
        "                        </div>\n"+
        "                    </div>\n"+
        "\n"+
        "                    <div class=\"twelve wide field \" id='urlid'>\n"+
        "                        <input type=\"text\"   placeholder=\"链接:http(s):\" id='urlv'>\n"+
        "                    </div>\n"+
        "\n"+
        "                </div>\n"+
        "            <div class=\"field\">\n"+
        "<label>传输内容，如有头文件，使用格式：HEAD{xxx:aaa&ccc:222}xxx=111&ccc=222</label>"+
        "<textarea id='areaid'></textarea>"+
        "                </div>\n"+
        "            <div class=\"field\">\n"+
        "                <label>值</label>\n"+
        "                <div class=\"fields\">\n"+
        "\n"+
        "                    <div class=\"four wide field\">\n"+
        "                        <div class=\"ui fluid search selection  dropdown\" id='setype3'>\n"+
        "                            <input type=\"hidden\" name=\"country\" id='type3'>\n"+
        "                            <i class=\"dropdown icon\"></i>\n"+
        "                            <div class=\"default text\">选择类型</div>\n"+
        "                            <div class=\"menu\">\n"+
        "                                <div class=\"item\" data-value=\"1\">等于</div>\n"+
        "                                <div class=\"item\" data-value=\"2\">不等于</div>\n"+
        "                                <div class=\"item\" data-value=\"3\">包含</div>\n"+
        "                                <div class=\"item\" data-value=\"4\">不包含</div>\n"+
        "\n"+
        "\n"+
        "                            </div>\n"+
        "                        </div>\n"+
        "                    </div>\n"+
        "\n"+
        "                    <div class=\"twelve wide field \" id='input2'>\n"+
        "                        <input type=\"text\"   placeholder=\"值的内容\" id='inputv3'>\n"+
        "                    </div>\n"+
        "\n"+
        "                </div>\n"+
        "            </div>\n"+

        "    </div></div>";


    $('#yanid').html(re);
    $('#sehttp').dropdown();
    $('#setype3').dropdown();
    if(exptmp.a!=-1&&exptmp.type==3){
        $('#sehttp').dropdown('set selected',exptmp.a);
        $('#setype3').dropdown('set selected',exptmp.d);
        $('#areaid').val(exptmp.c.toString().replace(/<br\/>/g,"\n"));
        $('#urlv').val(exptmp.b);
        $('#inputv3').val(exptmp.e);
    }
    $('#modal6').modal('refresh');

}

function changeyan4() {
    $('#yanid').html('');
     exptmp={a:-1,b:-1,c:-1,d:-1,e:-1,type:0};
    $('#modal6').modal('refresh');

}

function shualabel() {
    $.get('/getlabel/'+tid,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
        var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
        if(o.isok!=0){
            alertf(o.msg);
        }else{
            var ccs=o.labels;

            if(ccs.length>0){
                var re="";

                for(var i=0;i<ccs.length;i++){
                    var cid2="\'"+ccs[i].cids+"\',"+ccs[i].id;
                    var aac=ccs[i].id+",'"+ccs[i].name+"','"+ccs[i].des+"'";
                    re+= "                    <tr>\n" +
                        "                        <td  >"+(i+1)+"</td>\n" +
                        "                        <td  >"+ccs[i].name+"</td>\n" +
                        "                        <td  >"+ccs[i].des+"</td>\n" +

                      //  "                        <td  ><button class=\"ui  circular basic icon button\" onclick=\"choosecase("+cid2+")\" title=\"查看操作步骤\"><i class=\"indent icon\"></i></button></td>\n" +

                        "                        <td  ><button class=\"ui  circular basic icon button\" onclick=\"updatelabel("+aac+")\" title=\"修改用例\"><i class=\"paint brush icon\"></i></button>\n" +
                        "                            <button class=\"ui circular basic icon button \" onclick='removelabel("+ccs[i].id+")' title=\"删除用例\"><i class=\"remove circle icon red\"></i></button></td>" +


                        "                    </tr>\n";
                }
                $('#labelid').html(re);
                $('table').tablesort();
            }else{
                $('#labelid').html('无相关信息');
            }
        }
    });
}

    function clicklabel() {
        if(tid<1){
            alertf("请先选择项目~")

        }else {
            forfirstfun();

            var re=base(  "                        <th style=\"width: 40px\">#</th>\n" +
                "                        <th  style=\"width: 25%\">标签名称</th>\n" +
                "                        <th   style='min-width: 100px'>标签描述</th>\n" +

                // "                        <th style=\"width: 60px\">查看用例</th>\n" +

                "                        <th style=\"width: 80px\">操作按钮</th>",4,'addlabel()','添加标签','labelid');


            $('#context').html(re);
        //    shuacasehome();
            shualabel();

        }

};

function changeyan1() {
    var re=   " <div class=\"ui segment\"><div class=\"ui form\">\n"+
        "            <div class=\"three fields\">\n"+
        "                <div class=\"field\">\n"+
        "                    <label>页面(必须选择当前页面)</label>\n"+
        "                    <div class=\"ui fluid search selection  dropdown\" id='sepage2'>\n"+
        "                        <input type=\"hidden\" onchange='changepage2(this)' id='page2v' name=\"country\">\n"+
        "                        <i class=\"dropdown icon\"></i>\n"+
        "                        <div class=\"default text\">选择页面...</div>\n"+
        "                        <div class=\"menu\" id='addpage2'>\n"+


        "                        </div>\n"+
        "                        </div>\n"+
        "                </div>\n"+
        "                <div class=\"field\">\n"+
        "                    <label>元素</label>\n"+
        "                    <div class=\"ui fluid search selection disabled dropdown\" id='seele2'>\n"+
        "                        <input type=\"hidden\" onchange='changeele2(this)' id='ele2v'>\n"+
        "                        <i class=\"dropdown icon\"></i>\n"+
        "                        <div class=\"default text\">选择元素...</div>\n"+
        "                        <div class=\"menu\" id='addele2'>\n"+

        "                        </div>\n"+
        "                    </div>\n"+
        "                </div>\n"+
        "                <div class=\"field\">\n"+
        "                    <label>操作</label>\n"+
        "                    <div class=\"ui fluid search selection disabled dropdown\" id='seact2'>\n"+
        "                        <input type=\"hidden\" name=\"country\" onchange='changeact2(this)' id='act2v'>\n"+
        "                        <i class=\"dropdown icon\"></i>\n"+
        "                        <div class=\"default text\">选择操作...</div>\n"+
        "                        <div class=\"menu\" id='addact2'>\n"+
        "                                <div class=\"item\" data-value=\"7\">存在</div>\n"+
        "                                <div class=\"item\" data-value=\"8\">获取文本</div>\n"+
        "                                <div class=\"item\" data-value=\"9\">获取输入值</div>\n"+
        "                                <div class=\"item\" data-value=\"10\">获取文本（alert）</div>\n"+
        "                                <div class=\"item\" data-value=\"11\">可用</div>\n"+
        "                                <div class=\"item\" data-value=\"12\">被选中</div>\n"+


        "                        </div>\n"+
        "                    </div>\n"+
        "                </div>\n"+
        "            </div>\n"+
        "            <div class=\"field\">\n"+
        "                <label>值</label>\n"+
        "                <div class=\"fields\">\n"+
        "\n"+
        "                    <div class=\"four wide field\">\n"+
        "                        <div class=\"ui fluid search selection disabled dropdown\" id='setype2'>\n"+
        "                            <input type=\"hidden\" name=\"country\" id='type2'>\n"+
        "                            <i class=\"dropdown icon\"></i>\n"+
        "                            <div class=\"default text\">选择类型</div>\n"+
        "                            <div class=\"menu\">\n"+
        "                                <div class=\"item\" data-value=\"1\">等于</div>\n"+
        "                                <div class=\"item\" data-value=\"2\">不等于</div>\n"+
        "                                <div class=\"item\" data-value=\"3\">包含</div>\n"+
        "                                <div class=\"item\" data-value=\"4\">不包含</div>\n"+
        "\n"+
        "\n"+
        "                            </div>\n"+
        "                        </div>\n"+
        "                    </div>\n"+
        "\n"+
        "                    <div class=\"twelve wide field disabled\" id='input2'>\n"+
        "                        <input type=\"text\"   placeholder=\"值的内容\" id='inputv2'>\n"+
        "                    </div>\n"+
        "\n"+
        "                </div>\n"+
        "            </div>\n"+
        "    </div></div>";
    $('#yanid').html(re);
    $('.dropdown').dropdown();
    $.get('/gpage/'+tid,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
        
        var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
        if(o.isok!=0){
            alertf(o.msg);
        }else{
            var pages2=o.pages;
            var re="";
            for(var i=0;i<pages2.length;i++){
re+= "<div class=\"item\" data-value=\""+pages2[i].id+"\">"+pages2[i].pagename+"</div>\n"


            }
            $('#addpage2').html(re);
            $('#sepage2').dropdown();
            if(exptmp.a!=-1&&exptmp.type==1){
               // console.log($('#sepage2').text()+":"+exptmp.a)


                $('#sepage2').dropdown('set selected',exptmp.a);

            }


        }

    })
    
}



function changepage2(a) {
    $('#seele2').dropdown('clear');
    var va=$(a).val();

    $('#seele2').removeClass('disabled');

    $.get('/gele/'+va+"/"+tid,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
        var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
        if(o.isok!=0){
            alertf(o.msg);
        }else{
            var eles2=o.elements;
            var re="";
            for(var i=0;i<eles2.length;i++){
                re+= "<div class=\"item\" data-value=\""+eles2[i].id+"\">"+eles2[i].name+"</div>\n"


            }
            $('#addele2').html(re);

            if(exptmp.b!=-1){
                $('#seele2').dropdown();
                $('#seele2').dropdown('set selected',exptmp.b);
            }
        }
    });

    
}

function changeele2(a) {
    $('#seact2').dropdown('clear');
    var va=$(a).val();
    $('#seact2').removeClass('disabled');
    if(va!=""){







        if(exptmp.c!=-1){
            $('#seact2').dropdown();
            $('#seact2').dropdown('set selected',exptmp.c);
            if(exptmp.c=="8"||exptmp.c=="9"||exptmp.c=="10"){
                $('#setype2').dropdown();
                $('#setype2').dropdown('set selected',exptmp.d);
                $('#inputv2').val(exptmp.e);
            }
            exptmp={a:-1,b:-1,c:-1,d:-1,e:-1};
        }

    }



    
}

function changeact2(a) {
    $('#setype2').dropdown('clear');
    $('#inputv2').val('');
    var va=$(a).val();
    if(va=="8"||va=="9"||va=="10"){
        $('#setype2').removeClass('disabled');
        $('#input2').removeClass('disabled');
    }else {
        $('#setype2').addClass('disabled');
        $('#input2').addClass('disabled');

    }
}


function getyan1() {
    var page=$('#page2v').val();
    var ele=$('#ele2v').val();
    var act=$('#act2v').val();
    var type2=$('#type2').val();
    var inp=$.trim($('#inputv2').val());
    if(page==""||ele==""||act==""){
        return false;

    }else {
        if(act=="5"){
            if(type2==""||inp==""){
                return false;
            }else {
                return {a:page,b:ele,c:act,d:type2,e:inp,type:1,sid:stepid};
            }

        }else{
            return {a:page,b:ele,c:act,d:type2,e:inp,type:1,sid:stepid};

        }

    }

}
function getyan2() {
    var data=$('#datass').val();
    var inp=$.trim($('#inputvsql').val());
    var inp2=$.trim($('#vsql').val());


    if(data==""||inp==""||inp2==""){
        return false;

    }else {

            return {a:data,b:inp,c:inp2,d:-1,e:-1,type:2,sid:stepid};

    }

}


function getyan3() {
    var http=$('#http').val();
    var type=$('#type3').val();
    var area=$.trim($('#areaid').val());
    var url=$.trim( $('#urlv').val());
    var inp=$.trim($('#inputv3').val());




    if(http==""||inp==""||type==""||url==""){
        return false;

    }else {

        return {a:http,b:url,c:area,d:type,e:inp,type:3,sid:stepid};

    }

}




function forfirstfun(a) {
    ueswidth();
    if(a===1){

    }else {
        int1=window.clearInterval(int1);
    }

}

function up() {
    $("html,body").animate({scrollTop:0}, 500);
}

function clicklog() {
    forfirstfun();
    var log1=base("                        <th style=\"width: 40px\">#</th>\n" +
        "                        <th >用户名称</th>\n" +
        "                        <th >用户邮箱</th>\n" +
        "                        <th >操作时间</th>\n" +
        "                        <th >操作内容</th>\n" +
        "                        <th style=\"width: 80px\">数据库id</th>\n",6,'up()',"回到顶部",'tlog',"2a2");
    $('#context').html(log1);
    shualog();

}

function clickfile() {
    if(tid<1){
        alertf("请先选择项目~")
    }else{
        forfirstfun();
        var log1=base("                        <th style=\"width: 40px\">#</th>\n" +
            "                        <th >文件名称</th>\n" +
            "                        <th >文件大小</th>\n" +
            "                        <th >上传人</th>\n" +
            "                        <th >上传时间</th>\n" +
            "                        <th style=\"width: 80px\">操作</th>\n" ,6,'addfile(0)',"添加文件",'tfile');
        $('#context').html("(上传文件要求大小不大于10M，如果有大文件或者大量文件，请联系管理员)"+log1+"<input type='file' id='fileupload' onchange='changefile()' style='display: none'>");
        shuafile();
    }


}
function changefile(){
    var f1=$('#fileupload').get(0).files[0];
 if(f1.size>10485750){
     alertf("文件过大，无法上传，请联系管理员处理");
     return 0;
 }else {
     if(f1.size==0){
         alertf("文件为空，无法上传");
         return 0;
     }
 }

    var formData = new FormData();
    formData.append("file",f1);
    $.ajax({
        url:  "/upload/"+fileid+"/"+tid,
        type: 'POST',
        cache: false,
        data: formData,
        processData: false,
        contentType: false,

        beforeSend: function(){
           $('#myaddbutton').addClass('loading');
        },
        success : function(data,st) {
            if(st=="success"){}else {alertf("网站出错，请联系管理员");}
            var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
            $('#myaddbutton').removeClass('loading');
           var file= $('#fileupload');

            file.after(file.clone().val(""));
            file.remove();
            alertf(o.msg);
            shuafile();



        }
    });


}

function addfile(a) {
    fileid=a;
    $('#fileupload').click();
    
}

function shuafile() {

    $.get('/getfile/'+tid,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
        var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
        if(o.isok!=0){
            alertf(o.msg);
        }else{
            var users1=o.files;

            var re2="";
            if(users1.length>0){


                for(var i=0;i<users1.length;i++){
                    var si=users1[i].size;
                   if(si>1023){
                       if(si>1048575){
                           si=(si/1024/1024).toFixed(2)+"MB";
                       }else {
                           si=(si/1024).toFixed(2)+"KB";

                       }

                   }else {
                       si=si+'B';
                   }

                    re2+= "                    <tr>\n" +
                        "\n" +
                        "                        <td  >"+(i+1)+"</td>\n" +
                        "                        <td  >"+users1[i].name+"</td>\n" +
                        "                        <td  >"+si+"</td>\n" +
                        "                        <td  >"+users1[i].user+"</td>\n" +
                        "                        <td  >"+users1[i].time+"</td>\n" +
                        "                        <td  ><a class=\"ui  circular basic  icon button\" href=\"/Download/"+users1[i].id+"/"+users1[i].name+"/filename\"  title=\"下载文件\"><i class=\"download icon\"></i></a>" +
                        "<button class=\"ui  circular basic  icon button\" onclick=\"addfile("+users1[i].id+")\" title=\"修改文件\"><i class=\"paint brush icon\"></i></button>\n" +
                        "                            <button class=\"ui circular basic icon button \" onclick='removefile("+users1[i].id+")' title=\"删除文件\"><i class=\"remove circle icon red\"></i></button></td>\n" +


                        "                    </tr>\n";

                }
                $('#tfile').html(re2);

                $('table').tablesort();

            }else{
                $('#tfile').html('无相关信息');
            }
        }

    });
}


function downloadfile(a,b) {
     $.get('/Download/'+a+'/'+b+'/'+'filename',function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
        // var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
        // if(o.isok=="1"){
        //     alertf(o.msg);
        // }


    });
}

function removefile(a) {
    if (confirm("你确定要删除吗？")) {  $.get('/removefile/'+a,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
        var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
        alertf(o.msg);
        shuafile();
    });}

    
}
function clickslog() {
    forfirstfun();
    var log1=base("                        <th style=\"width: 40px\">#</th>\n" +
        "                        <th >用户名称</th>\n" +
        "                        <th >用户邮箱</th>\n" +
        "                        <th >操作时间</th>\n" +
        "                        <th >操作内容</th>\n" +
        "                        <th style=\"width: 80px\">数据库id</th>\n"+
    "                        <th style=\"width: 80px\">当前状态</th>\n",7,'up()',"回到顶部",'tlog',"2a2");
    $('#context').html(log1);
    shuaslog();

}



function stoprunningcase() {
    $.post('/stoprunningcase',{mimi:compileStr(Date.parse(new Date())/1000+'')},function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
        var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
        alertf(o.msg);
    });
    
}

function clearIsused() {
    $.post('/clearisused',{mimi:compileStr(Date.parse(new Date())/1000+'')},function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
        var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
        alertf(o.msg);
    });

}


function runcase(a,b) {
    $.get('/testcase/'+a+"/"+tid+"/"+b,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
        var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
        alertf(o.msg);
    });
}

function lookruncase(a) {
    // $.get('/looktestcase/'+a,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}if(st=="success"){}else {alertf("网站出错，请联系管理员");}
    //     var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
    //     if(o.isok=="4"){
    //         alertf(o.msg);
    //
    //     }else {
    //         if(o.res==0){
    //         alertf("没有可查看的用例");
    //         }else{
    Cookies.set('log',a+"qbwd90211j1qwdsqjwe1me01"+tid);
                window.open("/html/log.html");
    //         }
    //     }
    //
    // });
}


function shuauser() {

    $.get('/getuser',function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
        var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
        if(o.isok!=0){
            alertf(o.msg);
        }else{
            var users1=o.users;
            user1=users1;
            var re2="";
            if(users1.length>0){
                for(var i=0;i<users1.length;i++){

                    re2+= "                    <tr>\n" +
                        "\n" +
                        "                        <td  >"+(i+1)+"</td>\n" +
                        "                        <td  >"+((users1[i].name=='null')?'':users1[i].name)+"</td>\n" +
                        "                        <td  >"+users1[i].email+"</td>\n" +
                        "                        <td  >"+((users1[i].lastlogintime=='null')?'':users1[i].lastlogintime)+"</td>\n" +
                        "                        <td  >"+(users1[i].ismanager=="1")+"</td>\n" +
                        "                        <td  >"+(users1[i].isused=="0")+"</td>\n" +
                        "                        <td  ><button class=\"ui  circular basic icon button\" onclick=\"updateuser("+users1[i].id+","+users1[i].ismanager+",'"+users1[i].name+"','"+users1[i].email+"')\" title=\"修改用户\"><i class=\"paint brush icon\"></i></button>\n" +
                        "                            <button class=\"ui circular basic icon button "+((users1[i].isused=="0")?'disabled':'')+"\" onclick='removeuser("+users1[i].id+")' title=\"禁用用户\"><i class=\"remove circle icon red\"></i></button></td>\n" +

                        "                    </tr>\n";

                }
                $('#tuser').html(re2);
                $('table').tablesort();

            }else{
                $('#tuser').html('无相关信息');
            }
        }

    });
    
}

function shualog() {

    $.get('/getlog',function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
        var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
        if(o.isok!=0){
            alertf(o.msg);
        }else{
            var users1=o.logs;

            var re2="";
            if(users1.length>0){
                for(var i=0;i<users1.length;i++){

                    re2+= "                    <tr>\n" +
                        "\n" +
                        "                        <td  >"+(i+1)+"</td>\n" +
                        "                        <td  >"+users1[i].name+"</td>\n" +
                        "                        <td  >"+users1[i].user+"</td>\n" +
                        "                        <td  >"+users1[i].time+"</td>\n" +
                        "                        <td  >"+users1[i].log+"</td>\n" +
                        "                        <td  >"+users1[i].id+"</td>\n" +

                        "                    </tr>\n";

                }
                $('#tlog').html(re2);

                $('table').tablesort();

            }else{
                $('#tlog').html('无相关信息');
            }
        }

    });

}

function shuaslog() {

    $.get('/getslog',function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
        var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
        if(o.isok!=0){
            alertf(o.msg);
        }else{
            var users1=o.logs;

            var re2="";
            if(users1.length>0){
                for(var i=0;i<users1.length;i++){
                    rr2="";
                    switch (users1[i].status){
                        case "1":rr2="<div  title='点击修改状态' style='color: red' onclick='changedo("+users1[i].id+")'>未处理</div>";break;
                        case "2":rr2="<div style='color: green'>已处理</div>";break;
                    }

                    re2+= "                    <tr>\n" +
                        "\n" +
                        "                        <td  >"+(i+1)+"</td>\n" +
                        "                        <td  >"+users1[i].name+"</td>\n" +
                        "                        <td  >"+users1[i].user+"</td>\n" +
                        "                        <td  >"+users1[i].time+"</td>\n" +
                        "                        <td  >"+users1[i].log+"</td>\n" +
                        "                        <td  >"+users1[i].id+"</td>\n" +
                        "                        <td  >"+rr2+"</td>\n" +

                        "                    </tr>\n";

                }
                $('#tlog').html(re2);

                $('table').tablesort();

            }else{
                $('#tlog').html('无相关信息');
            }
        }

    });

}

function changedo(a) {
    $.get('/updatelid/'+a,function (data,st) {
        if (st == "success") {
        } else {
            alertf("网站出错，请联系管理员");
        }
        var o = $.parseJSON(data);
        if (o.isok == "3") {
            location.href = '/';
            return false;
        }
        alertf(o.msg);
        shuaslog();

    });
}
// function shwomenu() {
//     $('#menu1').css('display','block');
//     $('#showmenu').css('display','none');
// }
function hidemenu() {
    $('#menu1').css('display','none');
    $('#showmenu').css('display','block');
}

function shuastep() {

    $.get('/getstep/'+cid,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
        var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
        if(o.isok!=0){
            alertf(o.msg);
        }else{
            var users1=o.steps;

            var re2=""
           if(users1.length>0) {
               for (var i = 0; i < users1.length; i++) {

                   re2 += "                    <tr>\n" +
                       "\n" +
                       "                        <td  >" + (i + 1) + "</td>\n" +
                       "                        <td  >"+users1[i].pagename+"</td>\n" +
                       "                        <td  >" + users1[i].ename + "</td>\n" +
                       "                        <td  >" + in2st4action(users1[i].catid) + "</td>\n" +
                       "                        <td  >" + (users1[i].value == 'null' ? '' : users1[i].value) + "</td>\n" +
                       "                        <td  ><button class=\"ui circular basic icon button \" onclick='showexp("+users1[i].id+")' title=\"设置期望结果\"><i class=\"align justify icon\"></i></button></td>\n" +
                       "                        <td  ><button class=\"ui  circular basic icon button addstep1\" "+(users1[i].type==9?"style='display: none'":"")+"  onclick='addNowStep("+(i+1)+",this,"+users1[i].id+","+users1[i].step+")' title=\"添加\"><i class=\"plus icon green\"></i></button>" +
                       "<button class=\"ui  circular basic icon button\" onclick=\"updatestep(this,"+users1[i].id+","+(i+1)+","+users1[i].eid+","+users1[i].catid+",'"+users1[i].value+"')\" title=\"修改\"><i class=\"paint brush icon\"></i></button>\n" +
                       "                            <button class=\"ui circular basic icon button \" onclick='removestep("+users1[i].id+")' title=\"删除\"><i class=\"remove circle icon red\"></i></button></td>\n" +

                       "                    </tr>\n";

               }
               $('#stepid').html(re2);
               $('table').tablesort();
               $('.ui.dropdown').dropdown();
           }else {
                re2="                    <tr>\n" +
                    "\n" +
                    "                        <td  >" + 1 + "</td>\n" +
                    "                        <td  ><div id='pagename2'></div>"+
                    "</td>\n" +
                    "                        <td  ><div class=\"ui selection dropdown\" id='seele'>\n"+
                    "  <input type=\"hidden\"  id='elev' name=\"ele\">\n"+
                    "  <div class=\"default text\">元素</div>\n"+
                    "  <i class=\"dropdown icon\"></i>\n"+
                    "  <div class=\"menu\" id='eleg'>\n"+


                    "  </div>\n"+
                    "</div></td>\n" +
                    " <td  ><div class=\"ui selection dropdown \" id='actid' style='min-width: 9em'>\n"+
                    "  <input type=\"hidden\" onchange='changeact(this)' id='actv' name=\"act\">\n"+
                    "  <div class=\"default text\">操作</div>\n"+
                    "  <i class=\"dropdown icon\"></i>\n"+
                    "  <div class=\"menu\" id='actg'>\n"+


                    "    <div class=\"item\" data-value=\"1\">点击</div>\n"+
                    "    <div class=\"item\" data-value=\"2\">输入内容</div>\n"+
                    "    <div class=\"item\" data-value=\"3\">清除</div>\n"+
                    "    <div class=\"item\" data-value=\"4\">上传文件</div>\n"+
                    "    <div class=\"item\" data-value=\"5\">确认（alert）</div>\n"+
                    "    <div class=\"item\" data-value=\"6\">取消（alert）</div>\n"+


                    "  </div>\n"+
                    "</div></td>\n" +
                    "                        <td  >  <div class=\"ui fluid input disabled  \" id='inputv'>\n"+
             //  "  <input type=\"text\"  placeholder=\"输入值\" id='inputv2'>\n"+

               "</div></td>\n" +
                    "                        <td  ><button class=\"ui circular basic icon button disabled\" title=\"设置期望结果\"><i class=\"align justify icon\"></i></button></td>\n" +
                    "                        <td  ><button class=\"ui  circular basic icon button\" onclick=\"addstep(1)\" title=\"确认\"><i class=\"checkmark icon green\"></i></button>"+
                    // "<button class=\"ui  circular basic icon button \" style='display: none' onclick=\"\" title=\"修改用户\"><i class=\"paint brush icon\"></i></button>\n" +
                     //"                            <button class=\"ui circular basic icon button \"  onclick='' title=\"取消\"><i class=\"remove circle icon red\"></i></button>" +
                    "</td>\n" +

                    "                    </tr>\n";

               $('#stepid').html(re2);
             //  $('table').tablesort();
               shuapageinfo();
               $('.ui.dropdown').dropdown();


           }
          //  }else{
         //       $('#stepid').html('无相关信息');
          //  }
        }

    });

}


function lookpre(a) {
    cid=a;
$.get('/getprecondition/'+cid,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
    var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
var pres=o.pre;

if(pres.length==0){
    pretmp={a:-1,b:-1,c:-1,type:4};
}else {
    if(pres[0].type==1){
        pretmp={a:pres[0].a,b:pres[0].b,c:pres[0].c,type:pres[0].type};
        $('#yu11').checkbox('check');
    }else {
        if(pres[0].type==2){
            pretmp={a:pres[0].a,b:pres[0].b,c:pres[0].c,type:pres[0].type};
            $('#yu22').checkbox('check');
        }else {
            if(pres[0].type==3){
                pretmp={a:pres[0].a,b:pres[0].b,c:pres[0].c.replace(/<br\/>/g,"\n").replace(/&quot;/g,"\"").replace(/&apos;/g,"'").replace(/&dakuohao1/g,"{").replace(/&dakuohao2/g,"}").replace(/&fanxiegang/g,"\\"),type:pres[0].type};
                $('#yu33').checkbox('check');
            }else {
                pretmp={a:-1,b:-1,c:-1,type:4};
            }
        }
    }

}



});
    $('#modal8').modal('show');
    
}

function changeyu4() {
    pretmp={a:-1,b:-1,c:-1,type:4};
    $('#yuid').html('');
    $('#modal8').modal('refresh');
    
}

function getyu1() {
    var case1=$('#case2v').val();
    if(case1==""){
        return false;
    }else {
        return {a:case1,b:-1,c:-1,type:1,cid:cid};
    }
    
}


function changeyu1() {
    var re=   " <div class=\"ui segment\"><div class=\"ui form\">\n"+

        "                <div class=\"field\">\n"+
        "                    <label>用例</label>\n"+
        "                    <div class=\"ui fluid search selection  dropdown\" id='secase2'>\n"+
        "                        <input type=\"hidden\"  id='case2v' name=\"country\">\n"+
        "                        <i class=\"dropdown icon\"></i>\n"+
        "                        <div class=\"default text\">选择用例...</div>\n"+
        "                        <div class=\"menu\" id='addcase2'>\n"+


        "                        </div>\n"+
        "                        </div>\n"+
        "                        </div>\n"+


        "    </div></div>";
    $('#yuid').html(re);


    $.get('/getcase/2/'+tid,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
        var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
        var cc=o.cases;
        var v1="";
        for(var i=0;i<cc.length;i++){
            v1+="<div class=\"item\" data-value=\""+cc[i].id+"\">"+cc[i].name+"</div>\n";
        }

        $('#addcase2').html(v1);
        $('.dropdown').dropdown();
        if(pretmp.type==1&&pretmp.a!=-1){
            $('#secase2').dropdown('set selected',pretmp.a);
        }
        $('#modal8').modal('refresh');
    });


    
}



function getyu2() {
    var data=$('#datass').val();
    var sql=$.trim($('#areaid').val());
    if(data==""||sql==""){
        return false;
    }else{
        return {a:data,b:sql,c:-1,type:2,cid:cid};
    }
}

function changeyu2() {
    var re=" <div class=\"ui segment\"><div class=\"ui form\">\n"+

        "            <div class=\"field\">\n"+
        "   <div class=\"ui fluid search selection  dropdown\" id='sedatass'>\n"+
    "                            <input type=\"hidden\" name=\"country\" id='datass'>\n"+
    "                            <i class=\"dropdown icon\"></i>\n"+
    "                            <div class=\"default text\">选择数据库</div>\n"+
    "                            <div class=\"menu\" id='sedatas'>\n"+


    "\n"+
    "\n"+
    "                            </div>\n"+
    "                        </div>\n"+
        "                </div>\n"+
        "            <div class=\"field\">\n"+
        "<label>sql语句，有多句使用;（英文分号）隔开</label>"+
        "<textarea id='areaid'></textarea>"+
        "                </div>\n"+

        "    </div></div>";
    $('#yuid').html(re);
    $.get('/getdatasource/'+tid,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
        var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
        if(o.isok!="0"){
            alertf(o.msg);
        }else {
            var v1=o.datasources;
            var v2="";
            for(var i=0;i<v1.length;i++){
                v2+="                                <div class=\"item\" data-value=\""+v1[i].id+"\">"+v1[i].name+"</div>\n"
            }
            $('#sedatas').html(v2);
            $('#sedatass').dropdown();
            if(pretmp.a!=-1&&pretmp.type==2){

                $('#sedatass').dropdown('set selected',pretmp.a);

                $('#areaid').val(pretmp.b.toString().replace(/<br\/>/g,"\n").replace(/%25/g,"\"").replace(/%26/g,"'"));



            }



        }

        $('#modal8').modal('refresh');
    });


}

function getyu3() {
    var typeh=$('#http').val();
    var url=$.trim($('#urlv').val());
    var body=$.trim($('#areaid').val());
    if(typeh==""||url==""||body==""){
        return false;
    }else {
           return {a:typeh,b:url,c:body,type:3,cid:cid};
    }

}

function changeyu3() {
    var re=" <div class=\"ui segment\" style='margin: 1rem'><div class=\"ui form\">\n"+
        "            <div class=\"field\">\n"+
        "                <div class=\"fields\">\n"+
        "\n"+
        "                    <div class=\"four wide field\">\n"+
        "                        <div class=\"ui fluid search selection  dropdown\" id='sehttp'>\n"+
        "                            <input type=\"hidden\" name=\"country\" id='http'>\n"+
        "                            <i class=\"dropdown icon\"></i>\n"+
        "                            <div class=\"default text\">发送方式</div>\n"+
        "                            <div class=\"menu\" >\n"+
        "                                <div class=\"item\" data-value=\"1\">get</div>\n"+
        "                                <div class=\"item\" data-value=\"2\">post</div>\n"+


        "\n"+
        "\n"+
        "                            </div>\n"+
        "                        </div>\n"+
        "                    </div>\n"+
        "\n"+
        "                    <div class=\"twelve wide field \" id='urlid'>\n"+
        "                        <input type=\"text\"   placeholder=\"链接:http(s):\" id='urlv'>\n"+
        "                    </div>\n"+
        "\n"+
        "                </div>\n"+
        "            <div class=\"field\">\n"+
        "<label>传输内容，如有头文件，使用格式：HEAD{xxx:aaa&ccc:222}xxx=111&ccc=222</label>"+
        "<textarea id='areaid'></textarea>"+
        "                </div>\n"+


        "    </div></div>";


    $('#yuid').html(re);
    $('#sehttp').dropdown();

    if(pretmp.a!=-1&&pretmp.type==3){
        $('#sehttp').dropdown('set selected',pretmp.a);

        $('#areaid').val(pretmp.c.toString().replace(/<br\/>/g,"\n"));
        $('#urlv').val(pretmp.b);

    }
    $('#modal8').modal('refresh');
}

function  addNowStep(a,b,c,d) {
$('.addstep1').addClass('disabled');

    $.get('/getpid/'+c,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
        var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
        if(o.isok!=0){
            alertf(o.msg);
        }else {
            if(o.pid>0){
                pid=o.pid;

                var re="                    <tr>\n" +
                    "\n" +
                    "                        <td  >+</td>\n" +
                    "                        <td  ><div id='pagename2'></div></td>\n" +
                    "                        <td  ><div class=\"ui selection dropdown\" id='seele'>\n"+
                    "  <input type=\"hidden\"  id='elev' name=\"ele\">\n"+
                    "  <div class=\"default text\">元素</div>\n"+
                    "  <i class=\"dropdown icon\"></i>\n"+
                    "  <div class=\"menu\" id='eleg'>\n"+


                    "  </div>\n"+
                    "</div></td>\n" +
                    " <td  ><div class=\"ui selection dropdown \" id='actid' style='min-width: 9em'>\n"+
                    "  <input type=\"hidden\" onchange='changeact(this)' id='actv' name=\"act\">\n"+
                    "  <div class=\"default text\">操作</div>\n"+
                    "  <i class=\"dropdown icon\"></i>\n"+
                    "  <div class=\"menu\" id='actg'>\n"+
                    "    <div class=\"item\" data-value=\"1\">点击</div>\n"+
                    "    <div class=\"item\" data-value=\"2\">输入内容</div>\n"+
                    "    <div class=\"item\" data-value=\"3\">清除</div>\n"+
                    "    <div class=\"item\" data-value=\"4\">上传文件</div>\n"+
                    "    <div class=\"item\" data-value=\"5\">确认（alert）</div>\n"+
                    "    <div class=\"item\" data-value=\"6\">取消（alert）</div>\n"+

                    "  </div>\n"+
                    "</div></td>\n" +
                    "                        <td  >  <div class=\"ui fluid input disabled\" id='inputv'>\n"+
                    "  <input type=\"text\" placeholder=\"输入值\" id='inputv2'>\n"+
                    "</div></td>\n" +
                    "                        <td  ><button class=\"ui circular basic icon button disabled\" title=\"设置期望结果\"><i class=\"align justify icon\"></i></button></td>\n" +
                    "                        <td  ><button class=\"ui  circular basic icon button\" onclick=\"addstep("+(d+1)+")\" title=\"确认\"><i class=\"checkmark icon green\"></i></button>"+
                    // "<button class=\"ui  circular basic icon button \" style='display: none' onclick=\"\" title=\"修改用户\"><i class=\"paint brush icon\"></i></button>\n" +
                    "                            <button class=\"ui circular basic icon button \"  onclick='closeUpdateStep("+pid+")' title=\"取消\"><i class=\"remove circle icon red\"></i></button>" +
                    "</td>\n" +

                    "                    </tr>\n";
                $(b).parent().parent().after(re);

                $.get('/gettopage/'+c,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
                    var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
                    if(o.isok!=0){
                        alertf(o.msg);
                    }else {
                        if(o.topage>0){
                            pid=o.topage;

                        }

                        shuapageinfo();
                    }


                });


            }
        }


    });






 

    
}

function  updatestep(a,b,c,d,e,f) {
    //console.log($(a).parent());
    var re2=
        "                        <td  >" + c + "</td>\n" +
        "                        <td  ><div id=\"pagename2\"></div></td>\n" +
        "                        <td  ><div class=\"ui selection dropdown\" id='seele'>\n"+
        "  <input type=\"hidden\"  id='elev' name=\"ele\">\n"+
        "  <div class=\"default text\">元素</div>\n"+
        "  <i class=\"dropdown icon\"></i>\n"+
        "  <div class=\"menu\" id='eleg'>\n"+


        "  </div>\n"+
        "</div></td>\n" +
        " <td  ><div class=\"ui selection dropdown \" id='actid' style='min-width: 9em'>\n"+
        "  <input type=\"hidden\" onchange='changeact(this)' id='actv' name=\"act\">\n"+
        "  <div class=\"default text\">操作</div>\n"+
        "  <i class=\"dropdown icon\"></i>\n"+
        "  <div class=\"menu\" id='actg'>\n"+
        "    <div class=\"item\" data-value=\"1\">点击</div>\n"+
        "    <div class=\"item\" data-value=\"2\">输入内容</div>\n"+
        "    <div class=\"item\" data-value=\"3\">清除</div>\n"+
        "    <div class=\"item\" data-value=\"4\">上传文件</div>\n"+
        "    <div class=\"item\" data-value=\"5\">确认（alert）</div>\n"+
        "    <div class=\"item\" data-value=\"6\">取消（alert）</div>\n"+


        "  </div>\n"+
        "</div></td>\n" +
        "                        <td  >  <div class=\"ui fluid input disabled\" id='inputv'>\n"+
        "  <input type=\"text\" placeholder=\"输入值\" id='inputv2'>\n"+
        "</div></td>\n" +
        "                        <td  ><button class=\"ui circular basic icon button disabled\" title=\"设置期望结果\"><i class=\"align justify icon\"></i></button></td>\n" +
        "                        <td  ><button class=\"ui  circular basic icon button\" onclick=\"fixstep("+b+")\" title=\"确认\"><i class=\"checkmark icon green\"></i></button>"+
        // "<button class=\"ui  circular basic icon button \" style='display: none' onclick=\"\" title=\"修改用户\"><i class=\"paint brush icon\"></i></button>\n" +
        "                            <button class=\"ui circular basic icon button \"  onclick='closeUpdateStep()' title=\"取消\"><i class=\"remove circle icon red\"></i></button>" +
        "</td>\n";

    $(a).parent().parent().html(re2)
   // console.log(b);
  //  ttmp=a;
    $('#actid').dropdown('set selected',e);
    $.get('/getpid/'+b,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
        var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
        if(o.isok!=0){
            alertf(o.msg);
        }else {
            if(o.pid>0){
                pid=o.pid;
            }
        }


    });
    shuapageinfo(d,e,f);




}

function closeUpdateStep(a) {
    if(a>0){
        pid=a;
    }
    lookstep(cid,true);

}

function showexp(a) {
    stepid=a;
    $('#yan33').checkbox('check');
    $.get('/getexp/'+a,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
        var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
        var ll=o.exp;
        if(ll.length==1){
            var l2=ll[0];
            if(l2.type==1){
                exptmp={a:l2.a,b:l2.b,c:l2.c,d:l2.d,e:l2.e,type:1};
                $('#yan11').checkbox('check');

            }else {
                if (l2.type==2){
                    exptmp={a:l2.a,b:l2.b,c:l2.c,d:l2.d,e:l2.e,type:2};
                    $('#yan22').checkbox('check');
                }else {
                    if(l2.type==3){
                        exptmp={a:l2.a,b:l2.b,c:l2.c,d:l2.d,e:l2.e,type:3};
                        $('#yan33').checkbox('check');
                    }else {
                        exptmp={a:-1,b:-1,c:-1,d:-1,e:-1,type:0};
                        $('#yan44').checkbox('check');
                    }

                }
            }



        }else {
            $('#yan44').checkbox('check');
            exptmp={a:-1,b:-1,c:-1,d:-1,e:-1,type:0};


        }
        $('#modal6').modal('show');
    });




    $('#modal6').modal('show');

    
}


function removestep(a) {
    if (confirm("你确定要删除吗？")) {
        $.get('/removestep/'+a,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}

            var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
           shuastep();
            alertf(o.msg);

        })
    }
    else {

    }


}

function fixstep(a) {

    var tv=$('#pagename2').text();

    var ev=$('#elev').val();
    var evn=$('#seele').dropdown('get text')
    var av=$('#actv').val();
    var inv="no";
    if(!$('#inputv').hasClass('disabled')){
        inv=$.trim($('#inputv2').val());
    }
    if(tv==""||ev==""||av==""||inv==""){
        alertf('信息输入不全，请查看');
    }else {
        $.post('/fixstep',{
            id:a,
            pagename:tv,
            catid:av,

            value:inv=="no"?"":inv,
            eid:ev,
            ename:evn
        },function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
            var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}

            shuastep();
            alertf(o.msg);

        })



    }
}


function addstep(a) {
    var tv=$('#pagename2').text();

    var ev=$('#elev').val();
    var evn=$('#seele').dropdown('get text')
    var av=$('#actv').val();
    var inv="no";
    if(!$('#inputv').hasClass('disabled')){
        inv=$.trim($('#inputv2').val());
    }
    if(tv==""||ev==""||av==""||inv==""){
        alertf('信息输入不全，请查看');
    }else {
        $.post('/addstep',{
            step:a,
            pagename:tv,
            catid:av,
            cid:cid,
            value:inv=="no"?"":inv,
            eid:ev,
            ename:evn
        },function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
            var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}

            shuastep();
            alertf(o.msg);

        });

//closeUpdateStep(b);

    }

    
}

function wancheng() {
    pid=0;
    $('#mcase').click();
}

// function changeele(a) {
//     var re1="";
//     if($(a).val()!=''){
//         var vv=eval('eles2['+$(a).val()+']');
//         $('#setype').dropdown('set selected',vv);
//         $('#actid').removeClass('disabled');
//
//         var re2=in2act4type(vv);
//         var re3=re2.split(',');
//         for(var i=0;i<re3.length;i++){
//             re1+="    <div class=\"item\" data-value=\""+re3[i]+"\">"+in2st4action(re3[i])+"</div>\n";
//         }
//         $('#actg').html(re1);
//      //   alertf(acttionnum);
//         $('#actid').dropdown();
//         if(acttionnum!='0'){
//        //    alertf(acttionnum);
//             $('#actid').dropdown('set selected',acttionnum);
//             acttionnum=0;
//         }else {
//             $('#actid').dropdown('clear');
//         }
//
//
//
//     }
//
// }
//
function changeact(a) {
    var re=$(a).val();

    if(re!=''){


        if(re=='2'){
            $('#inputv').removeClass('disabled');
            $('#inputv').removeClass('selection');
            $('#inputv').removeClass('dropdown');
            $('#inputv').html("  <input type=\"text\"  placeholder=\"输入值\" id='inputv2'>");
        }else {
            if(re=='4'){
                $.get('/getfile/'+tid,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
                    var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
                    if(o.isok!=0){
                        alertf(o.msg);
                    }else{
                        var file1=o.files;
                        var res=" <input type=\"hidden\"  id='inputv2' name=\"file\">\n"+
                            "  <i class=\"dropdown icon\"></i>\n"+
                            "  <div class=\"default text\">选择文件</div>\n"+
                            "  <div class=\"menu\">\n";
                        for(var i=0;i<file1.length;i++){
                            res+="    <div class=\"item\" data-value=\""+file1[i].id+"\">"+file1[i].name+"</div>\n";

                        }
                        res+=    "  </div>";
                        $('#inputv').addClass('dropdown');
                        $('#inputv').addClass('selection');
                        $('#inputv').removeClass('disabled');
                        $('#inputv').html(res);
                        $('#inputv').dropdown();

                    }});



            }else {
                $('#inputv').addClass('disabled');
                $('#inputv').html("");

            }


        }

    }
}

function changewait(a) {
    var re=$(a).val();
    if(re=="1"||re=="2"){

        $('#waitd').removeClass('disabled');
    }else {
        $('#sewait').dropdown('clear');
        $('#waitd').addClass('disabled');
        $('#waitv').val('');
    }


}


function changetype(a) {
    var a1=$("#elev").val()===""?"a":$('#elev').val();

    var vv=eval('eles2['+a1+']');
    if(vv!=$(a).val()){
        $('#seele').dropdown('clear');
    }

    var a2=in2en4type($(a).val());

  var vv2=  eval('eles["'+a2+'"]');
var vv3="";
    for(var i=0;i<vv2.length;i++){
        var vv4=vv2[i].split('a=a=');
        vv3+="    <div class=\"item\" data-value=\""+vv4[0]+"\">"+vv4[1]+"</div>\n";


    }
    $('#eleg').html(vv3);
}

function shuapageinfo(d,e,f) {

    $.get('/ge4p/'+pid+'/'+tid+'/'+cid,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
        var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
        if(o.isok!=0){
            alertf(o.msg);
        }else{
  var re1=o.eles;
  pid=o.page.id;


            re3="";
            eles2={};
  re1.forEach(function (val) {
      re3+="    <div class=\"item\" data-value=\""+val.id+"\">"+val.name+"</div>\n";
  });
//       switch (val.type){
//           case "1": eles.button.push(val.id+'a=a='+val.name);break;
//           case "2": eles.checkbox.push(val.id+'a=a='+val.name);break;
//           case "3": eles.dialog.push(val.id+'a=a='+val.name);break;
//           case "4": eles.radio.push(val.id+'a=a='+val.name);break;
//           case "5": eles.select.push(val.id+'a=a='+val.name);break;
//           case "6": eles.text.push(val.id+'a=a='+val.name);break;
//           case "7":eles.upload.push(val.id+'a=a='+val.name); break;
//          // case "9":eles.link.push('0a=a=URL');break;
//
//       }
//
//
// re3+="    <div class=\"item\" data-value=\""+val.id+"\">"+val.name+"</div>\n";
// eles2[val.id]=val.type;
//
//   });

            //re3+="    <div class=\"item\" data-value=\""+0+"\">"+'URL'+"</div>\n";

$('#eleg').html(re3);
//console.log(o.page.pagename);
$('#pagename2').text(o.page.pagename);


            $('.ui.dropdown').dropdown();

            if(d!=""){

                acttionnum=e;
                    $('#seele').dropdown('set selected',d);
                    $('#inputv2').val(f);


                  //  $('#actid').dropdown('set selected',e);



            }


        }
    });

    
}

function shuapage() {

    $.get('/gpage/'+tid,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
        var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
        if(o.isok!=0){
            alertf(o.msg);
        }else{
            var pages=o.pages;

            pages1=pages;
            var re2="";
            if(pages.length>0){
                for(var i=0;i<pages.length;i++){

                                re2+="<tr><td>"+(i+1)+"</td>\n" +
                                    "                        <td>"+pages[i].pagename+"</td>\n" +
                                    "                        <td>"+pages[i].pagetitle+"</td>\n" +
                                    "                        <td ><button class=\"ui circular basic  icon button\"  onclick='lookelement("+pages[i].id+")' title=\"查看元素\"><i class=\"hand pointer icon\"></i></button></td>\n" +
                                    "                        <td><button class=\"ui  circular basic icon button\" onclick='updatepage("+pages[i].id+",this)' title=\"修改页面\"><i class=\"paint brush icon\"></i></button>\n" +
                                    "                            <button class=\"ui circular basic icon button\" onclick='removepage("+pages[i].id+")' title=\"删除页面\"><i class=\"remove circle icon red\"></i></button></td> </tr>";

                }
                $('#tpageid').html(re2);
                $('table').tablesort();

            }else{
                $('#tpageid').html('无相关信息');
            }
        }

    });

}


function datasourcecon (a,b) {
    $(b).addClass('loading');
    $(b).addClass('disabled');

    $.get('/getdatasourceconnect/'+a,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
        $(b).removeClass('loading');
        $(b).removeClass('disabled');
        var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}

        alertf(o.con);

        
    })
}

function shuaDatasource() {

    $.get('/getdatasource/'+tid,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
        var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
        if(o.isok!=0){
            alertf(o.msg);
        }else{
            var pages=o.datasources;


            var re2="";
            if(pages.length>0){
                for(var i=0;i<pages.length;i++){
                    var ssc="\'"+pages[i].name+"','"+pages[i].des+"','"+pages[i].link+"','"+pages[i].dataname+"','"+pages[i].type+"','"+pages[i].user+"'";


                    re2+="<tr><td>"+(i+1)+"</td>\n" +
                        "                        <td>"+pages[i].name+"</td>\n" +
                        "                        <td>"+pages[i].des+"</td>\n" +
                        "                        <td>"+pages[i].link+"</td>\n" +
                        "                        <td>"+pages[i].dataname+"</td>\n" +
                        "                        <td>"+(pages[i].type=="1"?"Mysql":"Sqlserver")+"</td>\n" +
                        "                        <td><button class=\"ui basic  button\" onclick='datasourcecon("+pages[i].id+",this)' >测试</button></td>\n" +
                        "                        <td><button class=\"ui  circular basic icon button\" onclick=\"updatedatasource("+pages[i].id+","+ssc+")\" title=\"修改数据库\"><i class=\"paint brush icon\"></i></button>\n" +
                        "                        <button class=\"ui circular basic icon button\" onclick='removedatasource("+pages[i].id+")' title=\"删除数据库\"><i class=\"remove circle icon red\"></i></button></td> </tr>";

                }
                $('#datasourceid').html(re2);
                $('table').tablesort();

            }else{
                $('#datasourceid').html('无相关信息');
            }
        }

    });

}

function  shuaele() {
    $.get('/gele/'+pid+'/'+tid,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
        var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
        if(o.isok!=0){
            alertf(o.msg);
        }else{
            var re1=o.elements;
            elements1=re1;
            var re2="";
            if(re1.length>0){
                for(var i=0;i<re1.length;i++){

                    re2+= "                    <tr>\n" +
                        "\n" +
                        "                        <td  >"+(i+1)+"</td>\n" +
                        "                        <td  >"+re1[i].name+"</td>\n" +
                        // "                        <td  >"+in2st4type(re1[i].type)+"</td>\n" +
                        "                        <td  >"+in2st4lo(re1[i].locationMethod)+"</td>\n" +
                        "                        <td  >"+re1[i].value.replace(/%78/g,"\"")+"</td>\n" +
                        "                        <td  >"+(re1[i].topage!="-1")+"</td>\n" +
                        "                        <td  >"+(re1[i].isframe=="1")+"</td>\n" +

                        "                        <td  ><button class=\"ui  circular basic icon button\" onclick='updateele("+re1[i].id+")' title=\"修改元素\"><i class=\"paint brush icon\"></i></button>\n" +
                        "                            <button class=\"ui circular basic icon button\" onclick='removeele("+re1[i].id+")' title=\"删除元素\"><i class=\"remove circle icon red\"></i></button></td>\n" +

                        "                    </tr>\n";

                }
                $('#eleid').html(re2);
                $('table').tablesort();

            }else{
                $('#eleid').html('无相关信息');
            }
        }
    });
    
}
function topage() {
    $('#mpage').click();
}

function  shuaeleall() {
    $.get('/gele/'+'-1'+'/'+tid,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
        var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
        if(o.isok!=0){
            alertf(o.msg);
        }else{
            var re1=o.elements;
            elements1=re1;
            var re2="";
            if(re1.length>0){
                for(var i=0;i<re1.length;i++){

                    re2+= "                    <tr>\n" +
                        "\n" +
                        "                        <td  >"+(i+1)+"</td>\n" +
                        "                        <td  >"+re1[i].pagename+"</td>\n" +
                        "                        <td  >"+re1[i].name+"</td>\n" +

                        "                        <td  >"+in2st4lo(re1[i].locationMethod)+"</td>\n" +
                        "                        <td  >"+re1[i].value+"</td>\n" +
                        "                        <td  >"+(re1[i].topage!="-1")+"</td>\n" +
                        "                        <td  >"+(re1[i].isframe=="1")+"</td>\n" +

                        "                        <td  ><button class=\"ui  circular basic icon button\" onclick='pid="+re1[i].pid+";updateele("+re1[i].id+")' title=\"修改元素\"><i class=\"paint brush icon\"></i></button>\n" +
                        "                            <button class=\"ui circular basic icon button\" onclick='pid="+re1[i].pid+";removeele("+re1[i].id+")' title=\"删除元素\"><i class=\"remove circle icon red\"></i></button></td>\n" +

                        "                    </tr>\n";

                }
                $('#eleid').html(re2);
                $('table').tablesort();

            }else{
                $('#eleid').html('无相关信息');
            }
        }
    });

}
function  shuaitem() {
    if(isshuaitem){
        $.get('/gitema',function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
            var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
            if(o.isok!=0){
                alertf(o.msg);
            }else{
                var users1=o.items;
                var re2="";
                if(users1.length>0){
                    for(var i=0;i<users1.length;i++){
                        var re3= new Array();
                        var re4= new Array();
                        for(var j=0;j<users1[i].user.length;j++){
                            re3.push(users1[i].user[j].name);
                            re4.push(users1[i].user[j].id);
                        }

                        re2+= "                    <tr>\n" +
                            "                        <td  >"+(i+1)+"</td>\n" +
                            "                        <td  >"+users1[i].name+"</td>\n" +
                            "                        <td  >"+users1[i].firstpageurl+"</td>\n" +
                            "                        <td  >"+re3.join(",")+"</td>\n" +

                            "                        <td  >"+(users1[i].isused=="0")+"</td>\n" +
                            "                        <td  ><button class=\"ui  circular basic icon button\" onclick=\"updateitem("+users1[i].id+",'"+users1[i].name+"','"+users1[i].firstpageurl+"','"+re4.join(",")+"')\" title=\"修改项目\"><i class=\"paint brush icon\"></i></button>\n" +
                            "                            <button class=\"ui circular basic icon button "+((users1[i].isused=="0")?'disabled':'')+"\" onclick='removeitem("+users1[i].id+")' title=\"禁用项目\"><i class=\"remove circle icon red\"></i></button></td>\n" +

                            "                    </tr>\n";

                    }
                    $('#titem').html(re2);
                    $('table').tablesort();

                    re=" <option value=\"\">选择用户...</option>";
                    for(var i=0;i<user1.length;i++){
                        if(user1[i].isused=="1"){
                            re+=" <option value=\""+user1[i].id+"\">"+user1[i].name+"</option>";
                        }

                    }



                    $('#seuser').html(re);
                }else{
                    $('#titem').html('无相关信息');
                }
            }

        });
       // isshuaitem=false;
    }

    
}

function contains(a,b) {
    var a1=a.split(',');
    var isok=false;
    for(var i=0;i<a1.length;i++){
        if(a1[i]==b){
            isok=true;
            break;
        }
    }
    return isok;
}

function shuacaseinfo(a,b) {
$.get('/getcase/1/'+tid,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
    var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
    if(o.isok!=0){
        alertf(o.msg);
    }else{
        var ccs=o.cases;
var cba;
var issearch=false;
if(cba==a){
    issearch=false;
}else{
    issearch=true;
}

        if(ccs.length>0){
            var re="";
            var rex="";
            var allmatch=false;
            for(var i=0;i<ccs.length;i++){
                var guodu=ccs[i].id+",'"+ccs[i].name+"'";
                var aac=ccs[i].id+",'"+ccs[i].name+"','"+ccs[i].des+"',"+ccs[i].important+','+ccs[i].type;
                var istype=ccs[i].type=='1';
                var isp=ccs[i].ispass==1;
                if(issearch){
                    var ismatch=false;
                    switch (b){
                        case 'name':(ccs[i].name.indexOf(a)>=0)?ismatch=true:ismatch=false;break;
                        case 'des':(ccs[i].des.indexOf(a)>=0)?ismatch=true:ismatch=false;break;
                        case 'label':contains(ccs[i].label,a)?ismatch=true:ismatch=false;break;
                        case 'imp':ccs[i].important==a?ismatch=true:ismatch=false;break;

                    }
                    allmatch=(ismatch||allmatch);
                    if(ismatch){
                        rex+= "                    <tr>\n" +
                            "                        <td  >Y</td>\n" +
                            "                        <td  >"+(istype?'UI_':'IN_')+ccs[i].name+"</td>\n" +
                            "                        <td  >"+ccs[i].des+"</td>\n" +
                            "                        <td  >"+int2imp(ccs[i].important)+"</td>\n" +
                            "                        <td  ><button class=\"ui  circular basic icon button\" onclick='lookstep("+ccs[i].id+","+istype+")' title=\"查看操作步骤\"><i class=\"indent icon\"></i></button></td>\n" +
                            "                        <td  ><button class=\"ui  circular basic icon button\" onclick='lookpre("+ccs[i].id+")' title=\"查看预置条件\"><i class=\"grid layout icon\"></i></button></td>\n" +
                            "                        <td  > <button class=\"ui circular basic icon button \" onclick=\"looklabel("+guodu+",'"+ccs[i].label+"')\" title=\"查看标签\"><i class=\"tags icon   yellow\"></i></button><button class=\"ui  circular basic icon button\" onclick=\"updatecase("+aac+")\" title=\"修改用例\"><i class=\"paint brush icon\"></i></button><button class=\"ui  circular basic icon button\" onclick=\"copycase("+guodu+")\" title=\"复制/粘贴用例\"><i class=\"copy icon\"></i></button>" +
                            "                            <button class=\"ui circular basic icon button \" onclick='removecase("+ccs[i].id+")' title=\"删除用例\"><i class=\"remove circle icon red\"></i></button></td>" +
                            "<td><button class=\"ui circular basic icon button \" onclick=\"runcase("+guodu +")\" title=\"运行用例\"><i class=\"play icon green\"></i></button>" ;
if(isp){
    rex+=                            "<button class=\"ui circular basic icon button \" onclick=\"canruncase("+ccs[i].id +",2)\" title=\"从总库移除\"><i class=\" remove circle icon \"></i></button></td></tr>\n" ;

}else {
    rex+=                            "<button class=\"ui circular basic icon button \" onclick=\"canruncase("+ccs[i].id +",1)\" title=\"加入总库\"><i class=\" checkmark icon \"></i></button></td></tr>\n" ;

}

                    }else {
                        re+= "                    <tr>\n" +
                            "                        <td  >N</td>\n" +
                            "                        <td  >"+(istype?'UI_':'IN_')+ccs[i].name+"</td>\n" +
                            "                        <td  >"+ccs[i].des+"</td>\n" +
                            "                        <td  >"+int2imp(ccs[i].important)+"</td>\n" +
                            "                        <td  ><button class=\"ui  circular basic icon button\" onclick='lookstep("+ccs[i].id+","+istype+")' title=\"查看操作步骤\"><i class=\"indent icon\"></i></button></td>\n" +
                            "                        <td  ><button class=\"ui  circular basic icon button\" onclick='lookpre("+ccs[i].id+")' title=\"查看预置条件\"><i class=\"grid layout icon\"></i></button></td>\n" +
                            "                        <td  > <button class=\"ui circular basic icon button \" onclick=\"looklabel("+guodu+",'"+ccs[i].label+"')\" title=\"查看标签\"><i class=\"tags icon   yellow\"></i></button><button class=\"ui  circular basic icon button\" onclick=\"updatecase("+aac+")\" title=\"修改用例\"><i class=\"paint brush icon\"></i></button><button class=\"ui  circular basic icon button\" onclick=\"copycase("+guodu+")\" title=\"复制/粘贴用例\"><i class=\"copy icon\"></i></button>" +
                            "                            <button class=\"ui circular basic icon button \" onclick='removecase("+ccs[i].id+")' title=\"删除用例\"><i class=\"remove circle icon red\"></i></button></td>" +
                            "<td><button class=\"ui circular basic icon button \" onclick=\"runcase("+guodu +")\" title=\"运行用例\"><i class=\"play icon green\"></i></button>" ;
                        if(isp){
                            re+=                            "<button class=\"ui circular basic icon button \" onclick=\"canruncase("+ccs[i].id +",2)\" title=\"从总库移除\"><i class=\" remove circle icon \"></i></button></td></tr>\n" ;

                        }else {
                            re+=                            "<button class=\"ui circular basic icon button \" onclick=\"canruncase("+ccs[i].id +",1)\" title=\"加入总库\"><i class=\" checkmark icon \"></i></button></td></tr>\n" ;

                        }
                    }

                }else {
                    re+= "                    <tr>\n" +
                        "                        <td  >"+(i+1)+"</td>\n" +
                        "                        <td  >"+(istype?'UI_':'IN_')+ccs[i].name+"</td>\n" +
                        "                        <td  >"+ccs[i].des+"</td>\n" +
                        "                        <td  >"+int2imp(ccs[i].important)+"</td>\n" +
                        "                        <td  ><button class=\"ui  circular basic icon button\" onclick='lookstep("+ccs[i].id+","+istype+")' title=\"查看操作步骤\"><i class=\"indent icon\"></i></button></td>\n" +
                        "                        <td  ><button class=\"ui  circular basic icon button\" onclick='lookpre("+ccs[i].id+")' title=\"查看预置条件\"><i class=\"grid layout icon\"></i></button></td>\n" +
                        "                        <td  > <button class=\"ui circular basic icon button \" onclick=\"looklabel("+guodu+",'"+ccs[i].label+"')\" title=\"查看标签\"><i class=\"tags icon   yellow\"></i></button><button class=\"ui  circular basic icon button\" onclick=\"updatecase("+aac+")\" title=\"修改用例\"><i class=\"paint brush icon\"></i></button><button class=\"ui  circular basic icon button\" onclick=\"copycase("+guodu+")\" title=\"复制/粘贴用例\"><i class=\"copy icon\"></i></button>" +
                        "                            <button class=\"ui circular basic icon button \" onclick='removecase("+ccs[i].id+")' title=\"删除用例\"><i class=\"remove circle icon red\"></i></button></td>" +
                        "<td><button class=\"ui circular basic icon button \" onclick=\"runcase("+guodu +")\" title=\"运行用例\"><i class=\"play icon green\"></i></button>" ;
                    if(isp){
                        re+=                            "<button class=\"ui circular basic icon button \" onclick=\"canruncase("+ccs[i].id +",2)\" title=\"从总库移除\"><i class=\" remove circle icon \"></i></button></td></tr>\n" ;

                    }else {
                        re+=                            "<button class=\"ui circular basic icon button \" onclick=\"canruncase("+ccs[i].id +",1)\" title=\"加入总库\"><i class=\" checkmark icon \"></i></button></td></tr>\n" ;

                    }
                }
                allmatch=true;

            }
            $('#caseid').html(rex+re);
          //  $('table').tablesort();
        }else{
            $('#caseid').html('无相关信息');
        }

    }
});

    
}

function copycase(a,b) {
    if(copyid!=0){
        if(copyid==a){
            copyid=0;
            alertf("取消复制");
            return;
        }
        if (confirm("用例"+copyname+"将覆盖用例"+b+"，请确认？")) {
            $.get('/copycase/'+a+'/'+copyid,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}

                var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}

                alertf(o.msg);
                // $('#mpage').click();
                copyid=0;
            })
        }

    }else {
        copyid=a;
        copyname=b;
        alertf("用例"+b+"复制成功");

    }

    
}

function canruncase(a,b) {
    if (confirm("你确定要这样操作吗？")) {
        $.post('/addcase2all',{
            id:a,

            ispass:b
        },function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
            var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}

            shuacaseinfo()
            alertf(o.msg);

        });

    }

    }

function looklabel(a,b,c) {
$('#labeltitle').html(b);
labelid=a;
    $.get('/getlabel/'+tid,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}

        var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}

      if(o.isok!="0") {alertf(o.msg);}else {
            var ls=o.labels;
            var re="";
for(var i=0;i<ls.length;i++){
    re+="<option value=\""+ls[i].id+"\" >"+ls[i].name+"</option>";


}

$('#labelcon').html(re);

         if(c!="null"){
             var ca=c.split(',');
             for(var i=0;i<ca.length;i++){
                 $('#labelcon').dropdown('set selected',ca[i]);
             }
         }
      }
        // $('#mpage').click();

    })
    $('#modal11').modal('show');
}
$('#closemodal').click(function () {
    $('#pagetitleadd').val('');
    $('#pagenameadd').val('');
    $('#modal1').modal('hide');
});
$('#closemodal9').click(function () {
    $('#homename').val('');
    $('#homedes').val('');
    $('#modal9').modal('hide');
});
$('#closemodal10').click(function () {
    $('#labelname').val('');
    $('#labeldes').val('');
    $('#modal10').modal('hide');
});
$('#closemodal11').click(function () {
    $('#labeltitle').html('');
    $('#labelcon').dropdown('clear');
    $('#modal11').modal('hide');
});
$('#closemodal3').click(function () {
    $('#uname').val('');
    $('#ueamil').val('');
    $('#isman').checkbox('uncheck');
    $('#modal3').modal('hide');
});

$('#closemodal4').click(function () {
    $('#additemname').val('');
    $('#additemurl').val('');
    $('#seuser').dropdown('clear');
    $('#modal4').modal('hide');
});

$('#closemodal5').click(function () {
    $('#addcasename').val('');
    $('#addcasedes').val('');
    $('#cc22').dropdown('clear');
    $('#typeele').dropdown('clear');
    $('#modal5').modal('hide');

});

$('#closemodal7').click(function () {
    $('#ddes').val('');
    $('#ddname').val('');
    $('#dlink').val('');
    $('#dname').val('');
    $('#dpass').val('');
    $('#duser').val('');
    $('#sedtype').dropdown('clear');
    $('#modal7').modal('hide');

});

$('#closemodal6').click(function () {

    $('#modal6').modal('hide');
    $('#yan44').checkbox('check');
   exptmp= {a:-1,b:-1,c:-1,d:-1,e:-1,type:0}

});

$('#closemodal8').click(function () {

    $('#modal8').modal('hide');
    $('#yu44').checkbox('check');
     pretmp={a:-1,b:-1,c:-1,type:4};

});

$('#closemodal2').click(function () {
    $('#acc2').accordion('close',0);
    $('#modal2').modal('hide');
    $('#ename').val('');
    $('#eval').val('');
    $('#enum').val('');
    //$('#etype').dropdown('clear');
    $('#elo').dropdown('clear');
    $('#chfr').checkbox('uncheck');
    $('#chisfr').checkbox('uncheck');
    $('#chwin').checkbox('uncheck');
    $('#sefr').dropdown('clear');
    $('#sewin').dropdown('clear');
    $('#addfrid').addClass('disabled');
    $('#sefr').parent().addClass('disabled');
    $('#addwinid').addClass('disabled');
    $('#sewin').parent().addClass('disabled');
    $('#sewait').dropdown('clear');
    $('#waitd').addClass('disabled');
    $('#waitv').val('');


});


$('#chfr').click(function () {
    if($('#addfrid').hasClass('disabled')){
        $('#addfrid').removeClass('disabled');
        $('#sefr').parent().removeClass('disabled');
        var re="<option value=\"\">Frame...</option>";
        for(var i=0;i<elements1.length;i++){
            if(elements1[i].isframe=="1"){
                re+="<option value=\""+elements1[i].id+"\">"+elements1[i].name+"</option>";
            }
        }
        $('#sefr').html(re);

    }else {
        $('#sefr').dropdown('clear');
        $('#addfrid').addClass('disabled');
        $('#sefr').parent().addClass('disabled');
    }});


$('#chwin').click(function () {

    if($('#addwinid').hasClass('disabled')){
        $('#addwinid').removeClass('disabled');
        $('#sewin').parent().removeClass('disabled');
        var re="<option value=\"\">页面...</option>";
        for(var i=0;i<pages1.length;i++){
            re+="<option value=\""+pages1[i].id+"\">"+pages1[i].pagename+"</option>";
        }
        $('#sewin').html(re);

    }else {
        $('#sewin').dropdown('clear');
        $('#addwinid').addClass('disabled');
        $('#sewin').parent().addClass('disabled');
    }


});

$('#addpageone7').click(function () {



    var dname=$.trim($('#ddname').val());
    var des=$.trim($('#ddes').val());
    var user=$.trim($('#duser').val());
    var pass=$.trim($('#dpass').val());
    var name=$.trim($('#dname').val());
    var link=$.trim($('#dlink').val());

    var type=$('#dtype').val();
    if(name.length>0 && dname.length>0&&user.length>0&&pass.length>0&&link.length>0&&type!=""){
        $.post('/adddatasource',{
            name:name,
            des:des,
            user:user,
            type:type,
            link:link,
            dataname:dname,
            pass:pass,
            tid:tid,
            id:adddatasource
        },function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
            var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}

           shuaDatasource();
            alertf(o.msg);
            $('#closemodal7').click();
        });
    }else {
        alertf('输入信息不全，请检查');
    }
});

$('#addpageone6').click(function () {
var dat="";

    if($('#yan44').checkbox('is checked')){
        $('#closemodal6').click();
        dat={a:-1,b:-1,c:-1,d:-1,e:-1,sid:stepid,type:4};
    }else {
        if($('#yan11').checkbox('is checked')){
            dat=getyan1();

        }else {
            if($('#yan22').checkbox('is checked')){
                dat=getyan2();
            }else {
                if($('#yan33').checkbox('is checked')){
                    dat=getyan3();
                }
            }
        }

    }

    if(dat){
        $.post('/updateexp',dat,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
            var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
            alertf(o.msg);
            if(o.isok!="0"){

            }else {
                $('#closemodal6').click();
            }




        });
    }else {
        alertf('输入信息不全，请检查');
    }
});


$('#addpageone8').click(function () {
    var dat="";

    if($('#yu44').checkbox('is checked')){
        $('#closemodal8').click();
        dat={a:-1,b:-1,c:-1,cid:cid,type:4};
    }else {
        if($('#yu11').checkbox('is checked')){
            dat=getyu1();

        }else {
            if($('#yu22').checkbox('is checked')){
                dat=getyu2();
            }else {
                if($('#yu33').checkbox('is checked')){
                    dat=getyu3();
                }
            }
        }

    }

    if(dat){
        $.post('/updatepre',dat,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
            var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
            alertf(o.msg);
            if(o.isok!="0"){

            }else {
                $('#closemodal8').click();
            }




        });
    }else {
        alertf('输入信息不全，请检查');
    }
});


$('#addpageone9').click(function () {


    var name=$.trim($('#homename').val());
    var title=$.trim($('#homedes').val());
    if(name.length>0 && title.length>0){
        $.post('/addcasehome',{
            tid:tid,
            name:name,
            des:title,
            type:homeid
        },function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
            var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}

            alertf(o.msg);
           shuacasehome()

            $('#closemodal9').click();

        });

    }else {
        alertf('输入信息不全，请检查');
    }
});

$('#addpageone11').click(function () {


   var lbs= $('#labelcon').val();


    if(lbs.length>0){
        $.post('/upatelabel',{
            tid:tid,
            id:labelid,

            labels:lbs.toString()
        },function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
            var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}

            alertf(o.msg);
shuacaseinfo();

            $('#closemodal11').click();

        });

    }else {
        alertf('输入信息不全，请检查');
    }
});
$('#addpageone10').click(function () {


    var name=$.trim($('#labelname').val());
    var title=$.trim($('#labeldes').val());
    if(name.length>0 && title.length>0){
        $.post('/addlabel',{
            tid:tid,
            name:name,
            des:title,
            type:labelid
        },function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
            var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}

            alertf(o.msg);
           shualabel();

            $('#closemodal10').click();

        });

    }else {
        alertf('输入信息不全，请检查');
    }
});

$('#addpageone').click(function () {
    var a1=  $('#kanbujian').text();

    var name=$.trim($('#pagenameadd').val());
    var title=$.trim($('#pagetitleadd').val());
    if(name.length>1 && title.length>1){
        $.post('/addpage',{
            item:tid,
            pagename:name,
            pagetitle:title,
            type:a1
        },function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
            var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}

            alertf(o.msg);
            shuapage();

            $('#closemodal').click();

        });

    }else {
        alertf('输入信息不全，请检查');
    }
});

$('#addpageone3').click(function () {


    var name=$.trim($('#uname').val());
    var title=$.trim($('#ueamil').val());
    var isman=($('#isman').checkbox('is checked'))?1:0;
    var ispass=($('#ispass').checkbox('is checked'))?1:0;


    if(name.length>0 && title.length>0){
        $.post('/adduser',{
            name:name,
            email:title,
            ismanager:isman,
            type:ass2,
            ispass:ispass
        },function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
            var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
            shuauser();
            alertf(o.msg);
           $('#closemodal3').click();


        });


    }else {
        alertf('输入信息不全，请检查');
    }
});


$('#addpageone4').click(function () {


    var name=$.trim($('#additemname').val());
    var title=$.trim($('#additemurl').val());
    var uss=$('#seuser').val();
    if(name.length>0 && title.length>0){
        $.post('/additem',{
            name:name,
            url:title,
            users:uss.toString(),
            type:ass3
        },function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
            var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
            isshuaitem=true;
            shuaitem();
            alertf(o.msg);
            $('#closemodal4').click();
        });
    }else {
        alertf('输入信息不全，请检查');
    }
});
$('#addpageone5').click(function () {


    var name=$.trim($('#addcasename').val());
    var title=$.trim($('#addcasedes').val());
    var uss=$('#cc23').val();
    var elev=$('#typeein').val();
    if(name.length>0 && title.length>0&&uss!=""&&elev!=""){
        $.post('/addcase',{
            name:name,
            des:title,
            important:uss,
            tid:tid,
            type:ass4,
            elety:elev
        },function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
            var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
            isshuaitem=true;
            shuacaseinfo();
            alertf(o.msg);
            $('#closemodal5').click();
        });
    }else {
        alertf('输入信息不全，请检查');
    }
});

function int2imp(a) {

    switch (a){
        case "1":return "高";
        case "2":return "中";
        case "3":return "低";
        default:return "no";
    }
    
}

$('#addpageone2').click(function () {
    // <!--$('#etype').find("option:selected").text();-->
    var ename=$.trim($('#ename').val());
    // var etypeid=$('#etype').val();
    // var etypeval=$('#etype').find("option:selected").text();

    var eloid=$('#elo').val();
    var eloval=$('#elo').find("option:selected").text();
    var eval=$.trim($('#eval').val());
    var chisfr=$('#chisfr').checkbox('is checked')?1:0;
    var num=$.trim($('#enum').val())==""?"-1":$.trim($('#enum').val());
    var frame=-1;
    var window=-1;
    var waitid=-1;
    var waitv=0;
    if($('#addfrid').hasClass('disabled')){

    }else{
        frame=$('#sefr').val();
    }
    if($('#addwinid').hasClass('disabled')){

    }else{
        window=$('#sewin').val();
    }
    if($('#waitd').hasClass('disabled')){

    }else {
        waitv=$.trim($('#waitv').val());
        waitid=$('#sewait').val();

    }
//console.log(frame);
//console.log(window);
//console.log(ename);
//console.log(etypeid);
//console.log(eloid);
//console.log(eval);
//console.log(ename.length<1);
//console.log(etypeid==="");
//console.log(eloid==="");
//console.log(eval.length<1);
//console.log(frame==="");
//console.log(window==="");
    if(ename.length<1||eloid===""||eval.length<1||frame===""||window===""||waitv.length<1||waitid===""){
        alertf('请输入完整信息');
    }else{
        $.post('/addele',{
            item:tid,
            elename:ename,
           // eletype:etypeid,
            type:ass1,
            elelo:eloid,
            elevalue:eval,
            pid:pid,
            topage:window,
            toframe:frame,
            waitid:waitid,
            waitv:waitv,
            isframe:chisfr,
            num:num

        },function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
            var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
            $('#closemodal2').click();
            if(mele===1){
               shuaeleall();

            }else
            shuaele();
            alertf(o.msg);


        });
    }



});



function removepage(a) {
    if (confirm("你确定要删除吗？")) {
        $.get('/removepage/'+a+'/'+tid,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}

            var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}

            alertf(o.msg);
           // $('#mpage').click();
            shuapage();
        })
    }
    else {

    }

}

function removeele(a) {
    if (confirm("你确定要删除吗？")) {
        $.get('/removeele/'+a+'/'+pid+'/'+tid,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}

            var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
           shuaele();
            alertf(o.msg);

        })
    }
    else {

    }

}


function removecase(a) {
    if (confirm("你确定要删除吗？")) {
        $.get('/removecase/'+a,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}

            var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
            shuacaseinfo();
            alertf(o.msg);

        })
    }
    else {

    }
}
function removecasehome(a) {
    if (confirm("你确定要删除吗？")) {
        $.get('/removecasehome/'+a,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}

            var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
           shuacasehome();
            alertf(o.msg);

        })
    }

}
function removelabel(a) {
    if (confirm("你确定要删除吗？")) {
        $.get('/removelabel/'+a,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}

            var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
            shualabel();
            alertf(o.msg);

        })
    }

}


function removedatasource(a) {
    if (confirm("你确定要删除吗？")) {
        $.get('/removedatasource/'+a,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}

            var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
           shuaDatasource();
            alertf(o.msg);

        })
    }
    else {

    }
}


function removeuser(a) {
    if (confirm("你确定要禁用吗？")) {
        $.get('/removeuser/'+a,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}

            var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}

            alertf(o.msg);
            shuauser();
        })
    }
    else {

    }

}


function removeitem(a) {
    if (confirm("你确定要禁用吗？")) {
        $.get('/removeitem/'+a,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}

            var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}

            alertf(o.msg);
            isshuaitem=true;
            shuaitem();
        })
    }
    else {

    }

}

function updatepage(a,b) {
    $('#kanbujian').text(a);
    $('#pagenameadd').val(b.parentNode.parentNode.getElementsByTagName("td")[1].innerHTML);
    $('#pagetitleadd').val(b.parentNode.parentNode.getElementsByTagName("td")[2].innerHTML);
    $('#modal1').modal('show');

}
function updatecasehome(a,b,c) {
homeid=a;
    $('#homename').val(b);
    $('#homedes').val(c);
    $('#modal9').modal('show');

}
function updatelabel(a,b,c) {
    labelid=a;
    $('#labelname').val(b);
    $('#labeldes').val(c);
    $('#modal10').modal('show');

}


// function updatepage(a,b) {
//
//     $('#pagenameadd').val(b.parentNode.parentNode.getElementsByTagName("td")[1].innerHTML);
//     $('#pagetitleadd').val(b.parentNode.parentNode.getElementsByTagName("td")[2].innerHTML);
//     $('#modal1').modal('show');
//
// }
function updateuser(a,b,c,d) {

    ass2=a;
    $('#ueamil').val(d);
    $('#uname').val(c);
    if(b=="1"){
        $('#isman').checkbox('set checked');
    }
    $('#modal3').modal('show');

}
function updateitem(a,b,c,d) {

    ass3=a;
    $('#additemname').val(b);
    $('#additemurl').val(c);
   $('#seuser').dropdown('clear');


    var as=d.split(',');


    for(var i=0;i<as.length;i++){
        $('#seuser').dropdown('set selected',as[i]);

    }

    $('#modal4').modal('show');

}


function updatedatasource(id,name,des,link,dataname,type,user) {
    adddatasource=id;
    $('#ddname').val(dataname);
   $('#ddes').val(des);
    $('#duser').val(user);

   $('#dname').val(name);
   $('#dlink').val(link);


    $('#sedtype').dropdown("set selected",type);
    $('#modal7').modal('show');

    
}


function updatecase(a,b,c,d,e) {

    ass4=a;
    $('#addcasename').val(b);
    $('#addcasedes').val(c);

  //  $('#cc22').dropdown('set selected',"\""+d+"\"");
    $('#cc22').dropdown('set selected',d);
    $('#typeele').dropdown('set selected',e);
    $('#typeele').addClass('disabled');



    $('#modal5').modal('show');

}

function searchcase() {
    var inp=$.trim($('#seaca').val())
    var se=$('#secon').val();
    if(inp==""){
        $('#seaca').css('background','yellow');
    }else {
        shuacaseinfo(inp,se);

    }
        }

        
        function backclear(a) {
   $('#'+a).css('background','white');
            
        }
        function getusedlabel() {
            $.get('/getusedlabel/'+tid,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
                var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
                var re=  "  <select class=\"ui compact selection dropdown\"  id='seaca' style=\"          padding-bottom: 1px;          padding-top: 1px;          \">\n";

                if(o.isok!=0){
                   // alertf(o.msg);
                }else{
                    var ccs=o.labels;
                    if(ccs.length>0){
                        re+="    <option  selected=\"\" value=\""+ccs[0].id+"\">"+ccs[0].name+"</option>\n";

                        for(var i=1;i<ccs.length;i++){

                            re+="    <option   value=\""+ccs[i].id+"\">"+ccs[i].name+"</option>\n";

                        }

                    }



                }
                re+="  </select>\n";
                $('#seq').html(re);
            });


        }

        function changesearchcase() {


  //  alertf($('#secon').val());
            switch($('#secon').val()){
                case 'name':$('#seq').html(" <input type=\"text\" id='seaca' onclick=\"backclear('seaca')\" placeholder=\"Search...\">");break;
                case 'des':$('#seq').html(" <input type=\"text\" id='seaca' onclick=\"backclear('seaca')\" placeholder=\"Search...\">");break;
                case 'label':getusedlabel();break;
                case 'imp':$('#seq').html( "  <select class=\"ui compact selection dropdown\"  id='seaca' style=\"          padding-bottom: 1px;          padding-top: 1px;          \">\n"+
                    "    <option  selected=\"\" value=\"1\">高</option>\n"+
                    "    <option  value=\"2\">中</option>\n"+
                    "    <option value=\"3\">低</option>\n"+

                    "  </select>\n");break;
            }

            
        }

  function clickcase()
  {
      if(tid<1){
          alertf("请先选择项目~")
      }else{
          forfirstfun();
          pid=0;
          var re1="<div class=\"ui action input\"><div id='seq'>\n"+
              "  <input type=\"text\" id='seaca' onclick=\"backclear('seaca')\" placeholder=\"Search...\"></div>\n"+
              "  <select class=\"ui compact selection dropdown\" onchange='changesearchcase()' id='secon' style=\"          padding-bottom: 1px;          padding-top: 1px;          \">\n"+
              "    <option  selected=\"\" value=\"name\">名称</option>\n"+
              "    <option  value=\"des\">描述</option>\n"+
              "    <option value=\"label\">标签</option>\n"+
              "    <option value=\"imp\">重要级</option>\n"+
              "  </select>\n"+
              "  <div type=\"submit\" class=\"ui button\" onclick='searchcase()'>搜索</div>\n"+
              "</div>"
          var re=base(  "                        <th style=\"width: 40px\">#</th>\n" +
              "                        <th  style=\"width: 25%\">用例名称</th>\n" +
              "                        <th   style='min-width: 100px'>用例描述</th>\n" +
              "                        <th   style='width: 60px'>重要等级</th>\n" +
              "                        <th style=\"width: 60px\">查看步骤</th>\n" +
              "                        <th style=\"width: 60px\">预置条件</th>\n" +
              "                        <th style=\"width: 80px\">操作按钮</th><th style=\"width: 80px\">执行用例</th>",8,'addcase()','添加用例','caseid');


          $('#context').html(re1+re);
          shuacaseinfo();
          $('table').tablesort();

          




      }
  }  


    function clickcasehome()
    {
        if(tid<1){
            alertf("请先选择项目~")

    }else {
            forfirstfun();

            var re=base(  "                        <th style=\"width: 40px\">#</th>\n" +
                "                        <th  style=\"width: 25%\">版本库名称</th>\n" +
                "                        <th   style='min-width: 100px'>版本库描述</th>\n" +

                "                        <th style=\"width: 60px\">使用情况</th>\n" +
                "                        <th style=\"width: 60px\">查看用例</th>\n" +

                "                        <th style=\"width: 80px\">操作按钮</th>",6,'addcasehome()','添加用例小库','casehomeid');


            $('#context').html(re);
            shuacasehome();

        }
    }


function addcasehome() {
    homeid=0;
$('#modal9').modal('show');

}
function addlabel() {
    labelid=0;
    $('#modal10').modal('show');

}

function shuacasehome() {
    $.get('/getcasehome/'+tid,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
        var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
        if(o.isok!=0){
            alertf(o.msg);
        }else{
            var ccs=o.casehomes;

            if(ccs.length>0){
                var re="";

                for(var i=0;i<ccs.length;i++){
var cid2="\'"+ccs[i].cids+"\',"+ccs[i].id;
var now='';
if(ccs[i].isnow==1){
now='<b>当前使用</b>';
}else {
    now="<button onclick=\"changecasehm("+ccs[i].id+")\" class=\"ui  basic button\">切换</button>";
}
                    var aac=ccs[i].id+",'"+ccs[i].name+"','"+ccs[i].des+"'";
                    re+= "                    <tr>\n" +
                        "                        <td  >"+(i+1)+"</td>\n" +
                        "                        <td  >"+ccs[i].name+"</td>\n" +
                        "                        <td  >"+ccs[i].des+"</td>\n" +
                        "                        <td  >"+now+"</td>\n" +

                        "                        <td  ><button class=\"ui  circular basic icon button\" onclick=\"choosecase("+cid2+")\" title=\"查看操作步骤\"><i class=\"indent icon\"></i></button></td>\n" +

                        "                        <td  ><button class=\"ui  circular basic icon button\" onclick=\"updatecasehome("+aac+")\" title=\"修改用例\"><i class=\"paint brush icon\"></i></button>\n" ;
                    if(ccs[i].isnow==1){
                        re+="</td></tr>";
                    }else {
                        re+="                            <button class=\"ui circular basic icon button \" onclick='removecasehome("+ccs[i].id+")' title=\"删除用例\"><i class=\"remove circle icon red\"></i></button></td></tr>\n";

                    }
                }
                $('#casehomeid').html(re);
                  $('table').tablesort();
            }else{
                $('#casehomeid').html('无相关信息');
            }
        }
    });
}


    function clickdatasource() {
        if(tid<1){
            alertf("请先选择项目~")
        }else{
            forfirstfun();
            var re=base(  "                        <th style=\"width: 40px\">#</th>\n" +
                "                        <th  style=\"width: 25%\">数据库名称</th>\n" +
                "                        <th   style='min-width: 40px'>描述</th>\n" +
                "                        <th   style='width: 140px'>连接地址</th>\n" +
                "                        <th   style='width: 100px'>数据库</th>\n" +
                "                        <th style=\"width: 80px\">数据库类型</th>\n" +
                "                        <th style=\"width: 80px\">连接测试</th>\n" +

                "                        <th style=\"width: 80px\">操作</th>\n",8,'addds()','添加数据库','datasourceid');


            $('#context').html(re);
           shuaDatasource();
            $('table').tablesort();






        }
    }

function changecasehm(a) {
    $.get('/setcasehome/'+a+'/'+tid,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
        var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
        alertf(o.msg);
        shuacasehome();


    });

    
}



    function clickpage() {
        if(tid<1){
            alertf("请先选择项目~")
        }else {
            forfirstfun();
            mele=0;
            var re=base( "                        <th style=\"width: 80px\">#</th>\n" +
                "                        <th  style=\"width: 25%\">页面名称</th>\n" +
                "                        <th  style=\"min-width: 30em;\" >页面标题</th>\n" +
                "                        <th style=\"width: 80px\">查看元素</th>\n" +
                "                        <th style=\"width: 80px\">操作</th>\n",5,'addpage()','添加页面','tpageid');
                    $('#context').html(re);

                    shuapage();


                }



    }


function showlabel(a) {
    var ls=$('.labelz');
    for(var i=0;i<ls.length;i++){

        if(a==0){
            $(ls[i]).css('display','table-row');
        }else {
            if($(ls[i]).hasClass('label'+a)){
                $(ls[i]).css('display','table-row');
            }else {
                $(ls[i]).css('display','none');
            }
        }
    }
}

function choosecase(a,b) {
    forfirstfun();

    $.get('/getusedlabel/'+tid,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
        var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
        if(o.isok!=0){
            alertf(o.msg);
        }else{
            var ccs=o.labels;
            var re5="";
            var re1="";



                for(var i=0;i<ccs.length;i++){

                    re5+= "      <div class=\"item\" onclick='showlabel("+ccs[i].id+")'>\n"+
                        ccs[i].name+
                        "      </div>\n";
                }
                re5+= "      <div class=\"item\" onclick='showlabel(0)'>\n 查看全部"+

                    "      </div>\n";
            re5+= "      <div class=\"item\" onclick='showlabel(null)'>\n 查看无标签"+

                "      </div>\n";

            re1="<div class=\"ui horizontal compact segments\">\n"+
                "  <div class=\"ui segment\">\n"+
                "    <div class=\"ui positive check button\">全选</div><div class=\"ui negative uncheck button\">全部取消</div><div class=\"ui toggle button\">反转</div>"+
                " <div class=\"ui right floated small primary labeled icon button\" onclick='returncasehome()' ><i class=\"reply icon\"></i>返回</div> </div>\n"+

                "  <div class=\"ui segment\"  style=\" font-size: larger;\">\n"+
                "<label>重要等级：</label>"+
                "    <div class=\"ui test checkbox\"> <input type=\"checkbox\" id='impc1' onchange='checkimp(this)'> <label>高&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label> </div><div class=\"ui test checkbox\"> <input type=\"checkbox\"  id='impc2' onchange='checkimp(this)'> <label>中&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label> </div><div class=\"ui test checkbox\"> <input type=\"checkbox\" id='impc3' onchange='checkimp(this)'> <label>低</label> </div>"+
                "<div class=\"ui inline dropdown\" style='margin-left: 8px' id='selabel'>\n"+
                "    <div class=\"text\">\n"+
                "      \n"+
                "      选择标签\n"+
                "    </div>\n"+
                "    <i class=\"dropdown icon\"></i>\n"+
                "    <div class=\"menu\" id='labelmenu'>\n"+
                re5+
                "    \n"+
                "    </div>\n"+
                "  </div>"+
                //  "    </div>\n"+

                " <div class=\"ui right floated small primary labeled icon button\" onclick='addcids("+b+")' ><i class=\"radio icon\"></i>选择完毕</div>"+

                "  </div>\n"+
                "</div>";

            var re=base( "                        <th style=\"width: 40px\">#</th>\n" +
                "                        <th  style=\"width: 25%\">用例名称</th>\n" +
                "                        <th  style=\"min-width: 30em;\" >用例描述</th>\n" +
                "                        <th style=\"width: 80px\">重要等级</th>\n",4,'addcids('+b+')','选择完毕','testcaseid','2a2');


            $('#context').html(re1+re);
            $('#selabel').dropdown();


            shuatestcase(-1,a);

        }
    });

}
function returncasehome(){clickcasehome()}
function addcids(b) {
    var lengt=  $('.imp.checked');
    var aa=[];
    for(var i=0;i<lengt.length;i++){
        aa.push(lengt.get(i).id);

    }
    if(aa.length==0){
        alertf("请勾选用例！")
    }else {
        var dda=new Date();
        $.post('/updatecids',{

            cids:aa.join(","),
            id:b

        },function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
            var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
            alertf(o.msg);
            $('#mcasehome').click();
        })
    }
}



  function clicktest() {
      if(tid<1){
          alertf("请先选择项目~")
      }else {
          forfirstfun();
          var re1="<div class=\"ui horizontal compact segments\">\n"+
              "  <div class=\"ui segment\">\n"+
              "    <div class=\"ui positive check button\">全选</div><div class=\"ui negative uncheck button\">全部取消</div><div class=\"ui toggle button\">反转</div>"+
              "<div class=\"ui  right floated selection dropdown\">\n"+
              "  <input type=\"hidden\" name=\"casehome\" onchange='changecasehome(this)'>\n"+
              "  <i class=\"dropdown icon\" ></i>\n"+
              "  <div class=\"default text\">选择用例库...</div>\n"+
              "  <div class=\"menu\" id='casehomemenu'>\n"+

              "  </div>\n"+
              "</div>"+
          "  </div>\n"+

              "  <div class=\"ui segment\"  style=\" font-size: larger;\">\n"+
              "<label>重要等级：</label>"+
              "    <div class=\"ui test checkbox\"> <input type=\"checkbox\" id='impc1' onchange='checkimp(this)'> <label>高&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label> </div><div class=\"ui test checkbox\"> <input type=\"checkbox\"  id='impc2' onchange='checkimp(this)'> <label>中&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label> </div><div class=\"ui test checkbox\"> <input type=\"checkbox\" id='impc3' onchange='checkimp(this)'> <label>低</label> </div>"+
              "<div class=\"ui inline dropdown\" style='margin-left: 8px' id='selabel'>\n"+
              "    <div class=\"text\">\n"+
              "      \n"+
              "      选择标签\n"+
              "    </div>\n"+
              "    <i class=\"dropdown icon\"></i>\n"+
              "    <div class=\"menu\" id='labelmenu'>\n"+

              "    \n"+
              "    </div>\n"+
              "  </div>"+
              " <div class=\"ui right floated small primary labeled icon button\" onclick='addtestcase()' ><i class=\"radio icon\"></i>选择完毕</div>"+
              "  </div>\n"+
              "</div><div id='casehomeid2'></div>";

          $('#context').html(re1);
          $('.ui.dropdown').dropdown();
          $.get('/getcasehome/'+tid,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
              re="";
              var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
              var cc=o.casehomes;
            //  console.log(cc);
              for(var i=0;i<cc.length;i++){
                  re+="    <div class=\"item\" data-value=\""+cc[i].id+"\">"+cc[i].name+"</div>";

              }
              re+="<div class=\"item\" data-value=\"-1\">总库</div>";
              $('#casehomemenu').html(re);
              
          });
          $.get('/getusedlabel/'+tid,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
              var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
              if(o.isok!=0){
                  alertf(o.msg);
              }else {
                  var ccs = o.labels;
                  var re5 = "";



                  for (var i = 0; i < ccs.length; i++) {

                      re5 += "      <div class=\"item\" onclick='showlabel(" + ccs[i].id + ")'>\n" +
                          ccs[i].name +
                          "      </div>\n";
                  }
                  re5 += "      <div class=\"item\" onclick='showlabel(0)'>\n 查看全部" +

                      "      </div>\n";
                  re5 += "      <div class=\"item\" onclick='showlabel(null)'>\n 查看无标签" +

                      "      </div>\n";
                  $('#labelmenu').html(re5);
              }});


              }
  }  


function changecasehome(a) {
    $('#casehomeid2').html(base( "                        <th style=\"width: 40px\">#</th>\n" +
        "                        <th  style=\"width: 25%\">用例名称</th>\n" +
        "                        <th  style=\"min-width: 30em;\" >用例描述</th>\n" +
        "                        <th style=\"width: 80px\">重要等级</th>\n",4,'addtestcase()','选择完毕','testcaseid','2a2'));
    //shuacasehome($(a).val());
    shuatestcase($(a).val());


}

    function clicklook() {
        if(tid<1){
            alertf("请先选择项目~")
        }else {
            forfirstfun(1);
var re="<div class=\"ui top attached tabular   menu\">\n"+
    "  <a class=\"item active\" data-tab=\"first\" id='uone'>尚未运行</a>\n"+
    "  <a class=\"item\" data-tab=\"second\" id='utwo'>等待运行</a>\n"+
    "  <a class=\"item\" data-tab=\"third\" id='uthree'>正在运行</a>\n"+
    "  <a class=\"item\" data-tab=\"fourth\" id='ufour'>运行完成</a>\n"+
    "</div>\n"+
    "<div class=\"ui bottom attached tab segment active\" data-tab=\"first\" id='lookone'>loading...</div>\n"+
    "<div class=\"ui bottom attached tab segment\" data-tab=\"second\" id='looktwo'>loading...</div>\n"+
    "<div class=\"ui bottom attached tab segment\" data-tab=\"third\" id='lookthree'>loading...</div>\n"+
    "<div class=\"ui bottom attached tab segment\" data-tab=\"fourth\" id='lookfour'>loading...</div>";

            $('#context').html(re);
            $('.menu .item').tab();



shuaseries();
             int1=setInterval("shuaseries()",10000);





            //shuatestcase();

        }
    }


function removeseries(a) {
    if (confirm("你确定要删除吗？")) {
        $.get('/removeseries/'+a,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}

            var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
            shuaseries();
            alertf(o.msg);

        })
    }

    
}

function runseries(a) {
    if (confirm("你确定要运行吗？")) {
        $.get('/runseries/'+a+'/'+tid,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}

            var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
            shuaseries();
            alertf(o.msg);

        })
    }
    
}
function pauseseries(a) {
    $.get('/pauseseries/'+a+'/'+tid,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}

        var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
        shuaseries();
        alertf(o.msg);

    })
}
function iseq(a,b) {
    // var propsA = Object.getOwnPropertyNames(a),
    //     propsB = Object.getOwnPropertyNames(b);

    if(a.length != b.length){
        return false;
    }else {
        for(var i=0;i<a.length;i++){

            //如果对应属性对应值不相等，则返回false
            if(a[i].id != b[i].id||a[i].status != b[i].status){
                return false;
            }
        }
        return true;
    }


}

function iseq2(a,b) {
    // var propsA = Object.getOwnPropertyNames(a),
    //     propsB = Object.getOwnPropertyNames(b);

    if(a.length != b.length){
        return false;
    }else {
        for(var i=0;i<a.length;i++){

            //如果对应属性对应值不相等，则返回false
            if(a[i].id != b[i].id||a[i].status != b[i].status||a[i].runnum!=b[i].runnum){
                return false;
            }
        }
        return true;
    }


}
function closerunseries() {
   var a= $('.sticky').html();
   a="<div class=\"ui segment ui sticky\">"+a+"</div>";
   a=a.replace("compress icon","expand icon").replace("缩回","展开").replace("closerunseries","openrunseries").replace("closeid","openid");
    $('#segment3').html(a);
    int2=window.clearInterval(int2);
    caseresold=[];
}


function shuarunseries(a,b) {
    var re=a;

    if(!$('#uthree').hasClass('active')){
        int2=window.clearInterval(int2);
        $('#closeid').click();
        return 0;
    }
    $.get('/getcasereslist/'+b,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}

        var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
        var cases2=o.cases;
        if(iseq2(cases2,caseresold)){
            return 0;
        }else {
            caseresold=cases2;
        }


        for(var i=0;i<cases2.length;i++){

            var st="";

            switch (cases2[i].status){
                case '0':st="等待运行";break;
                case '1':st="准备运行";break;
                case '2':st="正在运行";break;
                case '3':st="运行完毕";break;
            }

            var res1="";

            switch (cases2[i].res){
                case '-1':cases2[i].status=="0"?res1="zerode":res1=" teal active";break;
                case '1':res1=" success ";break;
                case '2':res1=" errorde ";break;
                case '3':res1=" warningde ";break;

            }




            re+=   "  <div class=\"item\"> \n"+
                "    <div class=\"content\">\n"+
                "      <div class=\"header\">"+cases2[i].cname+"</div>\n"+
                "      <div class=\"description\">"+cases2[i].cdes+"</div>\n"+
                "\t  <div class=\"ui "+res1+"  progress\"  data-value=\""+cases2[i].runnum+"\" data-total=\""+cases2[i].allnum+"\" >\n"+
                "  <div class=\"bar\">\n"+
                "    <div class=\"progress\" ></div>\n"+
                "  </div>\n"+
                "  <div class=\"label\">"+st+"</div>\n"+
                "</div>\n"+
                "    </div>\n"+
                "  </div>";

        }
        re+="</div>";
        // console.log(re);
        $('#segment3').html(re);
        // console.log( $('#segment3').html())
        //  $('.ui.progress').progress();
        $('.ui.sticky')
            .sticky({
                context: '#segment3',offset       : 50,
                bottomOffset : 50
            });
        $('.ui.progress')
            .progress({
                label: 'ratio',
                text: {
                    ratio: '{value} de {total}'
                }
            });
        $('.warningde').progress('set warning');
        $('.errorde').progress('set error');





    });
    
}
function openrunseries(a) {

    var oldseri=$('#segment3').html().replace("expand icon","compress icon").replace("展开","缩回").replace("openrunseries","closerunseries").replace("\n","").replace("openid","closeid");
    var re=oldseri+"<div class=\"ui relaxed divided list\">";
shuarunseries(re,a);
 int2=setInterval("shuarunseries('"+re+"',"+a+")",2000);


    
}

function stopseries(a) {
    if (confirm("你确定要停止吗？")) {
    $.get('/stopseries/'+a+'/'+tid,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
        var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
    alertf(o.msg);
    });}
    
}
function shuaseries() {
    $.get('/getseries/'+tid,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
        var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
        var ses=o.series;
        var as=$('.active.segment').html();
        if(iseq(ses,seriesold)&&as!="loading..."){

            return 0;
        }else {
            // console.log(ses);
            // console.log(seriesold);



            seriesold=ses;
        }
        var s1={one:0,two:0,three:0,four:0};
        var s2={one:"<div class=\"ui segments\">",two:"<div class=\"ui segments\">",three:"<div class=\"ui segments\" id='segment3'>",four:"<div class=\"ui segments\">"};
        if(ses.length>0){
            for(var i=0;i<ses.length;i++){
                switch (ses[i].status){

                    case "0":s1.one++;s2.one+="  <div class=\"ui segment\">  <div class=\"ui right floated small   icon button   circular  \" title='删除' style='margin-top: -4px;' onclick='removeseries("+ses[i].id+")' ><i class=\"remove red icon\"></i></div><div class=\"ui right floated small   icon button   circular  \"  style='margin-top: -4px;'  title='运行' onclick='runseries("+ses[i].id+")' ><i class=\"play  green icon\"></i></div><p>"+ses[i].series+"，创建于："+ses[i].ordertime+"</p>  </div>";break;//<div class=\"ui right floated small   icon button   circular  \"  title='查看' style='margin-top: -4px;' onclick='lookserires()' ><i class=\"search icon \"></i></div><p>"+ses[i].series+"</p>  </div>
                    case "1":s1.two++;s2.two+="  <div class=\"ui segment\">  <div class=\"ui right floated small   icon button   circular  \" style='margin-top: -4px;' title='暂停' onclick='pauseseries("+ses[i].id+")' ><i class=\"pause icon\"></i></div><p>"+ses[i].series+"，创建于："+ses[i].ordertime+"</p> </div>";break; //<div class=\"ui right floated small   icon button   circular  \" style='margin-top: -4px;' onclick='' ><i class=\"search icon \"></i></div>
                    case "2":s1.three++;s2.three+="  <div class=\"ui segment ui sticky\"> <div class=\"ui right floated small   icon button   circular  \" style='margin-top: -4px;' id='openid' title='展开' onclick='openrunseries("+ses[i].id+")' ><i class=\"expand icon \"></i></div><div class=\"ui right floated small   icon button   circular  \" style='margin-top: -4px;' title='停止' onclick='stopseries("+ses[i].id+")' ><i class=\"stop icon\"></i></div> <p>"+ses[i].series+"，创建于："+ses[i].ordertime+"</p> </div>\n";break;
                    case "3":s1.four++;s2.four+="  <div class=\"ui segment\"> <div class=\"ui right floated small   icon button   circular  \" title='删除' style='margin-top: -4px;' onclick='removeseries("+ses[i].id+")' ><i class=\"remove red icon\"></i></div> <div class=\"ui right floated small   icon button   circular  \" style='margin-top: -4px;' title='查看' onclick='lookruncase("+ses[i].id+")' ><i class=\"record icon \"></i></div> <p>"+ses[i].series+"，创建于："+ses[i].ordertime+"</p> </div>\n";break;
                    case "4":s1.four++;s2.four+="  <div class=\"ui orange inverted segment\"> <div class=\"ui right floated small   icon button   circular  \" title='删除' style='margin-top: -4px;' onclick='removeseries("+ses[i].id+")' ><i class=\"remove red icon\"></i></div> <div class=\"ui right floated small   icon button   circular  \" style='margin-top: -4px;' title='查看' onclick='lookruncase("+ses[i].id+")' ><i class=\"record icon \"></i></div> <p>"+ses[i].series+"，创建于："+ses[i].ordertime+",问题：有用例步骤错误，请检查</p> </div>\n";break;
                    case "5":s1.four++;s2.four+="  <div class=\"ui yellow inverted segment\"> <div class=\"ui right floated small   icon button   circular  \" title='删除' style='margin-top: -4px;' onclick='removeseries("+ses[i].id+")' ><i class=\"remove red icon\"></i></div> <div class=\"ui right floated small   icon button   circular  \" style='margin-top: -4px;' title='查看' onclick='lookruncase("+ses[i].id+")' ><i class=\"record icon \"></i></div> <p>"+ses[i].series+"，创建于："+ses[i].ordertime+",强制停止</p> </div>\n";break;
                }

            }
            //console.log(s1);

            var l1=s1.one;

            if(l1>0){
                $('#uone').html("<div class=\"floating ui red label\">"+l1+"</div>尚未运行");

                $('#lookone').html(s2.one+"</div>");
            }else {
                $('#uone').html("尚未运行");
                $('#lookone').html("没有用例需要运行");
            }

            l1=s1.two;
            if(l1>0){
                $('#utwo').html("<div class=\"floating ui red label\">"+l1+"</div>等待运行");
                $('#looktwo').html(s2.two+"</div>");
            }else {
                $('#utwo').html("等待运行");
                $('#looktwo').html("没有用例等待运行");
            }
            l1=s1.three;
            if(l1>0){
                $('#uthree').html("<div class=\"floating ui red label\">running</div>正在运行");
                $('#lookthree').html(s2.three+"</div>");
            }else {
                $('#uthree').html("<div class=\"floating ui teal label\">none</div>正在运行");
                $('#lookthree').html("没有用例正在运行");
            }
            l1=s1.four;
            if(l1>0){
                $('#ufour').html("<div class=\"floating ui teal  label\">"+l1+"</div>运行完成");
                $('#lookfour').html(s2.four+"</div>");
            }else {
                $('#ufour').html("运行完成");
                $('#lookfour').html("没有用例运行完成");
            }




        }else {
            $('#lookone').html("没有用例需要运行");
            $('#looktwo').html("没有用例等待运行");
            $('#lookthree').html("没有用例正在运行");
            $('#lookfour').html("没有用例运行完成");
            $('#uone').html("尚未运行");
            $('#ufour').html("运行完成");

        }});
}

function checkimp(a) {
    var id=a.id;
    switch (id){
        case 'impc1': $(a).attr('id','impc4');$('.imp1').checkbox('check'); break;
        case 'impc2': $(a).attr('id','impc5');$('.imp2').checkbox('check');break;
        case 'impc3': $(a).attr('id','impc6');$('.imp3').checkbox('check');break;
        case 'impc4': $(a).attr('id','impc1');$('.imp1').checkbox('uncheck');break;
        case 'impc5': $(a).attr('id','impc2');$('.imp2').checkbox('uncheck');break;
        case 'impc6': $(a).attr('id','impc3');$('.imp3').checkbox('uncheck');break;
    }


}
function shuatestcase(type,a) {
    if(type==-1){
        $.get('/getcase/2/'+tid,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
            var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
            if(o.isok!=0){
                alertf(o.msg);
            }else{
                var ccs=o.cases;

                if(ccs.length>0){
                    var re="";

                    for(var i=0;i<ccs.length;i++){
                        var lab="labelz ";
                        var lab2=ccs[i].label.split(',');
                        for(var lb=0;lb<lab2.length;lb++){
                            lab+=" label"+lab2[lb];
                        }
                        var guodu=ccs[i].id+",'"+ccs[i].name+"'";
                        var aac=ccs[i].id+",'"+ccs[i].name+"','"+ccs[i].des+"',"+ccs[i].important;
                        re+= "                    <tr class='"+lab+"'>\n" +
                            "                        <td  >"+" <div class=\"column\">\n"+
                            "    <div class=\"ui test checkbox  imp imp"+ ccs[i].important+"\" id='"+ccs[i].id+"'>\n"+
                            "      <input type=\"checkbox\" >\n"+
                            "      <label> </label>\n"+
                            "    </div>\n"+
                            "  </div>"+"</td>\n" +
                            "                        <td  >"+ccs[i].name+"</td>\n" +
                            "                        <td  >"+ccs[i].des+"</td>\n" +
                            "                        <td  >"+int2imp(ccs[i].important)+"</td>\n"
                        // "                        <td  ><button class=\"ui  circular basic icon button\" onclick='lookstep("+ccs[i].id+")' title=\"查看操作步骤\"><i class=\"indent icon\"></i></button></td>\n" +
                        // "                        <td  ><button class=\"ui  circular basic icon button\" onclick='lookpre("+ccs[i].id+")' title=\"查看预置条件\"><i class=\"grid layout icon\"></i></button></td>\n" +
                        // "                        <td  ><button class=\"ui  circular basic icon button\" onclick=\"updatecase("+aac+")\" title=\"修改用例\"><i class=\"paint brush icon\"></i></button>\n" +
                        // "                            <button class=\"ui circular basic icon button \" onclick='removecase("+ccs[i].id+")' title=\"删除用例\"><i class=\"remove circle icon red\"></i></button></td>" +
                        // "<td><button class=\"ui circular basic icon button \" onclick=\"runcase("+guodu +")\" title=\"运行用例\"><i class=\"play icon green\"></i></button>" +
                        // "<button class=\"ui circular basic icon button \" onclick='lookruncase("+ccs[i].id+")' title=\"查看日志\"><i class=\"record icon \"></i></button>" +
                        // "</td>\n" +

                        "                    </tr>\n";
                    }
                    $('#testcaseid').html(re);
                    $('table').tablesort();
                    $('.test.checkbox').checkbox('attach events', '.toggle.button');
                    $('.test.checkbox').checkbox('attach events', '.check.button', 'check');
                    $('.test.checkbox').checkbox('attach events', '.uncheck.button', 'uncheck');

                    if(typeof(a)!="undefined"){
                        var cid1=a.split(",");
                        for(var i=0;i<cid1.length;i++){
                            $('#'+cid1[i]).checkbox('check');
                        }
                    }


                }else{
                    $('#testcaseid').html('无相关信息');
                }

            }
        });
    }else {
        $.get('/getcase/2/t'+type,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
            var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
            if(o.isok!=0){
                alertf(o.msg);
            }else{
                var ccs=o.cases;

                if(ccs.length>0){
                    var re="";

                    for(var i=0;i<ccs.length;i++){
                        var guodu=ccs[i].id+",'"+ccs[i].name+"'";
                        var aac=ccs[i].id+",'"+ccs[i].name+"','"+ccs[i].des+"',"+ccs[i].important;
                        var lab="labelz ";
                        var lab2=ccs[i].label.split(',');
                        for(var lb=0;lb<lab2.length;lb++){
                            lab+=" label"+lab2[lb];
                        }
                        re+= "                    <tr class='"+lab+"'>\n" +
                            "                        <td  >"+" <div class=\"column\">\n"+
                            "    <div class=\"ui test checkbox  imp imp"+ ccs[i].important+"\" id='"+ccs[i].id+"'>\n"+
                            "      <input type=\"checkbox\" >\n"+
                            "      <label> </label>\n"+
                            "    </div>\n"+
                            "  </div>"+"</td>\n" +
                            "                        <td  >"+ccs[i].name+"</td>\n" +
                            "                        <td  >"+ccs[i].des+"</td>\n" +
                            "                        <td  >"+int2imp(ccs[i].important)+"</td>\n"
                        // "                        <td  ><button class=\"ui  circular basic icon button\" onclick='lookstep("+ccs[i].id+")' title=\"查看操作步骤\"><i class=\"indent icon\"></i></button></td>\n" +
                        // "                        <td  ><button class=\"ui  circular basic icon button\" onclick='lookpre("+ccs[i].id+")' title=\"查看预置条件\"><i class=\"grid layout icon\"></i></button></td>\n" +
                        // "                        <td  ><button class=\"ui  circular basic icon button\" onclick=\"updatecase("+aac+")\" title=\"修改用例\"><i class=\"paint brush icon\"></i></button>\n" +
                        // "                            <button class=\"ui circular basic icon button \" onclick='removecase("+ccs[i].id+")' title=\"删除用例\"><i class=\"remove circle icon red\"></i></button></td>" +
                        // "<td><button class=\"ui circular basic icon button \" onclick=\"runcase("+guodu +")\" title=\"运行用例\"><i class=\"play icon green\"></i></button>" +
                        // "<button class=\"ui circular basic icon button \" onclick='lookruncase("+ccs[i].id+")' title=\"查看日志\"><i class=\"record icon \"></i></button>" +
                        // "</td>\n" +

                        "                    </tr>\n";
                    }
                    $('#testcaseid').html(re);
                    $('table').tablesort();
                    $('.test.checkbox').checkbox('attach events', '.toggle.button');
                    $('.test.checkbox').checkbox('attach events', '.check.button', 'check');
                    $('.test.checkbox').checkbox('attach events', '.uncheck.button', 'uncheck');
                }else{
                    $('#testcaseid').html('无相关信息');
                }

            }
        });
    }



}


function addtestcase() {
  var lengt=  $('.imp.checked');
  var aa=[];
  for(var i=0;i<lengt.length;i++){
      aa.push(lengt.get(i).id);

  }
  if(aa.length==0){
      alertf("请勾选用例！")
  }else {
      var dda=new Date();
      $.post('/addseries',{
          tid:tid,
          cids:aa.join(","),
          seriesName:dda.toLocaleDateString()+'-'+dda.getHours()+'-'+dda.getMinutes()+"运行"

      },function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
          var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
          alertf(o.msg);
      })
  }

}

function clickelemnet() {
    if(tid<1){
        alertf("请先选择项目~")
    }else{
        forfirstfun();
        mele=1;
        var re =base( "<th style=\"width: 40px\">#</th>\n" +
            "                        <th style=\"width: 15%\">页面名称</th>" +
            "                        <th style=\"width: 15%\">元素名称</th>" +

            "                        <th style=\"width: 80px\">定位方式</th>" +
            "                        <th style=\"min-width: 30em;\">定位值</th>" +
            "                        <th style=\"width: 80px\">关联页面</th>" +
            "                        <th style=\"width: 80px\">Frame</th>" +

            "                        <th style=\"width: 80px\">操作</th>" ,8,'topage()','跳转至页面','eleid');

        $('#context').html(re);
        shuaeleall();





    }

}

function lookstep(a,b) {
cid=a;
if(b){
    var re=base("                        <th style=\"width: 60px\">步骤</th>\n" +
        "                        <th  style=\"width: 80px\">所属页面</th>\n" +
        "                        <th  style=\"width: 15%\" >页面元素</th>\n" +
        "                        <th  style=\"width: 150px\" >操作</th>\n" +
        "                        <th style=\"min-width:100px\">输入值</th>\n" +
        "                        <th style=\"width:80px\">期望值</th>\n" +
        "                        <th style=\"width: 120px\">操作</th>\n",7,'wancheng()','完成','stepid','2a2');

    $('#context').html(re);
    shuastep();
}else {
    var re=" <div class=\"ui segment\" style='margin: 1rem'><div class=\"ui form\">\n"+
        "            <div class=\"field\">\n"+
        "                <div class=\"fields\">\n"+
        "\n"+
        "                    <div class=\"two wide field\">\n"+
        "                        <div class=\"ui fluid search selection  dropdown\" id='sehttp'>\n"+
        "                            <input type=\"hidden\" name=\"country\" id='http'>\n"+
        "                            <i class=\"dropdown icon\"></i>\n"+
        "                            <div class=\"default text\">发送方式</div>\n"+
        "                            <div class=\"menu\" >\n"+
        "                                <div class=\"item\" data-value=\"1\">get</div>\n"+
        "                                <div class=\"item\" data-value=\"2\">post</div>\n"+


        "\n"+
        "\n"+
        "                            </div>\n"+
        "                        </div>\n"+
        "                    </div>\n"+
        "\n"+
        "                    <div class=\"fourteen wide field \" id='urlid'>\n"+
        "                        <input type=\"text\"   placeholder=\"链接:http(s):\" id='urlv'>\n"+
        "                    </div>\n"+
        "\n"+
        "                </div>\n"+
        "            <div class=\"field\">\n"+
        "<label>传输内容，如有头文件，使用格式：HEAD{xxx:aaa&ccc:222}xxx=111&ccc=222</label>"+
        "<textarea id='areaid'></textarea>"+
        "                </div>\n"+
        "            <div class=\"field\">\n"+
        "                <label>值</label>\n"+
        "                <div class=\"fields\">\n"+
        "\n"+
        "                    <div class=\"two wide field\">\n"+
        "                        <div class=\"ui fluid search selection  dropdown\" id='setype3'>\n"+
        "                            <input type=\"hidden\" name=\"country\" id='type3'>\n"+
        "                            <i class=\"dropdown icon\"></i>\n"+
        "                            <div class=\"default text\">选择类型</div>\n"+
        "                            <div class=\"menu\">\n"+
        "                                <div class=\"item\" data-value=\"1\">等于</div>\n"+
        "                                <div class=\"item\" data-value=\"2\">不等于</div>\n"+
        "                                <div class=\"item\" data-value=\"3\">包含</div>\n"+
        "                                <div class=\"item\" data-value=\"4\">不包含</div>\n"+
        "\n"+
        "\n"+
        "                            </div>\n"+
        "                        </div>\n"+
        "                    </div>\n"+
        "\n"+
        "                    <div class=\"eleven wide field \" id='input2'>\n"+
        "                        <input type=\"text\"   placeholder=\"值的内容\" id='inputv3'>\n"+
        "                    </div>\n"+
        "                    <div class=\"two wide field \" id='input2'>\n"+
        "<div class=\"ui buttons\">\n"+
        "<button class=\"ui small button\" onclick=\"$('#mcase').click()\">\n"+
        "  返回\n"+
        "</button>"+
        "  <div class=\"or\"></div>\n"+
        "<button class=\"ui small primary button\" onclick='updatehttpcase("+cid+")'>\n"+
        "  保存\n"+
        "</button>"+
        "</div>"+


        "                    </div>\n"+
        "\n"+
        "                </div>\n"+
        "            </div>\n"+

        "    </div></div>";
    $('#context').html(re);
    $('.ui.dropdown').dropdown();

    $.get('/gethttpcase/'+cid,function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
        var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}
        if(o.isok!=0){
            alertf(o.msg);
        }else{
           var cs= o.cases;
           if(cs.length==1&&cs[0].type!='-1'){
               $('#sehttp').dropdown('set selected',cs[0].type);
               $('#setype3').dropdown('set selected',cs[0].eq);
               $('#areaid').val(cs[0].con.toString().replace(/<br\/>/g,"\n").replace(/&quot;/g,"\"").replace(/&apos;/g,"'").replace(/&dakuohao1/g,"{").replace(/&dakuohao2/g,"}").replace(/&fanxiegang/g,"\\"));
               $('#urlv').val(cs[0].url);
               $('#inputv3').val(cs[0].value.replace(/<br\/>/g,"\n").replace(/&quot;/g,"\"").replace(/&apos;/g,"'").replace(/&dakuohao1/g,"{").replace(/&dakuohao2/g,"}").replace(/&fanxiegang/g,"\\"));
           }

       // .replace("\"","&quot;").replace("'","&apos;").replace("\n","<br/>").replace("{","&dakuohao1").replace("}","&dakuohao2").replace("\\","&fanxiegang")

        }});


}

}

function updatehttpcase(a) {
    var http=$('#http').val();
    var type=$('#type3').val();
    var area=$.trim($('#areaid').val());
    var url=$.trim( $('#urlv').val());
    var inp=$.trim($('#inputv3').val());




    if(http==""||inp==""||type==""||url==""){
        alertf("请输入完整数据！")

    }else {
//String type,String url,String con,String eq,String value,String cid
        $.post('/upatehttp',{type:http,url:url,con:area,eq:type,value:inp,cid:cid

        },function (data,st) {if(st=="success"){}else {alertf("网站出错，请联系管理员");}
            var o=$.parseJSON(data); if(o.isok=="3"){location.href='/';return false;}

                alertf(o.msg);
           })

    }
}


function lookelement(a) {

    var re =base( "<th style=\"width: 40px\"><button class=\"ui right floated circular basic icon button\"  onclick='returnpage()'  title=\"返回页面\"><i class=\"reply icon\"></i></button></th>\n" +
    "                        <th style=\"width: 15%\">元素名称</th>" +

    "                        <th style=\"width: 80px\">定位方式</th>" +
    "                        <th style=\"min-width: 30em;\">定位值</th>" +
    "                        <th style=\"width: 80px\">关联页面</th>" +
        "                        <th style=\"width: 80px\">Frame</th>" +

    "                        <th style=\"width: 80px\">操作</th>" ,7,'addele()','添加元素','eleid');

    $('#context').html(re);

    



    pid=a;
    shuaele();


}
function addpage() {
    $('#kanbujian').text(0);
    $('#modal1').modal('show');
}

function adduser() {
    ass2=0;
    $('#ispass').checkbox('check');
    $('#modal3').modal('show');
}
function additem() {
    ass3=0;

    $('#modal4').modal('show');
}

function addcase() {
    ass4=0;
    $('#typeele').removeClass('disabled');
    $('#modal5').modal('show');
}

function addds(){
    adddatasource=0;
    $('#modal7').modal('show');
    
}

function  updateele(a) {
    ass1=a;
    var nn=0;
    for(var i=0;i<elements1.length;i++){
        if(elements1[i].id==a){
            nn=i;
            break;
        }


    }

    $('#ename').val(elements1[nn].name);
    $('#eval').val(elements1[nn].value);
    $('#elo').dropdown('set selected',elements1[nn].locationMethod);
   // $('#etype').dropdown('set selected',elements1[nn].type);
    if(elements1[nn].isframe=="1"){
            $('#chisfr').checkbox('check');
    }
    if(elements1[nn].num!="-1"){
        $('#enum').val(elements1[nn].num);
    }

    if(elements1[nn].toframe!="-1"){
        $('#chfr').click();
        $('#sefr').dropdown('set selected',elements1[nn].toframe);
    }

    if(elements1[nn].topage!="-1"){
        $('#chwin').click();
        $('#sewin').dropdown('set selected',elements1[nn].topage);


    }
    if(elements1[nn].waitid!="-1"){
        $('#sewait').dropdown('set selected',elements1[nn].waitid);

        $('#waitd').removeClass('disabled');
        $('#waitv').val(elements1[nn].waitvalue);
    }

    $('#modal2').modal('show');





}

function  in2st4type(a) {
    switch (a){
        case "1": return "按钮";
        case "2": return "勾选框";
        case "3": return "提示框";
        case "4": return "单选";
        //case "5": return "下拉框";
        case "6": return "文本";
        case "7": return "上传";
        case "8": return "frame";
        case "9": return "输入框";
       // case "9": return "跳转";
    }

}

function  in2act4typeandcheck(a) {
    switch (a){
        case "1": return "2,13";
        case "2": return "4,2,13";
        case "3": return "13,17";
        case "4": return "4,13";
        case "5": return "13";
        case "6": return "5,13";
        case "7": return "";

    }

}

function  in2act4type(a) {
    switch (a){
        case "1": return "1";
        case "2": return "1,3";
        case "3": return "6,7";
        case "4": return "1,3";
        case "5": return "8,9,10";
        case "6": return "11,3";
        case "7": return "12";
        case "9": return "14,15";

    }

}

function  in2en4type(a) {
    switch (a){
        case "1": return "button";
        case "2": return "checkbox";
        case "3": return "dialog";
        case "4": return "radio";
       // case "5": return "select";
        case "6": return "text";
        case "7": return "upload";
        case "8": return "frame";
       // case "9": return "link";
    }

}

function  in2st4action(a) {
    // "    <div class=\"item\" data-value=\"1\">点击</div>\n"+
    // "    <div class=\"item\" data-value=\"2\">输入内容</div>\n"+
    // "    <div class=\"item\" data-value=\"3\">清除</div>\n"+
    // "    <div class=\"item\" data-value=\"4\">上传文件</div>\n"+
    // "    <div class=\"item\" data-value=\"5\">确认（alert）</div>\n"+
    // "    <div class=\"item\" data-value=\"6\">取消（alert）</div>\n"+
    switch (a){
        case "1" :return "点击";
        case "2" :return "输入内容";
        case "3" :return "清除";
        case "4" :return "上传文件";
        case "5" :return "确认（alert）";
        case "6" :return "取消（alert）";


        case "7" :return "存在";
        case "8" :return "获取文本";
        case "9" :return "获取输入值";
        case "10" :return "获取文本（alert）";
        case "11" :return "可用";
        case "12" :return "被选中";


        // case "1": return "点击";
        // case "2": return "是否可用";
        // case "3": return "清除";
        // case "4": return "是否被选中";
        // case "5": return "获取文本";
        // case "6": return "确认按钮";
        // case "7": return "取消按钮";
        // case "8": return "选择文字";
        // case "9": return "选择值";
        // case "10": return "清除选项";
        // case "11": return "输入值";
        // case "12": return "上传按钮";
        // case "13": return "是否存在";
        // // case "14":return "跳转";
        // // case "15":return "回退";
        // case "16":return "获取属性";
        // case "17":return "获取文本";
        // case "18":return "获取输入值";

    }

}


function  in2st4lo(a) {
    switch (a){
        case "1": return "id";
        case "2": return "name";
        case "3": return "tagname";
        case "4": return "linktext";
        case "5": return "classname";
        case "6": return "xpath";
        case "7": return "css";

    }

}

function  addele() {

    ass1=0;
    $('#modal2').modal('show');
}


function returnpage() {
    $('#mpage').click();
    pid=0;
    elements1={};
}


