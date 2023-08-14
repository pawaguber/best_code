<?php
defined('_JEXEC') or die;
$doc = JFactory::getDocument();
$doc->addScript('/modules/mod_page_catalogs/js/scriptPage.js');
$doc->addScript('/modules/slick/slick.js');
$doc->addStyleSheet('/modules/slick/slick.css');
$doc->addStyleSheet('/modules/slick/slick-theme.css');
$doc->addStyleSheet(JURI::base() . 'modules/mod_page_catalogs/css/style.css');
?>

<div class="single w-1200"></div>