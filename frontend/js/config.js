var Config = {
	pagination: {
		length: 3
	},
	Dict: {
		printers: 'Принтеры',
		mfus: 'МФУ',
		scanners: 'Сканеры',
		papers: 'Бумага',
		cartridges: 'Картриджи',
		laminators: 'Ламинаторы',
		bookbinders: 'Переплетный машины',
		others: 'Расходные материалы',
	},
	
	attrOnBackend: {
		printers: ['color', 'maxFormat', 'doublePrint', 'brand'],
		mfus: ['color', 'maxFormat', 'doublePrint', 'brand'],
		scanners: ['kind', 'automaticFeed', 'doubleScan', 'maxFormat', 'brand'],
		papers: ['format', 'brand'],
		laminators: ['kind'],
		bookbinders: ['kind'],
		others: ['kind']
	},

	property: {
		printers: {
			colors: ['Цветная', 'Черно-белая'],
			maxFormats: ['А0', 'А1', 'А2', 'А3', 'А4'],
			doublePrint: ['Есть', 'Нет'],
			brands: ['Xerox', 'Konica']
		},

		mfus: {
			colors: ['Цветная', 'Черно-белая'],
			maxFormats: ['А0', 'А1', 'А2', 'А3', 'А4'],
			doublePrint: ['Есть', 'Нет'],
			brands: ['Xerox', 'Konica']
		},

		scanners: {
			kinds: ['Планшетный', 'Протяжный', 'Слайд-сканер'],
			automaticFeed: ['Есть', 'Нет'],
			doubleScan: ['Есть', 'Нет'],
			maxFormats: ['А0', 'А1', 'А2', 'А3', 'А4'],
			brands: ['Xerox', 'Konica']
		},

		papers: {
			formats: ['А4', 'A3', 'Широкоформатная бумага'],
			brands: ['Xerox', 'Stora Enso', 'Mondi', 'Konica']
		},

		laminators: {
			kinds: ['Персональный', 'Офисный', 'Рулонный']
		},

		bookbinders: {
			kinds: ['Пластиковый', 'Металлический', 'Термопереплет', 'Многофункциональный']
		},

		others: {
			kinds: ['Для переплета', 'Для ламинирования', 'Для шредера']
		}
	},

	filters: ['color', 'maxFormat', 'doublePrint', 'brand', 'automaticFeed', 'doubleScan', 'format', 'kind'],

	currentHeigth : 50,
	per_page: 12,
	photoPagination: 5
};