var exports=module.exports={};

const chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

exports.randomString= function(length) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

exports.parseCookies=function(cookie){
    return Object.fromEntries(cookie.split('; ').map(x => x.split('=')));
}