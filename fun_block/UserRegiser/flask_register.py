from package.flask_cors import CORS, cross_origin
import package.jwt as jwt
import tempfile
from flask import Flask, request, jsonify, json
from py_total import data_split,data_split_xls
from py_sql_class import verity_user, verity_user_token, report_pages_total_deal, report_pages_time_range,index_main
from py_sql_class import report_pages_dicount, report_pages_pay_methods, report_pages_tail, report_pages_top10_type
from py_sql_class import user_bar,Insert_URform,user_main,user_delete,attend_user_select,insert_attend_table
import os
from dotenv import load_dotenv
load_dotenv()

# token 加密import(base62,json,hmac)
secret = 'huang0722'
#  取得啟動文件資料夾路徑
pjdir = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__)
#  設置post 的key
app.secret_key = os.getenv("Secret_key")

# 這裡是確認使用者的function
# 並且去對應的函示拿資料


@app.route('/backstage/index/main', methods=['POST'])
@cross_origin()
def backstage_index_main():
    if request.method == "POST":
        # 先拿到request 的json 在把 json中的date,user_name拿出來
        data = request.get_json()
        date = data['date']
        user_name = data['user_name']

        # 先拿到request headers 中夾帶的token 在把token還原
        token = request.headers['token']
        try:
            token = jwt.decode(token, secret, algorithms='HS256')
        except:
            return jsonify("it is not a right user"),500
        email = token['user']
        print(token)
        print("/backstage/index/mainn--------------------------------")
        # 去驗證token
        return check_user(email, user_name, date,6)

def check_user(email, user_name, date, index):
    print("/verity_user_token--------------------------------")
    if verity_user_token(email, user_name):
        data_list = []
        if(index == 0):go_to_function = report_pages_dicount(date)
        elif(index == 1):go_to_function = report_pages_pay_methods(date)
        elif(index == 2):go_to_function = report_pages_tail(date)
        elif(index == 3):go_to_function = report_pages_time_range(date)
        elif(index == 4):go_to_function = report_pages_top10_type(date)
        elif(index == 5):go_to_function = report_pages_total_deal(date)
        elif(index == 6):go_to_function = index_main(date)
        try:
            if index==1 or index==6:
                for i in go_to_function:
                    tempDict = {}
                    tempDict["date"] = i[0]
                    tempDict["list"] = i[1]
                    tempDict["amount"] = i[2]
                    tempDict["total"] = i[3]
                    tempDict['last']=i[4]
                    data_list.append(tempDict)
            else:
                for i in go_to_function:
                    tempDict = {}
                    tempDict["date"] = i[0]
                    tempDict["list"] = i[1]
                    tempDict["amount"] = i[2]
                    tempDict["total"] = i[3]
                    data_list.append(tempDict)
                    print(tempDict)
                print(data_list)
            return jsonify(data_list), 200  # status 200 success
        except:
            return jsonify("請輸入日期")

        
    else:
        return jsonify("it is not a right user"), 500


@app.route('/backstage/report/pay_methods', methods=['POST'])
@cross_origin()
def backstage_report_pay_methods():
    if request.method == "POST":
        # 先拿到request 的json 在把 json中的date,user_name拿出來
        data = request.get_json()
        date = data['date']
        user_name = data['user_name']

        # 先拿到request headers 中夾帶的token 在把token還原
        token = request.headers['token']
        try:
            token = jwt.decode(token, secret, algorithms='HS256')
        except:
            return jsonify("it is not a right user"),500
        email = token['user']
        # 去驗證token
        return check_user(email, user_name, date, 1)


@app.route('/backstage/report/tail', methods=['POST'])
@cross_origin()
def backstage_report_tail():
    if request.method == "POST":
        # 先拿到request 的json 在把 json中的date,user_name拿出來
        data = request.get_json()
        date = data['date']
        user_name = data['user_name']

        # 先拿到request headers 中夾帶的token 在把token還原
        token = request.headers['token']
        try:
            token = jwt.decode(token, secret, algorithms='HS256')
        except:
            return jsonify("it is not a right user"),500
        email = token['user']
        # 去驗證token
        return check_user(email, user_name, date, 2)


@app.route('/backstage/report/time_range', methods=['POST'])
@cross_origin()
def backstage_report_time_range():
    if request.method == "POST":
        # 先拿到request 的json 在把 json中的date,user_name拿出來
        data = request.get_json()
        date = data['date']
        user_name = data['user_name']

        # 先拿到request headers 中夾帶的token 在把token還原
        token = request.headers['token']

        try:
            token = jwt.decode(token, secret, algorithms='HS256')
        except:
            return jsonify("it is not a right user"),500
        email = token['user']
        # 去驗證token
        return check_user(email, user_name, date, 3)


