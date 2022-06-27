
import unittest
import json
from flask.json import jsonify

from werkzeug.wrappers import response
from flask_register import app,check_user
import json


class TestLogin(unittest.TestCase):
    """定義測試案例"""
    
    # 測試程式碼執行之前呼叫 (方法名固定)
    def setUp(self):
        """在執行具體的測試方法前 先被呼叫"""
        # 可以使用python的http標準客戶端進行測試
        # urllib  urllib2  requests

        # app.config['TESTING'] = True  # 指定app在測試模式下執行
        app.testing = True   # 指定app在測試模式下執行。 (測試模式下,檢視中的意外異常可以正常列印顯示出來)
        # 使用flask提供的測試客戶端進行測試 (Flask客戶端可以模擬傳送請求)
        self.client = app.test_client()
        self.headers={'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiemE5NjM0NkBnbWFpbC5jb20ifQ.wjA1IG-B9kf3DRf-WttKBIuP9PAa0MXcz_8h950Evjg'
                    , 'user_name': ["chris " ,"hamsworl"]}
    
    # 測試程式碼。 (方法名必須以"test_"開頭)
    def test_true_name_password(self):
        """測試/(login) 使用者名稱和密碼完整"""
        # 完整測試
        response = self.client.post("/", data=json.dumps({"email_verify": "za96346@gmail.com"
                                                        ,"password_verify":"aa20010722"})
                                                        ,content_type='application/json')

        self.assertEqual(response.json, self.headers)
        self.assertEqual(response.status_code, 200)

    def test_empty_name_password(self):
        """測試/(login) 空的使用者名稱和密碼"""
        # 空帳密測試
        response = self.client.post("/", data=json.dumps({"email_verify": ""
                                                        ,"password_verify":""})
                                                        ,content_type='application/json')
        self.assertEqual(response.json,"please enter right")
        self.assertEqual(response.status_code, 403)

    def test_get_methods_to_name_password(self):
        """測試/(login) 使用get methods"""

        response = self.client.get("/", data=json.dumps({"email_verify": ""
                                                        ,"password_verify":""})
                                                        ,content_type='application/json')
        self.assertEqual(response.json,"you are not post")
        self.assertEqual(response.status_code, 403)
    def test_wrong_email_and_password_to_name_password(self):
        """測試/(login) 錯誤的帳號密碼"""
        
        response = self.client.post("/", data=json.dumps({"email_verify": "hufhuwef"
                                                        ,"password_verify":"32r13edf"})
                                                        ,content_type='application/json')
        self.assertEqual(response.json,"please enter right")
        self.assertEqual(response.status_code, 403)

class TestCheckUserToken(unittest.TestCase):
    # 測試程式碼執行之前呼叫 (方法名固定)
    def setUp(self):
        """在執行具體的測試方法前 先被呼叫"""
        # 可以使用python的http標準客戶端進行測試
        # urllib  urllib2  requests

        # app.config['TESTING'] = True  # 指定app在測試模式下執行
        app.testing = True   # 指定app在測試模式下執行。 (測試模式下,檢視中的意外異常可以正常列印顯示出來)
        # 使用flask提供的測試客戶端進行測試 (Flask客戶端可以模擬傳送請求)
        self.client = app.test_client()
        self.headers={'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiemE5NjM0NkBnbWFpbC5jb20ifQ.wjA1IG-B9kf3DRf-WttKBIuP9PAa0MXcz_8h950Evjg'
                    , 'user_name': ["chris ,hamsworl"]}
        self.wrong_headers={'token': 'eyJ0eXAiOiJKV1QiLCJhttbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiemE5NjM0NkBnbWFpbC5jb20ifQ.wjA1IG-B9kf3DRf-WttKBIuP9PAa0MXcz_8h950Evjg'
                    , 'user_name': ["chrtis ,hamswtorl"]}
    def test_right_token_user_to_backstage_check(self):
        """測試backstage/check 正確帶入token user_name"""
        response=self.client.post("/backstage/check",headers=self.headers)
        self.assertEqual(response.json,"success")
        self.assertEqual(response.status_code,200)
    def test_wrong_token_user_to_backstage_check(self):
        """測試backstage/check 錯誤帶入token user_name"""
        response=self.client.post("/backstage/check",headers=self.wrong_headers)
        self.assertEqual(response.json,"it is not a right user")
        self.assertEqual(response.status_code,500)        

