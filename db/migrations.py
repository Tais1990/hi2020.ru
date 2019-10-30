from db import manager
from typing import Any
# тут будет распологаться миграции, заполнение таблиц
def migrationFillingRaceAndLocation(args: Any = None) -> None:
    manager.raceAdd('race1', 'расса 1', 2, 'описание народа 1');
    manager.raceAdd('race2', 'расса 2', 0, 'описание народа 2');
    manager.raceAdd('race3', 'расса 3', 1, 'описание народа 3');


    manager.locationAdd('location1', 'локация 1', 9, 'Описание для локации 1', 2);
    manager.locationAdd('location2', 'локация 2', 8, 'Описание для локации 2', 3);
    manager.locationAdd('location3', 'локация 3', 7, 'Описание для локации 3', 2);
    manager.locationAdd('location4', 'локация 4', 6, 'Описание для локации 4', 2);
    manager.locationAdd('location5', 'локация 5', 5, 'Описание для локации 5', 1);
    manager.locationAdd('location6', 'локация 6', 4, 'Описание для локации 6', 2);
    manager.locationAdd('location7', 'локация 7', 3, 'Описание для локации 7', 2);
    manager.locationAdd('location8', 'локация 8', 2, 'Описание для локации 8', 2);
    manager.locationAdd('location9', 'локация 9', 1, 'Описание для локации 9', 1);

def migrationFillingItem(args: Any = None) -> None:
    manager.itemAdd('news1', 'Новость 1', 2, 'Формулировка новости 1', 'news');
    manager.itemAdd('news2', 'Новость 2', 0, 'Формулировка новости 2', 'news');
    manager.itemAdd('info1', 'Информация', 1, 'Описание правил', 'info');
    