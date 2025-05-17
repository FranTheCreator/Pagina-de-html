// Cosas que no entiendo = ***
// Cosas que entiendo más o menos ***?


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
    // ***
    button.addEventListener('click', () => {
        button.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    });
    // ***
});




// HEIGHT DINAMICO de screen_centers
const screen_descriptions = document.querySelectorAll(".screen__description"),
screen_content_blocks = document.querySelectorAll(".screen__content-block");

// ***?
const descriptionsObserver = new ResizeObserver(entries => {
    heightSetter(entries, screen_descriptions, screen_content_blocks);
});

screen_descriptions.forEach(screen_description => {
    descriptionsObserver.observe(screen_description);
});
// ***?



// HEIGHT DINAMICO de screen_content_blocks
// ***?
const screen_centers = document.querySelectorAll(".screen__center"),
screen_wrappers = document.querySelectorAll(".screen__wrapper");

const wrappersObserver = new ResizeObserver(entries => {
    heightSetter(entries, screen_wrappers, screen_centers);
});

screen_wrappers.forEach(screen_wrapper => {
    wrappersObserver.observe(screen_wrapper);
});
// ***?



function heightSetter (entradas, heightToObserve, heightToSet){
    entradas.forEach(entry => {
        const index = Array.from(heightToObserve).indexOf(entry.target);
        const h = entry.target.offsetHeight;

        if (index === -1 || !heightToSet[index]) return;
        
        heightToSet[index].style.height = h + "px";
    });
}



// SLIDE RESPONSIVE Y TIMEOUT DINAMICO

let universalTimeout = false,
    dualIndexList = [],
    dualClassList = [],
    deletedModifiersIndexList = [],
    deletedModifiersClassList = [];

// ***
const handlersMap = new Map();
// ***
// Dios como odio el removeEventListener, por qué no lo hicieron más fáciiiiiiil, es horrible



function ResponsiveSlides (){
    screen_content_blocks.forEach((screen_content_block, index) => {
        // ***
        const key = `block-${index}`;
        // ***

        const screen_hitbox = document.createElement("div"),
            screen_frame = document.createElement("div");

            screen_hitbox.className = "screen__hitbox";
            screen_frame.className = "screen__frame";


        let screen_description = screen_descriptions[index],
            nextScreenContentBlock = screen_content_blocks[index + 1],
            nextScreenDescription = screen_descriptions[index + 1],
            wrapper = screen_wrappers[index],
            nextWrapper = screen_wrappers[index + 1];

        // ***
        if (!handlersMap.has(key)) {
            handlersMap.set(key, {
                handler1: () => addDualSlide(screen_description, nextScreenContentBlock, "-left"),
                handler2: () => addDualSlide(nextScreenDescription, screen_content_block, "-right"),
                handler3: () => addMonoSlide(screen_content_block, screen_description),
                handler4: () => addFlip(document.querySelectorAll(".screen__frame")[index]),
            });
        }
        
        const { handler1, handler2, handler3, handler4 } = handlersMap.get(key);
        // ***

        if (window.innerWidth > 1000) {
            desktopLayout(screen_content_block, screen_description, nextScreenContentBlock, nextScreenDescription, wrapper, nextWrapper, handler1, handler2, handler3, index);
        } 
        else if (window.innerWidth < 800){
            mobileLayout(screen_content_block, screen_description, nextScreenContentBlock, nextScreenDescription, wrapper, nextWrapper, handler1, handler2, handler3, handler4, screen_hitbox, screen_frame, index);
        }
        else {
            deleteMobileLayout(wrapper, screen_content_block, screen_description);
            monoLayout(screen_content_block, screen_description, nextScreenContentBlock, nextScreenDescription, wrapper, nextWrapper, handler1, handler2, handler3, index);
            addDeletedModifiers(screen_content_block, index);
        }
    });
}

function deleteMobileLayout (wrapper, screen_content_block, screen_description){
    const hitboxes = document.querySelectorAll(".screen__hitbox");
    if (hitboxes.length > 0) {
        wrapper.appendChild(screen_content_block);
        wrapper.appendChild(screen_description);
        wrapper.removeChild(hitboxes[0]);
    }
}

function addDeletedModifiers (screen_content_block, index){
    if (deletedModifiersIndexList.includes(index)){
        screen_content_block.classList.add(deletedModifiersClassList[index]);
    }
}


