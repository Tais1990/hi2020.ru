from peewee import *
from db.dbhandle import *
from playhouse.migrate import *
migrator = PostgresqlMigrator(dbhandle)
