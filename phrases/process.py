file_name = "imagestext.xlsx"
sheet = "Arkusz1"
import numpy as np
import pandas as pd

from azure_mine import authenticate_client, key_phrase_extraction

client = authenticate_client()

df = pd.read_excel(io=file_name, sheet_name=sheet, dtype=str)
print()
i=0
result = []
for part in np.array_split(df['Treść'], len(df['Treść'].tolist())/5):
        with open('your_file.txt', 'a') as f:
            for line in key_phrase_extraction(client, part):
                try:
                    if len(line) > 2: 
                        f.write(f"\n{line}")
                except:
                    continue
