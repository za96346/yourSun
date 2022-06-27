
from re import template
import mysql.connector


# 創建連線
def __init__():
    connection = mysql.connector.connect(
        auth_plugin='mysql_native_password',
        host='127.0.0.1',
        port='3306',
        user='root',
        password='siou0722'
    )
    return connection
#創建資料庫 創建表單
def create_database(cursor):
    cursor.execute("use `user_register_data`;")
    #cursor.execute("drop table `user`;")
    cursor.execute(
        "create table `user`(`email` varchar(30) primary key,`first_name` varchar(10),`last_name` varchar(10),`phone_number` varchar(12),`sexual` varchar(4),`position` varchar(10),`salary` int,`password` varchar(20));")
    cursor.execute("create table `attend_table`(`date` varchar(10),`email` varchar(20),`start_work` varchar(10),`off_work` varchar(10));")
    cursor.execute("alter table `attend_table` add foreign key (email) references `user`(email);")
    cursor .execute("alter table `attend_table` add primary key(date,email,start_work,off_work);")
    #cursor.execute("show databases;")

#插入表單
def Insert_URform(email,first_name,last_name,phone_number,sexual,position,salary,password):
    #set up connection
    connection=__init__()
    cursor=connection.cursor()
    cursor.execute("use `user_register_data`;")
    #創資料庫 創表單
    #create_database(cursor)
    #user_register_table(cursor)


    cursor.execute("set session sql_mode=NO_ZERO_IN_DATE;")#mysql 5以上的版本要設置date()
    cursor.execute(f'insert into `user` value( "{email}","{first_name}","{last_name}","{phone_number}","{sexual}","{position}",{salary},"{password}");')
    # 會動到資料的指令都要打上connection.commit() 提交到資料庫裡面
    connection.commit()
    cursor.execute("select * from `user`;")
    result=cursor.fetchall()
    cursor.close()
    connection.close()
    print("user/insertform--------------------------------")
    return result
    # 指令執行後要把連線關閉
    #cursor.close()
    #connection.close()

        # for i in cursor.fetchall():
        # print(i)
        # Insert('sdefef','huang','siou','2001-07-22','男生',20010722)

#登入驗證
def verity_user(email_verify,password_verify):
    connection=__init__()
    cursor=connection.cursor()
    cursor.execute("use `user_register_data`;")
    cursor.execute(f"select `email` from `user` where `email`='{email_verify}';")
    find_email=cursor.fetchone()
    print("login/verity/user--------------------------------")
    try:
        if "".join(find_email)==email_verify:
            cursor.execute(f"select `password` from `user` where `email`='{email_verify}';")
            find_password=cursor.fetchone()
            if "".join(find_password)==password_verify:
                cursor.execute(f"select `first_name`,`last_name` from `user` where `email`='{email_verify}';")
                
                return True,cursor.fetchone()
            return False
    except:
        return False

#夾帶token驗證
def verity_user_token(email_verify,user_name):
    connection=__init__()
    cursor=connection.cursor()
    cursor.execute("use `user_register_data`;")
    cursor.execute(f"select `email` from `user` where `email`='{email_verify}';")
    find_email=cursor.fetchone()
    #print("資料庫join前的格式",find_email)
    #print("資料庫join後的格式","".join(find_email))
    print("/verity_user_token--------------------------------")
    try:
        if "".join(find_email)==email_verify:
            cursor.execute(f"select `first_name`,`last_name` from `user` where `email`='{email_verify}';")
            find_user=cursor.fetchone()
            if ",".join(find_user)==user_name:
                return True
            return False
    except:
        return False








def report_pages_dicount(date):
    connection=__init__()
    cursor=connection.cursor()

    cursor.execute("use `user_register_data`;")
    cursor.execute(f"select * from `dicount` where `date`='{date}';")
    data=cursor.fetchall()
    return data

def report_pages_pay_methods(date):
    connection=__init__()
    cursor=connection.cursor()

    cursor.execute("use `user_register_data`;")
    cursor.execute(f"select * from `pay_methods` where `date`='{date}';")
    data=cursor.fetchall()
    return data

def report_pages_tail(date):
    connection=__init__()
    cursor=connection.cursor()

    cursor.execute("use `user_register_data`;")
    cursor.execute(f"select * from `tail` where `date`='{date}';")
    data=cursor.fetchall()
    return data

def report_pages_time_range(date):
    connection=__init__()
    cursor=connection.cursor()

    cursor.execute("use `user_register_data`;")
    cursor.execute(f"select * from `time_range` where `date`='{date}';")
    data=cursor.fetchall()
    return data