@app.route('/backstage/report/dicount', methods=['POST'])
@cross_origin()
def backstage_report_dicount():
    # 先拿到request 的json 在把 json中的date,user_name拿出來
    data = request.get_json()
    date = data['date']
    user_name = data['user_name']

    # 先拿到request headers 中夾帶的token 在把token還原
    token = request.headers['token']

    try:
        token = jwt.decode(token, secret, algorithms='HS256')
    except:
        return jsonify("it is not a right user"),500

    email = token['user']
    # 去驗證token
    return check_user(email, user_name, date, 0)


@app.route('/backstage/report/top10_type', methods=['POST'])
@cross_origin()
def backstage_report_top10_type():
    if request.method == "POST":
        # 先拿到request 的json 在把 json中的date,user_name拿出來
        data = request.get_json()
        date = data['date']
        user_name = data['user_name']

        # 先拿到request headers 中夾帶的token 在把token還原
        token = request.headers['token']

        try:
            token = jwt.decode(token, secret, algorithms='HS256')
        except:
            return jsonify("it is not a right user"),500

        email = token['user']
        # 去驗證token
        return check_user(email, user_name, date, 4)


@app.route('/backstage/report/total_deal', methods=['POST'])
@cross_origin()
def backstage_report_total_deal():
    if request.method == "POST":
        # 先拿到request 的json 在把 json中的date,user_name拿出來
        data = request.get_json()

        date = data['date']
        user_name = data['user_name']

        # 先拿到request headers 中夾帶的token 在把token還原
        token = request.headers['token']

        try:
            token = jwt.decode(token, secret, algorithms='HS256')
        except:
            return jsonify("it is not a right user"),500

        email = token['user']
        print(token)
        # 去驗證token
        return check_user(email, user_name, date, 5)


@app.route('/backstage/report/upload', methods=['POST'])
@cross_origin()
def backstage_report_upload():
    xls_file = request.files.get('file')
    token=request.headers['token']
    print(token)
    user_name=request.headers['user_name']

    try:
        token = jwt.decode(token, secret, algorithms='HS256')
    except:
        return jsonify("it is not a right user"),500

    print(token)
    email=token['user']
    print("/verity_user_token--------------------------------")
    
    if verity_user_token(email, user_name):
        if xls_file:
            #使用臨時位置去存取request.file裡的檔案
            tempfile_path = tempfile.NamedTemporaryFile().name
            xls_file.save(tempfile_path)
            # 呼叫function 負責解析資料 以及傳入資料庫
            try:
                print("/backstage/report/upload--------------------------------")
                data_split_xls(tempfile_path)
                # print(data)
                print(xls_file.filename)
                print("success")
                return jsonify('upload success'), 200
            except:
                return jsonify("upload fail"), 500
        else:
            return jsonify("not a csv file"), 500
    else:
        return jsonify('it is not a right user'),500


@app.route('/backstage/user',methods=['GET','POST'])
@cross_origin()
def backstage_user():
    print("/backstage/user/bar----------------------------")

    # 先拿到request headers 中夾帶的token 在把token還原
    token = request.headers['token']

    try:
        token = jwt.decode(token, secret, algorithms='HS256')
    except:
        return jsonify("it is not a right user"),500

    email = token['user']

    user_name=request.headers['user_name']
    if verity_user_token(email,user_name):
        if request.method=='POST':
            return jsonify(user_bar())
    else:
        return jsonify("it is not a right user"),500

@app.route('/backstage/user/main',methods=['POST'])
@cross_origin()
def backstage_user_main():
    print("user_main-----------------------------")

    # 先拿到request headers 中夾帶的token 在把token還原
    token = request.headers['token']

    try:
        token = jwt.decode(token, secret, algorithms='HS256')
    except:
        return jsonify("it is not a right user"),500

    email = token['user']

    user_name=request.headers['user_name']
    if verity_user_token(email,user_name):
        data=request.get_json()
        print(data)
        email=data['email']
        print("user_main-",email)
        try:
            return jsonify(user_main(email)),200
        except:
            return jsonify("email wrong"),500
    else:
        return jsonify("it is not a right user"),500