class TestBackstageReport(unittest.TestCase):
    # 測試程式碼執行之前呼叫 (方法名固定)
    def setUp(self):
        """在執行具體的測試方法前 先被呼叫"""
        # 可以使用python的http標準客戶端進行測試
        # urllib  urllib2  requests

        # app.config['TESTING'] = True  # 指定app在測試模式下執行
        app.testing = True   # 指定app在測試模式下執行。 (測試模式下,檢視中的意外異常可以正常列印顯示出來)
        # 使用flask提供的測試客戶端進行測試 (Flask客戶端可以模擬傳送請求)
        self.client = app.test_client()
        self.headers={'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiemE5NjM0NkBnbWFpbC5jb20ifQ.wjA1IG-B9kf3DRf-WttKBIuP9PAa0MXcz_8h950Evjg'}
        self.wrong_headers={'token': 'eyJ0eXAiOiJKV1QiLCJhttbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiemE5NjM0NkBnbWFpbC5jb20ifQ.wjA1IG-B9kf3DRf-WttKBIuP9PAa0MXcz_8h950Evjg'}
        self.data={'date':'2022-04-02','user_name':["chrtis ,hamswtorl"]}
    def test_wrong_to_backstage_report_all(self):
        """測試backstage/report/total_deal 錯誤帶入"""
        response=self.client.post("/backstage/report/total_deal",data=json.dumps(self.data),headers=self.wrong_headers,content_type='application/json')
        self.assertEqual(response.json,"it is not a right user")
        self.assertEqual(response.status_code,500)

        """測試backstage/report/top10_type 錯誤帶入"""
        response=self.client.post("/backstage/report/top10_type",data=json.dumps(self.data),headers=self.wrong_headers,content_type='application/json')
        self.assertEqual(response.json,"it is not a right user")
        self.assertEqual(response.status_code,500)

        """測試backstage/report/dicount 錯誤帶入"""
        response=self.client.post("/backstage/report/dicount",data=json.dumps(self.data),headers=self.wrong_headers,content_type='application/json')
        self.assertEqual(response.json,"it is not a right user")
        self.assertEqual(response.status_code,500)

        """測試backstage/report/time_range 錯誤帶入"""
        response=self.client.post("/backstage/report/time_range",data=json.dumps(self.data),headers=self.wrong_headers,content_type='application/json')
        self.assertEqual(response.json,"it is not a right user")
        self.assertEqual(response.status_code,500)

        """測試backstage/tail 錯誤帶入"""
        response=self.client.post("/backstage/report/tail",data=json.dumps(self.data),headers=self.wrong_headers,content_type='application/json')
        self.assertEqual(response.json,"it is not a right user")
        self.assertEqual(response.status_code,500)

        """測試backstage/report/pay_methods 錯誤帶入"""
        response=self.client.post("/backstage/report/pay_methods",data=json.dumps(self.data),headers=self.wrong_headers,content_type='application/json')
        self.assertEqual(response.json,"it is not a right user")
        self.assertEqual(response.status_code,500)



class TestBackstageReportCheckUser(unittest.TestCase):
    # 測試程式碼執行之前呼叫 (方法名固定)
    def setUp(self):
        """在執行具體的測試方法前 先被呼叫"""
        # 可以使用python的http標準客戶端進行測試
        # urllib  urllib2  requests

        # 使用flask提供的測試客戶端進行測試 (Flask客戶端可以模擬傳送請求)
        self.date="2022-04-02"
        self.index=0
        self.email="za96346@gmail.com"
        self.user_name=["chrtis ,hamswtorl"]
        self.wrong_email="ImWrongEmail@gmail.com"
        self.wrong_user_name=["Wrong,user_name"]
        self.check_user=check_user(self.wrong_email,self.wrong_user_name,self.date,self.index)




if __name__ == '__main__':
    unittest.main()  # 進行測試
    







