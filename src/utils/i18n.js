const _i18n = {
	'Самая мощная казахстанская система мониторинга и анализа': ['The most powerful Kazakh monitoring and analysis system', 'Ең қуатты қазақстандық мониторинг және талдау жүйесі'],
	'информационных потоков в режиме реального времени': ['information flows in real time', 'нақты уақыт режимінде ақпарат ағыны'],

	'Понедельник': ['Monday', 'Дүйсенбі'],
	'Вторник': ['Tuesday', 'Сейсенбі'],
	'Среда': ['Wednesday', 'Сәрсенбі'],
	'Четверг': ['Thursday', 'Бейсенбі'],
	'Пятница': ['Friday', 'Жұма'],
	'Суббота': ['Saturday', 'Сенбі'],
	'Воскресенье': ['Sunday', 'Жексенбі'],

	'Января': ['January', 'Қаңтар'],
	'Февраля': ['February', 'Ақпан'],
	'Марта': ['Martha', 'Марта'],
	'Апреля': ['April', 'Сәуір'],
	'Мая': ['May', 'Мамыр'],
	'Июня': ['June', 'Маусым'],
	'Июля': ['July', 'Шілде'],
	'Августа': ['august', 'Тамыз'],
	'Сентября': ['September', 'Қыркүйек'],
	'Октября': ['October', 'Қазан'],
	'Ноября': ['November', 'Қараша'],
	'Декабря': ['December', 'Желтоқсан'],
	
	'Соц.сети за месяц': ['Social networks per month', 'Әлеуметтік желілер айына'],
	'Соц.сети за сегодня': ['Social networks for today', 'Бүгінгі әлеуметтік желілер'],
	'Неотработанные посты каждые 10 мин': ['Unworked posts every 10 minutes', 'Әр 10 минут сайын өңделмеген хабарламалар'],
	'СМИ': ['Media', 'БАҚ'],
	'Instagram и Telegram за месяц': ['Instagram and Telegram in a month', 'Бір айда Instagram мен Telegram'],
	'Instagram и Telegram за сегодня': ['Instagram and Telegram for today', 'Бүгінгі күн үшін Instagram және Telegram'],
	'Вконтакте и Twitter за месяц': ['Vkontakte and Twitter for a month', 'Вконтакте мен Twitter бір ай бойы'],
	'Вконтакте и Twitter за сегодня': ['Vkontakte and Twitter for today', 'Бүгінгі күн үшін Вконтакте және Twitter'],
	'Youtube и Одноклассники  за месяц': ['Youtube and Odnoklassniki for a month', 'Бір ай бойы Youtube және Одноклассники'],
	'Youtube и Одноклассники  за сегодня': ['Youtube and Odnoklassniki for today', 'Бүгінгі күн үшін Youtube және Одноклассники'],
	'Мой Мир за месяц': ['My world in a month', 'Бір айда менің әлемім'],
	'Мой Мир за сегодня': ['My world for today', 'Менің бүгінгі әлемім'],
	'Facebook за месяц': ['Facebook per month', 'Айына Facebook'],
	'Facebook за сегодня': ['Facebook for today', 'Бүгінгі күн үшін Facebook'],
	'Отчёты за месяц': ['Monthly reports', 'Ай сайынғы есептер'],
	'Отчёты за сегодня': ['Reports for today', 'Бүгінгі күнге есептер'],
	'СМИ за месяц': ['Media for the month', 'Айға арналған БАҚ'],
	'СМИ за сегодня': ['Media for today', 'БАҚ'],
	'Месяц': ['Month', 'Ай'],
	'День': ['Day', 'Күн'],
	'Общее': ['General', 'Жалпы'],
	'свободных из': ['free of', '-тан'],
	'only-kz': 'бос',
};

function getLang() {
	var params = {};

	let tmp_params = window.location.href
		.replace(/\?.*/, "")
		.split("//")
		.join("")
		.split("/");
	for (var p = 0; p < tmp_params.length; p++) {
		var _tmp = tmp_params[p].split("=");

		params[_tmp[0]] = _tmp[1];
	}
	let lang = Object.keys(params)[1];
	return lang;
}
function langIs(lang) {
	return getLang() === lang;
}
console.log(getLang() === 'en');

function getLangIndex() {
	if (langIs("en")) return 0;
	else if (langIs("kz")) return 1;
}
const only = {
	'only-ru': true,
	'only-en': true,
	'only-kz': true,
}

const i18n = (text) => {
	if (text == 'only-kz') return langIs('kz') ? _i18n[text] : '';
	return langIs("ru") ? text : _i18n[text][getLangIndex()];
};

export { i18n, langIs};
