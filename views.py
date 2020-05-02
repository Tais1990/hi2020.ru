import asyncio
from typing import Dict
from concurrent.futures import ProcessPoolExecutor

import aiohttp_jinja2
from aiohttp import web

#from .worker import predict
from utils import Config

from db import manager

import aiohttp_session
from aiohttp_session import get_session
    
import json

headersClientPermission = {
    'Access-Control-Allow-Origin': 'http://localhost:8081'
}

class SiteHandler:
    def __init__(self, conf: Config, executor: ProcessPoolExecutor) -> None:
        self._conf = conf
        self._executor = executor
        self._loop = asyncio.get_event_loop()
    # страница заглавная    
    @aiohttp_jinja2.template('index.html')
    async def index(self, request: web.Request) -> Dict[str, str]:
        return {}
    # страница народа
    @aiohttp_jinja2.template('race.html')
    async def race(self, request: web.Request) -> Dict[str, str]:
       return {
            'raceCode': request.match_info['raceCode']
            }
    # страница орг информации    
    @aiohttp_jinja2.template('info.html')
    async def info(self, request: web.Request) -> Dict[str, str]:
       return {
            'type': 'info'
            }
    # страница новостей
    @aiohttp_jinja2.template('info.html')
    async def news(self, request: web.Request) -> Dict[str, str]:
       return {
            'type': 'news'
            }
    # страница логина    
    @aiohttp_jinja2.template('login.html')
    async def login(self, request: web.Request) -> Dict[str, str]:
        return {}





    # -------------------------------------------  ADMIN  --------------------------
    #админка, добавить позже аутентификацию
    # страница редакирования записей
    @aiohttp_jinja2.template('infoEdit.html')
    async def infoEdit(self, request: web.Request) -> Dict[str, str]:
       return {
            'infoCode': request.match_info['infoCode'],
            'typeInfo': request.match_info['typeInfo']
            }
    # создание той или иной записи
    @aiohttp_jinja2.template('infoEdit.html')
    async def infoCreate(self, request: web.Request) -> Dict[str, str]:
       return {
            'infoCode': '',
            'typeInfo': request.match_info['typeInfo']
            }
    # главная страница админки  
    @aiohttp_jinja2.template('admin.html')
    async def admin(self, request: web.Request) -> Dict[str, str]:
        return {}



    # -------------------------------------------   API   ----------------
    # генерация уникальных кодов
    async def getNewCode(self, request: web.Request) -> Dict[str, str]:
        typeInfo = request.match_info['typeInfo']
        strCode = typeInfo
        #number = len(manager.coursesSelectAll()) + 1 
        number = 0 
        if typeInfo == 'location':
            number = len(manager.locationSelectAll()) + 1
        else: 
            number = len(manager.itemSelectAllByType(typeInfo)) + 1
        index =  0
        while (manager.codeIsExist(typeInfo, strCode + str(number))) and (index < 100):            
            number = number + 1 
        # по идее, необходимо цапануть по рекурсии вычисление кода до талого, но пока оставляем так                   
        res = {"code": strCode + str(number)}
        return web.json_response(res, 
            headers=headersClientPermission)

    # вычисление данных о всех расах
    async def getRaceAll(self, request: web.Request) -> Dict[str, str]:
        res = manager.raceSelectAll()
        return web.json_response(res, headers=headersClientPermission)
    # вычисление данных о всех локациях
    async def getLocationAll(self, request: web.Request) -> Dict[str, str]:
        res = manager.locationSelectAll()
        return web.json_response(res, headers=headersClientPermission)
    # вычисление данных о локации по её коду
    async def getLocation(self, request: web.Request) -> Dict[str, str]:
        try:            
            codeValue = request.rel_url.query['code']
            res = manager.locationSelect(codeValue) 
            if res == None:
                return web.json_response(
                    {'ErrorText': "Not found location with code " + codeValue},
                    status=409,
                    headers= headersClientPermission
                    )
            else:
                return web.json_response(res,
                    status = 200,
                    headers=headersClientPermission)  
        except Exception:
            print('Неопознааная ошибка при работе с кодом ' + codeValue)
            return web.Response(
                status=500,
                headers=headersClientPermission)
    # сохранение данных о локации
    async def editLocation(self, request: web.Request) -> web.Response:
        try:
            form = await request.json()
            if form.get('type') == 'edit':
                manager.locationEdit(form.get('code'), form.get('name'), form.get('order'),
                    form.get('description'), form.get('raceID'))
            else:
                manager.locationAdd(form.get('code'), form.get('name'), form.get('order'),
                    form.get('description'), form.get('raceID'))
            headers = {
                #'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:8081'
                }
            return web.Response(status=200, headers=headers)
        except Exception:
            print('Неопознанная ошибка')
            return web.Response(status=500, headers=headers)

    # сохранение данных о инфо или новостях
    async def editInfo(self, request: web.Request) -> web.Response:
        try:
            form = await request.json()
            if form.get('type') == 'edit':
                manager.itemEdit(form.get('code'), form.get('name'), form.get('order'),
                    form.get('description'))
            else:
                manager.itemAdd(form.get('code'), form.get('name'), form.get('order'),
                    form.get('description'), form.get('typeInfo'))
            headers = {
                #'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:8081'
                }
            return web.Response(status=200, headers=headers)
        except Exception:
            print('Неопознанная ошибка')
            return web.Response(status=500, headers=headers)
    # вычисление данных о инфо или новостях по её коду
    async def getInfo(self, request: web.Request) -> Dict[str, str]:
        try:          
            codeValue = request.rel_url.query['code']
            res = manager.itemSelect(codeValue) 
            if res == None:
                return web.json_response(
                    {'ErrorText': "Not found item with code " + codeValue},
                    status=409,
                    headers= headersClientPermission
                    )
            else:
                return web.json_response(res,
                    status = 200,
                    headers=headersClientPermission)  
        except Exception:
            print('Неопознааная ошибка при работе с кодом ' + codeValue)
            return web.Response(
                status=500,
                headers=headersClientPermission)

    # вычисление данных обо всех новостях или орг информации
    async def getInfoAll(self, request: web.Request) -> Dict[str, str]:
        try:          
            typeValue = request.rel_url.query['type']
            res = manager.itemSelectAllByType(typeValue)
            return web.json_response(res, headers=headersClientPermission)
        except Exception:
            print('Неопознааная ошибка при получении всех записей с типом записей ' + typeValue)
            return web.Response(
                status=500,
                headers=headersClientPermission)

    # авторизация пользователя в вситеме
    async def auth(self, request: web.Request) -> web.Response:
        headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8081'
        }
        session = await get_session(request);
        #user_id = session.get('user_id')
        session["user_id"] = None;
        session["data"] = {};
        try:
            form = await request.json()
            user = manager.auth(form.get('login'), form.get('password'));
            if (user):                
                session["user_id"] = user['id'];
                session["data"] = user;
                return web.Response(status=200, headers=headers)
            else:
                return web.Response(status=401, headers=headers)           
        except Exception:
            print('Неопознанная ошибка')
            return web.Response(
                status=500,
                headers=headersClientPermission) 

    # данные о том залогинен ли текущий пользователь
    async def authMe(self, request: web.Request) -> Dict[str, str]:
        headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8081'
        }     
        session = await get_session(request)
        user_id = session.get('user_id')
        user = session.get('data')        
        try:          
            #typeValue = request.rel_url.query['type']
            #res = manager.itemSelectAllByType(typeValue)
            res = {};
            if (user_id):
                res["resultCode"] = 1;
                res["data"] = user;
                return web.json_response(res, status = 200, headers=headersClientPermission)
            else:
                res["resultCode"] = 0; 
                res["data"] = {};
                res["message"] = "You are not authorized"        
                return web.json_response(res, status = 401, headers=headersClientPermission)
        except Exception:
            print('Неопознааная ошибка')
            return web.Response(
                status=500,
                headers=headersClientPermission) 

    async def logout(self, request: web.Request) -> web.Response:
        headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8081'
        } 
        try: 
            session = await get_session(request);
            session.invalidate();
            return web.Response(status = 200, headers=headersClientPermission);
        except Exception:
            print('Неопознааная ошибка')
            return web.Response(
                status=500,
                headers=headersClientPermission) 


    
