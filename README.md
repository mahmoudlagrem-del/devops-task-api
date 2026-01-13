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
