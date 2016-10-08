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
		shredders: 'Шредеры',
		laminators: 'Ламинаторы',
		bookbinders: 'Переплетный машины',
		others: 'Расходные материалы',
	},

	Dict_New: {
		printer: 'Принтеры',
		mfu: 'МФУ',
		scanner: 'Сканеры',
		paper: 'Бумага',
		cartridge: 'Картриджи',
		shredder: 'Шредеры',
		laminator: 'Ламинаторы',
		bookbinder: 'Переплетный машины',
		other: 'Расходные материалы'
	},
	
	property: {
		printers: {
			colors: ['Цветная', 'Черно-белая'],
			maxFormats: ['A0', 'A1', 'A2', 'A3', 'A4'],
			doublePrint: ['Есть', 'Нет'],
			brands: ['Xerox', 'Konica']
		},

		mfus: {
			colors: ['Цветная', 'Черно-белая'],
			maxFormats: ['A0', 'A1', 'A2', 'A3', 'A4'],
			doublePrint: ['Есть', 'Нет'],
			brands: ['Xerox', 'Konica']
		},

		scanners: {
			types: ['Планшетный', 'Протяжный', 'Слайд-сканер'],
			automaticFeed: ['Есть', 'Нет'],
			doubleScan: ['Есть', 'Нет'],
			maxFormats: ['A0', 'A1', 'A2', 'A3', 'A4'],
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