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



// HEIGHT DINAMICO de screen_centers
const screen_descriptions = document.querySelectorAll(".screen__description"),
screen_content_blocks = document.querySelectorAll(".screen__content-block");

const descriptionsObserver = new ResizeObserver(entries => {
    heightSetter(entries, screen_descriptions, screen_content_blocks);
});

screen_descriptions.forEach(screen_description => {
    descriptionsObserver.observe(screen_description);
});



// HEIGHT DINAMICO de screen_content_blocks
const screen_centers = document.querySelectorAll(".screen__center"),
screen_wrappers = document.querySelectorAll(".screen__wrapper");

const wrappersObserver = new ResizeObserver(entries => {
    heightSetter(entries, screen_wrappers, screen_centers);
});

screen_wrappers.forEach(screen_wrapper => {
    wrappersObserver.observe(screen_wrapper);
});



function heightSetter (entradas, heightToObserve, heightToSet){
    entradas.forEach(entry => {
        const index = Array.from(heightToObserve).indexOf(entry.target);
        const h = entry.target.offsetHeight;

        if (index === -1 || !heightToSet[index]) return;
        
        heightToSet[index].style.height = h + "px";
    });
}



// SLIDE RESPONSIVE Y TIMEOUT DINAMICO

let universalTimeout = false;

screen_content_blocks.forEach( (screen_content_block, index)=>{
    if (screen_content_block.classList.contains("content-block--dual-block-left") && screen_content_blocks[index + 1].classList.contains("content-block--dual-block-right")){
        screen_content_block.addEventListener("click", ()=>{
            timeoutSystem(screen_descriptions[index], screen_content_blocks[index + 1], 1, "-left");
        });

        screen_content_blocks[index + 1].addEventListener("click", ()=>{
            timeoutSystem(screen_descriptions[index + 1], screen_content_block, 1, "-right");
        });

    } else { 
        screen_content_block.addEventListener("click", ()=>{
            timeoutSystem(screen_content_block, screen_descriptions[index], 2);
        });
    }
});



function dualSlide(contentBlockDescription, oppositeContentBlock, mainContentBlockSide) {
    contentBlockDescription.classList.toggle(`dual-slide${mainContentBlockSide}`);
    if (oppositeContentBlock.classList.contains("no-index")) {
        setTimeout(() => oppositeContentBlock.classList.remove("no-index"), 300);
    }
    oppositeContentBlock.classList.add("no-index");
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