import csv
from app.database import SessionLocal
from app import models

def export_inscrits():
    db = SessionLocal()
    try:
        # Query students registered for the soiree
        inscrits = db.query(models.Etudiant).filter(models.Etudiant.soiree == True).all()
        
        filename = "inscrits_soiree.csv"
        
        with open(filename, mode='w', newline='', encoding='utf-8') as file:
            writer = csv.writer(file)
            # Write header
            writer.writerow(["Nom", "Prénom", "Mail"])
            
            # Write student data
            for etudiant in inscrits:
                writer.writerow([etudiant.nom, etudiant.prenom, etudiant.mail])
            
            # Write empty line and total
            writer.writerow([])
            writer.writerow(["Total inscrits", len(inscrits)])
            
        print(f"Export terminé : {filename} ({len(inscrits)} étudiants)")
        
    finally:
        db.close()

if __name__ == "__main__":
    export_inscrits()
