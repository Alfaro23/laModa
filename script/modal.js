const modalWindow = ()=>{

    const subheaderCart = document.querySelector(".subheader__cart"); // Кнопка корзины
    const cartOverlay = document.querySelector(".cart-overlay"); // Модальное окно

    const modalCartOpen = () => {
        cartOverlay.classList.add("cart-overlay-open");
        disableScroll();
    };

    const modalCartClose = () => {
        cartOverlay.classList.remove("cart-overlay-open");
        enableScroll();
    };

    // При нажатии на корзину открывается модальное окно
    subheaderCart.addEventListener("click", modalCartOpen);

    // При нажатии на крестик или за поле окна корзины закрыть корзину
    cartOverlay.addEventListener("click", (event)=>{
        const target = event.target;

        if(target.classList.contains("cart__btn-close") || target.matches(".cart-overlay")){
            modalCartClose();
        }
    });

    // Закрытие модального окна при нажатии клавиши Escape
    document.addEventListener("keydown", (event)=>{

        if(event.code === "Escape") modalCartClose();
    });

    //скрытие скролла при окрытии корзины и его отображение при закрытии корзины
    const disableScroll = ()=>{
        const widthScroll = window.innerWidth - document.body.offsetWidth;  //ширина окна минус ширина страницы для получения ширины скролла
        
        // Сохраню позицию по Y чтобы страница не прыгала вверх или вниз
        document.body.dbScrollY = window.scrollY;

        //стили для избежания скачков вверх или вниз и в право или лево
        document.body.style.cssText = `
            position: fixed;
            top: ${-window.scrollY}px;
            left: 0;
            width: 100%;
            height: 100vh;
            overflow: hidden;
            padding-right: ${widthScroll}px;
        `
    };

    const enableScroll = ()=>{ 
        document.body.style.cssText = ``;
        window.scroll({
            top: document.body.dbScrollY,
        });
    }

}

export default modalWindow;