const materias = [
  {
    "codigo": "BIO101",
    "nombre": "Biología General",
    "anio": 1,
    "cuatrimestre": 1,
    "area": "Biología",
    "correlativas": [],
    "finalObligatorio": true
  },
  {
    "codigo": "QUIM101",
    "nombre": "Química General",
    "anio": 1,
    "cuatrimestre": 1,
    "area": "Química",
    "correlativas": [],
    "finalObligatorio": true
  },
  {
    "codigo": "MAT101",
    "nombre": "Análisis Matemático I",
    "anio": 1,
    "cuatrimestre": 1,
    "area": "Matemática",
    "correlativas": [],
    "finalObligatorio": true
  },
  {
    "codigo": "BIO102",
    "nombre": "Biología Celular",
    "anio": 1,
    "cuatrimestre": 2,
    "area": "Biología",
    "correlativas": ["BIO101"],
    "finalObligatorio": true
  },
  {
    "codigo": "QUIM102",
    "nombre": "Química Orgánica",
    "anio": 2,
    "cuatrimestre": 1,
    "area": "Química",
    "correlativas": ["QUIM101"],
    "finalObligatorio": true
  }
];
