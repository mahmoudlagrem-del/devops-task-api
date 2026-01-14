# DevOps Task API

API REST simple de gestion de tâches développée avec **Node.js** et **Express**, utilisée comme projet DevOps pour démontrer :
- CI/CD
- Tests automatisés
- Docker
- Observabilité (Metrics, Logs, Tracing)
- Sécurité (SAST / DAST)

---

## 📌 Objectifs du projet

- Créer une API REST fonctionnelle
- Mettre en place un pipeline CI/CD
- Conteneuriser l’application avec Docker
- Exposer des **metrics Prometheus**
- Ajouter des **logs structurés**
- Implémenter du **tracing**
- Tester et sécuriser l’application

---

## 🛠️ Technologies utilisées

- **Node.js**
- **Express**
- **Jest & Supertest**
- **Docker**
- **GitHub Actions**
- **Prometheus (prom-client)**
- **Winston**
- **UUID**

---

## 📂 Structure du projet

devops-task-api/
├── index.js
├── package.json
├── package-lock.json
├── Dockerfile
├── README.md
├── tests/
│ └── tasks.test.js
└── .github/
└── workflows/
└── ci.yml
## Démarrer l’API
Démarrer l’API
L’API est accessible sur :http://localhost:3000

## Endpoints disponibles

| Méthode | Endpoint   | Description             |
| ------- | ---------- | ----------------------- |
| GET     | /health    | Health check            |
| GET     | /tasks     | Liste des tâches        |
| POST    | /tasks     | Créer une tâche         |
| PUT     | /tasks/:id | Mettre à jour une tâche |
| DELETE  | /tasks/:id | Supprimer une tâche     |
| GET     | /metrics   | Metrics Prometheus      |

## Lancer les tests

npm test

## Docker

Construire l’image: docker build -t devops-task-api .
Lancer le conteneur: docker run -p 3000:3000 devops-task-api


