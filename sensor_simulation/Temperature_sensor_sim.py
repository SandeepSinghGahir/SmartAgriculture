import numpy as np
import datetime as dt
import time


# based on inputs from : https://homeguides.sfgate.com/ideal-humidity-level-greenhouse-77050.html


class Temperature_sensor_sim ():
    
      def __init__(self, sensorid):
          self.sensorid = sensorid
          self.start_sensor = dt.datetime.now()
          self.sensor_output = 0

      def update_sensor(self):
          total_time_elapsed = (dt.datetime.now() - self.start_sensor).seconds
          amplitude_distortion = np.random.randint(1,99)
          self.sensor_output = 60 - (abs(amplitude_distortion * 1e14) * np.sin(np.pi * float(total_time_elapsed))/0.37)
          #self.sensor_output = sensor_output/120

      def read_sensor(self):
          return self.sensor_output


#H1 = Humid_sensor_sim ("H1")
#time.sleep(1)
#H1.update_sensor()
#print (H1.read_sensor())