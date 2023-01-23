# import time
# from flask import Flask

# app = Flask(__name__)

# @app.route('/time')
# def get_current_time():
#     return {'time': time.time()}
import time
from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment
from ApiHandler import ApiHandler
from flask import Flask, render_template, request, redirect
from flaskext.mysql import MySQL


#app = Flask(__name__, static_url_path='', static_folder='frontend/build')
app =  Flask(__name__)

app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'navya123'
app.config['MYSQL_DATABASE_DB'] = 'LibraryDB'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql = MySQL()
mysql.init_app(app)
conn = mysql.connect()
cursor = conn.cursor()

CORS(app) #comment this on deployment
api = Api(app)


@app.route('/time')
def get_current_time():
    return {'time': time.time()}  

#endpoint for search
@app.route('/search', methods=['GET', 'POST'])
def search():
    if request.method == "POST":
        book = request.form['book']
        # search by author or book
        cursor.execute("SELECT name, author from Book WHERE name LIKE %s OR author LIKE %s", (book, book))
        conn.commit()
        data = cursor.fetchall()
        # all in the search box will return all the tuples
        if len(data) == 0 and book == 'all': 
            cursor.execute("SELECT name, author from Book")
            conn.commit()
            data = cursor.fetchall()
        return render_template('search.html', data=data)
    return render_template('search.html')
# end point for inserting data dynamicaly in the database
@app.route('/insert', methods=['GET', 'POST'])
def insert():
    if request.method == "POST":
        book = request.form['book']
        author = request.form['author']
        cursor.execute("INSERT INTO Book (name, author) Values (%s, %s)", (book, author))
        conn.commit()
        return redirect("http://localhost:5000/search", code=302)
    return render_template('insert.html')
if __name__ == '__main__':
    app.debug = True
    app.run()

    

api.add_resource(ApiHandler, '/api/handler')