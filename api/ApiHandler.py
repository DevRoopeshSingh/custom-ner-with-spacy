from flask_restful import Api, Resource, reqparse

class ApiHandler(Resource):
  def get(self):
    return {
      'resultStatus': 'SUCCESS',
      'message': "Hello Api Handler"
      }

  def post(self):
    print(self)
    parser = reqparse.RequestParser()
    parser.add_argument('type', type=str)
    parser.add_argument('message', type=str)

    args = parser.parse_args()

    print(args)
    # note, the post req from frontend needs to match the strings here (e.g. 'type and 'message')

    request_type = args['type']
    request_json = args['message']
    # ret_status, ret_msg = ReturnData(request_type, request_json)
    # currently just returning the req straight
    ret_status = request_type
    ret_msg = request_json

    if ret_msg:
      message = "Your Message Requested: {}".format(ret_msg)
    else:
      message = "No Msg"
    
    final_ret = {"status": "Success", "message": message}
    

    return final_ret




# #endpoint for search
# @app.route('/search', methods=['GET', 'POST'])
# def search():
#     if request.method == "POST":
#         book = request.form['book']
#         # search by author or book
#         cursor.execute("SELECT name, author from Book WHERE name LIKE %s OR author LIKE %s", (book, book))
#         conn.commit()
#         data = cursor.fetchall()
#         # all in the search box will return all the tuples
#         if len(data) == 0 and book == 'all': 
#             cursor.execute("SELECT name, author from Book")
#             conn.commit()
#             data = cursor.fetchall()
#         return render_template('search.html', data=data)
#     return render_template('search.html')
# # end point for inserting data dynamicaly in the database
# @app.route('/insert', methods=['GET', 'POST'])
# def insert():
#     if request.method == "POST":
#         book = request.form['book']
#         author = request.form['author']
#         cursor.execute("INSERT INTO Book (name, author) Values (%s, %s)", (book, author))
#         conn.commit()
#         return redirect("http://localhost:5000/search", code=302)
#     return render_template('insert.html')