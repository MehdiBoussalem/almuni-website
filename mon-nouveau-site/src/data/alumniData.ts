// Types pour les données Alumni
export interface Speaker {
  name: string;
  role: string;
  company?: string;
  image: string;
  imagePosition?: 'top' | 'center';
  imageHeight?: 'normal' | 'tall'; // 200px ou 260px
}

export interface ProgramItem {
  time: string;
  title: string;
  description?: string;
}

export interface ProgramColumn {
  title: string;
  items: ProgramItem[];
}

export interface AlumniYearData {
  year: number;
  title: string;
  subtitle: string;
  intro: string;
  program: ProgramColumn[];
  speakers?: Speaker[];
  specialMessage?: {
    icon: string;
    title: string;
    message: string;
    submessage?: string;
  };
}

// Données des années Alumni
export const alumniYears: AlumniYearData[] = [
  {
    year: 2015,
    title: 'ALUMNI 2015',
    subtitle: 'Retour sur la promo 2015',
    intro: 'Découvrez le programme de la journée Alumni à l\'UFR Ingémédia que votre équipe vous a concocté !',
    program: [
      {
        title: 'La matinée',
        items: [
          {
            time: '8:30 — 9:30',
            title: 'Petit déjeuner',
            description: 'Commencez la journée du bon pied avec un accueil chaleureux au deuxième étage en dégustant des viennoiseries et un bon café pour se réchauffer.'
          },
          {
            time: '9:30 — 11:00',
            title: 'Trois premières conférences',
            description: 'L\'événement Alumni débute avec trois prestigieux conférenciers du monde du digital qui vous parleront du thème, « la réussite à la française », en s\'appuyant sur leur propre expérience.'
          },
          {
            time: '11:00',
            title: 'Pause',
            description: 'Petite pause-café sur la terrasse d\'Ingémédia pour discuter et échanger entre ingémédiens.'
          },
          {
            time: '12:30',
            title: 'Buffet',
            description: 'Un buffet sera mis à votre disposition pour savourer les délices que notre traiteur aura préparés.'
          }
        ]
      },
      {
        title: 'L\'après-midi',
        items: [
          {
            time: '14:00 — 15:30',
            title: 'Témoignages d\'anciens ingémédiens',
            description: 'Leurs opportunités, leur travail, leurs insertions professionnelles… Découvrez le récit passionnant de trois anciens ingémédiens et comment leur carrière professionnelle s\'est lancée !'
          },
          {
            time: '15:30 — 16:15',
            title: 'Des ateliers utiles, divers et variés',
            description: 'Comment se différencier de la concurrence ? Comment attirer un recruteur et savoir se vendre ? On vous donne tous les tips pour agrémenter et nourrir au mieux votre CV et votre lettre de motivation.'
          },
          {
            time: '16:15 — 17:15',
            title: 'Stands et découverte d\'entreprises',
            description: 'Vous recherchez un stage ? une alternance ? un futur CDI ? Faites connaissance avec nos nombreuses entreprises partenaires !'
          }
        ]
      },
      {
        title: 'La soirée',
        items: [
          {
            time: '20:00',
            title: 'Apéritif dinatoire',
            description: 'Pour terminer cette journée sur une note chaleureuse et conviviale, retrouvons-nous autour d\'un apéritif dinatoire.'
          },
          {
            time: '22:00',
            title: 'Soirée conviviale',
            description: 'Et parce que nous ne faisons pas les choses à moitié, venez vous défouler sur la playlist enivrante de notre DJ. Le dancefloor n\'attend que vous !'
          }
        ]
      }
    ],
    speakers: [
      {
        name: 'EDOUARD ROMBAU',
        role: 'Coach Agile et Consultant Technique Senior',
        company: 'EKINO, FILIALE TECHNIQUE DU GROUPE FULLSIX',
        image: '/assets/Edouard Rombau.jpeg',
        imagePosition: 'center',
        imageHeight: 'tall'
      },
      {
        name: 'PATRICK VALVERDE',
        role: 'Président national RETIS',
        image: '/assets/PATRICK VALVERDE.jpeg',
        imagePosition: 'center',
        imageHeight: 'tall'
      },
      {
        name: 'PASCALE BOEGLIN-RODIER',
        role: 'Directrice générale THÉÂTRE LIBERTÉ DE TOULON',
        image: '/assets/PASCALE BOEGLIN-RODIER .jpg',
        imagePosition: 'center',
        imageHeight: 'tall'
      },
      {
        name: 'JULIEN GUELLERIN',
        role: 'Chargé de la communication',
        company: 'OLYDRI STUDIO',
        image: '/assets/JULIEN GUELLERIN .jpeg',
        imagePosition: 'center',
        imageHeight: 'tall'
      }
    ]
  },
  {
    year: 2016,
    title: 'ALUMNI 2016',
    subtitle: 'Retour sur la promo 2016',
    intro: 'Découvrez le programme de la journée Alumni 2016.',
    program: [
      {
        title: 'La journée',
        items: [
          {
            time: 'Toute la journée',
            title: 'Programme à venir',
            description: 'Les détails du programme seront ajoutés ultérieurement.'
          }
        ]
      }
    ]
  },
  {
    year: 2017,
    title: 'ALUMNI 2017',
    subtitle: 'Retour sur la promo 2017',
    intro: 'Découvrez le programme de la journée Alumni 2017.',
    program: [
      {
        title: 'La journée',
        items: [
          {
            time: 'Toute la journée',
            title: 'Programme à venir',
            description: 'Les détails du programme seront ajoutés ultérieurement.'
          }
        ]
      }
    ]
  },
  {
    year: 2018,
    title: 'ALUMNI 2018',
    subtitle: 'Retour sur la promo 2018',
    intro: 'Découvrez le programme de la journée Alumni 2018.',
    program: [
      {
        title: 'La journée',
        items: [
          {
            time: 'Toute la journée',
            title: 'Programme à venir',
            description: 'Les détails du programme seront ajoutés ultérieurement.'
          }
        ]
      }
    ]
  },
  {
    year: 2019,
    title: 'ALUMNI 2019',
    subtitle: 'Retour sur la promo 2019',
    intro: 'Découvrez le programme de la journée Alumni 2019.',
    program: [
      {
        title: 'La journée',
        items: [
          {
            time: 'Toute la journée',
            title: 'Programme à venir',
            description: 'Les détails du programme seront ajoutés ultérieurement.'
          }
        ]
      }
    ]
  },
  {
    year: 2020,
    title: 'ALUMNI 2020',
    subtitle: 'Année COVID-19',
    intro: '',
    program: [],
    specialMessage: {
      icon: '🦠',
      title: 'ÉVÉNEMENT ANNULÉ',
      message: 'En raison de la pandémie de COVID-19, l\'événement Alumni 2020 n\'a pas pu avoir lieu.',
      submessage: 'Nous espérons vous retrouver bientôt dans de meilleures conditions.'
    }
  },
  {
    year: 2021,
    title: 'ALUMNI 2021',
    subtitle: 'Retour sur la promo 2021',
    intro: 'Découvrez le programme de la journée Alumni 2021.',
    program: [
      {
        title: 'La journée',
        items: [
          {
            time: 'Toute la journée',
            title: 'Programme à venir',
            description: 'Les détails du programme seront ajoutés ultérieurement.'
          }
        ]
      }
    ]
  },
  {
    year: 2022,
    title: 'ALUMNI 2022',
    subtitle: 'Retour sur la promo 2022',
    intro: 'Découvrez le programme de la journée Alumni 2022.',
    program: [
      {
        title: 'La journée',
        items: [
          {
            time: 'Toute la journée',
            title: 'Programme à venir',
            description: 'Les détails du programme seront ajoutés ultérieurement.'
          }
        ]
      }
    ]
  },
  {
    year: 2023,
    title: 'ALUMNI 2023',
    subtitle: 'Retour sur la promo 2023',
    intro: 'Découvrez le programme de la journée Alumni 2023.',
    program: [
      {
        title: 'La journée',
        items: [
          {
            time: 'Toute la journée',
            title: 'Programme à venir',
            description: 'Les détails du programme seront ajoutés ultérieurement.'
          }
        ]
      }
    ]
  },
  {
    year: 2024,
    title: 'ALUMNI 2024',
    subtitle: 'Retour sur la promo 2024',
    intro: 'Découvrez le programme de la journée Alumni 2024.',
    program: [
      {
        title: 'L\'APRÈS-MIDI',
        items: [
          {
            time: '13:30 — 14:30',
            title: 'Conférences : « CAP SUR LE FUTUR DIGITAL »',
            description: 'UFR Ingémédia, Toulon.'
          },
          {
            time: '14:30 — 15:30',
            title: 'Rencontre exclusive : Les entreprises qui recrutent'
          },
          {
            time: '15:30 — 16:10',
            title: 'Animation & Buffet sucré'
          },
          {
            time: '16:10 — 16:50',
            title: 'Moment d\'échange avec les Alumni Ingémédia'
          },
          {
            time: '16:50 — 18:30',
            title: 'Remises des diplômes des promotions d\'Alumni'
          }
        ]
      },
      {
        title: 'LA SOIRÉE',
        items: [
          {
            time: '20:30',
            title: 'Soirée Festive : Gala des 20 ans',
            description: 'Lieu Mystère (un indice est accessible via un QR code).'
          }
        ]
      }
    ]
  },
  {
    year: 2025,
    title: 'ALUMNI 2025',
    subtitle: 'Retour sur la promo 2025',
    intro: 'Découvrez le programme de la journée Alumni 2025.',
    program: [
      {
        title: 'La journée',
        items: [
          {
            time: 'Toute la journée',
            title: 'Programme à venir',
            description: 'Les détails du programme seront ajoutés ultérieurement.'
          }
        ]
      }
    ]
  }
];

// Liste des années disponibles pour l'index
export const availableYears = alumniYears.map(y => y.year).sort((a, b) => a - b);

// Fonction helper pour récupérer les données d'une année
export const getYearData = (year: number): AlumniYearData | undefined => {
  return alumniYears.find(y => y.year === year);
};
