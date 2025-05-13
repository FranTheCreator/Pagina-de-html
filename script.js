// CAMBIO DE SCREEN

const header_buttons = document.querySelectorAll(".header__button"),
    screens = document.querySelectorAll(".screen"),
    screens_centers = document.querySelectorAll(".screen__center");


header_buttons.forEach((button, index) =>{
    button.addEventListener("click", ()=>{
        screens.forEach(screen =>{
            screen.classList.remove("screen--active");
        });
        screens_centers.forEach(screen_center =>{
            screen_center.classList.remove("center--fade-in");
            void screen_center.offsetWidth;
        });
        screens[index].classList.add("screen--active");
        screens_centers[index].classList.add("center--fade-in");
    })
});




// SLIDE Y TIMEOUT DINAMICO

const header_tags = document.getElementById("content-block-header-tags"),
    header_tags_description = document.getElementById("content-block-header-tags-description"),
    style_tags = document.getElementById("content-block-style-tags"),
    style_tags_description = document.getElementById("content-block-style-tags-description"),
    lists = document.getElementById("content-block-lists"),
    lists_description = document.getElementById("content-block-lists-description"),
    table = document.getElementById("content-block-table"),
    table_description = document.getElementById("content-block-table-description"),
    links = document.getElementById("content-block-links"),
    links_description = document.getElementById("content-block-links-description"),
    imgs = document.getElementById("content-block-imgs"),
    imgs_description = document.getElementById("content-block-imgs-description"),
    audioVideo = document.getElementById("content-block-audio-video"),
    audioVideo_description = document.getElementById("content-block-audio-video-description"),
    forms = document.getElementById("content-block-forms"),
    forms_description = document.getElementById("content-block-forms-description"),
    layout = document.getElementById("content-block-layout"),
    layout_description = document.getElementById("content-block-layout-description");

let universalTimeout = false;


function dualSlide(e1, e2, e3) {
    e1.classList.toggle(`dual-slide${e3}`);
    if (e2.classList.contains("no-index")) {
        setTimeout(() => e2.classList.remove("no-index"), 300);
    }
    e2.classList.add("no-index");
}

function monoSlide(e1, e2) {
    e1.classList.toggle("mono-slide-c");
    e2.classList.toggle("mono-slide-d");
}

function timeoutSystem (e1, e2, slideSelector, e3) {
    if (universalTimeout) { }
    else if (slideSelector == 2) {
        monoSlide(e1, e2)
        universalTimeout = true;
        setTimeout(() => universalTimeout = false, 300);
    } else {
        dualSlide(e1, e2, e3)
        universalTimeout = true;
        setTimeout(() => universalTimeout = false, 300);
    }
}


header_tags.addEventListener("click", () => {
    timeoutSystem(header_tags_description, style_tags, 1, "-left");
});
style_tags.addEventListener("click", () => {
    timeoutSystem(style_tags_description, header_tags, 1, "-right");
});
lists.addEventListener("click", () => {
    timeoutSystem(lists, lists_description, 2);
});
table.addEventListener("click", () =>{
    timeoutSystem(table, table_description, 2);
});
links.addEventListener("click", () =>{
    timeoutSystem(links, links_description, 2);
});
imgs.addEventListener("click", ()=>{
    timeoutSystem(imgs_description, audioVideo, 1, "-left");
});
audioVideo.addEventListener("click", ()=>{
    timeoutSystem(audioVideo_description, imgs, 1, "-right");
});
forms.addEventListener("click", ()=>{
    timeoutSystem(forms, forms_description, 2);
});
layout.addEventListener("click", ()=>{
    console.log("adad")
    timeoutSystem( layout, layout_description, 2);
});
