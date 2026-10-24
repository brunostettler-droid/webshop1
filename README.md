# Thai Food Kurier – Webshop

Freigegebener Gestaltungsstand vom 24. Oktober 2026.

- `index.html`: Gestaltungseditor mit iPhone-18-, iPhone-Duo- und Desktop-Vorschau. Die gespeicherten Einstellungen aller vier Formate sind eingebettet.
- `mobile.html`: reine, scrollbar angelegte Handy-Ansicht ohne Editor. Jahreszahl, Öffnungsstatus und Kontaktdaten haben getrennte Positionen.
- `mobile-shell.html`: zusätzliche Darstellung und Initialisierung der Handy-Ansicht.
- `build-mobile.cjs`: erzeugt die eigenständige Handy-Datei aus Editor und mobiler Vorlage.

Nach Änderungen an `index.html` oder `mobile-shell.html`:

```sh
node build-mobile.cjs
```

Beide HTML-Dateien enthalten ihre Bildressourcen und können über einen gewöhnlichen Webserver bereitgestellt werden. `mobile.html` ist der Einstieg für die Handy-Vorschau. Die Bearbeitungsansicht bleibt unter `index.html` verfügbar.

Der Öffnungsstatus verwendet die Zeitzone Europe/Zurich: Montag bis Freitag 10:30–13:00 Uhr und täglich 17:30–21:00 Uhr. Feiertagsausnahmen sind nicht hinterlegt.

Die Dateien enthalten den freigegebenen Ausgangsstand. Spätere Änderungen im Editor werden im jeweiligen Browser gespeichert; für eine weitere Veröffentlichung müssen diese Einstellungen erneut übernommen werden.
