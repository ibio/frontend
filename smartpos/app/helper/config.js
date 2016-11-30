//
const _wpApiSettings = {isDev:true};
//output
var data = {};


data.STATIC_ROOT = _wpApiSettings.isDev ? (document.location.origin + '/') : _wpApiSettings.staticRoot + '/';
data.URL_FAVORITE_LABELS = _wpApiSettings.isDev ? 'res/favorite.json' : _wpApiSettings.root + '/?json=get_page&slug=splash&count=10';
data.URL_ALL_PRODUCTS = _wpApiSettings.isDev ? 'res/products.json' : _wpApiSettings.root + '/?json=get_page&slug=splash&count=10';

data.DIR_RULE = '#';
//first nav
data.NAV_REGISTER 	= 'register';
data.NAV_INVENTORY 	= 'inventory';
data.NAV_HISTOEY 		= 'history';
data.NAV_REPORT 		= 'report';
data.NAV_ADMIN 			= 'admin';

//second nav
data.NAV_SALE 			= 'new-sale';
data.NAV_ORDER 			= 'open-order';
data.NAV_HISTOEY 		= 'sale-history';
data.NAV_CATEGORY 	= 'category';
data.NAV_PRODUCT 		= 'product';
data.NAV_PAYMENT 		= 'payment';

data.SECOND_NAV = {};
data.SECOND_NAV[data.NAV_INVENTORY] = [data.NAV_PRODUCT];
data.SECOND_NAV[data.NAV_HISTOEY] 	= [];
data.SECOND_NAV[data.NAV_REPORT] 		= [];
data.SECOND_NAV[data.NAV_ADMIN] 		= [data.NAV_PAYMENT];


//main menu text mapping
data.MENU = {};
data.MENU[data.NAV_REGISTER] 	= 'Register Sale';
data.MENU[data.NAV_INVENTORY] = 'Inventory';
data.MENU[data.NAV_HISTOEY] 	= 'History';
data.MENU[data.NAV_REPORT] 		= 'Reports';
data.MENU[data.NAV_ADMIN] 		= 'Admin Tools';

//second menu text mapping
data.MENU[data.NAV_SALE] 			= 'New sale';
data.MENU[data.NAV_ORDER] 		= 'Open order';
data.MENU[data.NAV_CATEGORY] 	= 'Category';
data.MENU[data.NAV_PRODUCT] 	= 'Product';
data.MENU[data.NAV_PAYMENT] 	= 'Payment method';



export default data;
