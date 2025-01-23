console.log("Скрипт refres.js додано успішно!");

// Виклик при завантаженні сторінки
monitorUrlChanges();
detectPageChange();



function detectPageChange() {
    const currentUrl = window.location.href;

    // Логіка для головної сторінки
    if (currentUrl === "https://www.youtube.com/") {

        console.log(">>На головній сторінці");
        
        setTimeout(runHomePageScript, 3000);
        // runHomePageScript(); // Виклик скрипту для головної сторінки
        setTimeout(runPanelShortsDelete, 2000);

    }

    // Логіка для сторінок відео
    else if (currentUrl.startsWith("https://www.youtube.com/watch")) {
        console.log(">>На сторінці відео");
        
        setTimeout(runVideoPageScript, 3000);
        // runVideoPageScript(); // Виклик скрипту для сторінки відео
        setTimeout(runPanelShortsDelete, 2000);
    }
}

// Відстеження змін URL
function monitorUrlChanges() {
    let previousUrl = window.location.href;

    const observer = new MutationObserver(() => {
        const currentUrl = window.location.href;
        if (currentUrl !== previousUrl) {
            previousUrl = currentUrl;
            setTimeout(detectPageChange, 100); // Виклик логіки для оновленої URL
        }
    });

    observer.observe(document, { subtree: true, childList: true });
}




//FUNCTIONS:

// // // delMain
function runHomePageScript() {
    console.log("Скрипт delMain додано успішно!");

    // Вибір елемента, який буде спостерігатися (головний контейнер)    
    const targetBlock1 = document.querySelector('#contents.style-scope.ytd-rich-grid-renderer');
    // const targetBlock1 = document.querySelector('#primary.style-scope.ytd-two-column-browse-results-renderer'); 

    if (targetBlock1) {
        removeShortsBlocks(targetBlock1);

        //Спостерігач:
        ////
        // Налаштування спостереження - дочірні елементи)
        const config = { childList: true };

        // Callback для виконання, коли відбуваються зміни
        const callback = function (mutationsList, observer) {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    console.log('Контент оновлено! (Головна)');
                    removeShortsBlocks(targetBlock1);
                }
            }
        };
    
        // Створення спостерігача
        const observer = new MutationObserver(callback);
        // Старт:
        observer.observe(targetBlock1, config);

        console.log('Спостереження запущено...');
        ////
    }
    else {
        console.log('Х Головний блок не знайдено Х');
        setTimeout(runHomePageScript, 5000);
    }
}
function removeShortsBlocks(targetBlock){
    // Знаходимо всі елементи <ytd-rich-section-renderer>
    const reelsBlocks = targetBlock.querySelectorAll('ytd-rich-section-renderer.style-scope.ytd-rich-grid-renderer');
    console.log(`Знайдено блоків: ${reelsBlocks.length}`);
    //Перевірка та видалення
    if (reelsBlocks) {
        // Проходимо по кожному знайденому елементу
        reelsBlocks.forEach(block => {
            // Перевіряємо, чи містить дочірній блок <ytd-rich-shelf-renderer> атрибут is-shorts
            const isShort = block.querySelector('ytd-rich-shelf-renderer[is-shorts]');
            if (isShort) {
                block.remove();
                console.log(`Shorts видалено!`);
            }
        });
    }
    else {
        console.log('X Блоки не знaйдено X');
    }
}



// // //delWatch
function runVideoPageScript() {
    console.log("Скрипт delWatch додано успішно!");

    // Вибір елемента, який буде спостерігатися (головний контейнер)
    const targetBlock2 = document.querySelector('#contents.style-scope.ytd-item-section-renderer.style-scope.ytd-item-section-renderer');
    // const targetBlock2 = document.querySelector('#secondary.style-scope.ytd-watch-flexy');
    // const nameReelsBlocks = "ytd-reel-shelf-renderer.style-scope.ytd-item-section-renderer[modern-typography]";

    if (targetBlock2) {    
        checkAndRemoveShortsBlocksWatch(targetBlock2);

        //Спостерігач:
        ////
        // Налаштування спостереження - дочірні елементи)
        const config = { childList: true};

        //Callback для виконання, коли відбуваються зміни
        const callback = function(mutationsList, observer) {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    console.log('Контент оновлено! (Перегляд)');
                    checkAndRemoveShortsBlocksWatch(targetBlock2);
                }
            }
        };
        
        // Створення спостерігача
        const observer = new MutationObserver(callback);
        // Старт:
        observer.observe(targetBlock2, config);

        console.log('Спостереження запущено...');
        ////
    }
    else {
        console.log('Х Головний блок не знайдено Х');
        setTimeout(runVideoPageScript, 5000);
    }
}
function checkAndRemoveShortsBlocksWatch(targetBlock) { 
    // const reelsBlocks = document.querySelector('#secondary.style-scope.ytd-watch-flexy').querySelectorAll('ytd-reel-shelf-renderer.style-scope.ytd-item-section-renderer[modern-typography]');
    // const reelsBlocks = targetBlock.querySelectorAll('ytd-reel-shelf-renderer.style-scope.ytd-item-section-renderer[modern-typography]');
    const reelsBlocks = targetBlock.querySelectorAll('ytd-reel-shelf-renderer.style-scope.ytd-item-section-renderer[modern-typography]');
    console.log(`Знайдено блоків: ${reelsBlocks.length}`);
    //Перевірка та видалення
    if (reelsBlocks.length > 0) {
        reelsBlocks.forEach(block => {
        block.remove();
        console.log(`Shorts видалено!`);
        });
    }
    else {
        console.log('X Блоки не знaйдено X');
    }
}



// // // delPanel
function runPanelShortsDelete() {
    console.log("Скрипт delPanel додано успішно!");
    
    removeShortsPanel();
    checkForClickButton();

}
function checkForClickButton() {
    console.log('скрипт - checkForClickButton....');
    const targetPanelButton = document.querySelector('yt-icon-button#guide-button.style-scope.ytd-masthead[role="button"][aria-label]');
    if (targetPanelButton) {
        targetPanelButton.addEventListener("click", () => {
        console.log("Натиснуто Quide");
        removeShortsPanel();
    });
    }
    else {
        console.log("X кнопка не знайдена X");
        setTimeout(checkForClickButton, 5000);
    }
}
function removeShortsPanel() {
    //стан кнопки
    const elem_button = document.querySelector('#button.style-scope.yt-icon-button');
    let button_pressed = elem_button.getAttribute("aria-pressed");
    
    if (button_pressed === "true" || button_pressed === "false" || button_pressed === null) {
     //NORMAL panel
        const panels = document.querySelectorAll('ytd-guide-entry-renderer.style-scope.ytd-guide-section-renderer')
        panels.forEach(panel => {
            const rowShorts = panel.querySelector('#endpoint[title="YouTube Shorts"]');
            if (rowShorts) {
                panel.remove();
                console.log('Shorts normal-panel видалено!');
            }
        });
    //MINI panel
        const mini_panel = document.querySelector('ytd-mini-guide-entry-renderer.style-scope.ytd-mini-guide-renderer[aria-label="YouTube Shorts"]');
        if (mini_panel) {
            mini_panel.remove();
            console.log('Shorts mini-panel видалено!');
        }
    }
    else {
        console.log("X не вдалось видалити Панель X");
        setTimeout(removeShortsPanel, 200);
    }
}