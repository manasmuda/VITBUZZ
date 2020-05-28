var homeButton=document.getElementById("homeButton");
var newsButton=document.getElementById("newsButton");
var eventsButton=document.getElementById("eventsButton");
var favButton=document.getElementById("favButton");
var publishNewsButton=document.getElementById("newNewsButton");
var publishEventButton=document.getElementById("newEventsButton");
var hostels=document.getElementById("hostelsButton");

var menuButton=document.getElementById("menuButton");
var menu=document.getElementById("menu");
var title=document.getElementById("title");

var mf=0;

menuButton.addEventListener("click",()=>{
    if(mf==0){
        mf=1;
        menu.style.width="0%";
        title.style.width="0px";
        title.children.item(0).style.display="none";
        increasePage();
    }
    else
    {
        mf=0;
        menu.style.width="20%";
        title.style.width="250px";
        title.children.item(0).style.display="block";
        decreasePage();
    }
});

homeButton.addEventListener("click",()=>{
    window.location.href="userHomehtml";
});

newsButton.addEventListener("click",()=>{
    window.location.href="userNewshtml";
});

eventsButton.addEventListener("click",()=>{
    window.location.href="userEventshtml";
});

favButton.addEventListener("click",()=>{
    window.location.href="userHomehtml";
});

publishNewsButton.addEventListener("click",()=>{
    window.location.href="publishNewshtml";
});

publishEventButton.addEventListener("click",()=>{
    window.location.href="publishEventshtml";
});

hostelsButton.addEventListener("click",()=>{
    window.location.href="hostelhtml";
});