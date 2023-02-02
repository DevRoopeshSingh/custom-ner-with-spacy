import time
from flask import Flask,jsonify, send_from_directory
from flask_restful import Api, Resource
from flask_cors import CORS 
from flask import Flask, render_template, request, redirect
from flaskext.mysql import MySQL
import db

app =  Flask(__name__)
mysql = db.init(app)
conn = mysql.connect()
cursor = conn.cursor()


api_v1_cors_config = {
    "origins":["http://localhost:3000"],
    "methods":["OPTIONS","GET","POST"],
    "allow_headers": ["Authorization","Content-Type"]
}

CORS(app, resources={
   r"/api/*": api_v1_cors_config
}) #comment this on deployment

API_NAME = Api(app)



@app.route('/api/v1/time')
def get_current_time():
    return {'time': time.time()}  

@app.route('/api/v1/addNewTag',methods=['POST'])
def addNewAnnotation():
    try:
        conn =  mysql.connect()
        cursor =  conn.cursor()
        print(request.data) # raw data
        jsonData = request.data
        cursor.execute("INSERT INTO ner_annotation (label_json) Values (%s)", (jsonData))
        conn.commit()
        return  {"status": "Success", "message": "Data entered successfully"}
    except Exception as e:
        print(f"The error is - {e}")
    finally:
        if(conn):
            conn.close()
            print("Connection is closed") 


@app.route('/api/v1/fetchTag',methods=['GET'])
def getTagName():
    try:
        conn =  mysql.connect()
        cursor = conn.cursor()
       
        sqlStatement1 = "SELECT tag_name,type_of FROM tagged_names WHERE is_active = 1 "

        cursor.execute(sqlStatement1)
        result = cursor.fetchall()

        #result1 = [res[0] for res in cursor.fetchall()]
        print(result)

        print(len(result))
        result1 =[]
        result2 = []

        for i in range(len(result)):
            if result[i][1]!="other":
                result1.append(result[i][0])
            else:
                result2.append(result[i][0])

        return {
            "fields":[
                {
                    "report_type":{
                        "categorical":result1
                    }
                },{
                    "whether":{
                        "categorical":result2                    
                    }
                },{
                    "configuration":{
                        "comment": True
                    }
                }
            ]
        }
    except Exception as e:
        print(f"The error is - {e}")
    finally:
        if(conn):
            conn.close()
            print("Connection is closed")








if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True, threaded=True)

    

