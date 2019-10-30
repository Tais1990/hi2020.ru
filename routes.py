import pathlib

from aiohttp import web

from views import SiteHandler

PROJECT_PATH = pathlib.Path(__file__).parent

#http://fil-andrey.blogspot.com/2015/12/aiohttp-http-client.html
def init_routes(app: web.Application, handler: SiteHandler) -> None:
    add_route = app.router.add_route
    # главная страница
    add_route('GET', '/', handler.index, name='index')
    # страница народа
    add_route('GET', '/race/{raceCode}', handler.race, name='race')
    # страница с новостями
    add_route('GET', '/news', handler.news, name='news')
    # страница с орг информацией
    add_route('GET', '/info', handler.info, name='info')



    #  --------------------------------------------------  АДМИНКА ----------------------------------
    # редактирвание и добавление новостей и локализаций
    add_route('GET', '/admin/edit/{typeInfo}/{infoCode}', handler.infoEdit, name='infoEdit')
    # создание той или иной записи
    add_route('GET', '/admin/create/{typeInfo}', handler.infoCreate, name='infoCreate')

    # --------------------------------------------------  API  --------------------------------------
    # генерация уникальных кодов
    add_route('GET', '/api/getNewCode/{typeInfo}', handler.getNewCode, name = 'getNewCode')
    # вычесление данных обо всех народах
    add_route('GET', '/api/getRaceAll', handler.getRaceAll, name = 'getRaceAll')
    # вычесление данных обо всех локациях
    add_route('GET', '/api/getLocationAll', handler.getLocationAll, name = 'getLocationAll')
    # вычисление данных о локации по её коду 
    add_route('GET', '/api/getLocation', handler.getLocation, name = 'getLocation')
    # сохранение данных о локации
    add_route('POST', '/api/editLocation', handler.editLocation, name='editLocation')  
    # сохранение данных о записи
    add_route('POST', '/api/editInfo', handler.editInfo, name='editInfo')  
    # получение данных о записи Info по коду
    add_route('GET', '/api/getInfo', handler.getInfo, name='getInfo')    
    # получение данных обо всех записяз
    add_route('GET', '/api/getInfoAll', handler.getInfoAll, name='getInfoAll') 


    # added static dir
    app.router.add_static(
        '/static/', path=(PROJECT_PATH / 'static'), name='static'
    )
