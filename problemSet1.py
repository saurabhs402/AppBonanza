import re

text = '{"orders":[{"id":1},{"id":2},{"id":3},{"id":4},{"id":5},{"id":6},{"id":7},{"id":8},{"id":9},{"id":10},{"id":11},{"id":648},{"id":649},{"id":650},{"id":651},{"id":652},{"id":653}],"errors":[{"code":3,"message":"[PHP Warning #2] count(): Parameter must be an array or an object that implements Countable (153)"}]}'

# Define the regex pattern
pattern = r'"id":(\d+)|"code":(\d+)'

# Find all matches in the text
matches = re.findall(pattern, text)

'''
[
('1', ''), ('2', ''), ('3', ''), ('4', ''), ('5', ''), ('6', ''), ('7', ''), 
('8', ''), ('9', ''), ('10', ''), ('11', ''), ('648', ''), ('649', ''), ('650', ''),
 ('651', ''), ('652', ''), ('653', ''), ('', '3')
]
'''
# matches is list of tuple first index conists of id value and if id is absent it would check for code pattern in string and store code value in the second index 
ids = [match[0] for match in matches if match[0]]
error_codes = [match[1] for match in matches if match[1]]

output = ids + error_codes

print(output)
