from flaskext.mysql import MySQL

def init(app):
    app.config['MYSQL_DATABASE_USER'] = 'root'
    app.config['MYSQL_DATABASE_PASSWORD'] = 'navya123'
    app.config['MYSQL_DATABASE_DB'] = 'NerDb'
    app.config['MYSQL_DATABASE_HOST'] = 'localhost'

    return MySQL(app)