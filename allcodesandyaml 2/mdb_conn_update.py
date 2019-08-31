from pymongo import MongoClient
from Temperature_sensor_sim import Temperature_sensor_sim as TS
from Light_sensor_sim import Light_sensor_sim as LS
from Humid_sensor_sim import Humid_sensor_sim as HS
import datetime as dt
import time
import yaml
import re

class mdb_conn_update ():
    
      def __init__(self, config_file):
          self.config_file = config_file

      def read_yaml(self, config_fname) :
          with open(config_fname, 'r' ) as f :
              params = yaml.load(f)
          self.params = params
          
      def sensor_reading_update (self) :
          self.read_yaml(self.config_file)
         # print (self.params)
          
          host = self.params['HOST']
          db_name = self.params['DB_NAME']
          collection_name_added = self.params['collection_name_added']
          collection_name_reading = self.params['collection_name_reading']
          refresh_rate = self.params['REFRESH_RATE']
          #host = 'mongodb://root:root123@ds133275.mlab.com:33275/smartagdatabase'
          #db_name = 'smartagdatabase'
          #collection_name_added = 'sensor_added'
          #collection_name_reading = 'sensor_reading'

          T_sense = TS("T1")
          H_sense = HS("H1")
          L_sense = LS("L1")

          connection = MongoClient(host)

          collection_added = connection[db_name][collection_name_added]
          collection_reading = connection[db_name][collection_name_reading]

          while True :
              print("Updating Sensor Table .........")
              for docs in collection_added.find({"sensor_status": "A"}) :
                  sensor_name = docs['sensor_name']
                  sensor_type = docs['sensor_type']
                  sensor_id = str(docs['_id'])
                  #print("new sensor id",s)
                  if(sensor_type == 'L') :
                     L_sense.update_sensor()
                     sensor_reading = L_sense.read_sensor()
                  elif(sensor_type == 'T') :
                     T_sense.update_sensor()
                     sensor_reading = T_sense.read_sensor()
                  else :
                     H_sense.update_sensor()
                     sensor_reading = H_sense.read_sensor()
     
                  collection_reading.insert_one({"sensor_id": sensor_id,"sensor_name": docs["sensor_name"],"sensor_type": docs["sensor_type"],"sensor_status": docs["sensor_status"],"sensor_location": docs["sensor_location"],"sensor_reading": sensor_reading,"created_date" : time.strftime("%Y-%m-%d %H:%M:%S")})
              time.sleep( refresh_rate )
          connection.close()
          
DB_update = mdb_conn_update('config.yaml')
DB_update.sensor_reading_update()
