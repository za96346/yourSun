# coding: utf-8
import os
import zipfile
from py_total import data_split_xls
from py_sql_class import check_file_insert_table

# zipfile example
def zip_list(file_path,file_live):
    zf = zipfile.ZipFile(file_path, 'r')
    
    file_name_box=[]
    dir_name=zf.namelist()[0][0:10]
    zf_list=zf.namelist()
    #zf.extractall(file_live)
    print("dir_name",dir_name)
    if check_file_insert_table(dir_name):
        return True,"is in database"
    for i in range(1,len(zf_list)):
        file_name_box.append(zf_list[i])
        print(zf_list[i])
    print("file name box",file_name_box)

    zf.extractall(file_live)
    right_times=0
    for i in file_name_box:
        path=os.path.join(file_live,i)
        
        try:
            status,date=data_split_xls(path)
            if status:
                right_times+=1
            
        except:
            pass
    return right_times,dir_name

        


if __name__=="__main__":
    file_path = r"/Users/admin/Downloads/code/fun_block/UserRegiser/file/2022-04-02.zip"
    file_live=r"/Users/admin/Downloads/code/fun_block/UserRegister/file"
    zip_list(file_path,file_live)
