import pandas as pd

file_path = "Effectif Ingémédia 2025-2026.xlsx"
try:
    df = pd.read_excel(file_path)
    print("Columns:", df.columns.tolist())
    print("Shape:", df.shape)
    print("First row:", df.iloc[0].to_dict())
except Exception as e:
    print(f"Error: {e}")
