document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('DOMContentLoaded', () => {

        const block = document.querySelector('.single');

        fetch('https://wservice.strans.ua:53035/StransShopWebApi/api/search/GetOfferingByIdNew', {
            method: 'POST',
            body: new URLSearchParams({
                'Offerin'
            }),
            headers: headers
        })
            .then(response => response.json())
            .then(response => {
                let items = response.offeringList;
                items.forEach(item => {
                    console.log(item);
                    block.innerHTML += `
                        <div class="item">
                            <div class="row-center">
                                <div class="photo">
                                    <img src="https://photo.strans.ua/media/photo/tecdoc/tecdoc_photo/photostrans/main/${item.index}%20_.jpg" alt="">

                                    <div class="description">
                                        <p id="header">Product description</p>
                                        <p class="text">${(item.Description == null) ? 'No data yet' : item.Description}</p>
                                    </div>
                                </div>


                                <div class="info">
                                    <p class="header">${item.OfferingName}</p>
                                    <hr>

                                    <div class="body">
                                        <p>Brand code: ${item.BrandCode}</p>
                                        <p>Index: ${item.Index}</p>
                                        <p><strong>Made in: Italy</strong></p>
                                    </div>
                                    <hr>
                                    <div class="related row">
                                        <div class="loader-single">
                                            <img src="/images/loader-bg.gif" alt="">
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>`
                })
            })

        const point = Math.floor(Math.random() * 10) + 1;
        fetch('https://wservice.strans.ua:53035/SGWebApi/api/Search/OfferingSearchByConditionSecondBrand', {
            method: 'POST',
            body: new URLSearchParams({
                brandId: brand,
                pageSize: 20,
                page: point
            }),
            headers: headers
        })
            .then(response => response.json())
            .then(response => {
                const relatedBlock = document.querySelector('.related');
                document.querySelector('.related .loader-single').remove();
                const items = response.offeringList;
                items.forEach(item => {
                    relatedBlock.innerHTML += addItem(item, link);
                })
                $('.related').slick({
                    infinite: true,
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    responsive: [
                        {
                            breakpoint: 1000,
                            settings: {
                                slidesToShow: 4,
                                slidesToScroll: 3,
                            }
                        },
                        {
                            breakpoint: 800,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 2,
                            }
                        },
                        {
                            breakpoint: 600,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2,
                            }
                        },
                    ]
                });
            })
    })

})