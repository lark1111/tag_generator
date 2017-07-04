# # coding: utf-8
#
# from leancloud import Object
# from leancloud import Query
# from leancloud import LeanCloudError
# from flask import Blueprint
# from flask import request
# from flask import redirect
# from flask import url_for
# from flask import render_template
# import json
# class Pic(Object):
#     pass
#
# pic_view = Blueprint('pic', __name__)
#
# # Pic = Object.extend('Pic')
# # query = Query(Pic)
#
# @pic_view.route('')
# def show():
#     # return render_template('Pictag.html')
#     pass
#
# @pic_view.route('/confirm', methods=['POST'])
# def pic_confirm():
#     info = ''
#     # data = json.loads(request.data.decode('utf-8'))
#     # name = data['name']
#     # count = query.equal_to("name", name).count()
#     # if count:
#     #     pic = query.first().dump()
#     #     info = {
#     #         'tags': pic['tags']
#     #     }
#     # else:
#     #     info = False
#     response = json.dumps({
#         "status": 200,
#         "info": info
#     })
#     return response
#
# @pic_view.route('/addmark', methods=['POST'])
# def add_Pic():
#     data = json.loads(request.data.decode('utf-8'))
#     name = data['name']
#     tags = data['tags']
#     print(name,tags)
#     pic = Pic(tags=tags, name=name)
#     try:
#         pic.save()
#     except LeanCloudError as e:
#         print(11111)
#         return e.error, 502
#     # query.equal_to("name", name)
#     # if query.find():
#     #     pic = query.find()[0]
#     #     name = pic.id
#     #     cql = 'update Pic set tags = ? where objectId = ?'
#     #     result = Query.do_cloud_query(cql, tags, name)
#     # else:
#     #     print(32323)
#     #     pic = Pic(tags=tags, name=name)
#     #     try:
#     #         pic.save()
#     #     except LeanCloudError as e:
#     #         print(11111)
#     #         return e.error, 502
#     response = json.dumps({
#         "status": 200,
#     })
#     return response

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
class Picmark(Object):
    pass

pic_view = Blueprint('pics', __name__)

Picmark = Object.extend('Picmark')
query = Query(Picmark)

@pic_view.route('')
def show():
    return render_template('marktag.html')


@pic_view.route('', methods=['POST'])
def add():
    pass
@pic_view.route('/confirm', methods=['POST'])
def pic_confirm():
    data = json.loads(request.data.decode('utf-8'))
    name = data['name']
    count = query.equal_to("name", name).count()
    if count:
        mark = query.first().dump()
        info = {
            'tags': mark['tags']
        }
    else:
        info = False
    response = json.dumps({
        "status": 200,
        "info": info
    })
    return response

@pic_view.route('/addmark', methods=['POST'])
def add_picmark():
    data = json.loads(request.data.decode('utf-8'))
    name = data['name']
    tags = data['tags']
    query.equal_to("name", name)
    if query.find():
        pic = query.find()[0]
        name = pic.id
        cql = 'update Picmark set tags = ? where objectId = ?'
        result = Query.do_cloud_query(cql, tags, name)
    else:
        pic = Picmark(tags=tags, name=name)
        try:
            pic.save()
        except LeanCloudError as e:
            return e.error, 502
    response = json.dumps({
        "status": 200,
    })
    return response
