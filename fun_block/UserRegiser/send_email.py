from os import name
import smtplib
import email

key='lpqcbsaknipxtxsw'
from_pre="za96346@gmail.com"
to_pre="za96346@gmail.com"
def send(mail_context_list):

    msg=email.message.EmailMessage()
    msg['From']=from_pre#"寄件人"
    msg['To']=to_pre#"收件人"
    msg['Subject']="資料寫入"
    text_list=""
    for i in mail_context_list:
        mail_id=i[0]
        result=i[1]
        success_fail=i[2]
        date=i[3]
        text_list=text_list+'<p>date: {}    mail_id: {}   ,result: {}   ,自動化寫入: {} \n</p>'.format(date,mail_id,result,success_fail)
                #寄件純文字的內容
    #msg.set_content(text_list)
    #寄送比較多的內容
    msg.add_alternative(f"{text_list}<button><a style=\"text-decoration:none;\" href=\"http://172.20.10.14:3000\">登入後台</a></button>",subtype="html")
    #連線到smtp server

    #可以到網路上收尋
    server=smtplib.SMTP_SSL("smtp.gmail.com",465)
    server.login(from_pre,key)#("帳號","密碼")
    server.send_message(msg)
    server.close()
if __name__=="__main__":
    send(1,1,1,1)