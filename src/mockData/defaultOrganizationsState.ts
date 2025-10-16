import type { Organization } from "../types/Organization"

export const defaultOrganizationsState: Organization[] = [
  {
    id: 1,
    name: 'Бобры и партнёры',
    headManagerName: 'Сергей Бобров',
    phone: '88001234567',
    address: {
      city: 'Лесогорск',
      street: 'Таёжная',
      house: '15А'
    }
  },
  {
    id: 2,
    name: 'ПельмениВсегда',
    headManagerName: 'Инна Вареникова',
    phone: '88003450000',
    address: {
      city: 'Тестоград',
      street: 'Вкусная',
      house: '8Б'
    }
  },
  {
    id: 3,
    name: 'Рога и копыта',
    headManagerName: 'Пётр Рогов',
    phone: '88001230003',
    address: {
      city: 'Деревенск',
      street: 'Луговая',
      house: '1'
    }
  },
  {
    id: 4,
    name: 'ТехноМир',
    headManagerName: 'Анна Технова',
    phone: '88001230004',
    address: {
      city: 'Технополис',
      street: 'Инженерная',
      house: '42'
    }
  },
  {
    id: 5,
    name: 'Фруктовый рай',
    headManagerName: 'Олег Яблонев',
    phone: '88001230005',
    address: {
      city: 'Садовск',
      street: 'Яблочная',
      house: '5'
    }
  },
  {
    id: 6,
    name: 'Книжный дом',
    headManagerName: 'Марина Букина',
    phone: '88001230006',
    address: {
      city: 'Читалино',
      street: 'Писательская',
      house: '7'
    }
  },
  {
    id: 7,
    name: 'Зелёный мир',
    headManagerName: 'Иван Травкин',
    phone: '88001230007',
    address: {
      city: 'Экоград',
      street: 'Парковая',
      house: '10'
    }
  },
  {
    id: 8,
    name: 'Молоко и мёд',
    headManagerName: 'Людмила Молочная',
    phone: '88001230008',
    address: {
      city: 'Фермерск',
      street: 'Медовая',
      house: '3'
    }
  },
  {
    id: 9,
    name: 'Северный свет',
    headManagerName: 'Алексей Полярный',
    phone: '88001230009',
    address: {
      city: 'Мурман',
      street: 'Арктическая',
      house: '12'
    }
  },
  {
    id: 10,
    name: 'Мастера ремонта',
    headManagerName: 'Виктор Шпак',
    phone: '88001230010',
    address: {
      city: 'Ремонтоград',
      street: 'Молотковая',
      house: '88'
    }
  },
  {
    id: 11,
    name: 'ЭкоПродукт',
    headManagerName: 'Наталья Зеленина',
    phone: '88001230011',
    address: {
      city: 'Зелёный Луг',
      street: 'Органическая',
      house: '22'
    }
  },
  {
    id: 12,
    name: 'Лаборатория вкуса',
    headManagerName: 'Денис Вкуснов',
    phone: '88001230012',
    address: {
      city: 'Кулинарск',
      street: 'Гастрономическая',
      house: '9А'
    }
  },
  {
    id: 13,
    name: 'Доставка24',
    headManagerName: 'Оксана Быстрова',
    phone: '88001230013',
    address: {
      city: 'Скоропочта',
      street: 'Экспресс',
      house: '24'
    }
  },
  {
    id: 14,
    name: 'ТурБОТур',
    headManagerName: 'Галина Морская',
    phone: '88001230014',
    address: {
      city: 'Пляжевск',
      street: 'Песчаная',
      house: '3Б'
    }
  },
  {
    id: 15,
    name: 'МебельСтрой',
    headManagerName: 'Роман Деревянко',
    phone: '88001230015',
    address: {
      city: 'Интерьерград',
      street: 'Шкафная',
      house: '45'
    }
  },
  {
    id: 16,
    name: 'Лесной край',
    headManagerName: 'Валентина Лесникова',
    phone: '88001230016',
    address: {
      city: 'Тайга',
      street: 'Хвойная',
      house: '13'
    }
  },
  {
    id: 17,
    name: 'Мир окон',
    headManagerName: 'Юрий Стеклов',
    phone: '88001230017',
    address: {
      city: 'Светлый',
      street: 'Прозрачная',
      house: '66'
    }
  },
  {
    id: 18,
    name: 'Домашний уют',
    headManagerName: 'Алёна Уютова',
    phone: '88001230018',
    address: {
      city: 'Теплоград',
      street: 'Комфортная',
      house: '12'
    }
  },
  {
    id: 19,
    name: 'Шинсити',
    headManagerName: 'Максим Колёсников',
    phone: '88001230019',
    address: {
      city: 'Автоград',
      street: 'Резиновая',
      house: '99'
    }
  },
  {
    id: 20,
    name: 'Радуга звуков',
    headManagerName: 'Эльвира Меломанова',
    phone: '88001230020',
    address: {
      city: 'Музыкальск',
      street: 'Нотная',
      house: '4'
    }
  },
    {
    id: 21,
    name: 'Чайная высота',
    headManagerName: 'Софья Листова',
    phone: '88001230021',
    address: {
      city: 'Заваринск',
      street: 'Травяная',
      house: '11'
    }
  },
  {
    id: 22,
    name: 'ЭлектроДом',
    headManagerName: 'Виталий Вольтов',
    phone: '88001230022',
    address: {
      city: 'Энергоград',
      street: 'Мощная',
      house: '77'
    }
  },
  {
    id: 23,
    name: 'Теплые окна',
    headManagerName: 'Ирина Утеплёнова',
    phone: '88001230023',
    address: {
      city: 'Стеклоград',
      street: 'Рамочная',
      house: '5А'
    }
  },
  {
    id: 24,
    name: 'Золотая рыбка',
    headManagerName: 'Марина Морская',
    phone: '88001230024',
    address: {
      city: 'Прибрежный',
      street: 'Русалочья',
      house: '17'
    }
  },
  {
    id: 25,
    name: 'Кофе и Круассан',
    headManagerName: 'Антон Бодров',
    phone: '88001230025',
    address: {
      city: 'Утренник',
      street: 'Ароматная',
      house: '3В'
    }
  },
  {
    id: 26,
    name: 'Цветочная база',
    headManagerName: 'Ольга Цветкова',
    phone: '88001230026',
    address: {
      city: 'Букетовск',
      street: 'Розовая',
      house: '1'
    }
  },
  {
    id: 27,
    name: 'МастерШина',
    headManagerName: 'Георгий Протектор',
    phone: '88001230027',
    address: {
      city: 'Шиноград',
      street: 'Дорожная',
      house: '19Б'
    }
  },
  {
    id: 28,
    name: 'ЛайтХаус',
    headManagerName: 'Светлана Лампина',
    phone: '88001230028',
    address: {
      city: 'Светогорск',
      street: 'Яркая',
      house: '8'
    }
  },
  {
    id: 29,
    name: 'Сырная Лавка',
    headManagerName: 'Павел Сыров',
    phone: '88001230029',
    address: {
      city: 'Деревянск',
      street: 'Молочная',
      house: '12'
    }
  },
  {
    id: 30,
    name: 'ДачаМаркет',
    headManagerName: 'Елена Огородова',
    phone: '88001230030',
    address: {
      city: 'Зеленьград',
      street: 'Урожайная',
      house: '23'
    }
  },
  {
    id: 31,
    name: 'ЗОЖцентр',
    headManagerName: 'Артем Полезнов',
    phone: '88001230031',
    address: {
      city: 'Фиттаун',
      street: 'Спортивная',
      house: '5'
    }
  },
  {
    id: 32,
    name: 'КосмоТех',
    headManagerName: 'Галина Орбитова',
    phone: '88001230032',
    address: {
      city: 'Звездоград',
      street: 'Галактическая',
      house: '108'
    }
  },
  {
    id: 33,
    name: 'Мясной уголок',
    headManagerName: 'Борис Колбаскин',
    phone: '88001230033',
    address: {
      city: 'Мяснёвск',
      street: 'Сочная',
      house: '9'
    }
  },
  {
    id: 34,
    name: 'ГикХаб',
    headManagerName: 'Никита Кодов',
    phone: '88001230034',
    address: {
      city: 'Джаваскриптово',
      street: 'Фреймворкная',
      house: '404'
    }
  },
  {
    id: 35,
    name: 'Торт и Точка',
    headManagerName: 'Алла Сладкова',
    phone: '88001230035',
    address: {
      city: 'Десертовск',
      street: 'Кондитерская',
      house: '2'
    }
  },
  {
    id: 36,
    name: 'СушиРолл',
    headManagerName: 'Михаил Васаби',
    phone: '88001230036',
    address: {
      city: 'Рисбург',
      street: 'Морская',
      house: '17'
    }
  },
  {
    id: 37,
    name: 'КиноТочка',
    headManagerName: 'Владимир Кинограй',
    phone: '88001230037',
    address: {
      city: 'Фильмоград',
      street: 'Сценарная',
      house: '11А'
    }
  },
  {
    id: 38,
    name: 'ВинтажТрейд',
    headManagerName: 'Тамара Старицкая',
    phone: '88001230038',
    address: {
      city: 'Антикварт',
      street: 'Старинная',
      house: '7'
    }
  },
  {
    id: 39,
    name: 'ФермаОнлайн',
    headManagerName: 'Евгений Агроский',
    phone: '88001230039',
    address: {
      city: 'Цифрово',
      street: 'Виртуальная',
      house: '1'
    }
  },
  {
    id: 40,
    name: 'Бургерная №1',
    headManagerName: 'Степан Булкин',
    phone: '88001230040',
    address: {
      city: 'Фастфудовск',
      street: 'Грильная',
      house: '22Б'
    }
  },
  {
    id: 41,
    name: 'ПаркАттракционов',
    headManagerName: 'Любовь Веселова',
    phone: '88001230041',
    address: {
      city: 'Лунапарк',
      street: 'Карусельная',
      house: '1'
    }
  },
  {
    id: 42,
    name: 'Баня.ру',
    headManagerName: 'Аркадий Веников',
    phone: '88001230042',
    address: {
      city: 'Парильск',
      street: 'Горячая',
      house: '17'
    }
  },
  {
    id: 43,
    name: 'ВелоГрад',
    headManagerName: 'Кирилл Педальный',
    phone: '88001230043',
    address: {
      city: 'Транспортовск',
      street: 'Цепная',
      house: '6'
    }
  },
  {
    id: 44,
    name: 'Флора и Фауна',
    headManagerName: 'Жанна Цветкова',
    phone: '88001230044',
    address: {
      city: 'Зелёный Край',
      street: 'Природная',
      house: '14'
    }
  },
  {
    id: 45,
    name: 'Печенька PRO',
    headManagerName: 'Лариса Сдобная',
    phone: '88001230045',
    address: {
      city: 'Выпечкин',
      street: 'Мучная',
      house: '3'
    }
  },
  {
    id: 46,
    name: 'ОкнаМир',
    headManagerName: 'Семен Рамкин',
    phone: '88001230046',
    address: {
      city: 'Оконск',
      street: 'Светлая',
      house: '12'
    }
  },
  {
    id: 47,
    name: 'IT-Сервисы+',
    headManagerName: 'Дмитрий Айтишник',
    phone: '88001230047',
    address: {
      city: 'Технополис',
      street: 'Серверная',
      house: '5Б'
    }
  },
  {
    id: 48,
    name: 'Мир Мыла',
    headManagerName: 'Вероника Пенная',
    phone: '88001230048',
    address: {
      city: 'Чистоград',
      street: 'Пенная',
      house: '9'
    }
  },
  {
    id: 49,
    name: 'Косметик PRO',
    headManagerName: 'Виктория Краснова',
    phone: '88001230049',
    address: {
      city: 'Бьютик',
      street: 'Салонная',
      house: '1Г'
    }
  },
  {
    id: 50,
    name: 'Свет и Звук',
    headManagerName: 'Георгий Светлов',
    phone: '88001230050',
    address: {
      city: 'Эстраданск',
      street: 'Акустическая',
      house: '10'
    }
  }
];
