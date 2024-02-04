import os
import json
count_n = 0 #normal
count_p = 0 #poor quality
count_a = 0 #anomaly
#test intra
for j_file in os.listdir('E:/datasetzs/SPRSound-main/test_json/inter_test_json/') : 
  f = open('E:/datasetzs/SPRSound-main/test_json/inter_test_json/' + j_file )
  data = json.load(f)
  class_name = data.get('record_annotation')
  if class_name == 'Normal':
      count_n += 1
  elif class_name == 'Poor Quality':
      print(j_file)
      count_p += 1
  else:
      count_a += 1