try:
    from app import schemas

    print("✓ Module schemas importé avec succès")
    print(f"✓ Attributs disponibles: {dir(schemas)}")
    print(f"✓ Entreprise existe: {hasattr(schemas, 'Entreprise')}")
    print(f"✓ Alumni existe: {hasattr(schemas, 'Alumni')}")
    print(f"✓ OffreStage existe: {hasattr(schemas, 'OffreStage')}")
except Exception as e:
    print(f"❌ Erreur: {e}")