@app.route('/backstage/user/delete',methods=['POST'])
@cross_origin()
def backstage_user_delete():
    print("user/delete--------------------------------")

    # 先拿到request headers 中夾帶的token 在把token還原
    token = request.headers['token']
    try:
        token = jwt.decode(token, secret, algorithms='HS256')
    except:
        return jsonify("it is not a right user"),500
    email = token['user']

    user_name=request.headers['user_name']
    if verity_user_token(email,user_name):
        data=request.get_json()
        email=data['email']
        print("user_delete-",email)
        try:
            user_delete(email)
            return jsonify('delete success'),200
        except:
            return jsonify("email wrong"),500
    else:
        return jsonify("it is not a right user"),500




@app.route('/backstage/check',methods=['POST'])
@cross_origin()
def backstage_check():
    print("de")

    # 先拿到request headers 中夾帶的token 在把token還原
    token = request.headers['token']
    try:
        token = jwt.decode(token, secret, algorithms='HS256')
    except:
        return jsonify("it is not a right user"),500
    email = token['user']
    
    user_name=request.headers['user_name']
    print(user_name)
    if verity_user_token(email,user_name):
        return jsonify("success"),200
    else:
        return jsonify("it is not a right user"),500


@app.route('/backstage/user/insertform', methods=['GET', 'POST'])
@cross_origin()
def register():
    print("user/insertform--------------------------------")
    # 先拿到request headers 中夾帶的token 在把token還原
    token = request.headers['token']

    try:
        token = jwt.decode(token, secret, algorithms='HS256')
    except:
        return jsonify("it is not a right user"),500

    email = token['user']
    user_name=request.headers['user_name']
    if verity_user_token(email,user_name):
        if request.method=='POST':
            data=request.get_json()
            first_name=data['first_name']
            last_name=data['last_name']
            phone_number=data['phone_number']
            sexual=data['sexual']
            position=data['position']
            salary=data['salary']
            email=data['email']
            password=data['password']
            print(email,first_name,last_name,phone_number,sexual,position,salary,password)
            try:

                Insert_URform(email,first_name,last_name,phone_number,sexual,position,salary,password)
                return jsonify("insert success"),200
            except:
                return jsonify("the data is wrong"),500

    return jsonify("it is not a right user"),500
    

@app.route('/backstage/attend_user_select',methods=['GET','POST'])
@cross_origin()
def backstage_attend_user_select():
    print("/backstage//attend_user_select----------------------------")

    # 先拿到request headers 中夾帶的token 在把token還原
    token = request.headers['token']

    try:
        token = jwt.decode(token, secret, algorithms='HS256')
    except:
        return jsonify("it is not a right user"),500

    email = token['user']

    user_name=request.headers['user_name']
    if verity_user_token(email,user_name):
        if request.method=='POST':
            try:
                return jsonify(attend_user_select())
            except:
                return jsonify("something worng")
    else:
        return jsonify("it is not a right user"),500


@app.route('/backstage/attend/job_insert',methods=['POST'])
@cross_origin()
def backstage_attend_job_insert():
    token =request.headers['token']
    data=request.get_json()
    try:
        token=jwt.decode(token,secret,algorithms='HS256')
    except:
        return jsonify("it is not a right user"),500
    
    email=token['user']
    date=data['date']
    start_work=data['start_work']
    off_work=data['off_work']

    user_name=request.headers['user_name']
    if verity_user_token(email,user_name):
        email=data['email']
        try:
            insert_attend_table(date,email,start_work,off_work)
            return jsonify("success")
        except:
            return jsonify("insert error")
    else:
        return jsonify("it is not a right user"),500








@app.route('/', methods=['GET', 'POST'])
@cross_origin()
def lobby():
    # 驗證是否為post
    print("login/verity/user--------------------------------")
    if request.method == 'POST':
        data = request.get_json()  # 拿取json
        password_verify = data['password_verify']
        email_verify = data['email_verify']
        # print(verity_user(email_verify,password_verify))
        confirm = verity_user(email_verify, password_verify)
        if confirm:
            token = jwt.encode({"user": email_verify},
                               secret, algorithm='HS256')
            dic = {
                'token': token,
                'user_name': confirm[1]
            }
            return jsonify(dic), 200
        return jsonify('please enter right'), 403
    return jsonify('you are not post'), 403

print('__file__={0:<35} | __name__={1:<20} | __package__={2:<20}'.format(__file__,__name__,str(__package__)))
if __name__ == '__main__':
    
    # 跨域請求套件
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
    cors = CORS(app, resources={r"/*": {"origins": "*"}})







        

