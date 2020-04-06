from peewee import *
# не забывать на свежей разработческой машине - pip intall psyconpg2
# Connect to a Postgres database.
dbhandle = PostgresqlDatabase('HI2020', user='postgres', password='Dtyz2006',
                           host='127.0.0.1', port=5432)