function desktopLayout (screen_content_block, screen_description, nextScreenContentBlock, nextScreenDescription, wrapper, nextWrapper, handler1, handler2, handler3, index) {
    deleteMobileLayout(wrapper, screen_content_block, screen_description);

    screen_content_block.removeEventListener("click", handler3);


    if (dualIndexList.includes(index) && dualIndexList.includes(index + 1)){
        wrapper.classList.remove("wrapper--mono-block");
        screen_content_block.className = `screen__content-block ${dualClassList[0]}`;
        screen_description.className = `screen__description ${dualClassList[1]}`;

        

        nextWrapper.classList.remove("wrapper--mono-block");
        nextScreenContentBlock.className = `screen__content-block ${dualClassList[2]}`;
        nextScreenDescription.className = `screen__description ${dualClassList[3]}`;
    }

    if (screen_content_block.classList.contains("content-block--dual-block-left") && nextScreenContentBlock) {
        screen_content_block.addEventListener("click", handler1);
        nextScreenContentBlock.addEventListener("click", handler2);
    } else {
        screen_content_block.addEventListener("click", handler3);
    }
    addDeletedModifiers(screen_content_block, index);
}

function mobileLayout (screen_content_block, screen_description, nextScreenContentBlock, nextScreenDescription, wrapper, nextWrapper, handler1, handler2, handler3, handler4, screen_hitbox, screen_frame, index) {
    if (wrapper.firstElementChild.className != "screen__hitbox"){ 
        monoLayout(screen_content_block, screen_description, nextScreenContentBlock, nextScreenDescription, wrapper, nextWrapper, handler1, handler2, handler3, index);
        screen_content_block.removeEventListener("click", handler3);
        screen_hitbox.addEventListener("click", handler4);

        screen_content_block.classList.add("content-block--flip");
        screen_description.className = "screen__description description--flip";

        screen_frame.appendChild(screen_content_block);
        screen_frame.appendChild(screen_description);
        screen_hitbox.appendChild(screen_frame);
        wrapper.appendChild(screen_hitbox);
    }
    addDeletedModifiers(screen_content_block, index);
}

function monoLayout (screen_content_block, screen_description, nextScreenContentBlock, nextScreenDescription, wrapper, nextWrapper, handler1, handler2, handler3, index){
    if (
        screen_content_block.classList.length > 1 &&
        screen_content_block.classList.contains("content-block--dual-block-left")
    ){
        if (!dualIndexList.includes(index) && !document.querySelectorAll(".screen__hitbox")[0]) { 
            dualIndexList.push(index, index + 1) 
        }
        if (!dualClassList.includes(screen_content_block.classList.item(1)) && !document.querySelectorAll(".screen__hitbox")[0]) { 
            dualClassList.push(
                screen_content_block.classList.item(1), 
                screen_description.classList.item(1), 
                nextScreenContentBlock.classList.item(1), 
                nextScreenDescription.classList.item(1)
            )
        }
        
        screen_content_block.removeEventListener("click", handler1);
        nextScreenContentBlock.removeEventListener("click", handler2);


        nextScreenContentBlock.className = "screen__content-block"
        nextScreenDescription.className = "screen__description description--mono-block"
        nextWrapper.classList.add("wrapper--mono-block");
    }
    if (!deletedModifiersIndexList.includes(index) && screen_content_block.classList.length > 1 && !screen_content_block.className.includes("dual-block") && !screen_content_block.className.includes("flip")){
        deletedModifiersIndexList.push(index);
        deletedModifiersClassList.push(screen_content_block.classList.item(1));
    } else if (!deletedModifiersClassList.includes(index) && deletedModifiersClassList.length <= screen_content_blocks.length - 1){ deletedModifiersClassList.push("") }

    wrapper.classList.add("wrapper--mono-block");
    screen_content_block.className = "screen__content-block"
    screen_description.className = "screen__description description--mono-block"

    screen_content_block.addEventListener("click", handler3);
}

function addDualSlide(contentBlockDescription, otherContentBlock, side) {
    timeoutSystem(contentBlockDescription, otherContentBlock, 1, side);
}
        
function addMonoSlide(contentBlock, contentBlockDescription) {
    timeoutSystem(contentBlock, contentBlockDescription, 2);
}

function addFlip(frame){
    timeoutSystem(frame, "", 3);
}


function monoSlide(contentBlock, contentBlockDescription) {
    contentBlock.classList.toggle("mono-slide-c");
    contentBlockDescription.classList.toggle("mono-slide-d");
}

function dualSlide(contentBlockDescription, oppositeContentBlock, mainContentBlockSide) {
    contentBlockDescription.classList.toggle(`dual-slide${mainContentBlockSide}`);
    if (oppositeContentBlock.classList.contains("no-index")) {
        setTimeout(() => oppositeContentBlock.classList.remove("no-index"), 300);
    }
    oppositeContentBlock.classList.add("no-index");
}

function flip(frame){
    frame.classList.toggle("mobile-flip-card");
}


function timeoutSystem (element1, element2, slideSelector, mainContentBlockSide) {
    if (universalTimeout) { }
    else if (slideSelector == 3){
        flip(element1)
        universalTimeout = true;
        setTimeout(() => universalTimeout = false, 300);
    }
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




window.addEventListener("resize", ResponsiveSlides);

ResponsiveSlides();