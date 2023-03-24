from flask import Flask
import mysql.connector
from flask import render_template

app = Flask(__name__)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'your-username'
app.config['MYSQL_PASSWORD'] = 'your-password'
app.config['MYSQL_DB'] = 'your-database-name'

mysql = mysql.connector.connect(
    host=app.config['MYSQL_HOST'],
    user=app.config['MYSQL_USER'],
    password=app.config['MYSQL_PASSWORD'],
    database=app.config['MYSQL_DB']
)


@app.route('/users')
def show_users():
    cursor = mysql.cursor()
    cursor.execute('SELECT * FROM users')
    users = cursor.fetchall()
    return render_template('users.html', users=users)
