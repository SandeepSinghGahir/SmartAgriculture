from pymongo import MongoClient
from Temperature_sensor_sim import Temperature_sensor_sim as TS
from Light_sensor_sim import Light_sensor_sim as LS
from Humid_sensor_sim import Humid_sensor_sim as HS
import datetime as dt

host = 'mongodb://root:root123@ds133275.mlab.com:33275/smartagdatabase'
db_name = 'smartagdatabase'
collection_name_added = 'sensor_added'
collection_name_reading = 'sensor_reading'

T_sense = TS("T1")
H_sense = HS("H1")
L_sense = LS("L1")

connection = MongoClient(host)

collection_added = connection[db_name][collection_name_added]
collection_reading = connection[db_name][collection_name_reading]

for docs in collection_added.find({"sensor_status": "A"}) :
    sensor_name = docs['sensor_name']
    sensor_type = docs['sensor_type']
    
    print( sensor_type)
    if(sensor_type == 'L') :
        L_sense.update_sensor()
        sensor_reading = L_sense.read_sensor()
    elif(sensor_type == 'T') :
        T_sense.update_sensor()
        sensor_reading = T_sense.read_sensor()
    else :
        H_sense.update_sensor()
        sensor_reading = H_sense.read_sensor()
     
    collection_reading.insert_one({"sensor_name": docs["sensor_name"],"sensor_type": docs["sensor_type"],"sensor_status": docs["sensor_status"],"sensor_location": docs["sensor_location"],"sensor_reading": sensor_reading,"created_date" : dt.datetime.now()})
 

connection.close()
