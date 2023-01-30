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
app.config['MYSQL_DATABASE_DB'] = 'NerDb'
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

@app.route('/addNewTag',methods=['POST'])
def addNewAnnotation():
    print(request.data) # raw data
    jsonData = request.data
    cursor.execute("INSERT INTO ner_annotation (label_json) Values (%s)", (jsonData))
    conn.commit()
    return "Record Updated"

@app.route('/fetchTag',methods=['GET'])
def getTagName():
    try:
        conn =  mysql.connect()
        cursor =  conn.cursor()
        #requestFor =  request.args.get('typeOf')
        sqlStatement1 = "SELECT tag_name FROM tagged_names WHERE is_active = 1 AND type_of = 'interpret' "
        #print(sqlStatement1)
        cursor.execute(sqlStatement1)
        result1 = [res[0] for res in cursor.fetchall()]
        #print(result1)

        sqlStatement2 = "SELECT tag_name FROM tagged_names WHERE is_active = 1 AND type_of = 'other' "
        cursor.execute(sqlStatement2)
        result2 = [res[0] for res in cursor.fetchall()]
        #print(result2)

        return {
            "fields":[
                {
                    "report_type":{
                        "categorical":[result1]
                    }
                },{
                    "whether":{
                        "categorical":[result2]
                    }
                },{
                    "configuration":{
                        "comment": True
                    }
                }
            ]
        }
    except:
        print("Failed to load data from table")
    finally:
        if(conn):
            conn.close()
            print("Connection is closed")

# { "fields": [
#    { "report type": 
#      { "categorical": [ "Radiology", "Biopsy", "Other"] } 
#    }
#    { "weather": 
#      { "categorical": [ "good", "bad", "horrible"] } 
#    }
#   ],
#   "configuration": {
#     "comment": true
#   }
# }


    #  return {
    #   'resultStatus': 'SUCCESS',
    #   'tagData':data
    #   }     


if __name__ == '__main__':
    app.debug = True
    app.run()

    

api.add_resource(ApiHandler, '/api/handler')