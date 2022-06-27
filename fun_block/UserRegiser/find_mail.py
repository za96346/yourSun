
import email.message
import imaplib
import os
import email
from zipfile import ZipFile
import tempfile
from zip import zip_list
from send_email import send


key='lpqcbsaknipxtxsw'



def decode_str(s):
    try:
        subject = email.header.decode_header(s)
    except:
        # print('Header decode error')
        return None 
    sub_bytes = subject[0][0] 
    sub_charset = subject[0][1]
    #print("sub_bytes:",sub_bytes)
    #print("sub_charset:",sub_charset)
    if None == sub_charset:
        subject = sub_bytes
    elif 'unknown-8bit' == sub_charset:
        subject = str(sub_bytes, 'utf8')
    else:
        subject = str(sub_bytes, sub_charset)
    return subject 

def find():
    with imaplib.IMAP4_SSL(host="imap.gmail.com", port=imaplib.IMAP4_SSL_PORT) as mailserver:

        print()
        #login to mailbox
        print("mailserver",mailserver)
        print()
        username = "za96346@gmail.com"
        password = key
        res_code,response=mailserver.login(username, password)
        print("loggin res_code",res_code)
        print("loggin response",response)
        print()
        print("------------------------------------")
        
        
        status ,data=mailserver.list()
        for i in data:
            print(i.decode('utf-8').split('"')[-2])
        resp_code, mail_count = mailserver.select(mailbox="INBOX", readonly=True)
        mailserver.select()
        #選擇inbox這個 direction 
        print("--------------------------------")   
        resp_code, mails = mailserver.search(None, '(OR (TO "posap01@prox.com.tw") (FROM "posap01@prox.com.tw"))')
        print("Mail IDs : {}\n".format(mails[0].decode().split()))
        mail_context_list=[]
        a=0
        for mail_id in mails[0].decode().split()[:]:
            print("================== Start of Mail [{}] ====================".format(mail_id))
            try:
                resp_code, mail_data = mailserver.fetch(mail_id, '(RFC822)') ## Fetch mail data.
                message = email.message_from_bytes(mail_data[0][1]) ## Construct Message from mail data
                #print(mail_data[0][1])
                
                for part in message.walk():
                    
                    print("From",email.utils.parseaddr(part.get('From'))[1])
                    print("From_Who:",decode_str(part.get('From')))
                    print("To: ",email.utils.parseaddr(part.get('To'))[1])
                    print("Date: ",decode_str(part.get('Date')))
                    print("Bcc: ",decode_str(part.get('Bcc')))
                    print("subject: ",decode_str(part.get('Subject')))

                    if not part.is_multipart():
                    
                        # 如果ture的话内容是没用的
                        fileName = part.get_filename()  

                        
                        if fileName:
                            #print(part.get_payload(decode=True))
                            #payload 是2禁制

                            #創建臨時位置去存取
                            tempfile_path = tempfile.NamedTemporaryFile().name
                            filePath=tempfile_path
                            #filePath = os.path.join(r"/Users/admin/Downloads/code/fun_block/file", fileName)

                            #判斷如果臨時路徑裡的檔案沒有 就寫入payload
                            if not os.path.isfile(filePath):
                                fp = open(filePath, 'wb')
                                fp.write(part.get_payload(decode=True))
                                fp.close()
                                print( "attachement is downloaded!")
                            else:
                                print ("file is already exist!")
                            #判斷如果臨時路徑底下有檔案 以及 副檔名為.zip
                            if os.path.isfile(filePath) and fileName.find('.zip')!=-1:
                                tempfile_path2 = tempfile.NamedTemporaryFile().name
                                #使用g 裡面的function zip_list(file_path,file_live)
                                #並且傳入兩個位置給他
                                #寫入成功 return True =>send email
                                #寫入失敗return false=>send email
                                result,date=zip_list(filePath,tempfile_path2)
                                if date!="is in database":
                                    
                                    if result!=0:
                                        mail_context_list.append([mail_id,result,"success",date])
                                        #send(mail_id,result,"success",date)
                                    else:
                                        mail_context_list.append([mail_id,result,"fail",date])
                                        #send(mail_id,result,"fail",date)
                
            except:
                print("this mail can not read")
        if mail_context_list:
            send(mail_context_list)



        print("------------------------------------")
        print()
        mailserver.close()
        res_code,response=mailserver.logout()
        print("loggout res_code",res_code)
        print("loggout response",response)

    

if __name__=="__main__":
    find()           
                


            



"""
        print("Body : ")
        for part in message.walk():
            print(part)
            if part.get_content_type() == "text/plain":
                body_lines = part.as_string().split("\n")
                print("\n".join(body_lines)) ### Print first 12 lines of message

        print("================== End of Mail [{}] ====================\n".format(mail_id))

    ############### Display Few Messages for given Directory #############



    status, directories = mailserver.list(directory="[Gmail]")
    print("list_status",status)
    print("list_directories",directories)
    print("這是要gmail direction")
    for directory in directories:
        print(directory.decode())

        directory_name = directory.decode().split('"')[-2]
        directory_name = '"' + directory_name + '"'
        m_code, mail_count = mailserver.select(mailbox=directory_name, readonly=True)
        print(directory_name,mail_count)

    print("這是原始 direction")
    status, directories = mailserver.list()
    for directory in directories:
        print(directory.decode())
    print("這是hi/h direction")

    #搭配萬用字
    status, directories = mailserver.list(pattern="hi/h*")
    for directory in directories:
        print(directory.decode())
"""





