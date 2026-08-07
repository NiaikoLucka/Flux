# Flux

## Projet : Flux

**Version :** 1.0
**Date :** 07 août 2026
**Statut :** Projet en phase de conception

---

# 1. Présentation du projet

## 1.1 Nom du projet

**Flux**

## 1.2 Description

Fux est une application de gestion financière destinée à un *sampana* d'église (organisation/club).

L'application a pour objectif de centraliser et de simplifier la gestion des flux financiers du sampana en permettant de suivre les différents comptes financiers, notamment la banque et la caisse.

Elle permettra d'enregistrer les entrées et sorties d'argent, les transferts entre comptes, ainsi que de consulter l'historique et la situation financière actuelle.

---

# 2. Contexte et problématique

La gestion financière d'un sampana peut être effectuée à l'aide de cahiers, feuilles de calcul ou différents documents.

Cette méthode peut entraîner plusieurs difficultés :

* difficulté à retrouver une opération passée ;
* erreurs dans les calculs ;
* difficulté à connaître rapidement le solde disponible ;
* manque de visibilité sur les mouvements d'argent ;
* difficulté à distinguer l'argent présent en banque de celui présent en caisse ;
* difficulté à savoir qui a enregistré une opération.

Flux vise à résoudre ces problèmes en centralisant les informations financières dans une seule application.

---

# 3. Objectifs

## 3.1 Objectif général

Développer une application permettant de suivre de manière simple, fiable et centralisée les finances d'un sampana.

## 3.2 Objectifs spécifiques

L'application devra permettre de :

* gérer les utilisateurs ;
* gérer les comptes financiers ;
* suivre les soldes de la banque et de la caisse ;
* enregistrer les entrées d'argent ;
* enregistrer les sorties d'argent ;
* effectuer des transferts entre comptes ;
* consulter l'historique des transactions ;
* rechercher et filtrer les opérations ;
* visualiser la situation financière globale.

---

# 4. Périmètre du projet

## 4.1 Périmètre du MVP

La première version de l'application comprendra :

* authentification ;
* gestion des comptes ;
* gestion des transactions ;
* entrées d'argent ;
* sorties d'argent ;
* transferts entre comptes ;
* calcul des soldes ;
* historique des transactions ;
* dashboard financier.

## 4.2 Fonctionnalités hors périmètre du MVP

Les fonctionnalités suivantes pourront être ajoutées ultérieurement :

* application mobile ;
* mode hors ligne ;
* notifications ;
* gestion avancée des membres ;
* gestion des rôles et permissions avancées ;
* rapports financiers avancés ;
* export PDF ;
* export Excel ;
* gestion des budgets ;
* pièces justificatives ;
* gestion de plusieurs sampana.

---

# 5. Utilisateurs du système

## 5.1 Utilisateur

L'utilisateur authentifié peut :

* consulter les comptes ;
* consulter les soldes ;
* enregistrer des transactions ;
* effectuer des transferts ;
* consulter l'historique ;
* gérer les comptes selon ses permissions.

## 5.2 Évolution future

Le système pourra évoluer vers plusieurs types d'utilisateurs :

### Administrateur

Responsable de la configuration et de la gestion des utilisateurs.

### Trésorier

Responsable de l'enregistrement et du suivi des opérations financières.

### Responsable

Peut consulter les informations financières et éventuellement valider certaines opérations.

Ces rôles ne sont pas obligatoires pour le MVP initial.

---

# 6. Fonctionnalités détaillées

## 6.1 Authentification

L'application devra permettre à un utilisateur de :

* créer un compte ;
* se connecter ;
* se déconnecter ;
* maintenir sa session ;
* accéder uniquement aux fonctionnalités auxquelles il est autorisé.

L'authentification sera réalisée avec **Better Auth**.

---

## 6.2 Gestion des comptes financiers

Un compte représente un emplacement où l'argent du sampana est conservé.

### Types de comptes

* Banque ;
* Caisse.

### Fonctionnalités

L'utilisateur pourra :

* créer un compte ;
* consulter les comptes ;
* modifier un compte ;
* désactiver un compte ;
* consulter son solde.

### Exemple

```text
Compte : Banque
Type : BANK

Compte : Caisse principale
Type : CASH
```

---

<!-- # 7. Gestion des catégories

Les catégories permettent de classer les transactions.

## 7.1 Catégories d'entrée

Exemples :

* Cotisation ;
* Offrande ;
* Don ;
* Contribution ;
* Autre.

## 7.2 Catégories de sortie

Exemples :

* Matériel ;
* Transport ;
* Communication ;
* Événement ;
* Électricité ;
* Autre.

### Fonctionnalités

L'utilisateur pourra :

* créer une catégorie ;
* modifier une catégorie ;
* consulter les catégories ;
* désactiver une catégorie. -->

---

# 8. Gestion des transactions

La transaction constitue l'élément principal du système financier.

Une transaction représente un mouvement d'argent.

## 8.1 Entrée d'argent

