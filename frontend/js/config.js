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
			types: ['Планшетный', 'Протяжный', 'Слайд-сканер'],
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
			types: ['Персональный', 'Офисный', 'Рулонный']
		},

		bookbinders: {
			types: ['Пластиковый', 'Металлический', 'Термопереплет', 'Многофункциональный']
		},

		others: {
			types: ['Для переплета', 'Для ламинирования', 'Для шредера']
		}
	},

	currentHeigth : 50,
	per_page: 12,
	photoPagination: 5
};