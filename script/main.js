let hash = location.hash.substring(1); //определение хеша в поисковой строке

const headerCityButton = document.querySelector(".header__city-button");   //переменная для указания города

// проверю есть ли гоород в локальном хранилище и если есть отображу его
if (localStorage.getItem("location")) {
    headerCityButton.textContent = localStorage.getItem("location");
}

// Код для замены города
headerCityButton.addEventListener("click", () => {
    const checkCity = prompt("Укажите ваш город", "Москва");
    headerCityButton.textContent = checkCity;
    localStorage.setItem("location", checkCity);
});


import modalWindow from "./modal.js";
modalWindow();

import getData from "./getData.js";

//Получаю данные с сервера и обрабатываю их
const getGoods = (callback, prop, value) => {

    getData()
        .then((data) => {
            if (value) {
                callback(data.filter(item => item[prop] == value));
            } else {
                callback(data);
            }

        })
        .catch((err) => {
            console.log(err)
        });
}

//если я на странице с товарами то рисую карточки с товарами, если нет то ошибка
try {

    const goodsList = document.querySelector(".goods__list");

    if (!goodsList) {
        throw Error("this is not goods page");
    }
    const goodsTitle = document.querySelector(".goods__title");

    const changeTitle = () => {
        goodsTitle.textContent = document.querySelector(`[href*="#${hash}"]`).textContent;
    }

    //создаю карточку товара
    const createCard = ({ id, preview, cost, brand, name, sizes }) => {

        const li = document.createElement("li");
        li.classList.add("goods__item");

        li.innerHTML = `
            <article class="good">
                <a class="good__link-img" href="card-good.html#${id}">
                    <img class="good__img" src="goods-image/${preview}" alt="Photo">
                </a>
                <div class="good__description">
                    <p class="good__price">${cost} &#8381;</p>
                    <h3 class="good__title">${brand} <span class="good__title__grey">/ ${name}</span></h3>
                    ${sizes ?
                `<p class="good__sizes">Размеры (RUS): <span class="good__sizes-list">40 42 44 46</span></p>` :
                ""}
                    
                    <a class="good__link" href="card-good.html#id56454">Подробнее</a>
                </div>
            </article>
        `

        return li;
    };

    const renderGoodsList = data => {
        goodsList.textContent = "";

        data.forEach((elem) => {
            const card = createCard(elem);
            goodsList.append(card);
        });
    }

    window.addEventListener("hashchange", () => {
        hash = location.hash.substring(1);
        getGoods(renderGoodsList, "category", hash);
        changeTitle();
    });

    changeTitle();
    getGoods(renderGoodsList, "category", hash);

} catch (error) {
    console.warn(error);
}

//страница товара
try {
    if (!document.querySelector(".card-good")) {
        throw new Error("This is not card good");
    }
    const cardGoodImage = document.querySelector(".card-good__image");
    const cardGoodBrand = document.querySelector(".card-good__brand");
    const cardGoodTitle = document.querySelector(".card-good__title");
    const cardGoodPrice = document.querySelector(".card-good__price");
    const cardGoodColor = document.querySelector(".card-good__color");
    const cardGoodSelectWrapper = document.querySelectorAll(".card-good__select__wrapper");
    const cardGoodColorList = document.querySelector(".card-good__color-list");
    const cardGoodSizes = document.querySelector(".card-good__sizes");
    const cardGoodSizesList = document.querySelector(".card-good__sizes-list");
    const cardGoodBuy = document.querySelector(".card-good__buy");

    const generateList = (data) => data.reduce((html, item, index) => html + `<li class = "card-good__select-item" data-id = "${index}">${item}</li>`, "");

    const renderCardGood = ([{ photo, color, cost, brand, name, sizes }]) => {
        console.log(photo, color, cost, brand, name, sizes);

        cardGoodImage.src = `goods-image/${photo}`;
        cardGoodImage.alt = `${brand} ${name}`;
        cardGoodBrand.textContent = brand;
        cardGoodTitle.textContent = name;
        cardGoodPrice.textContent = `${cost} ₽`;
        if (color) {
            cardGoodColor.textContent = color[0];
            cardGoodColor.dataset.id = 0;
            cardGoodColorList.innerHTML = generateList(color);
        } else {
            cardGoodColor.style.display = "none";
        }

        if (sizes) {
            cardGoodSizes.textContent = sizes[0];
            cardGoodSizes.dataset.id = 0;
            cardGoodSizesList.innerHTML = generateList(sizes);
        } else {
            cardGoodSizes.style.display = "none";
        }

    }

    cardGoodSelectWrapper.forEach(item => {
        item.addEventListener("click", (event) => {
            const target = event.target;
            if (target.closest(".card-good__select")) {
                target.classList.toggle("card-good__select__open");
            }
            if (target.closest(".card-good__select-item")) {
                const cardGoodSelectItem = item.querySelector(".card-good__select");
                cardGoodSelectItem.textContent = target.textContent;
                cardGoodSelectItem.dataset.id = target.dataset.id;
                cardGoodSelectItem.classList.remove("card-good__select__open");
            }
        });
    });

    getGoods(renderCardGood, "id", hash);

} catch (err) {
    console.warn(err);
}