Une entrée augmente le solde d'un compte.

Exemple :

```text
Cotisation
Montant : 100 000 Ar
Compte : Caisse
```

Résultat :

```text
Caisse +100 000 Ar
```

---

## 8.2 Sortie d'argent

Une sortie diminue le solde d'un compte.

Exemple :

```text
Achat de matériel
Montant : 50 000 Ar
Compte : Caisse
```

Résultat :

```text
Caisse -50 000 Ar
```

---

## 8.3 Transfert entre comptes

Un transfert permet de déplacer de l'argent entre deux comptes appartenant au sampana.

Exemple :

```text
Banque → Caisse

Banque : -200 000 Ar
Caisse : +200 000 Ar
```

Le transfert ne constitue pas une dépense.

---

# 9. Règle de gestion financière

La règle principale du système est :

> Tout mouvement d'argent doit être enregistré sous forme de transaction.

Ainsi :

* une entrée augmente un compte ;
* une sortie diminue un compte ;
* un transfert diminue le compte source et augmente le compte destination.

### Exemple

Situation initiale :

```text
Banque : 2 000 000 Ar
Caisse :   500 000 Ar
```

Approvisionnement de la caisse :

```text
Banque : -300 000 Ar
Caisse : +300 000 Ar
```

Situation finale :

```text
Banque : 1 700 000 Ar
Caisse :   800 000 Ar
```

Le montant total reste :

```text
2 500 000 Ar
```

---

# 10. Historique des transactions

L'application devra conserver l'historique des opérations.

Chaque transaction devra au minimum contenir :

* identifiant ;
* type ;
* montant ;
* compte ;
* catégorie ;
* description ;
* date ;
* utilisateur ayant enregistré l'opération.

L'utilisateur pourra consulter les transactions sous forme de liste.

---

# 11. Recherche et filtrage

L'application devra permettre de filtrer les transactions selon différents critères :

* compte ;
* type de transaction ;
* catégorie ;
* période.

Exemples :

* afficher uniquement les dépenses ;
* afficher les transactions de la caisse ;
* afficher les cotisations ;
* afficher les transactions du mois de juillet.

---

# 12. Dashboard

Le dashboard devra fournir une vue synthétique de la situation financière.

Il devra afficher :

* solde de la banque ;
* solde de la caisse ;
* solde total ;
* dernières transactions.

### Exemple

```text
Situation financière

Banque       1 700 000 Ar
Caisse         800 000 Ar
--------------------------
Total        2 500 000 Ar
```

---

# 13. Cas d'utilisation

## UC01 — Créer un compte utilisateur

**Acteur :** Utilisateur

L'utilisateur fournit les informations nécessaires à son inscription et le système crée son compte.

---

## UC02 — Se connecter

**Acteur :** Utilisateur

L'utilisateur fournit ses identifiants et le système crée une session authentifiée.

---

## UC03 — Consulter la situation financière

**Acteur :** Utilisateur

L'utilisateur accède au dashboard et consulte :

* solde bancaire ;
* solde de caisse ;
* solde total ;
* dernières opérations.

---

## UC04 — Enregistrer une entrée

**Acteur :** Utilisateur

L'utilisateur enregistre une somme reçue et indique notamment :

* montant ;
* compte ;
<!-- * catégorie ; -->
* description.

Le système augmente le solde du compte concerné.

---

## UC05 — Enregistrer une sortie

**Acteur :** Utilisateur

L'utilisateur enregistre une dépense.

Le système diminue le solde du compte concerné.

---

## UC06 — Approvisionner la caisse

**Acteur :** Utilisateur

L'utilisateur transfère une somme depuis la banque vers la caisse.

Le système :

1. diminue le solde bancaire ;
2. augmente le solde de la caisse ;
3. conserve le lien entre les deux mouvements.

---

## UC07 — Déposer la caisse en banque

**Acteur :** Utilisateur

L'utilisateur transfère une somme depuis la caisse vers la banque.

Le système :

1. diminue le solde de la caisse ;
2. augmente le solde bancaire ;
3. enregistre le transfert.

---

## UC08 — Consulter l'historique

**Acteur :** Utilisateur

L'utilisateur consulte les opérations précédemment enregistrées.

---

## UC09 — Filtrer les transactions

**Acteur :** Utilisateur

L'utilisateur sélectionne différents critères afin de retrouver certaines opérations.

---

## UC10 — Gérer les comptes

**Acteur :** Utilisateur

L'utilisateur peut créer, modifier, consulter et désactiver les comptes financiers.

---

## UC11 — Gérer les catégories

**Acteur :** Utilisateur

L'utilisateur peut créer, modifier, consulter et désactiver les catégories.

---

# 14. Contraintes fonctionnelles

Le système devra :

