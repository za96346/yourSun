import package.xlrd as xlrd
import csv
import storage_csv_sql
from datetime import datetime
data_list = []
k = 0
l = 0
j = 0

def select(data_list):
    discount = ['全品項9折', '員工價五折', '外送-95折', '平台-滿百9折', '打折差價折讓', '折讓', '鄰居８折', '醫護人員-9折', '單品9折', '平台-滿百95折', '熊好券-滿百9折', '贈品',
                '外送-9折', '勝王排隊9折', '勝王發票折10元', '加料半價', '奶茶節護照-全品項9折', '奶茶節護照-任兩件7折', '奶茶護照-加料折扣15元', '奶茶護照-加料折扣10元', '奶茶護照-加料折扣20元']
    pay_methods = ['Foodpanda', 'LINE Pay', 'NCCC','UberEats','街口支付'
                  ,'台灣pay', '現金', '熊好券']
    pay_methods_dicount=[0.65,0.98,0.9835,0.65,0.98]
    total_deal = ['內用', '外帶', '外送', '自取']
    top10_type = ['好農鮮乳坊', '手做薰香茶', '羽上嚴選茶', '水果王國', '咖啡甘醇', '店家推薦', '手沖/冷泡台灣高山茶',
                  '遇上后甜蜜', '奶茶節護照', '羽上周邊', '經典加料', '微醺創飲', '其他', '職人手做甜點', '酸甜氣泡飲', '鍋煮厚歐蕾']
    time_range = ['04:00-05:00','05:00-06:00','06:00-07:00','07:00-08:00'
    ,'08:00-09:00','09:00-10:00','10:00-11:00','11:00-12:00','12:00-13:00'
    ,'13:00-14:00','14:00-15:00','15:00-16:00','16:00-17:00','17:00-18:00'
    ,'18:00-19:00','19:00-20:00','20:00-21:00','21:00-22:00','22:00-23:00'
    ,'23:00-00:00','00:00-01:00','01:00-02:00','02:00-03:00','03:00-04:00']
    statistics = ['總來客數', '總銷售商品數', '商品平均售價',
                  '”每單平均消費額', '每單平均商品數', '每人平均消費額', '每人平均每人平均商品數']

    tail = ['(L', '(M', '袋', '吸', '(s']
    store_name = data_list[1]

    #date=datetime.strptime(data_list[5][0:10], "%Y-%m-%d").date()


    date = data_list[4][0:10]
    print("這裡是後端要傳進去資料庫的日期", date)
    print("這裡是後端要傳進去資料庫的日期", type(date))

    # if date1==date2:
    #storage_csv_sql.__init__(1)
    # print(store_name,date1,date2)

    for i in range(0, len(data_list)):
        for j in tail:
            if str(data_list[i]).find(j) != -1:
                storage_csv_sql.Insert_table_tail(
                    date, data_list[i], int(data_list[i+1]), data_list[i+2])
        if data_list[i] in discount:
            storage_csv_sql.Insert_table_dicount(
                date, data_list[i], int(data_list[i+1]), data_list[i+2])
        if data_list[i] in pay_methods:
            if data_list[i] == "現金":
                storage_csv_sql.Insert_table_pay_methods(
                    date, data_list[i], 0, data_list[i+1],data_list[i+1])
            else:
                find_index=pay_methods.index(data_list[i])
                if(find_index<=4):
                  storage_csv_sql.Insert_table_pay_methods(
                      date, data_list[i], int(data_list[i+1]), data_list[i+2],pay_methods_dicount[find_index]*data_list[i+2])
                else:
                    storage_csv_sql.Insert_table_pay_methods(
                    date, data_list[i],data_list[i+1] , data_list[i+2],data_list[i+2])
        if data_list[i] in total_deal:
            storage_csv_sql.Insert_table_total_deal(
                date, data_list[i], int(data_list[i+1]), data_list[i+2])
        if data_list[i] in top10_type:
            storage_csv_sql.Insert_table_top10_type(
                date, data_list[i], int(data_list[i+1]), data_list[i+2])
        if data_list[i] in time_range:
            storage_csv_sql.Insert_table_time_range(
                date, data_list[i], int(data_list[i+2]), data_list[i+1])
        # if data_list[i] in statistics:
            # print(data_list[i],data_list[i+1])
    return True,date
    print("/backstage/report/upload--------------------------------")
    

def data_split_xls(tempfile_path):


    data_list = []
    k = 0
    l = 0
    j = 0
    data = xlrd.open_workbook(tempfile_path)
    file=data.sheet_by_index(0)
    case=["rptNewBusinessDay","RptCustomerHR"]
    if data.sheet_names()[0] not in case:
        print('not in case')
        return False,tempfile_path
    
    
    print(file.ncols)
    for i in range(0,file.nrows):
        for j in range(0, len(file.row_values(i))):
            if file.row_values(i)[j] != "":
                #print(file.row_values(i)[j])
                data_list.append(str(file.row_values(i)[j]))
     # 把數字後面的點 刪掉 以及轉換成int
    #print(data_list)
    for i in range(0, len(data_list)):
        #print(data_list[i])
        if data_list[i].find('.0') != -1:
            data_list[i] = data_list[i].replace('.0', '')
            data_list[i] = int(data_list[i].replace(',', ''))
        # if len(data_list[i])
        elif data_list[i].find('.') != -1:
            data_list[i] = data_list[i].replace('.', '')  # 把數字中有點 刪掉
            data_list[i] = int(data_list[i].replace(
                ',', ''))  # 把str(num)變成int(num)


    return select(data_list)
#data_split_xls()

def data_split(tempfile_path):
    # 開啟csv檔然後讀取以及提取有效字串到陣列
    #'/Users/admin/Downloads/code/fun_block/UserRegiser/x_c/33.csv'

    data_list = []
    k = 0
    l = 0
    j = 0
    
    with open(tempfile_path, encoding="UTF-8") as f:
        data = csv.reader(f)
        for i in data:
            #print(i)
            for j in range(0, len(i)):
                if i[j] != "":
                    # print(i[j])
                    data_list.append(i[j])
    f.close()
    print(data_list)
    # 把數字後面的點 刪掉 以及轉換成int
    for i in range(0, len(data_list)):
        #print(data_list[i])
        if data_list[i].find('.0') != -1:
            data_list[i] = data_list[i].replace('.0', '')
            data_list[i] = int(data_list[i].replace(',', ''))
        # if len(data_list[i])
        elif data_list[i].find('.') != -1:
            data_list[i] = data_list[i].replace('.', '')  # 把數字中有點 刪掉
            data_list[i] = int(data_list[i].replace(
                ',', ''))  # 把str(num)變成int(num)


    select(data_list)
if __name__=="__main__":
    print(data_list)
    #data_split(r'/Users/admin/Desktop/12.csv')
    data_split_xls(r'/Users/admin/Downloads/0402.xls')
"""

"""
