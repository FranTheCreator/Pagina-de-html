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
    });
});


// 




// height dinamico de screen_content_blocks y screen_centers

    // screen_centers
const screen_descriptions = document.querySelectorAll(".screen__description"),
screen_content_blocks = document.querySelectorAll(".screen__content-block");


const descriptionsObserver = new ResizeObserver(entries => {
    heightSetter(entries, screen_descriptions, screen_content_blocks);
});

screen_descriptions.forEach(screen_description => {
    descriptionsObserver.observe(screen_description);
});


    // screen_content_blocks
const screen_centers = document.querySelectorAll(".screen__center"),
screen_wrappers = document.querySelectorAll(".screen__wrapper");


const wrappersObserver = new ResizeObserver(entries => {
    heightSetter(entries, screen_wrappers, screen_centers)
});

screen_wrappers.forEach(screen_wrapper => {
    wrappersObserver.observe(screen_wrapper);
});


function heightSetter (entradas, heightToObserve, heightToSet){
    entradas.forEach(entry => {
        const index = Array.from(heightToObserve).indexOf(entry.target);
        const h = entry.target.offsetHeight;
        heightToSet[index].style.height = h + "px";
    });
}

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


function dualSlide(contentBlockDescription, oppositeContentBlock, mainContentBlockSide) {
    contentBlockDescription.classList.toggle(`dual-slide${mainContentBlockSide}`);
    if (oppositeContentBlock.classList.contains("no-index")) {
        setTimeout(() => oppositeContentBlock.classList.remove("no-index"), 300);
    }
    e2.classList.add("no-index");
}

function monoSlide(contentBlock, contentBlockDescription) {
    contentBlock.classList.toggle("mono-slide-c");
    contentBlockDescription.classList.toggle("mono-slide-d");
}

function timeoutSystem (element1, element2, slideSelector, mainContentBlockSide) {
    if (universalTimeout) { }
    else if (slideSelector == 2) {
        monoSlide(element1, element2);
        universalTimeout = true;
        setTimeout(() => universalTimeout = false, 300);
    } else {
        dualSlide(element1, element2, mainContentBlockSide)
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
