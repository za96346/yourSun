
from flask import Flask,request,jsonify,json
from py_sql_class import Insert_URform,verity_user,verity_user_token,report_pages_request
import os
from  dotenv import load_dotenv
load_dotenv()
import jwt
from flask_cors import CORS,cross_origin

#token 加密import(base62,json,hmac)
secret='huang0722'



#  取得啟動文件資料夾路徑
pjdir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)


#  設置post 的key
app.secret_key =os.getenv("Secret_key")



    




@app.route('/backstage/report/dicount',methods=['GET','POST'])
@cross_origin()
def backstage():
    if request.method=="POST":
        #先拿到request 的json 在把 json中的date,user_name拿出來
        data=request.get_json()
        date=data['date']
        user_name=data['user_name']

        #先拿到request headers 中夾帶的token 在把token還原
        token=request.headers['token']
        token=jwt.decode(token, secret, algorithms='HS256')
        email=token['user']
        #去驗證token
        if verity_user_token(email,user_name):
            data_list=[]

            for i in report_pages_request(date):
                tempDict = {}
                tempDict["date"] = i[0]
                tempDict["list"] = i[1]
                tempDict["amount"] = i[2]
                tempDict["total"] = i[3]
                data_list.append(tempDict)
                print(tempDict)
            print(data_list)
            
            return jsonify(data_list),200#status 200 success
        else:
            return jsonify("it is not a right user"),500
    return jsonify("it is not a right user"),500



@app.route('/',methods=['GET','POST'])
@cross_origin()
def lobby():
    #驗證是否為post
    if request.method=='POST':
        data = request.get_json()#拿取json
        password_verify=data['password_verify']
        email_verify=data['email_verify']
        #print(verity_user(email_verify,password_verify))
        confirm=verity_user(email_verify,password_verify)
        if  confirm:
            token=jwt.encode({"user": email_verify}, secret, algorithm='HS256')
            dic={
                'token':token,
                'user_name':confirm[1]
            }
            return jsonify(dic),200
        return jsonify('please enter right'),403
    return jsonify('please enter right'),403

if __name__ == '__main__':
    #跨域請求套件
    app.debug = True
    app.run()
    CORS(app)
    cors = CORS(app, resources={r"/*": {"origins": "*"}})

"""
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method=='POST':
        e=request.form.get('email')
        f=request.form.get('first_name')
        l=request.form.get('last_name')
        s=request.form.get('sex')
        b=request.form.get('birthday')
        p=request.form.get('password')
        p_a=request.form.get('password_again')
        if p!=p_a:
            return render_template('template.html')
        print("本筆資料",e,f,l,s,b,p)
        print("--------------------------")
        print("資料庫的資料")
        for i in Insert_URform(e,f,l,s,b,p):
            print(i)
        return redirect(url_for('lobby'))
    return render_template('template.html' )
"""
