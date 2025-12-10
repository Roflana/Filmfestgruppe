# Wegbegleitung

Eine einfühlsame Webseite für Angehörige und Betroffene zum Thema Tod, Sterbebegleitung und Trauer.

## Über das Projekt

Wegbegleitung ist eine zentrale Anlaufstelle für Menschen, die sich mit dem Verlust eines nahestehenden Menschen auseinandersetzen – sei es bevorstehend oder bereits geschehen. Die Webseite bietet:

- **Informationen** über die Sterbephase und was medizinisch passiert
- **Psychologische Unterstützung** mit Informationen zu Trauerphasen und Gefühlen
- **Praktische Checklisten** für Formalitäten und organisatorische Aufgaben
- **Hilfsangebote** mit Ressourcen, Beratungsstellen und Selbsthilfegruppen
- **Ein Forum** (in Planung) für den Austausch mit anderen Betroffenen
- **Chat-Assistenz** (Platzhalter) für schnelle Hilfe

## Design-Philosophie

Das Design folgt einer beruhigenden, klaren Ästhetik:
- Warme, sanfte Farben (Cremeweiß, Türkis, Salbeigrün)
- Keine religiösen Symbole
- Seriös ohne deprimierend zu wirken
- Mobile-responsive

## Projektstruktur

```
/
├── index.html              # Startseite mit Fragebogen
├── css/
│   └── style.css           # Alle Styles
├── js/
│   └── main.js             # Interaktivität
├── pages/
│   ├── sterbephase.html    # Die Sterbephase verstehen
│   ├── psychologie.html    # Psychologische Begleitung
│   ├── praktisches.html    # Praktische Schritte & Checklisten
│   ├── nach-dem-tod.html   # Bestattung, Trauerfeier, Grabpflege
│   ├── selbstfuersorge.html# Selbstfürsorge für Begleitende
│   ├── ressourcen.html     # Hilfsangebote & Anlaufstellen
│   ├── forum.html          # Forum (Platzhalter)
│   ├── ueber-uns.html      # Über das Projekt
│   ├── impressum.html      # Impressum
│   └── datenschutz.html    # Datenschutzerklärung
└── assets/                 # (für zukünftige Bilder/Icons)
```

## Features

### Umgesetzt (v1)
- [x] Responsive Navigation mit Dropdown-Menü
- [x] Interaktiver Fragebogen zur Bedarfsermittlung
- [x] Personalisierte Empfehlungen basierend auf Fragebogen
- [x] Umfassende Informationsseiten zu allen relevanten Themen
- [x] Chat-Widget UI (Platzhalter für KI-Integration)
- [x] Barrierefreies Design
- [x] Soforthilfe-Nummer immer sichtbar

### Geplant (v2+)
- [ ] Forum-Funktionalität implementieren
- [ ] KI-Chat-Assistenz integrieren
- [ ] Suche über alle Inhalte
- [ ] Newsletter-Integration
- [ ] Mehrsprachigkeit

## Lokale Entwicklung

Die Webseite ist statisches HTML/CSS/JS und benötigt keinen Build-Prozess.

1. Repository klonen
2. `index.html` im Browser öffnen

Für einen lokalen Server:
```bash
# Mit Python 3
python -m http.server 8000

# Mit Node.js (npx)
npx serve
```

## Lizenz

Alle Inhalte mit Sorgfalt erstellt. Details siehe Impressum.
