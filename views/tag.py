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

class Tag(Object):
    pass

tag_view = Blueprint('tag', __name__)


@tag_view.route('')
def show():
    return render_template('tag.html')


@tag_view.route('', methods=['POST'])
def add():
    pass
@tag_view.route('/upload', methods=['POST'])
def uploadnew():
    data = json.loads(request.data.decode('utf-8'))
    for node in data:
        name = node['name']
        node.pop('name')
        tag = Tag(basic_info = node, name = name)
        try:
            tag.save()
        except LeanCloudError as e:
            return e.error, 502
    response = json.dumps({
        "status": 200,
    })
    return response


