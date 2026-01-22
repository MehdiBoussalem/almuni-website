from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import Optional, List
from rapidfuzz import fuzz, process
from . import models, schemas


# ========== STAGES ==========
def get_stage(db: Session, stage_id: int):
    return db.query(models.Stage).filter(models.Stage.id == stage_id).first()


def get_stage_by_external_id(db: Session, stage_id_externe: str):
    return (
        db.query(models.Stage)
        .filter(models.Stage.stage_id_externe == stage_id_externe)
        .first()
    )


def get_stages(db: Session, skip: int = 0, limit: int = 100):
    return (
        db.query(models.Stage)
        .order_by(models.Stage.date_publication.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


def search_stages(
    db: Session,
    q: Optional[str] = None,
    type_filter: Optional[str] = None,
    city: Optional[str] = None,
    enterprise: Optional[str] = None,
    skip: int = 0,
    limit: int = 25,
):
    query = db.query(models.Stage)
    if q:
        like = f"%{q}%"
        query = query.filter(
            or_(
                models.Stage.titre.ilike(like),
                models.Stage.entreprise.ilike(like),
                models.Stage.ville.ilike(like),
            )
        )
    if type_filter:
        query = query.filter(models.Stage.type == type_filter)
    if city:
        query = query.filter(models.Stage.ville == city)
    if enterprise:
        query = query.filter(models.Stage.entreprise == enterprise)

    total = query.count()
    items = (
        query.order_by(models.Stage.date_publication.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )
    return total, items


def create_stage(db: Session, stage: schemas.StageCreate):
    db_stage = models.Stage(**stage.model_dump())
    db.add(db_stage)
    db.commit()
    db.refresh(db_stage)
    return db_stage


def update_stage(db: Session, stage_id: int, stage: schemas.StageCreate):
    db_stage = get_stage(db, stage_id)
    if db_stage:
        for key, value in stage.model_dump().items():
            setattr(db_stage, key, value)
        db.commit()
        db.refresh(db_stage)
    return db_stage


def delete_stage(db: Session, stage_id: int):
    db_stage = get_stage(db, stage_id)
    if db_stage:
        db.delete(db_stage)
        db.commit()
    return db_stage


def count_stages(db: Session):
    return db.query(models.Stage).count()


# ========== ALUMNIS ==========
def get_alumni(db: Session, alumni_id: int):
    return db.query(models.Alumnis).filter(models.Alumnis.id == alumni_id).first()


def get_alumnis(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Alumnis).offset(skip).limit(limit).all()


def search_alumnis(
    db: Session,
    q: Optional[str] = None,
    skip: int = 0,
    limit: int = 25,
):
    query = db.query(models.Alumnis)
    if q:
        like = f"%{q}%"
        query = query.filter(
            or_(
                models.Alumnis.nom.ilike(like),
                models.Alumnis.prenom.ilike(like),
                models.Alumnis.poste.ilike(like),
            )
        )
    total = query.count()
    items = query.offset(skip).limit(limit).all()
    return total, items


def create_alumni(db: Session, alumni: schemas.AlumniCreate):
    db_alumni = models.Alumnis(**alumni.model_dump())
    db.add(db_alumni)
    db.commit()
    db.refresh(db_alumni)
    return db_alumni


def update_alumni(db: Session, alumni_id: int, alumni: schemas.AlumniCreate):
    db_alumni = get_alumni(db, alumni_id)
    if db_alumni:
        for key, value in alumni.model_dump().items():
            setattr(db_alumni, key, value)
        db.commit()
        db.refresh(db_alumni)
    return db_alumni


def delete_alumni(db: Session, alumni_id: int):
    db_alumni = get_alumni(db, alumni_id)
    if db_alumni:
        db.delete(db_alumni)
        db.commit()
    return db_alumni


# ========== INSCRITS SOIREE ==========
def get_inscrit_soiree(db: Session, inscrit_id: int):
    return (
        db.query(models.InscritSoiree)
        .filter(models.InscritSoiree.id == inscrit_id)
        .first()
    )


def get_inscrits_soiree(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.InscritSoiree).offset(skip).limit(limit).all()


def get_inscrit_by_mail(db: Session, mail: str):
    return (
        db.query(models.InscritSoiree).filter(models.InscritSoiree.mail == mail).first()
    )


def create_inscrit_soiree(db: Session, inscrit: schemas.InscritSoireeCreate):
    db_inscrit = models.InscritSoiree(**inscrit.model_dump())
    db.add(db_inscrit)
    db.commit()
    db.refresh(db_inscrit)
    return db_inscrit


def update_inscrit_soiree(
    db: Session, inscrit_id: int, inscrit: schemas.InscritSoireeCreate
):
    db_inscrit = get_inscrit_soiree(db, inscrit_id)
    if db_inscrit:
        for key, value in inscrit.model_dump().items():
            setattr(db_inscrit, key, value)
        db.commit()
        db.refresh(db_inscrit)
    return db_inscrit


def delete_inscrit_soiree(db: Session, inscrit_id: int):
    db_inscrit = get_inscrit_soiree(db, inscrit_id)
    if db_inscrit:
        db.delete(db_inscrit)
        db.commit()
    return db_inscrit


def count_inscrits_soiree(db: Session):
    return db.query(models.InscritSoiree).count()


# ========== TSHIRTS ==========
def get_tshirt(db: Session, tshirt_id: int):
    return db.query(models.Tshirt).filter(models.Tshirt.id == tshirt_id).first()


def get_tshirts(db: Session, skip: int = 0, limit: int = 100):
    return (
        db.query(models.Tshirt)
        .order_by(models.Tshirt.upload_date.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


def create_tshirt(db: Session, tshirt: schemas.TshirtCreate, image_path: str):
    db_tshirt = models.Tshirt(**tshirt.model_dump(), image_path=image_path)
    db.add(db_tshirt)
    db.commit()
    db.refresh(db_tshirt)
    return db_tshirt


def delete_tshirt(db: Session, tshirt_id: int):
    db_tshirt = get_tshirt(db, tshirt_id)
    if db_tshirt:
        db.delete(db_tshirt)
        db.commit()
    return db_tshirt


def delete_all_tshirts(db: Session):
    count = db.query(models.Tshirt).count()
    db.query(models.Tshirt).delete()
    db.commit()
    return count


# ========== FUZZY MATCHING ENTREPRISES ==========
def normalize_company(name: str) -> str:
    """
    Normalise le nom d'entreprise pour comparaison fuzzy
    - Lowercase, trim, unifie espaces
    - Retire suffixes juridiques courants
    """
    if not name:
        return ""

    # Lowercase, trim, unifie espaces multiples
    cleaned = " ".join(name.lower().strip().split())

    # Retire suffixes juridiques courants
    suffixes = [
        " sa",
        " sas",
        " sarl",
        " inc",
        " ltd",
        " gmbh",
        " llc",
        " corp",
        " eurl",
    ]
    for suffix in suffixes:
        if cleaned.endswith(suffix):
            cleaned = cleaned[: -len(suffix)].strip()

    return cleaned


def find_matching_alumnis(
    db: Session, company: str, threshold: int = 70, limit: int = 50
) -> List[models.Alumnis]:
    """
    Trouve les alumnis travaillant dans une entreprise similaire (fuzzy matching)

    Args:
        company: nom entreprise du stage
        threshold: score minimum de similarité (0-100), défaut 70%
        limit: nombre max de résultats

    Returns:
        Liste d'alumnis matchés par entreprise
    """
    if not company:
        return []

    # Récupère tous les alumnis avec entreprise renseignée
    all_alumnis = (
        db.query(models.Alumnis)
        .filter(models.Alumnis.entreprise.isnot(None), models.Alumnis.entreprise != "")
        .all()
    )

    if not all_alumnis:
        return []

    # Normalise la recherche
    normalized_company = normalize_company(company)

    # Crée dictionnaire {entreprise_normalisée: [alumnis]}
    companies_map = {}
    for alumni in all_alumnis:
        norm = normalize_company(alumni.entreprise)
        if norm not in companies_map:
            companies_map[norm] = []
        companies_map[norm].append(alumni)

    # Fuzzy matching sur les entreprises uniques
    choices = list(companies_map.keys())

    # Token set ratio: insensible à l'ordre des mots + gère sous-chaînes
    # Ex: "Business Orange" ≈ "Orange Business" ≈ "Orange"
    matches = process.extract(
        normalized_company,
        choices,
        scorer=fuzz.token_set_ratio,
        limit=None,
        score_cutoff=threshold,
    )

    # Collecte les alumnis des entreprises matchées
    result_alumnis = []
    seen_ids = set()  # Évite doublons

    for matched_company, score, _ in matches:
        for alumni in companies_map[matched_company]:
            if alumni.id not in seen_ids:
                result_alumnis.append(alumni)
                seen_ids.add(alumni.id)
                if len(result_alumnis) >= limit:
                    return result_alumnis

    return result_alumnis


# ========== STATISTIQUES AVEC FUZZY MATCHING ==========
def get_grouped_companies_stats(db: Session, threshold: int = 85) -> List[dict]:
    """
    Regroupe les entreprises par similarité et retourne le top 5

    Args:
        threshold: score minimum pour regrouper (défaut 85%)

    Returns:
        Liste de dicts: [{"nom": "Orange", "count": 15, "variations": ["Orange", "Orange Business"]}, ...]
    """
    # Récupère toutes les entreprises non vides
    alumnis = (
        db.query(models.Alumnis)
        .filter(models.Alumnis.entreprise.isnot(None), models.Alumnis.entreprise != "")
        .all()
    )

    if not alumnis:
        return []

    # Compte les occurrences brutes
    company_counts = {}
    for alumni in alumnis:
        company = alumni.entreprise.strip()
        if company.lower() != "aucune":
            company_counts[company] = company_counts.get(company, 0) + 1

    # Regroupe par similarité
    normalized_groups = (
        {}
    )  # {nom_normalisé: {"canonical": str, "count": int, "variations": set}}
    processed = set()

    for company, count in sorted(company_counts.items(), key=lambda x: -x[1]):
        if company in processed:
            continue

        norm = normalize_company(company)

        # Trouve les variantes similaires
        similar = []
        for other_company in company_counts.keys():
            if other_company in processed:
                continue
            norm_other = normalize_company(other_company)
            score = fuzz.token_set_ratio(norm, norm_other)
            if score >= threshold:
                similar.append(other_company)

        # Regroupe
        total_count = sum(company_counts[c] for c in similar)
        canonical = max(
            similar, key=lambda c: company_counts[c]
        )  # Nom le plus fréquent

        normalized_groups[norm] = {
            "canonical": canonical,
            "count": total_count,
            "variations": set(similar),
        }
        processed.update(similar)

    # Trie par count et prend top 5
    top_companies = sorted(
        normalized_groups.values(), key=lambda x: x["count"], reverse=True
    )[:5]

    return [
        {
            "nom": company["canonical"],
            "count": company["count"],
            "variations": list(company["variations"]),
        }
        for company in top_companies
    ]


def get_grouped_jobs_stats(db: Session, threshold: int = 80) -> List[dict]:
    """
    Regroupe les métiers/postes par similarité

    Args:
        threshold: score minimum pour regrouper (défaut 80%)

    Returns:
        Liste de dicts: [{"nom": "Développeur", "count": 25, "variations": [...]}, ...]
    """
    # Récupère tous les postes non vides
    alumnis = (
        db.query(models.Alumnis)
        .filter(models.Alumnis.poste.isnot(None), models.Alumnis.poste != "")
        .all()
    )

    if not alumnis:
        return []

    # Compte les occurrences brutes
    job_counts = {}
    for alumni in alumnis:
        job = alumni.poste.strip()
        lower = job.lower()
        if lower not in ["aucun", "aucun poste", "sans emploi"]:
            job_counts[job] = job_counts.get(job, 0) + 1

    # Normalisation simplifiée
    def normalize_job(job: str) -> str:
        return " ".join(job.lower().strip().split())

    # Regroupe par similarité
    job_groups = {}
    processed = set()

    for job, count in sorted(job_counts.items(), key=lambda x: -x[1]):
        if job in processed:
            continue

        norm = normalize_job(job)

        # Trouve les variantes similaires
        similar = []
        for other_job in job_counts.keys():
            if other_job in processed:
                continue
            norm_other = normalize_job(other_job)
            score = fuzz.token_set_ratio(norm, norm_other)
            if score >= threshold:
                similar.append(other_job)

        # Regroupe
        total_count = sum(job_counts[j] for j in similar)
        canonical = max(similar, key=lambda j: job_counts[j])

        job_groups[norm] = {
            "canonical": canonical,
            "count": total_count,
            "variations": set(similar),
        }
        processed.update(similar)

    # Trie par count et prend top 12 pour word cloud
    top_jobs = sorted(job_groups.values(), key=lambda x: x["count"], reverse=True)[:12]

    return [
        {
            "nom": job["canonical"],
            "count": job["count"],
            "variations": list(job["variations"]),
        }
        for job in top_jobs
    ]
