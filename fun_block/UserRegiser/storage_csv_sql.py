import mysql.connector


# create table (because the database 'user' is exits)
def create_all_table(cursor):
    cursor.execute("use `user_register_data`;")
    cursor.execute(
        f"create table`dicount`(`date` varchar(10),`折扣優惠` varchar(13),`數量` int,`金額` int ,primary key(`date`,`折扣優惠`));")
    cursor.execute(
        f"create table`pay_methods`(`date` varchar(10),`付款方式` varchar(13),`數量` int,`金額` int,`淨額` int ,primary key(`date`,`付款方式`));")
    cursor.execute(
        f"create table`total_deal`(`date` varchar(10),`總交易` varchar(13),`數量` int,`金額` int ,primary key(`date`,`總交易`));")
    cursor.execute(
        f"create table`top10_type`(`date` varchar(10),`銷售類別金額前10名` varchar(13),`數量` int,`金額` int ,primary key(`date`,`銷售類別金額前10名`));")
    cursor.execute(
        f"create table`time_range`(`date` varchar(10),`時段` varchar(13),`數量` int,`金額` int ,primary key(`date`,`時段`));")
    cursor.execute(
        f"create table`tail`(`date` varchar(10),`銷售商品數量top10` varchar(20),`數量` int,`金額` int ,primary key(`date`,`銷售商品數量top10`));")
def drop_all_table(cursor):
    cursor.execute("use `user_register_data`;")
    cursor.execute("drop table `dicount`;")
    cursor.execute("drop table `pay_methods`;")
    cursor.execute("drop table `total_deal`;")
    cursor.execute("drop table `top10_type`;")
    cursor.execute("drop table `time_range`;")
    cursor.execute("drop table `tail`;")

def select_from_database(cursor):
    a=['dicount','pay_methods','total_deal','top10_type','time_range']
    for i in a:
        cursor.execute(f"select * from `{i}`;")
        show=cursor.fetchall()
        print(show)
    
# set_up connect
def __init__(status):
    connection = mysql.connector.connect(
        auth_plugin='mysql_native_password',
        host='127.0.0.1',
        port='3306',
        user='root',
        password='siou0722'
    )
    if status==1:
        cursor = connection.cursor()
        #call create table func
        drop_all_table(cursor)
        create_all_table(cursor)
        

    elif status==2:
        return connection
if __name__=="__main__":
    __init__(1)

#insert to table
def Insert_table_dicount(date,dicount,amount,total_price):
    connection=__init__(2)
    cursor=connection.cursor()
    cursor.execute("use `user_register_data`;")
    cursor.execute(f"insert into `dicount` value('{date}','{dicount}',{amount},{total_price});")
    connection.commit()
    
def Insert_table_pay_methods(date,pay_methods,amount,total_price,last_price):
    connection=__init__(2)
    cursor=connection.cursor()
    cursor.execute("use `user_register_data`;")
    cursor.execute(f"insert into `pay_methods` value('{date}','{pay_methods}',{amount},{total_price},{last_price});")
    connection.commit()

def Insert_table_total_deal(date,total_deal,amount,total_price):
    connection=__init__(2)
    cursor=connection.cursor()
    cursor.execute("use `user_register_data`;")
    cursor.execute(f"insert into `total_deal` value('{date}','{total_deal}',{amount},{total_price});")
    connection.commit()

def Insert_table_top10_type(date,top10_type,amount,total_price):
    connection=__init__(2)
    cursor=connection.cursor()
    cursor.execute("use `user_register_data`;")
    cursor.execute(f"insert into `top10_type` value('{date}','{top10_type}',{amount},{total_price});")
    connection.commit()

def Insert_table_time_range(date,time_range,amount,total_price):
    connection=__init__(2)
    cursor=connection.cursor()
    cursor.execute("use `user_register_data`;")
    cursor.execute(f"insert into `time_range` value('{date}','{time_range}',{amount},{total_price});")
    connection.commit()

def Insert_table_tail(date,tail,amount,total_price):
    connection=__init__(2)
    cursor=connection.cursor()
    cursor.execute("use `user_register_data`;")
    cursor.execute(f"insert into `tail` value('{date}','{tail}',{amount},{total_price});")
    connection.commit()


    