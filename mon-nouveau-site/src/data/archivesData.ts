export interface ArchiveData {
  year: number;
  subtitle: string;
  program: ProgramSection[];
  speakers?: Speaker[];
}

export interface ProgramSection {
  title: string;
  items: ProgramItem[];
}

export interface ProgramItem {
  time: string;
  title: string;
  desc?: string;
}

export interface Speaker {
  name: string;
  role: string;
  company: string;
  image?: string;
}

export const archivesData: Record<number, ArchiveData> = {
  2015: {
    year: 2015,
    subtitle: "Retour sur la promo 2015",
    program: [
      {
        title: "LA MATINÉE",
        items: [
          {
            time: "8:30 — 9:30",
            title: "Petit déjeuner",
            desc: "Accueil au deuxième étage avec viennoiseries et café."
          },
          {
            time: "9:30 — 11:00",
            title: "Trois premières conférences",
            desc: "Conférenciers du monde du digital autour du thème \"la réussite à la française\"."
          },
          {
            time: "11:00",
            title: "Pause",
            desc: "Pause-café sur la terrasse d'Ingémédia."
          },
          {
            time: "12:30",
            title: "Buffet",
            desc: "Buffet préparé par le traiteur."
          }
        ]
      },
      {
        title: "L'APRÈS-MIDI",
        items: [
          {
            time: "14:00 — 15:30",
            title: "Témoignages d'anciens ingémédiens",
            desc: "Opportunités, parcours et insertions professionnelles."
          },
          {
            time: "15:30 — 16:15",
            title: "Des ateliers utiles, divers et variés",
            desc: "Conseils pour se différencier et valoriser CV et lettre de motivation."
          },
          {
            time: "16:15 — 17:15",
            title: "Stands et découverte d'entreprises",
            desc: "Rencontres avec les entreprises partenaires pour stages, alternances ou emplois."
          }
        ]
      },
      {
        title: "LA SOIRÉE",
        items: [
          {
            time: "20:00",
            title: "Apéritif dinatoire",
            desc: "Moment convivial pour clôturer la journée."
          },
          {
            time: "22:00",
            title: "Soirée conviviale",
            desc: "DJ set et piste de danse."
          }
        ]
      }
    ],
    speakers: [
      {
        name: "EDOUARD ROMBAU",
        role: "Coach Agile et Consultant Technique Senior",
        company: "EKINO, FILIALE TECHNIQUE DU GROUPE FULLSIX",
        image: "/assets/Edouard%20Rombau.jpeg"
      },
      {
        name: "PATRICK VALVERDE",
        role: "Président national",
        company: "RETIS",
        image: "/assets/PATRICK%20VALVERDE.jpeg"
      },
      {
        name: "PASCALE BOEGLIN-RODIER",
        role: "Directrice générale",
        company: "THÉÂTRE LIBERTÉ DE TOULON",
        image: "/assets/PASCALE%20BOEGLIN-RODIER%20.jpg"
      },
      {
        name: "JULIEN GUELLERIN",
        role: "Chargé de la communication",
        company: "OLYDRI STUDIO",
        image: "/assets/JULIEN%20GUELLERIN%20.jpeg"
      }
    ]
  },
  2016: {
    year: 2016,
    subtitle: "Retour sur la promo 2016",
    program: [
      {
        title: "LA MATINÉE",
        items: [
          { time: "8:30 — 9:15", title: "Petit déjeuner", desc: "Hall — premier étage" },
          { time: "9:15 — 12:30", title: "Conférences", desc: "Tables rondes, Amphi. FA 001" }
        ]
      },
      {
        title: "L'APRÈS-MIDI",
        items: [
          { time: "12:30 — 14:00", title: "Buffet", desc: "Terrasse — 2ème étage" },
          { time: "14:00 — 15:30", title: "Rencontre des anciens", desc: "Amphi. FA 001" },
          { time: "14:00 — 17:00", title: "Networking", desc: "Stages/alternances/emploi, 3ème étage" },
          { time: "15:30 — 17:00", title: "Ateliers/coaching", desc: "Incubateurs de start-up, 6ème étage, espace détente 7ème étage" },
          { time: "17:00 — 18:30", title: "Remise des diplômes", desc: "Amphi. FA 001" }
        ]
      },
      {
        title: "LA SOIRÉE",
        items: [
          {
            time: "20:00 — 22:00",
            title: "Opéra de Toulon, Foyer Campra",
            desc: "Accueil et apéritif à 20h00, suivi d’une soirée avec DJ de 22h00 à 01h00"
          }
        ]
      }
    ],
    speakers: [
      { name: "JONATHAN NOBLE", role: "CEO", company: "CLOCKTWEETS", image: "/assets/Jonathan%20Noble.jpeg" },
      { name: "JACQUES DELACOUR", role: "Fondateur", company: "OPTIS", image: "/assets/Jacques%20Delacour.jpeg" },
      { name: "LAURA MABILLE", role: "Entrepreneuse, Auteur", company: "", image: "/assets/Laura%20Mabille.jpeg" },
      { name: "LOÏC CHAUVEAU", role: "CEO", company: "44.117", image: "/assets/Loic_Chauveau.jpg" },
      { name: "VINCENT MAIGNIER", role: "Fondateur", company: "TRIBALEO", image: "/assets/Vincent%20Maignier.jpg" },
      { name: "NICOLAS FACCIOLO", role: "Co-fondateur", company: "WEAL", image: "/assets/Nicolas%20Facciolo.jpeg" },
      { name: "VINCENT VALDIVIESO", role: "Co-fondateur", company: "WEAL", image: "/assets/Vincent%20Valdivieso.jpg" }
    ]
  },
  2017: {
    year: 2017,
    subtitle: "Retour sur la promo 2017",
    program: [
      {
        title: "LA MATINÉE",
        items: [
          {
            time: "8:30 — 9:30",
            title: "Petit déjeuner",
            desc: "Accueil chaleureux au deuxième étage avec café et viennoiseries."
          },
          {
            time: "9:30 — 11:00",
            title: "Trois premières conférences",
            desc: "Prestigieux conférenciers autour du thème \"la réussite à la française\"."
          },
          { time: "11:00", title: "Pause", desc: "Pause-café sur la terrasse d’Ingémédia." },
          { time: "12:30", title: "Buffet", desc: "Délices préparés par le traiteur." }
        ]
      },
      {
        title: "L'APRÈS-MIDI",
        items: [
          {
            time: "14:00 — 15:30",
            title: "Témoignages d’anciens ingémédiens",
            desc: "Parcours, opportunités et insertions professionnelles."
          },
          {
            time: "15:30 — 16:15",
            title: "Ateliers pratiques",
            desc: "Conseils pour se différencier et optimiser CV et lettre de motivation."
          },
          {
            time: "16:15 — 17:15",
            title: "Stands et découverte d’entreprises",
            desc: "Rencontre avec les entreprises partenaires."
          }
        ]
      },
      {
        title: "LA SOIRÉE",
        items: [
          { time: "20:00", title: "Apéritif dinatoire", desc: "Moment chaleureux pour clôturer la journée." },
          { time: "22:00", title: "Soirée conviviale", desc: "DJ set et dancefloor." }
        ]
      }
    ],
    speakers: [
      { name: "LYONEL SIREUILLE", role: "Fondateur", company: "THE IDEA STARTER COMPANY", image: "/assets/Lyonel%20Sireuille.jpg" },
      { name: "ARNAUD GENTY", role: "UX Designer et Ergonome", company: "STASH", image: "/assets/Arnaud%20Genty.jpg" },
      { name: "ARNAUD BECQUET", role: "Trader Media", company: "PUBLICIS MEDIA", image: "/assets/Arnaud%20Becquet.jpg" },
      { name: "BERTRAND DURAND-GASSELIN", role: "Co-fondateur", company: "SEAGALE", image: "/assets/Bertrand%20Durand-Gasselin.jpg" },
      { name: "CATHELYNE VAN WINSEN", role: "Business Development Manager", company: "BERCEAU MAGIQUE", image: "/assets/Cathelyne%20Van%20Winsen.jpeg" },
      { name: "JONATHAN NOBLE", role: "CEO", company: "SWELLO", image: "/assets/Jonathan%20Noble.jpg" },
      { name: "LOÏC CHAUVEAU", role: "CEO et Directive Creator", company: "BRAND STATION", image: "/assets/Loic_Chauveau.jpg" }
    ]
  },
  2018: {
    year: 2018,
    subtitle: "Retour sur la promo 2018",
    program: [
      {
        title: "LA MATINÉE",
        items: [
          { time: "8:30", title: "Accueil et Petit déjeuner", desc: "Viennoiseries et café au deuxième étage." },
          {
            time: "9:00",
            title: "Conférences — 1ère partie",
            desc: "Alexandre Joux (Directeur ECJMA) et Ugo Aubri (datascientist chez LDLC)."
          },
          { time: "10:45", title: "Pause" },
          {
            time: "11:15",
            title: "Conférences — 2ème partie",
            desc: "Loïc Chauveau (Brand Station) et Sébastien Martinez (Champion de France de la mémoire)."
          }
        ]
      },
      {
        title: "L'APRÈS-MIDI",
        items: [
          { time: "12:30", title: "Pause Déjeuner", desc: "Cocktail en terrasse." },
          { time: "14:00", title: "Retour des anciens" },
          { time: "15:30", title: "Ateliers coaching et stages" },
          { time: "17:30", title: "Remise des diplômes" }
        ]
      },
      {
        title: "LA SOIRÉE",
        items: [
          {
            time: "21:00 — 1:00",
            title: "Opéra de Toulon, Foyer Campra",
            desc: "Accueil à 21h, récompenses Alumni d'Or à 22h30, soirée avec DJ."
          }
        ]
      }
    ],
    speakers: [
      { name: "ALEXANDRE JOUX", role: "Directeur", company: "ECJMA", image: "/assets/Alexandre%20Joux%20.jpg" },
      { name: "UGO AUBRI", role: "Datascientist", company: "LDLC", image: "/assets/Ugo%20Aubri%20.jpg" },
      { name: "SÉBASTIEN MARTINEZ", role: "Champion de France de la mémoire", company: "", image: "/assets/Sebastien_martinez_.jpg" },
      { name: "LOÏC CHAUVEAU", role: "CEO et Directeur Créatif", company: "BRAND STATION", image: "/assets/Loic_Chauveau.jpg" }
    ]
  },
  2019: {
    year: 2019,
    subtitle: "Retour sur la promo 2019",
    program: [
      {
        title: "LA MATINÉE",
        items: [
          { time: "8:30 — 9:00", title: "Accueil et Petit déjeuner", desc: "FA RDC" },
          {
            time: "9:30 — 12:30",
            title: "Conférences",
            desc: "FA001 (Fabrice Tissot, Marylise Trioreau, Julia Giona, Jacques Bramardi)."
          }
        ]
      },
      {
        title: "L'APRÈS-MIDI",
        items: [
          { time: "12:30 — 13:30", title: "Pause Déjeuner", desc: "FA CRL — 3ème étage" },
          { time: "13:30 — 15:30", title: "Retour des anciens", desc: "FA00" },
          { time: "15:30 — 17:00", title: "Salon de recrutement", desc: "FA CRL — 3ème étage" },
          { time: "15:30 — 17:00", title: "Atelier pitch et animations", desc: "CO315 et plateau Télomédia" }
        ]
      },
      {
        title: "LA SOIRÉE",
        items: [
          {
            time: "21:00 — 00:00",
            title: "Soirée au Palais Neptune",
            desc: "Cocktail, quizz, remise des Alumni d'Or."
          }
        ]
      }
    ],
    speakers: [
      { name: "JULIA GIONA", role: "Head of public relations", company: "QUALTRICS", image: "/assets/Julia%20GIONA%20.jpg" },
      { name: "JACQUES BRAMARDI", role: "Directeur", company: "BEXTER", image: "/assets/Jacques%20BRAMARDI%20.jpg" },
      { name: "MANON BECUE", role: "Account manager", company: "ORANGE", image: "/assets/Manon%20BECUE%20.jpg" },
      { name: "MARYLISE TRIOREAU", role: "Responsable communication", company: "BERCEAU MAGIQUE", image: "/assets/Marylise%20TRIOREAU%20.jpg" }
    ]
  },
  2020: {
    year: 2020,
    subtitle: "Promo 2020",
    program: [
      {
        title: "PROGRAMME",
        items: [
          {
            time: "—",
            title: "Édition annulée",
            desc: "Annulation du Grand Gala Alumni 2020 en raison de la pandémie de COVID-19."
          }
        ]
      }
    ]
  },
  2021: {
    year: 2021,
    subtitle: "Promo 2021",
    program: [
      {
        title: "PROGRAMME",
        items: [
          {
            time: "—",
            title: "Édition annulée",
            desc: "Annulation du Grand Gala Alumni 2021 en raison de la pandémie de COVID-19."
          }
        ]
      }
    ]
  },
  2022: {
    year: 2022,
    subtitle: "Retour sur la promo 2022",
    program: [
      {
        title: "LA MATINÉE",
        items: [
          { time: "8:30 — 9:00", title: "Accueil des participants", desc: "Petit déjeuner buffet et goodies." },
          {
            time: "10:00 — 12:00",
            title: "Retours et échanges",
            desc: "Parcours des anciens élèves avec Q&A (Amphi FA001)."
          }
        ]
      },
      {
        title: "L'APRÈS-MIDI",
        items: [
          { time: "12:00 — 13:30", title: "Déjeuner - Buffet", desc: "Moment convivial à l'UFR Ingémédia." },
          {
            time: "13:30 — 18:00",
            title: "Conférences et tables rondes",
            desc: "Sessions multi-salles (FA001, FA110, FA010, Bâtiment Droit 500)."
          }
        ]
      },
      {
        title: "LA SOIRÉE",
        items: [
          { time: "18:00", title: "Accueil des étudiants", desc: "Photo Booth & apéritif." },
          { time: "19:30", title: "Début de la soirée : Buffet", desc: "Traiteur, musique et piste de danse." },
          { time: "21:00", title: "Résultats et Cérémonie", desc: "Concours étudiant et cérémonie des professeurs." },
          { time: "22:00", title: "Nos Alumni ont du talent", desc: "Performances (chant, musique, magie, etc.)." },
          { time: "02:00", title: "Fin de la soirée" }
        ]
      }
    ]
  },
  2023: {
    year: 2023,
    subtitle: "Retour sur la promo 2023",
    program: [
      {
        title: "LA MATINÉE",
        items: [
          { time: "8:30", title: "Accueil", desc: "Badges, goodies et viennoiseries." },
          { time: "8:30 — 9:45", title: "Petit déjeuner", desc: "Temps d'échange." },
          {
            time: "10:00 — 12:30",
            title: "Conférences et Atelier",
            desc: "Conférences par des pros de la com/numérique + atelier LinkedIn."
          }
        ]
      },
      {
        title: "L'APRÈS-MIDI",
        items: [
          { time: "12:30 — 14:00", title: "Cocktail Déjeunatoire", desc: "Pause déjeuner pour se restaurer." },
          { time: "14:00 — 16:30", title: "Témoignages", desc: "Retours de 6 à 8 anciens étudiants." },
          { time: "16:30 — 18:00", title: "Atelier de Networking", desc: "Échanges de parcours et contacts." }
        ]
      },
      {
        title: "LA SOIRÉE",
        items: [
          { time: "19:00", title: "Accueil Soirée", desc: "Palais du Commerce et de la Mer." },
          { time: "19:30", title: "Apéritif" },
          { time: "20:30", title: "Repas" },
          {
            time: "21:00 — 02:00",
            title: "Soirée festive",
            desc: "DJ Noxx et DJ Nalio Palia + performances des licences Techniques du son et de l'image."
          }
        ]
      }
    ],
    speakers: [
      { name: "CATHELYNE VAN WINSEN", role: "Développement et management", company: "BERCEAU MAGIQUE", image: "/assets/Cathelyne%20Van%20Winsen.jpeg" },
      { name: "CHARLOTTE DUBOST", role: "Dirigeante", company: "Mégara / Berceau Magique, Elaïa Conseil", image: "/assets/CHARLOTTE%20DUBOST.jpeg" },
      { name: "YANN LUPION", role: "Expert Designer - UX Lead", company: "Research / Thinking / Design / Évaluation", image: "/assets/YANN%20LUPION.jpeg" }
    ]
  },
  2024: {
    year: 2024,
    subtitle: "Retour sur la promo 2024",
    program: [
      {
        title: "L'APRÈS-MIDI",
        items: [
          {
            time: "13:30 — 14:30",
            title: "Conférences : « CAP SUR LE FUTUR DIGITAL »",
            desc: "UFR Ingémédia, Toulon."
          },
          {
            time: "14:30 — 15:30",
            title: "Rencontre exclusive : Les entreprises qui recrutent"
          },
          {
            time: "15:30 — 16:10",
            title: "Animation & Buffet sucré"
          },
          {
            time: "16:10 — 16:50",
            title: "Moment d'échange avec les Alumni Ingémédia"
          },
          {
            time: "16:50 — 18:30",
            title: "Remises des diplômes des promotions d'Alumni"
          }
        ]
      },
      {
        title: "LA SOIRÉE",
        items: [
          {
            time: "20:30",
            title: "Soirée Festive : Gala des 20 ans",
            desc: "Lieu Mystère (un indice est accessible via un QR code)."
          }
        ]
      }
    ]
  },
  2025: {
    year: 2025,
    subtitle: "Promo 2025",
    program: [
      {
        title: "LA MATINÉE",
        items: [
          {
            time: "08h30 — 09h30",
            title: "Petit-déjeuner offert / Accueil / Brise-glace",
            desc: "UFR Ingémédia"
          },
          {
            time: "09h30 — 10h00",
            title: "Conférence 1",
            desc: "Utilisation de l'IA dans la protection des comptes utilisateurs et leur vie privée"
          },
          {
            time: "10h00 — 10h30",
            title: "Blind Test"
          },
          {
            time: "10h30 — 11h00",
            title: "Pause-café offerte"
          },
          {
            time: "11h00 — 11h30",
            title: "Conférence 2",
            desc: "Tracer sa voie : Les clés pour réussir son parcours professionnel"
          },
          {
            time: "11h30 — 12h30",
            title: "Table ronde",
            desc: "Alternants, étudiants, anciens étudiants et Erasmus"
          }
        ]
      },
      {
        title: "L'APRÈS-MIDI",
        items: [
          {
            time: "14h30 — 16h30",
            title: "Activités surprises"
          },
          {
            time: "16h30 — 17h00",
            title: "Goûter offert"
          },
          {
            time: "17h00 — 18h30",
            title: "Remise des diplômes"
          }
        ]
      },
      {
        title: "LA SOIRÉE",
        items: [
          {
            time: "20h30 — 01h00",
            title: "Soirée au Campus du RCT",
            desc: "Buffet, boissons, place de parking, arrêt de bus disponible jusqu'à 01h du matin"
          }
        ]
      }
    ],
    speakers: [
      {
        name: "AMINE MATMATI",
        role: "Responsable des programmes techniques du groupe Confiance & Sécurité",
        company: "CANVA (Sydney, Australie)",
        image: "/assets/AMINE%20MATMATI.jpg"
      },
      {
        name: "GUSTAVE ALI COUDI",
        role: "Superviseur assistance commerciale",
        company: "CAISSE D'ÉPARGNE CÔTE D'AZUR",
        image: "/assets/GUSTAVE%20ALI%20COUDI.jpeg"
      }
    ]
  }
};

// Ajouter les autres années (2015-2023) avec des données de base
for (let year = 2015; year <= 2023; year++) {
  if (!archivesData[year]) {
    archivesData[year] = {
      year,
      subtitle: `Promo ${year}`,
      program: [
        {
          title: "PROGRAMME",
          items: [
            {
              time: "À déterminer",
              title: "Consulter l'archive complète en ligne"
            }
          ]
        }
      ]
    };
  }
}
