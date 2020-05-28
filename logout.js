var logoutbutton=document.getElementById("loginButon");

logoutbutton.addEventListener('click',()=>{
    var xmlhttp = new XMLHttpRequest();
    var url = "logout";
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        window.location.href="loginhtml";
    }
    };
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send();
});