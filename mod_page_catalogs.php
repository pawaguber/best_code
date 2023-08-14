<?php
// No direct access to this file
defined('_JEXEC') or die;
$doc = JFactory::getDocument();
$doc->addStyleSheet(JURI::base() . 'modules/mod_page_catalogs/css/style.css');
$doc->addStyleSheet(JURI::base() . 'modules/mod_page_catalogs/js/script.js');

switch ($doc->language) {
    case 'en-gb':
        require_once 'languages/en.php';
        break;
    case 'it-it':
        require_once 'languages/it.php';
        break;

}
    if(isset($_GET['item'])) {
        include_once 'helper/singlePage.php';
    }else{
    ?>


    <div class="w-1400 catalogs">
        <div class="mobile-category">
            <div class="row-center">
                <img src="/images/catalogs/category.png" alt="">
                <p>More items</p>
            </div>
        </div>
        <div class="catalogs-search">
            <form action="#">
                <input type="text" placeholder="Product search by name or index">
                <button class="search" type="submit"><img src="/images/main/icons/search.png" alt=""></button>
            </form>
        </div>
        <div class="row-start">
            <div class="catalogs-category"></div>
            <div class="catalogs-body">
                <div class="catalogs-goods row-start"></div>
                <div class="load">
                    <p data-page="2">Load More</p>
                </div>
            </div>
        </div>

        <div class="shadow-block"></div>
        <div class="shadow-close">×</div>
    </div>
    <?php
}
?>