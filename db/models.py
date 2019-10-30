from peewee import *
import datetime
import json
from db.dbhandle import *
from peewee import TextField
from playhouse.postgres_ext import ArrayField
from playhouse.postgres_ext import JSONField
 
class BaseModel(Model):
    class Meta:
        database = dbhandle
# Класс статьи
#class NewsItem(BaseModel):
#    id = PrimaryKeyField(null=False)
#    code = CharField(max_length=1000)
#    title = CharField(max_length=1000)
#    text = CharField(max_length=50000)
# Класс народа
class Race(BaseModel):
	id = PrimaryKeyField(null=False)
	code = CharField(max_length=1000)
	name = CharField(max_length=1000)
	order = IntegerField()
	description = TextField()
#Локация
class Location(BaseModel):
	id = PrimaryKeyField(null=False)
	code = CharField(max_length=1000)
	name = CharField(max_length=1000)
	order = IntegerField()
	description = TextField()
	race =  ForeignKeyField(Race)
#Таблица с разного рода более менее однотипоной информацией
# НОВОСТИ и ОРГ вопросы
class Item(BaseModel):
	id = PrimaryKeyField(null=False)
	code = CharField(max_length=1000)
	name = CharField(max_length=1000)
	order = IntegerField()
	description = TextField()
	type = CharField(max_length=1000)

    