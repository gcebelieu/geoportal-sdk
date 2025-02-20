# CHANGELOG

<!-- toc -->

- [CHANGELOG.md & DRAFT_CHANGELOG.md](#changelogmd--draft_changelogmd)
- [Liens utiles](#liens-utiles)
- [Template](#template)

<!-- tocstop -->

## CHANGELOG.md & DRAFT_CHANGELOG.md

- **CHANGELOG.md** :

    historique des CHANGELOG des releases

- **DRAFT_CHANGELOG.md** :

    CHANGELOG de la dernière release...

    > Son contenu est publié dans le github.

L'utilitaire *github_changelog_generator* ou *conventional-changelog-cli* permet
de générer une base à partir des PRs et issues du projet.

Copier les informations necessaires dans *DRAFT_CHANGELOG.md*, puis, restructurer
le fichier en fonction du *Template*.

Mettre à jour le contenu du *CHANGELOG-.md* avec une copie du contenu *DRAFT_CHANGELOG.md*.

## Liens utiles

Spécification
> https://keepachangelog.com/fr/1.0.0/

API github
> https://developer.github.com/v3/repos/releases/#list-releases-for-a-repository

Requête pour obtenir la liste des releases sur github
> https://api.github.com/repos/IGNF/geoportal-sdk/releases

## Template

```
# SDK Geoportail 2D/3D, version X.X.X

**01/01/2019 : version X.X.X**
> Release SDK Geoportail 2D/3D

## Summary

...

## Changelog

* [Changed]

    - [#XXX](https://github.com/IGNF/geoportal-sdk/issues/XXX) - ....
    - [dev-workflow] Modifications internes...

* [Added]

* [Deprecated]

* [Removed]

* [Fixed]

* [Security]

---
```
