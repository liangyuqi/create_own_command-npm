#!/usr/bin/env node
'use strict';

var log = console.log;
var color = require('colors-cli/safe')
var info = require('./../lib/info.json');
var basicinfo = info.basicinfo;//基本信息数据：
var interest = info.interest; // 兴趣爱好数据

//基本信息  预览
function preview_basicinfo(){
    var dt = basicinfo.data
    log()
    log("  "+ color.x46.bold(basicinfo.title + ': ' +(dt.name.val||''))  )
    log()
    log("   " + (dt.workExperience?dt.workExperience.val + '|' :'') +
        (dt.gender?dt.gender.val + '|' :'') +
        (dt.dateOfBirth?dt.dateOfBirth.val + '|' :'') +
        (dt.maritalStatus?dt.maritalStatus.val + '|' :'') +
        (dt.height?dt.height.val :'') )

    log("   ----------------------------");
    if(dt.hukou)log("   " + dt.hukou.info + " : " + dt.hukou.val);
    if(dt.residency)log("   " + dt.residency.info + " : " + dt.residency.val);
    if(dt.nation || dt.region || dt.currentCity || dt.postalCode){
        var address = '' + (dt.nation.val||'') + ' ' +
            (dt.currentCity.val || '') + ' ' +
            (dt.postalCode.val?' (邮编: '+dt.postalCode.val+')':'');

        log("   地　址 : "+ address);
    }
    if(dt.mobile)log("   " + dt.mobile.info + " : " + dt.mobile.val);
    if(dt.email)log("   " + dt.email.info + " : " + dt.email.val);
    if(dt.website)log("   " + dt.website.info + " : " + dt.website.val);
    log()
}

//兴趣爱好  预览
function preview_interest(){
    var its = interest.data;
    log()
    log(" "+color.x46(interest.title))
    log()
    for (var i = 0; i < its.length; i++) {

        var txt = "   " + color.x161('■ ');

        for(var a in its[i]){
            if(its[i][a]) {
                if(a === "名称"){
                    // var new_k = color.red.bold(a);
                    // var new_v = color.red.bold(its[i][a]);
                    txt += color.yellow.bold(a + ':' + its[i][a]) + '\n   ----------------------------\n   ' + color.x161('› ');
                }else{
                    txt += a + ':' + its[i][a] + '\n   ' + color.x161('› ') ;
                }
                // log("   ■ " + (its[i][a]? a + ':' + its[i][a]:"") )
            }
        }
        log(txt)
        // log("   ----------------------------");
    };
    log()
}

//错误处理
function error_undefine(options,alias){
    log()
    log("   zhaobin:"+"'"+alias+"'"+" is not a zhaobin command. See 'zhaobin "+options._alias+" --help'.")
    log()
}

module.exports = function(cmd,options) {
    // console.log("IF::",options);
    // console.log("message:123:",cmd);
    // console.log("message:124:",options.basicinfo);
    // console.log("message:124:",options.education);
    if(cmd === 'preview'){
        //提供可选参数预览简历
        preview_basicinfo();
        preview_interest();
    }else if(options.basicinfo){
        //基本信息
        if(options.basicinfo === true && !cmd){
            preview_basicinfo();
        }else if(!basicinfo.data[cmd || options.basicinfo]){
            error_undefine(options,(cmd||options.basicinfo))
        }else{
            for (var a in basicinfo.data) {
                if(cmd === a || a === options.basicinfo){
                    log()
                    log('   '+color.x46.bold('› '+basicinfo.data[a].info + " : ") + color.x161(basicinfo.data[a].val));
                    log()
                }
            };
        }
    }else if(options.interest){
        //兴趣爱好 预览
        if(options.interest === true && !cmd){
            preview_interest();
        }else{
            error_undefine(options,(cmd||options.skill))
        }
    }else{
        //如果没有任何参数就是预览简历
        preview_basicinfo();
        preview_interest();
    }
};