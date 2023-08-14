document.addEventListener('DOMContentLoaded', () => {

    const blockItems = document.querySelector('.catalogs-goods'),
        loadMore = document.querySelector('.load > p'),
        load = document.querySelector('.load'),
        mobileCategory = document.querySelector('.mobile-category'),
        shadow = document.querySelector('.shadow-block'),
        category = document.querySelector('.catalogs-category'),
        close = document.querySelector('.shadow-close'),
        form = document.querySelector('.catalogs-search form'),
        lang = 'EN',
        link = 'index.php/en/catalogs',
        brand = '83848567-1ddc-46a5-b78b-043d5e03b1a8',
        headers = {'Content-Type': 'application/x-www-form-urlencoded'};


    function addItem(item, link, check = true){
        console.log('here')
        return `
                <a href="${link}/?item=${item.Index}" class="item">
                <div class="image">
                <img src="https://photo.strans.ua/media/photo/tecdoc/tecdoc_photo/photostrans/main/${item.Index}%20_.jpg" alt=""
            onerror="this.onerror=null;this.src='/images/catalogs/no-photo.png'">
                </div>
            <p title="${item.OfferingName}" class="name">${item.OfferingName}</p>

            <div class="info">
                <p>Brand code: ${item.Skrut}</p>
                <p>Brand code: ${item.Index}</p>
                <p class="strong">Made id: Italy</p>
            </div>
            ${(check == true) ? `<div class="more row-center"><p>More about the product</p><img src="/images/catalogs/arrow.png" alt=""></div>` : ''}
        </a>`
    }

    startPage();

    function startPage() {
        function mainCategory() {

            let block = document.querySelector('.catalogs-category');

            fetch('https://wservice.strans.ua:53035/SGWebApi/api/Section/GetOfferingSection', {
                method: 'POST',
                body: new URLSearchParams({
                    brandIds: brand,
                    parentSectionIds: 'null'
                }),
                headers: headers
            })
                .then(response => response.json())
                .then(result => {
                    result.forEach((item, index) => {
                        block.innerHTML += `
                            <div class="item-${index} category-item">
                                <p class="category-item-text">${item[`SectionName${lang}`]}</p>
                            </div>`
                        subCategory(item['SectionId'], index);
                    })
                    accordionCategory()
                    setTimeout(() => {
                        subCategoryClickEvent();
                    }, 1000)
                })
        }

        function subCategoryClickEvent(){

            const allButtons = document.querySelectorAll('.sub-item'),
                width = document.documentElement.clientWidth;
            allButtons.forEach(item => {
                item.addEventListener('click', () => {

                    const actives = document.querySelectorAll('.active-sub');
                    actives.forEach(item => {
                        console.log(item);
                        item.classList.remove('active-sub');
                    })

                    item.classList.add('active-sub');
                    const parent = item.getAttribute('data-parent'),
                        id = item.getAttribute('data-id');
                    loadItems('https://wservice.strans.ua:53035/SGWebApi/api/Search/OfferingSearchByConditionSecondSection', {
                        brand: brand,
                        parentSectionIds: parent + ',' + id,
                    }, true);
                    load.style.display = 'none';
                    if(width < 800)
                        closeMobile();
                })
            })
        }

        function subCategory(data, index) {
            fetch('https://wservice.strans.ua:53035/SGWebApi/api/Section/GetOfferingSection', {
                method: 'POST',
                body: new URLSearchParams({
                    brandIds: brand,
                    parentSectionIds: data
                }),
                headers: headers
            })
                .then(response => response.json())
                .then(result => {
                    let block = document.querySelector(`.catalogs-category .item-${index}`);
                    const hide = document.createElement('div');
                    hide.className = 'hide';
                    block.append(hide);
                    result.forEach(item => {
                        $(`.catalogs-category .item-${index} > .hide`).append(`
                                <div class="item sub-item" data-parent="${data}" data-id="${item.SectionId}">
                                    <p>${item[`SectionName${lang}`]}</p>
                                </div>`);
                    })
                })
        }

        mainCategory();

        function startItems(){

            loadItems('https://wservice.strans.ua:53035/SGWebApi/api/Search/OfferingSearchByConditionSecondBrand', {
                brandId: '83848567-1ddc-46a5-b78b-043d5e03b1a8',
                pageSize: 20,
                page: 1
            })

        }
        startItems();

        loadMore.addEventListener('click', () => {
            load.style.display = 'none';
            const page = loadMore.getAttribute('data-page');

            loadItems('https://wservice.strans.ua:53035/SGWebApi/api/Search/OfferingSearchByConditionSecondBrand', {
                brandId: '83848567-1ddc-46a5-b78b-043d5e03b1a8',
                pageSize: 20,
                page: page
            })
            loadMore.setAttribute('data-page', page + 1);

        })



        function loadItems(url, obj, remove = false, search = false) {
            blockItems.innerHTML += `<div class="loader"><img src="/images/loader-bg.gif" alt=""></div>`
            fetch(url, {
                method: 'POST',
                body: new URLSearchParams(obj),
                headers: headers
            })
                .then(response => response.json())
                .then(result => {
                    if(remove) {
                        const allGoods = document.querySelectorAll('.catalogs-goods > *');
                        allGoods.forEach(item => {
                            item.remove();
                        })
                    }

                    const items = search ? result : result.offeringList;

                    items.forEach(item => {
                        blockItems.innerHTML += addItem(item, link);
                    })
                    document.querySelector('.loader').remove();
                    load.style.display = 'block';
                })
        }
        function accordionCategory() {
            const mainCategories = document.querySelectorAll('.category-item-text');
            mainCategories.forEach((item, index) => {
                item.addEventListener('click', () => {
                    const block = item.nextElementSibling;
                    item.classList.toggle('active');

                    if(block.style.maxHeight !== '' && block.style.maxHeight !== '0px') {
                        block.style.maxHeight = '0px'
                    }else {
                        block.style.maxHeight = block.scrollHeight + 'px'
                    }
                })

            })
        }
        mobileCategory.addEventListener('click', () => {

            shadow.style.display = 'block';
            category.style.display = 'block';
            close.style.display = 'block';
            document.querySelector('body').style.overflow = 'hidden';
        })

        shadow.addEventListener('click', closeMobile)
        close.addEventListener('click', closeMobile)

        function closeMobile() {
            shadow.style.display = 'none';
            close.style.display = 'none';
            category.style.display = 'none';
            document.querySelector('body').style.overflow = 'unset';
        }

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const data = form.querySelector('input[type="text"]').value;
            if (!/^\d+$/.test(data)) {
                loadItems('https://wservice.strans.ua:53035/SGWebApi/api/Search/OfferingSearchByConditionFirst',{
                    'brandIds': brand,
                    'conditionToSearch': data
                }, true, true)
            } else {
                loadItems('https://wservice.strans.ua:53035/SGWebApi/api/Search/OfferingSearchByConditionSecond',{
                    'brand': brand,
                    'offeringIndex': data
                }, true)
            }
            load.style.display = 'none';
        })
    }
})