// Cosas que no entiendo = ***
// Cosas que entiendo más o menos = ***?

// SCREEN SWITCH
const header_buttons = document.querySelectorAll(".header__button"),
    screens = document.querySelectorAll(".screen"),
    screens_centers = document.querySelectorAll(".screen__center");


// Add EventListeners to buttons  
header_buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
        screens.forEach(screen => {
            screen.classList.remove("screen--active");
        });

        screens_centers.forEach(screen_center => {
            screen_center.classList.remove("center--fade-in");
            void screen_center.offsetWidth;
        });

        screens[index].classList.add("screen--active");
        screens_centers[index].classList.add("center--fade-in");

        // ***
        button.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
        // ***
    });
});




// DINAMIC HEIGHT OF POSITION ABSOLUTE-RELATIVE: screen_content_blocks
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



// DINAMIC HEIGHT OF POSITION ABSOLUTE-RELATIVE: screen_centers
const screen_centers = document.querySelectorAll(".screen__center"),
    screen_wrappers = document.querySelectorAll(".screen__wrapper");

// ***?
const wrappersObserver = new ResizeObserver(entries => {
    heightSetter(entries, screen_wrappers, screen_centers);
});

screen_wrappers.forEach(screen_wrapper => {
    wrappersObserver.observe(screen_wrapper);
});
// ***?



function heightSetter(entries, heightToObserve, heightToSet) {
    entries.forEach(entry => {
        const index = Array.from(heightToObserve).indexOf(entry.target);
        const h = entry.target.offsetHeight;

        if (index === -1 || !heightToSet[index]) return;

        heightToSet[index].style.height = h + "px";
    });
}



// RESPONSIVE SLIDES  AND TIMEOUT 

let universalTimeout = false,
    dualIndexList = [],
    dualClassList = [],
    deletedModifiersIndexList = [],
    deletedModifiersClassList = [];

// ***
const handlersMap = new Map();
// ***

// RESPONSIVE LAYOUTS
function desktopLayout(screen_content_block, screen_description, nextScreenContentBlock, nextScreenDescription, wrapper, nextWrapper, handler1, handler2, handler3, empty, index) {
    // Remove other Layouts and EventListeners
    deleteMobileLayout(wrapper, screen_content_block, screen_description);
    screen_content_block.removeEventListener("click", handler3);

    // Reset classNames and dual BEM modifiers
    if (dualIndexList.includes(index) && dualIndexList.includes(index + 1)) {
        wrapper.classList.remove("wrapper--mono-block");
        screen_content_block.className = `screen__content-block ${dualClassList[0]}`;
        screen_description.className = `screen__description ${dualClassList[1]}`;



        nextWrapper.classList.remove("wrapper--mono-block");
        nextScreenContentBlock.className = `screen__content-block ${dualClassList[2]}`;
        nextScreenDescription.className = `screen__description ${dualClassList[3]}`;
    }

    // Add Desktop EventListeners 
    if (screen_content_block.classList.contains("content-block--dual-block-left") && nextScreenContentBlock) {
        screen_content_block.addEventListener("click", handler1);
        nextScreenContentBlock.addEventListener("click", handler2);
    } else if (screen_content_block.classList.contains("content-block--dual-block-right")) {
        return
    } else {
        screen_content_block.addEventListener("click", handler3);
    }
    addDeletedModifiers(screen_content_block, index);
}

function mobileLayout(screen_content_block, screen_description, nextScreenContentBlock, nextScreenDescription, wrapper, nextWrapper, handler1, handler2, handler3, handler4, index, screen_hitbox, screen_frame) {
    if (wrapper.firstElementChild.className !== "screen__hitbox") {
        // Reuse monoLayout styles and remove Desktop styles
        monoLayout(screen_content_block, screen_description, nextScreenContentBlock, nextScreenDescription, wrapper, nextWrapper, handler1, handler2, handler3, index);

        // Remove monoLayout EventListeners
        screen_content_block.removeEventListener("click", handler3);
        screen_hitbox.addEventListener("click", handler4);


        // Add mobile animations and styles
        screen_content_block.classList.add("content-block--flip");
        screen_description.className = "screen__description description--flip";

        screen_frame.appendChild(screen_content_block);
        screen_frame.appendChild(screen_description);
        screen_hitbox.appendChild(screen_frame);
        wrapper.appendChild(screen_hitbox);
    }
    // Reset content-blocks special BEM modifiers
    addDeletedModifiers(screen_content_block, index);
}

