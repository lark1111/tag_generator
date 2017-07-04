# coding: utf-8

from leancloud import Object
from leancloud import Query
from leancloud import LeanCloudError
from flask import Blueprint
from flask import request
from flask import redirect
from flask import url_for
from flask import render_template
import json
class Mark(Object):
    pass

mark_view = Blueprint('mark', __name__)

Mark = Object.extend('Mark')
query = Query(Mark)

@mark_view.route('')
def show():
    return render_template('marktag.html')


@mark_view.route('', methods=['POST'])
def add():
    pass
@mark_view.route('/confirm', methods=['POST'])
def mark_confirm():
    data = json.loads(request.data.decode('utf-8'))
    name = data['name']
    count = query.equal_to("name", name).count()
    if count:
        mark = query.first().dump()
        info = {
            'tags': mark['tags'],
            'des': mark['des'],
            'des_en': mark['des_en'],
            'des_content': mark['des_content'],
            'lines': mark['lines']
        }
    else:
        info = False
    response = json.dumps({
        "status": 200,
        "info": info
    })
    return response

@mark_view.route('/addmark', methods=['POST'])
def add_mark():
    data = json.loads(request.data.decode('utf-8'))
    name = data['name']
    tags = data['tags']
    des = data['des']
    des_en = data['des_en']
    des_content = data['des_content']
    lines = data['lines']
    query.equal_to("name", name)
    if query.find():
        mark = query.find()[0]
        name = mark.id
        cql = 'update Mark set tags = ?, des = ?, des_en = ?, des_content = ?, lines = ? where objectId = ?'
        result = Query.do_cloud_query(cql, tags, des, des_en, des_content, lines, name)
    else:
        mark = Mark(tags=tags, name=name, des=des, des_en=des_en, des_content=des_content, lines=lines)
        try:
            mark.save()
        except LeanCloudError as e:
            return e.error, 502
    response = json.dumps({
        "status": 200,
    })
    return response

@mark_view.route('/adddes', methods=['POST'])
def add_des():
    data = json.loads(request.data.decode('utf-8'))
    name = data['name']
    des = data['des']
    des_en = data['des_en']
    des_content = data['des_content']
    query.equal_to("name", name)
    if query.find():
        mark = query.find()[0]
        name = mark.id
        cql = 'update Mark set des = ?, des_en = ?, des_content = ? where objectId = ?'
        result = Query.do_cloud_query(cql, des, des_en, des_content, name)
    else:
        mark = Mark(tags=None, name=name, des=des, des_en=des_en, des_content=des_content, lines=None)
        try:
            mark.save()
        except LeanCloudError as e:
            return e.error, 502
    response = json.dumps({
        "status": 200,
    })
    return response

