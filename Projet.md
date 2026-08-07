# Sampana Finance

## 1. Présentation

**Sampana Finance** est une application de gestion financière destinée à un *sampana* (branche/section d'une église).

L'objectif est de permettre aux responsables de suivre simplement et précisément les flux financiers du sampana :

* argent disponible en banque ;
* argent disponible en caisse ;
* entrées d'argent ;
* sorties d'argent ;
* transferts entre banque et caisse ;
* historique des opérations ;
* solde actuel de chaque compte.

L'application vise à remplacer une gestion manuelle basée sur des cahiers, feuilles Excel ou calculs dispersés.

---

# 2. Objectifs du projet

## Objectif principal

Permettre au sampana de connaître à tout moment :

* combien d'argent se trouve en banque ;
* combien d'argent se trouve en caisse ;
* combien d'argent a été reçu ;
* combien d'argent a été dépensé ;
* où et quand chaque mouvement financier a été effectué.

## Objectifs secondaires

* Centraliser les informations financières.
* Réduire les erreurs de calcul.
* Faciliter le suivi des opérations.
* Garder un historique des transactions.
* Préparer l'évolution vers une application mobile.
* Permettre plusieurs utilisateurs à terme.

---

# 3. Périmètre du MVP

Le MVP doit permettre de gérer les fonctionnalités essentielles sans introduire trop de complexité.

Le MVP comprend :

1. Authentification
2. Gestion des comptes financiers
3. Gestion des catégories
4. Gestion des transactions
5. Gestion des transferts entre comptes
6. Calcul des soldes
7. Historique des transactions
8. Dashboard financier

---

# 4. Fonctionnalités

## F1 — Authentification

L'application doit permettre à un utilisateur de :

* créer un compte ;
* se connecter ;
* se déconnecter ;
* maintenir une session ;
* récupérer les informations de l'utilisateur connecté.

### Technologie

L'authentification sera gérée avec **Better Auth**.

---

## F2 — Gestion des comptes financiers

Un compte représente un endroit où l'argent du sampana est conservé.

### Types de comptes

* `BANK` — compte bancaire
* `CASH` — caisse

### Exemples

* Banque
* Caisse principale
* Caisse événement
* Caisse jeunesse

### Fonctionnalités

* créer un compte ;
* consulter les comptes ;
* modifier un compte ;
* désactiver un compte ;
* consulter le solde d'un compte.

---

## F3 — Gestion des catégories

Les catégories permettent de classer les opérations financières.

### Catégories d'entrée

* Cotisation
* Offrande
* Don
* Contribution
* Autre

### Catégories de sortie

* Matériel
* Transport
* Électricité
* Communication
* Événement
* Autre

### Fonctionnalités

* créer une catégorie ;
* consulter les catégories ;
* modifier une catégorie ;
* désactiver une catégorie ;
* associer une catégorie à une transaction.

---

## F4 — Gestion des transactions

La transaction représente un mouvement d'argent.

Les trois types principaux sont :

* `INCOME`
* `EXPENSE`
* `TRANSFER`

### Entrée

Une entrée augmente le solde d'un compte.

Exemple :

```text
Cotisation
+100 000 Ar
→ Caisse
```

### Sortie

Une sortie diminue le solde d'un compte.

Exemple :

```text
Achat de matériel
-50 000 Ar
← Caisse
```

### Transfert

Un transfert déplace de l'argent d'un compte vers un autre.

Exemple :

```text
Banque
-200 000 Ar

Caisse
+200 000 Ar
```

L'argent n'est pas considéré comme une dépense puisqu'il reste dans les comptes du sampana.

### Fonctionnalités

* enregistrer une entrée ;
* enregistrer une sortie ;
* effectuer un transfert ;
* consulter les transactions ;
* consulter le détail d'une transaction ;
* modifier une transaction ;
* annuler ou supprimer une transaction selon les règles métier ;
* filtrer les transactions.

---

# 5. Règle financière principale

Une règle fondamentale du système :

> Si l'argent entre, sort ou change de compte, il doit être représenté par une transaction.

Exemple :

```text
Banque : 2 000 000 Ar
Caisse :   500 000 Ar
```

Approvisionnement de la caisse de 300 000 Ar :

```text
Banque : -300 000 Ar
Caisse : +300 000 Ar
```

Nouveau solde :

```text
Banque : 1 700 000 Ar
Caisse :   800 000 Ar
```

Le transfert ne constitue pas une dépense.

---

# 6. Calcul des soldes

Le solde d'un compte doit être calculé à partir de ses transactions.

Exemple :

```text
Entrées :
+500 000 Ar
+200 000 Ar

Sorties :
-100 000 Ar
-50 000 Ar

Solde :
550 000 Ar
```

Le système doit éviter de maintenir plusieurs valeurs de solde susceptibles de devenir incohérentes.

---

# 7. Dashboard

Le dashboard donne une vue globale de la situation financière.

Il doit afficher au minimum :

```text
Solde Banque
Solde Caisse
Solde Total
```

Il doit également afficher :

* les dernières transactions ;
* les entrées récentes ;
* les sorties récentes.

### Exemple

```text
Situation financière

Banque       1 700 000 Ar
Caisse         800 000 Ar
--------------------------
Total        2 500 000 Ar

Dernières opérations

+100 000 Ar   Cotisation
-50 000 Ar    Matériel
-300 000 Ar   Transfert Banque
+300 000 Ar   Transfert Caisse
```

---

# 8. Cas d'utilisation

## UC01 — S'inscrire

**Acteur :** Utilisateur

### Scénario

1. L'utilisateur ouvre la page d'inscription.
2. Il renseigne ses informations.
3. Le système valide les informations.
4. Le compte utilisateur est créé.
5. L'utilisateur peut se connecter.

---

## UC02 — Se connecter

**Acteur :** Utilisateur

### Scénario

1. L'utilisateur renseigne son email et son mot de passe.
2. Better Auth vérifie les informations.
3. Une session est créée.
4. L'utilisateur accède au dashboard.

---

## UC03 — Consulter le solde

**Acteur :** Utilisateur

### Scénario

1. L'utilisateur ouvre le dashboard.
2. Le système récupère les comptes.
3. Le système calcule leurs soldes.
4. Les soldes sont affichés.

Résultat :

```text
Banque : 1 700 000 Ar
Caisse :   800 000 Ar
Total  : 2 500 000 Ar
```

---

## UC04 — Ajouter une entrée

**Acteur :** Utilisateur

### Exemple

Une cotisation de 100 000 Ar est reçue.

### Scénario

1. L'utilisateur choisit "Nouvelle transaction".
2. Il choisit "Entrée".
3. Il indique le montant.
4. Il sélectionne le compte.
5. Il sélectionne la catégorie.
6. Il valide.
7. La transaction est enregistrée.
8. Le solde du compte augmente.

---

## UC05 — Ajouter une sortie

**Acteur :** Utilisateur

### Exemple

Le sampana achète du matériel pour 50 000 Ar.

### Scénario

1. L'utilisateur choisit "Nouvelle transaction".
2. Il choisit "Sortie".
3. Il indique 50 000 Ar.
4. Il sélectionne la caisse.
5. Il sélectionne "Matériel".
6. Il valide.
7. La transaction est enregistrée.
8. Le solde de la caisse diminue.

---

## UC06 — Approvisionner la caisse

**Acteur :** Utilisateur

### Exemple

Le sampana retire 200 000 Ar de la banque pour les placer dans la caisse.

### Scénario

1. L'utilisateur choisit "Transfert".
2. Il sélectionne la banque comme compte source.
3. Il sélectionne la caisse comme compte destination.
4. Il indique 200 000 Ar.
5. Le système crée le transfert.
6. Le solde bancaire diminue.
7. Le solde de la caisse augmente.

```text
Banque
-200 000 Ar

Caisse
+200 000 Ar
```

---

## UC07 — Déposer l'argent de la caisse en banque

**Acteur :** Utilisateur

### Exemple

300 000 Ar de la caisse sont déposés en banque.

```text
Caisse
-300 000 Ar

Banque
+300 000 Ar
```

Le système doit enregistrer cette opération comme un transfert.

---

## UC08 — Consulter l'historique

**Acteur :** Utilisateur

L'utilisateur peut consulter toutes les transactions.

Exemple :

```text
Date       Type        Montant       Compte

07/08      Entrée      +100 000 Ar   Caisse
06/08      Sortie       -50 000 Ar   Caisse
05/08      Transfert   -200 000 Ar   Banque
05/08      Transfert   +200 000 Ar   Caisse
```

---

## UC09 — Filtrer les transactions

**Acteur :** Utilisateur

L'utilisateur peut filtrer les transactions par :

* compte ;
* type ;
* catégorie ;
* période.

Exemples :

```text
Toutes les dépenses
Dépenses de juillet
Transactions de la banque
Cotisations
```

---

## UC10 — Consulter le détail d'une transaction

**Acteur :** Utilisateur

Le système doit afficher :

* montant ;
* type ;
* compte ;
* catégorie ;
* date ;
* description ;
* utilisateur ayant enregistré l'opération.

Exemple :

```text
Achat de câbles

Montant : 50 000 Ar
Type : Dépense
Compte : Caisse
Catégorie : Matériel
Date : 07/08/2026
Enregistré par : Utilisateur
```

---

## UC11 — Gérer les comptes

**Acteur :** Utilisateur

L'utilisateur peut :

* créer un compte ;
* modifier un compte ;
* consulter un compte ;
* désactiver un compte.

---

## UC12 — Gérer les catégories

**Acteur :** Utilisateur

L'utilisateur peut :

* créer une catégorie ;
* modifier une catégorie ;
* consulter les catégories ;
* désactiver une catégorie.

---

# 9. Modèle conceptuel

Les principales entités du MVP sont :

```text
User
 │
 │ crée
 ▼
Transaction
 │
 ├──────────────► Account
 │
 └──────────────► Category
```

### Account

Représente :

* Banque
* Caisse

### Transaction

Représente :

* entrée ;
* sortie ;
* transfert.

### Category

Représente la raison d'une entrée ou d'une sortie.

### User

Représente la personne ayant enregistré l'opération.

---

# 10. Tables principales

## Better Auth

Les tables d'authentification seront gérées par Better Auth :

* `user`
* `session`
* `account`
* `verification`

## Tables métier

### `accounts`

```text
id
name
type
description
is_active
created_at
updated_at
```

### `categories`

```text
id
name
type
description
is_active
created_at
updated_at
```

### `transactions`

```text
id
type
amount
description
account_id
category_id
created_by
transfer_id
created_at
```

---

# 11. Architecture technique

```text
                    React
                      │
                      │ HTTP
                      ▼
                  Express API
                      │
          ┌───────────┴───────────┐
          │                       │
     Better Auth              Modules
          │                       │
          │             ┌─────────┼─────────┐
          │             │         │         │
          │          Accounts Categories Transactions
          │                       │
          └───────────┬───────────┘
                      │
                   Drizzle
                      │
                      ▼
               PostgreSQL
                      │
              ┌───────┴───────┐
              │               │
          Développement     Production
          PostgreSQL local     Neon
```

---

# 12. Stack technique

### Backend

* Node.js
* Express
* TypeScript

### Authentification

* Better Auth

### Base de données

* PostgreSQL

### ORM

* Drizzle ORM

### Frontend

* React
* React Router
* Tailwind CSS

### Développement

* pnpm
* Monorepo
* Git
* GitHub

### Production

* API : Render
* Database : Neon

---

# 13. Fonctionnalités hors MVP

Ces fonctionnalités seront étudiées après le MVP.

## Priorité P1

* Gestion des membres du sampana
* Rôles utilisateurs
* Permissions
* Historique des actions
* Rapports mensuels
* Statistiques
* Export CSV/Excel
* Export PDF
* Recherche avancée
* Validation des dépenses

## Priorité P2

* Application mobile React Native
* Mode offline
* Synchronisation offline/online
* Notifications
* Upload de justificatifs
* Photos des reçus
* Gestion des budgets
* Multi-sampana
* Validation à plusieurs niveaux

---

# 14. Priorités du MVP

## P0 — Indispensable

```text
Authentification
Comptes
Catégories
Transactions
Entrées
Sorties
Transferts
Calcul des soldes
Historique
Dashboard
```

## P1 — Important

```text
Rôles
Permissions
Filtres avancés
Rapports
Statistiques
Exports
```

## P2 — Plus tard

```text
Mobile
Offline
Notifications
Justificatifs
Budgets
Multi-sampana
```

---

# 15. Critère de réussite du MVP

Le MVP est considéré comme fonctionnel lorsqu'un utilisateur peut :

1. Créer un compte.
2. Se connecter.
3. Créer une banque et une caisse.
4. Enregistrer une entrée.
5. Enregistrer une sortie.
6. Transférer de l'argent entre banque et caisse.
7. Consulter les soldes.
8. Consulter l'historique.
9. Filtrer les transactions.
10. Voir la situation financière globale depuis le dashboard.

### Exemple de scénario complet

```text
Solde initial

Banque : 2 000 000 Ar
Caisse :   500 000 Ar


1. Cotisation de 100 000 Ar

Caisse : 600 000 Ar


2. Achat de matériel de 50 000 Ar

Caisse : 550 000 Ar


3. Approvisionnement caisse de 300 000 Ar

Banque : 1 700 000 Ar
Caisse :   850 000 Ar


Situation finale

Banque : 1 700 000 Ar
Caisse :   850 000 Ar
Total :  2 550 000 Ar
```

Le système doit être capable de reproduire exactement cette situation à partir de l'historique des transactions.