def report_pages_top10_type(date):
    connection=__init__()
    cursor=connection.cursor()

    cursor.execute("use `user_register_data`;")
    cursor.execute(f"select * from `top10_type` where `date`='{date}';")
    data=cursor.fetchall()
    return data
def report_pages_total_deal(date):
    connection=__init__()
    cursor=connection.cursor()

    cursor.execute("use `user_register_data`;")
    cursor.execute(f"select * from `total_deal` where `date`='{date}';")
    data=cursor.fetchall()
    print(data)
    return data






def index_main(date):
    connection=__init__()
    cursor=connection.cursor()
    data_list=[]
    date=date[0:7]+"%"
    print(date)
    pay_methods =['Foodpanda', 'LINE Pay', 'NCCC','UberEats','街口支付','台灣pay', '現金', '熊好券']
    for i in pay_methods:
        template_list=[]
        cursor.execute("use `user_register_data`;")
        cursor.execute(f"select sum(`數量`),sum(`金額`),sum(`淨額`) from `pay_methods` where `date` like '{date}' and`付款方式`='{i}';")
        data=cursor.fetchall()
        print(data[0][0])
        template_list.append(date[0:7])
        template_list.append(i)
        if(data[0][0] is None):
            print("事none")
        else:
            
            for j in data:
                #print(j)
                template_list.append(int(j[0]))
                template_list.append(int(j[1]))
                template_list.append(int(j[2]))
            print(template_list)
            data_list.append(template_list)
            print("不是none")
        

    #print(data_list)
    print("/backstage/index/main--------------------------------")
    return data_list
    



def user_bar():
    connection=__init__()
    cursor=connection.cursor()
    cursor.execute("use `user_register_data`;")
    cursor.execute("select `first_name`,`last_name`,`email` from `user`;")
    data=cursor.fetchall()
    
    data_list=[]
    for i in data:
        tem_list=[]
        tem_list.append(i[0])
        tem_list.append(i[1])
        tem_list.append(i[2])
        data_list.append(tem_list)
    print("user_bar-",data_list)
    print("user_bar----------------------------")
    return data_list


def user_main(email):

    connection=__init__()
    cursor=connection.cursor()
    cursor.execute("use `user_register_data`;")
    cursor.execute(f"select * from `user` where `email`='{email}';")
    data=cursor.fetchall()
    tem_list=[]
    for i in range(0,len(data[0])):
        tem_list.append(data[0][i])
    print("user_main-",tem_list)
    print("user_main-----------------------------")
    return tem_list


def user_delete(email):
    connection=__init__()
    cursor=connection.cursor()
    cursor.execute("use `user_register_data`;")
    cursor.execute(f"delete from `user` where `email`='{email}';")
    connection.commit()
    print("user/delete--------------------------------")
    return "success"


def attend_user():
    connection=__init__()
    cursor=connection.cursor()
    cursor.execute("use `user_register_data`;")

def attend_user_select():
    connection=__init__()
    cursor=connection.cursor()
    cursor.execute("use `user_register_data`;")
    cursor.execute("select `first_name`,`last_name`,`email` from `user`;")
    data=cursor.fetchall()

    data_list=[]
    for i in data:
        tem_list=[]
        tem_list.append(i[0])
        tem_list.append(i[1])
        tem_list.append(i[2])
        data_list.append(tem_list)
    print(data_list)

    print("attend_user_select----------------------------")
    return data_list



def insert_attend_table(date,email,start_work,off_work):
    connection=__init__()
    cursor=connection.cursor()
    cursor.execute("use `user_register_data`;")
    cursor.execute(f"Insert into `attend_table` value('{date}','{email}','{start_work}','{off_work}');")
    connection.commit()
    cursor.execute("select * from `attend_table`;")
    data=cursor.fetchall()
    print(data)
    return "success"



def check_file_insert_table(date):
    connection=__init__()
    cursor=connection.cursor()
    cursor.execute("use `user_register_data`;")
    cursor.execute(f"select * from `dicount` where `date`='{date}'")
    data=cursor.fetchall()
    if data:
        #print("file is in the database")
        return True
    else:
        return False
    #print(data)




if __name__=="__main__":

    #insert_attend_table("2022-02-01","za96346@gmail.com","00:00","06:30")
    check_file_insert_table()
    #attend_user_select()
    #user_delete("za346@gmail.com")
    #user_main('za346@gmail.com')
    #user_bar()

    #report_pages_total_deal("2022-03-01")
    #index_main("2022-04-02")
    #print(Insert_URform('abqs2ed3@gmail.com', 'lin', 'su', '0932930873','女生','兼職',180, 'aa20010722'))
    #print(Insert_URform('za96346@gmail.com', 'huang', 'siou', '0923475618','男生','正職',24000, 'aa20010722'))