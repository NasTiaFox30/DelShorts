console.log("Скрипт refres.js додано успішно!");

// //імпорт функцій
// import { runHomePageScript } from './skript_delMain.js';
// import { runVideoPageScript } from './skript_delWatch.js';

// Виклик при завантаженні сторінки
monitorUrlChanges();
detectPageChange();



// function scroolUpdateFunctions() {
//     // document.addEventListener("weel", () => {
//     //     console.log("Натиснуто");
//     //     
//     // });
// }


function detectPageChange() {
    const currentUrl = window.location.href;


    // Логіка для головної сторінки
    if (currentUrl === "https://www.youtube.com/") {

        console.log("На головній сторінці");
        
        setTimeout(runHomePageScript, 1000);
        // runHomePageScript(); // Виклик скрипту для головної сторінки
        setTimeout(removeShortsPanel, 1000);
        setTimeout(checkForClickButton, 150);

    }

    // Логіка для сторінок відео
    else if (currentUrl.startsWith("https://www.youtube.com/watch")) {
        console.log("На сторінці відео");
        
        setTimeout(runVideoPageScript, 1000);
        // runVideoPageScript(); // Виклик скрипту для сторінки відео
        setTimeout(removeShortsPanel, 1000);
        setTimeout(checkForClickButton, 150);
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

    setTimeout(removeShortsBlocks, 1000);

    // document.addEventListener("click", () => {
    //     console.log("Натиснуто");
    //     removeShortsBlocks();
    //     console.log("Виконано!");
    // });

    // Вибір елемента, який буде спостерігатися (наприклад, основний контейнер сторінки YouTube)
    const targetBlock1 = document.querySelector('#contents.style-scope.ytd-rich-grid-renderer'); 

    // Налаштування спостереження - дочірні елементи)
    const config1 = { childList: true };

    if (targetBlock1) {
        // Callback для виконання, коли відбуваються зміни
        const callback1 = function (mutationsList1, observer1) {
            for (const mutation1 of mutationsList1) {
                if (mutation1.type === 'childList') {
                    console.log('Контент оновлено! (Головна)');

                    // Зупинка спостереження
                    observer1.disconnect();
                    console.log('Спостереження зупинено після першої зміни.');

                    
                    setTimeout(removeShortsBlocks, 100);

                    // Відновлення спостереження через 3 секунди
                    setTimeout(() => {
                        observer1.observe(targetBlock1, config1);
                        console.log('Спостереження відновлено.');
                    }, 3000); // = 2 секунди
                }
            }
        };
    

        // Створення спостерігача
        const observer1 = new MutationObserver(callback1);
        // Старт:
        observer1.observe(targetBlock1, config1);
    }
    else {
        console.log('БЛОК НЕ ЗНАЙДЕНО.');
        runHomePageScript();
    }
    
}
function removeShortsBlocks(){
    // Знаходимо всі елементи <ytd-rich-section-renderer>
    const sections = document.querySelectorAll('ytd-rich-section-renderer.style-scope.ytd-rich-grid-renderer');

    // Проходимо по кожному знайденому елементу
    sections.forEach(section => {
        // Перевіряємо, чи містить дочірній блок <ytd-rich-shelf-renderer> атрибут is-shorts
        const shelf = section.querySelector('ytd-rich-shelf-renderer[is-shorts]');
        if (shelf) {
            // Видаляємо весь блок <ytd-rich-section-renderer>
            section.remove();
            console.log('Shorts видалено!');
        }
    });
}



// // //delWatch
function runVideoPageScript() {
    console.log("Скрипт delWatch додано успішно!");

    setTimeout(removeShortsSheets, 1000);

    //контрольне видалення кожні 10 секунд
    setInterval(function () {
        removeShortsSheets();
        console.log('Контрольне очищення кожні 10 секунд');
    }, 10000);

    // Вибір елемента, який буде спостерігатися (наприклад, основний контейнер сторінки YouTube)
    const targetBlock2 = document.querySelector('#contents.style-scope.ytd-item-section-renderer'); 

    // Налаштування спостереження - дочірні елементи)
    const config2 = { childList: true };

    if (targetBlock2) {
        // Callback для виконання, коли відбуваються зміни
        const callback2 = function(mutationsList2, observer2) {
            for (const mutation2 of mutationsList2) {
                if (mutation2.type === 'childList') {
                    console.log('Контент оновлено! (Перегляд)');

                    // Зупинка спостереження
                    observer2.disconnect();
                    console.log('Спостереження зупинено після першої зміни.');

                    // setTimeout(removeShortsSheets, 2000);
                    removeShortsSheets();

                    // Відновлення спостереження через 3 секунди
                    setTimeout(() => {
                        observer2.observe(targetBlock2, config2);
                        console.log('Спостереження відновлено.');
                    }, 2000); // 2   секунди
                }
            }
        };


        // Створення спостерігача
        const observer2 = new MutationObserver(callback2);
        // Старт:
        observer2.observe(targetBlock2, config2);
    }
    else {
        console.log('БЛОК НЕ ЗНАЙДЕНО.');
        runVideoPageScript();
    }

    
}
function removeShortsSheets() {
    const sheets = document.querySelectorAll('ytd-reel-shelf-renderer.style-scope.ytd-item-section-renderer[modern-typography]');

    sheets.forEach(sheet => {
        sheet.remove();
        console.log('Shorts видалено!');
    });

    // const loadCircles = document.querySelectorAll('ytd-continuation-item-renderer.style-scope.ytd-item-section-renderer');

    // loadCircles.forEach(loadCircle => {
    //     const circle = loadCircle.querySelector('div#ghost-cards');
    //     if (circle) {
    //         setTimeout(circle.remove(), 5000) ;
    //         console.log('loadCircles видалено');
    //     }
    // });

    
    // //перевірка
    // const SearchingBlock = document.querySelector("#contents.style-scope.ytd-item-section-renderer");
    
    // if (SearchingBlock.querySelectorAll(sheets)) {
    //     console.log('!!! перевірка не пройдена !!!');
    //     removeShortsSheets();
    // }

}



// // // delPanel
function checkForClickButton() {

    console.log("Скрипт delPanel додано успішно!");

    const targetPanelButton = document.querySelector('#button.style-scope.yt-icon-button[aria-pressed]');
    targetPanelButton.addEventListener("click", () => {
        console.log("Натиснуто Quide");
        setTimeout(removeShortsPanel, 100);
        console.log("Виконано removeShortsPanel() !");
        // removeShortsPanel();
        // console.log("Виконано removeShortsPanel() !");
    });
}

function removeShortsPanel() {
    
    // Знаходимо елементи
    // const panels = document.querySelectorAll('#items.style-scope.ytd-guide-section-renderer');
    
    //стан кнопки
    const elem_button = document.querySelector('#button.style-scope.yt-icon-button[aria-pressed]');
    let button_pressed = elem_button.getAttribute("aria-pressed");

    if (button_pressed === "true") {

        //NORMAL Panel
        const panels = document.querySelectorAll('ytd-guide-entry-renderer.style-scope.ytd-guide-section-renderer')

        panels.forEach(panel => {
            
            const rowShorts = panel.querySelector('#endpoint[title="YouTube Shorts"]');
            if (rowShorts) {
                panel.remove();
                console.log('Shorts normal-panel видалено!');
            }
        });
    }
    else if (button_pressed === "false") {

        //MINI panel
        const mini_panel = document.querySelector('ytd-mini-guide-entry-renderer.style-scope.ytd-mini-guide-renderer[aria-label="YouTube Shorts"]');
        if (mini_panel) {
            mini_panel.remove();
            console.log('Shorts mini-panel видалено!');
        }
    }
    else {
        removeShortsPanel();
    }
    
}