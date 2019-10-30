import peewee
import datetime
from db.dbhandle import *
from db.migrator import *
from db.models import *

from playhouse.migrate import *

# тут будут функции для работы с таблицами 
# Создание таблиц для лоаций и народов
def raceAndLocationCreateTables():
    try:
        dbhandle.connect()
        Race.create_table();
        Location.create_table();
        return 1
    except peewee.InternalError as px:
        print(str(px))
        return 0
# Добавление Расы
def raceAdd(code, name, order, description):
	row = Race(
		name = name,
		code = code,
		order = order,
		description = description
	)
	row.save()
# Добавление локации
def locationAdd(code, name, order, description, race_id):
	row = Location(
		name = name,
		code = code,
		description = description,
		race = race_id,
		order = order
	)
	row.save()

# вычиследние данных обо всех народах
def raceSelectAll():
    try:
        #dbhandle.connect()
        races = Race.select().order_by(Race.order)
        races_data = []
        for record in races:
            races_data.append({
                'id': record.id,
                'code': record.code,
                'name': record.name,
                'description': record.description,
                'order': record.order
            })
        return races_data
    except peewee.InternalError as px:
        print(str(px))
        return 0
# вычисление данных о всех локациях
def locationSelectAll():
    try:
        #dbhandle.connect()
        locations = Location.select().order_by(Location.order)
        locations_data = []
        for record in locations:
            locations_data.append({
                'id': record.id,
                'code': record.code,
                'name': record.name,
                'description': record.description,
                'order': record.order,
                'raceID': record.race.id
            })
        return locations_data
    except peewee.InternalError as px:
        print(str(px))
        return 0
# вычяисление данных о конкретной локации по коду
def locationSelect(code):
    try:
        #dbhandle.connect()
        location = Location.select().where(Location.code == code.strip()).limit(1)
        if bool(location):
            record = location.get()
            location_data = {
                'id': record.id,
                'code': record.code,
                'name': record.name,
                'description': record.description,
                'order': record.order,
                'raceID': record.race.id,
                'raceCode' : record.race.code,
                'raceName': record.race.name,
            }
            return location_data
        else:
            return  None
    except peewee.InternalError as px:
        print('errror')
        print(str(px))
        return None

#изменение записи локации
def locationEdit(code, name, order, description, race):
    location = Location.select().where(Location.code == code.strip()).get()
    location.name = name;
    location.description = description;
    location.order = order;
    location.race = race;    
    location.save()


# --------------------------------- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ -------------------------
# обрезка значение, дабы не превысить значение в 50000
def cutOff(str):
    if len(str) > 50000:
        str = str[:50000]
    return str
#проверяем код на корректность, что такого ещё нет
def codeIsExist(type, code):
    try:
        resultSelect = None
        if type == 'location':
            resultSelect = Location.select().where(Location.code == code.strip())
        else:
            resultSelect = Item.select().where(Item.code == code.strip())    
        return (bool(resultSelect))
    except peewee.InternalError as px:
        print(str(px))
        return 0





# ------------------------------------ НОВОСТИ и ОРГ ВОПРОСЫ --------------------------------
# Создание соответтствующей таблицы
def itemCreateTables():
    try:
        #dbhandle.connect()
        Item.create_table();
        return 1
    except peewee.InternalError as px:
        print(str(px))
        return 0
# Добавление записи в таблицу
def itemAdd(code, name, order, description, type):
    row = Item(
        name = name,
        code = code,
        order = order,
        description = description,
        type = type
    )
    row.save()
# вычиследние данных обо всех записях
def itemSelectAll():
    try:
        #dbhandle.connect()
        items = Item.select().order_by(Item.order)
        items_data = []
        for item in items:
            items_data.append({
                'id': record.id,
                'code': record.code,
                'name': record.name,
                'description': record.description,
                'order': record.order,
                'type': record.type
            })
        return items_data
    except peewee.InternalError as px:
        print(str(px))
        return 0
# вычиследние данных обо всех записях по типу
def itemSelectAllByType(type_):
    try:
        #dbhandle.connect()
        items = Item.select().where(Item.type == type_.strip()).order_by(Item.order)
        items_data = []
        for item in items:
            items_data.append({
                'id': item.id,
                'code': item.code,
                'name': item.name,
                'description': item.description,
                'order': item.order,
                'type': item.type
            })
        return items_data
    except peewee.InternalError as px:
        print(str(px))
        return 0
# вычяисление данных о конкретной записи
def itemSelect(code):
    try:
        #dbhandle.connect()
        item = Item.select().where(Item.code == code.strip()).limit(1)
        if bool(item):
            record = item.get()
            item_data = {
                'id': record.id,
                'code': record.code,
                'name': record.name,
                'description': record.description,
                'order': record.order,
                'type': record.type
            }
            return item_data
        else:
            return  None
    except peewee.InternalError as px:
        print('errror')
        print(str(px))
        return None
#изменение записи
def itemEdit(code, name, order, description):
    item = Item.select().where(Item.code == code.strip()).get()
    item.name = name;
    item.description = description;
    item.order = order;   
    item.save()
