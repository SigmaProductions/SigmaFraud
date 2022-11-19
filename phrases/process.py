file_name = "imagestext.xlsx"
sheet = "Arkusz1"

import pandas as pd

from azure import authenticate_client, key_phrase_extraction

client = authenticate_client()

df = pd.read_excel(io=file_name, sheet_name=sheet, dtype=str)
processed=filter(lambda v: v != "" , df["Treść"])

i=0
print(key_phrase_extraction(client, processed[0]))
for p in processed:
    if(not isinstance(p,str)):
        continue
    f = open(f"data/{i}.txt", "a", encoding="utf-8")
    f.write(p)
    f.close()
    i+=1
