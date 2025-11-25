import pandas as pd
from app.database import SessionLocal, engine
from app.models import Etudiant, Base
import sys
import os

# Ensure we can import from app
sys.path.append(os.getcwd())

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

def import_students(file_path):
    db = SessionLocal()
    try:
        df = pd.read_excel(file_path)
        
        # Columns mapping based on check_excel.py output:
        # 'Adresse mail USTV' -> mail
        # 'Nom Patronymique' -> nom
        # 'Prénom' -> prenom
        # 'Code Etudiant' -> numero_etudiant
        
        count = 0
        for index, row in df.iterrows():
            numero_etudiant = str(row['Code Etudiant'])
            mail = row['Adresse mail USTV']
            nom = row['Nom Patronymique']
            prenom = row['Prénom']

            if pd.isna(mail):
                print(f"Skipping student {numero_etudiant} because email is null.")
                continue
        

            # Check if student already exists
            existing_student = db.query(Etudiant).filter(Etudiant.numero_etudiant == numero_etudiant).first()
            
            if existing_student:
                print(f"Student {numero_etudiant} already exists. Skipping.")
                continue
            
            new_student = Etudiant(
                numero_etudiant=numero_etudiant,
                mail=mail,
                nom=nom,
                prenom=prenom,
                soiree=False # Default value
            )
            db.add(new_student)
            print(f"Imported student {numero_etudiant}: {nom} {prenom} {mail}")
            count += 1
        
        db.commit()
        print(f"Successfully imported {count} students.")
        
    except Exception as e:
        print(f"An error occurred: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    file_path = "Effectif Ingémédia 2025-2026.xlsx"
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
    else:
        import_students(file_path)