* empêcher l'enregistrement d'une transaction avec un montant invalide ;
* empêcher les montants négatifs lorsque le type de transaction détermine déjà le sens du mouvement ;
* vérifier que le compte existe ;
<!-- * vérifier que la catégorie existe lorsqu'elle est obligatoire ; -->
* empêcher un transfert vers le même compte ;
* vérifier que le compte source possède suffisamment de fonds pour un transfert ;
* enregistrer l'utilisateur ayant effectué l'opération ;
* préserver l'intégrité des transactions.

---

# 15. Contraintes non fonctionnelles

## Sécurité

* Les mots de passe ne doivent jamais être stockés en clair.
* Les routes privées doivent nécessiter une authentification.
* Les données sensibles doivent être protégées.
* Les accès devront être contrôlés selon les permissions dans les futures versions.

## Performance

L'application doit rester suffisamment rapide pour une utilisation quotidienne par les responsables du sampana.

## Fiabilité

Les opérations financières doivent être enregistrées de manière cohérente.

Un transfert doit notamment être traité comme une opération atomique :

```text
Débit banque
+
Crédit caisse
```

Les deux opérations doivent réussir ensemble ou être annulées ensemble.

---

# 16. Architecture technique prévue

```text
                Better Auth

                   USER
                    │
                    │
                    ▼
           WORKSPACE_MEMBER
                    │
                    ▼
                WORKSPACE
                    │
       ┌────────────┼────────────┐
       │                         │
       ▼                         ▼

   ACCOUNT                 TRANSACTION
                                │
                                │
                                ▼
                            USER
                         created_by
```

## Technologies

### Frontend

* React
* TypeScript
* React Router
* Tailwind CSS

### Backend

* Node.js
* Express
* TypeScript

### Base de données

* PostgreSQL

### ORM

* Drizzle ORM

### Authentification

* Better Auth

### Gestion du projet

* pnpm
* Monorepo
* Git
* GitHub

### Déploiement prévu

* API : Render
* Base de données : Neon

---

# 17. Modèle de données prévisionnel

## Utilisateur

Géré principalement par Better Auth.

```text
User
├── id
├── name
├── email
└── ...
```

## Account

```text
Account
├── id
├── name
├── type
├── description
├── is_active
├── created_at
└── updated_at
```

## Category

```text
Category
├── id
├── name
├── type
├── description
├── is_active
├── created_at
└── updated_at
```

## Transaction

```text
Transaction
├── id
├── type
├── amount
├── description
├── account_id
├── category_id
├── created_by
├── transfer_id
└── created_at
```

---

# 18. Évolutions futures

Après validation du MVP, le projet pourra évoluer vers :

## Gestion des membres

* invitation des membres ;
* gestion des rôles ;
* gestion des permissions.

## Rapports

* rapport mensuel ;
* rapport annuel ;
* revenus ;
* dépenses ;
* évolution du solde.

## Export

* CSV ;
* Excel ;
* PDF.

## Justificatifs

* ajout de photos ;
* reçus ;
* factures ;
* pièces justificatives.

## Application mobile

Une application mobile pourra utiliser la même API.

```text
React Web
     │
     │
React Native
     │
     ▼
Express API
     │
     ▼
PostgreSQL
```

## Mode hors ligne

Une future application mobile pourra permettre :

* l'enregistrement hors ligne ;
* la synchronisation automatique ;
* la résolution des conflits.

---

# 19. Critères d'acceptation du MVP

Le MVP sera considéré comme terminé lorsqu'un utilisateur pourra réaliser le scénario suivant :

### Situation initiale

```text
Banque : 2 000 000 Ar
Caisse :   500 000 Ar
```

### Étape 1 — Enregistrer une cotisation

```text
+100 000 Ar → Caisse
```

### Étape 2 — Enregistrer une dépense

```text
-50 000 Ar ← Caisse
```

### Étape 3 — Approvisionner la caisse

```text
Banque : -300 000 Ar
Caisse : +300 000 Ar
```

### Situation finale

```text
Banque : 1 700 000 Ar
Caisse :   850 000 Ar
Total :  2 550 000 Ar
```

L'utilisateur doit pouvoir retrouver les trois opérations dans l'historique et vérifier que les soldes correspondent aux transactions enregistrées.

---

# 20. Priorités

## P0 — MVP

* Authentification
* Comptes
* Catégories
* Transactions
* Entrées
* Sorties
* Transferts
* Calcul des soldes
* Historique
* Dashboard

## P1 — Améliorations

* Membres
* Rôles
* Permissions
* Rapports
* Statistiques
* Recherche avancée
* Export CSV/Excel/PDF
* Validation des dépenses

## P2 — Évolutions

* Application mobile
* Mode offline
* Synchronisation
* Notifications
* Justificatifs
* Budgets
* Multi-sampana

---

# 21. Conclusion

Sampana Finance a pour objectif de fournir au sampana un outil simple et centralisé pour suivre ses finances.

Le MVP se concentre volontairement sur le cœur du besoin :

**comptes → transactions → soldes → historique → dashboard.**

Les fonctionnalités plus avancées seront ajoutées progressivement après validation du fonctionnement de base.