function monoLayout(screen_content_block, screen_description, nextScreenContentBlock, nextScreenDescription, wrapper, nextWrapper, handler1, handler2, handler3, empty, index) {
    // Watch for dual content blocks
    if (
        screen_content_block.classList.length > 1 &&
        screen_content_block.classList.contains("content-block--dual-block-left")
    ) {
        // In case of dual-content-blocks save BEM modifiers and index number
        if (!dualIndexList.includes(index) && !document.querySelector(".screen__hitbox")) {
            dualIndexList.push(index, index + 1);
        }
        if (!dualClassList.includes(screen_content_block.classList.item(1)) && !document.querySelector(".screen__hitbox")) {
            dualClassList.push(
                screen_content_block.classList.item(1),
                screen_description.classList.item(1),
                nextScreenContentBlock.classList.item(1),
                nextScreenDescription.classList.item(1)
            )
        }

        // Remove monoLayout EventListeners
        screen_content_block.removeEventListener("click", handler1);
        nextScreenContentBlock.removeEventListener("click", handler2);
    }
    // Save special content-blocks BEM modifiers and it's index number
    if (
        !deletedModifiersIndexList.includes(index) &&
        screen_content_block.classList.length > 1 &&
        !screen_content_block.className.includes("dual-block") &&
        !screen_content_block.className.includes("flip") &&
        !screen_content_block.className.includes("slide")
    ) {
        deletedModifiersIndexList.push(index);
        deletedModifiersClassList.push(screen_content_block.classList.item(1));
    } else if (!deletedModifiersClassList.includes(index) && deletedModifiersClassList.length <= screen_content_blocks.length - 1) { deletedModifiersClassList.push("") }

    // Add monoLayout styles
    wrapper.classList.add("wrapper--mono-block");
    screen_content_block.className = "screen__content-block"
    screen_description.className = "screen__description description--mono-block"

    // Add monoLayout EventListener
    screen_content_block.addEventListener("click", handler3);
}

function deleteMobileLayout(wrapper, screen_content_block, screen_description) {
    const hitboxes = document.querySelectorAll(".screen__hitbox");
    if (hitboxes.length > 0) {
        wrapper.appendChild(screen_content_block);
        wrapper.appendChild(screen_description);
        wrapper.removeChild(hitboxes[0]);
    }
}

function addDeletedModifiers(screen_content_block, index) {
    if (deletedModifiersIndexList.includes(index)) {
        screen_content_block.classList.add(deletedModifiersClassList[index]);
    }
}



// INDIRECT TIMEOUT SYSTEM ADD (para remover listeners después)
function indirectDualSlideRemover(contentBlockDescription, otherContentBlock, side) {
    timeoutSystem(contentBlockDescription, otherContentBlock, 1, side);
}

function indirectMonoSlideRemover(contentBlock, contentBlockDescription) {
    timeoutSystem(contentBlock, contentBlockDescription, 2);
}

function indirectFlipRemover(frame) {
    timeoutSystem(frame, "", 3);
}



// USER-PAGE INTERACTION
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

function flip(frame) {
    frame.classList.toggle("mobile-flip-card");
}


// ANTI-SPAM
function timeoutSystem(element1, element2, slideSelector, mainContentBlockSide) {
    if (universalTimeout) { }
    else if (slideSelector == 3) {
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



function createKeysAndVariables(screen_content_block, index) {
    let screen_description = screen_descriptions[index],
        nextScreenContentBlock = screen_content_blocks[index + 1],
        nextScreenDescription = screen_descriptions[index + 1],
        wrapper = screen_wrappers[index],
        nextWrapper = screen_wrappers[index + 1];

    // ***
    const key = `block-${index}`;

    if (!handlersMap.has(key)) {
        handlersMap.set(key, {
            handler1: () => indirectDualSlideRemover(screen_description, nextScreenContentBlock, "-left"),
            handler2: () => indirectDualSlideRemover(nextScreenDescription, screen_content_block, "-right"),
            handler3: () => indirectMonoSlideRemover(screen_content_block, screen_description),
            handler4: () => indirectFlipRemover(document.querySelectorAll(".screen__frame")[index]),
        });
    }

    const { handler1, handler2, handler3, handler4 } = handlersMap.get(key);
    // ***

    return [screen_content_block, screen_description, nextScreenContentBlock, nextScreenDescription, wrapper, nextWrapper, handler1, handler2, handler3, handler4, index];
}


// APPLY EACH LAYOUT
function renderDesktopLayoutOnce() {
    screen_content_blocks.forEach((screen_content_block, index) => {
        const getShortInfo = createKeysAndVariables(screen_content_block, index);

        desktopLayout(...getShortInfo);
    });
}

function renderMonoLayoutOnce() {
    screen_content_blocks.forEach((screen_content_block, index) => {
        const getShortInfo = createKeysAndVariables(screen_content_block, index);

        deleteMobileLayout(getShortInfo[4], screen_content_block, getShortInfo[1]);
        monoLayout(...getShortInfo);
        addDeletedModifiers(screen_content_block, index);
    });
}

function renderMobileLayoutOnce() {
    screen_content_blocks.forEach((screen_content_block, index) => {
        const getShortInfo = createKeysAndVariables(screen_content_block, index);

        const screen_hitbox = document.createElement("div"),
            screen_frame = document.createElement("div");

        screen_hitbox.className = "screen__hitbox";
        screen_frame.className = "screen__frame";

        mobileLayout(...getShortInfo, screen_hitbox, screen_frame);
    });
}



// Active ¿media query? Array Verifier
let isActiveArray = [false, false, false];

function renderOnceVerifier() {
    if (window.innerWidth > 1000) {
        if (!isActiveArray[0]) {
            renderDesktopLayoutOnce();
            isActiveArray = [true, false, false];
        }
    } else if (window.innerWidth < 800) {
        if (!isActiveArray[1]) {
            renderMobileLayoutOnce();
            isActiveArray = [false, true, false];
        }
    } else {
        if (!isActiveArray[2]) {
            renderMonoLayoutOnce();
            isActiveArray = [false, false, true];
        }
    }
}

window.addEventListener("resize", renderOnceVerifier);

renderOnceVerifier();