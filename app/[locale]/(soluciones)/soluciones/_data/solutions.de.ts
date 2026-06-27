// app/[locale]/(soluciones)/soluciones/_data/solutions.de.ts
// Deutsche Übersetzung der Lösungsartikel. Slugs und Bilder entsprechen der ES-Quelle.
import type { Solution } from "./solutions";

export const solutionsDE: Solution[] = [
  {
    slug: "perfil-de-aluminio",
    num: "01",
    title: "Aluminium-Strukturprofil",
    desc: "Aluminium-Strukturprofile für Arbeitsumgebungen sind am effizientesten, wenn sie individuell an ihren Zweck angepasst werden. Eine moderne Alternative zu Stahl für Maschinen, die Stabilität erfordern.",
    tags: ["Modular", "Leicht", "Anpassbar"],
    img: "/assets/images/soluciones/perfil.png",
    readingTime: "5 Min.",
    excerpt:
      "Das Aluminium-Strukturprofil ist zum Rückgrat der modernen Fertigung geworden: ein modulares System, mit dem sich Gestelle, Schutzeinrichtungen, Tische und Maschinenstrukturen ohne Schweißen aufbauen lassen – mit einer Flexibilität, die herkömmlicher Stahl nicht bietet.",
    sections: [
      {
        heading: "Was ist ein Aluminium-Strukturprofil?",
        paragraphs: [
          "Das Aluminium-Strukturprofil ist eine Strangpressprofil aus Aluminiumlegierung mit T-Nuten entlang seiner Flächen. Über diese Nuten lassen sich Profile miteinander verbinden und Zubehör (Platten, Scharniere, Rollen, Sensoren) mit Schrauben und Spezialmuttern befestigen – ohne Schweißen oder Bohren.",
          "Das Ergebnis ist ein Bausystem nach Art eines „industriellen Baukastens“: Es wird montiert, verändert und beliebig oft neu konfiguriert. Das macht es ideal für Umgebungen, in denen sich Prozesse ändern und Strukturen mitwachsen müssen.",
        ],
      },
      {
        heading: "Aluminium gegenüber geschweißtem Stahl",
        paragraphs: [
          "Gegenüber einer geschweißten Stahlkonstruktion wiegt das Aluminiumprofil deutlich weniger, benötigt keine Lackierung oder Korrosionsschutzbehandlung und wird in einem Bruchteil der Zeit montiert. Keine Funken, kein Rauch, kein Verzug durch Hitze.",
          "Eine Aluminiumstruktur lässt sich zudem demontieren und wiederverwenden. Ändert sich morgen das Produkt oder die Linie, dienen dieselben Profile einer anderen Konfiguration und schützen so die Investition langfristig.",
        ],
      },
      {
        heading: "Auf jede Anwendung zugeschnitten",
        paragraphs: [
          "Ein Strukturprofil leistet am meisten, wenn es für seine konkrete Funktion ausgelegt ist: Querschnitt, Verbindungsart und Zubehör müssen nach Last, Steifigkeit und Arbeitsumgebung gewählt werden.",
          "Deshalb beginnt ein gutes Projekt nicht mit dem Katalog, sondern mit dem Problem: Was muss es tragen, wie wird es bedient und welche Sicherheitsnormen gelten?",
        ],
      },
    ],
    benefits: [
      { title: "Ohne Schweißen", desc: "Montage über Schraubverbindungen – ohne Funken, Rauch oder Hitzeverzug." },
      { title: "Leicht und steif", desc: "Bis zu ein Drittel des Gewichts von Stahl bei nötiger Stabilität." },
      { title: "Neu konfigurierbar", desc: "Bei Prozessänderungen anpassbar und wiederverwendbar, ohne die Struktur zu entsorgen." },
      { title: "Sauber und ästhetisch", desc: "Eloxierte Oberfläche ohne Lackierung oder Korrosionsschutz-Wartung." },
    ],
    applications: [
      "Maschinengestelle und -sockel",
      "Schutz- und Sicherheitsabdeckungen",
      "Arbeitstische und Werkbänke",
      "Kabinen und Einhausungen",
      "Halterungen für Sensoren und Bildschirme",
      "Strukturen für die Automatisierung",
    ],
    faqs: [
      {
        q: "Hält das Aluminiumprofil industriellen Lasten stand?",
        a: "Ja. Je nach erforderlicher Last und Steifigkeit stehen verschiedene Querschnitte und Legierungen zur Verfügung. Bei korrekter Auslegung von Profil und Verbindungen reicht das Spektrum von leichten Strukturen bis zu anspruchsvollen Maschinengestellen.",
      },
      {
        q: "Kann ich die Struktur nach der Montage ändern?",
        a: "Genau das ist ihr Vorteil. Durch die Verbindung über T-Nut und Schrauben lässt sich die Struktur ohne Schweißen oder Spezialwerkzeug erweitern, umbauen oder wiederverwenden.",
      },
      {
        q: "Ist Wartung erforderlich?",
        a: "Praktisch keine. Eloxiertes Aluminium rostet nicht und benötigt keine Lackierung; die Wartung beschränkt sich auf die Kontrolle von Verbindungen und Zubehör.",
      },
    ],
    closing:
      "Bei STEIGERN entwerfen, fertigen und integrieren wir Aluminiumprofil-Strukturen, die auf Ihren Prozess zugeschnitten sind: von einer Sicherheitsabdeckung bis zum kompletten Maschinengestell. Wir analysieren die Anwendung, legen das richtige Profil aus und liefern die produktionsbereite Struktur.",
  },
  {
    slug: "conveyors",
    num: "02",
    title: "Fördersysteme",
    desc: "Von der frühen Konzeptentwicklung bis zur detaillierten Machbarkeitsstudie, einschließlich Materialflussprojekten, die die Logistik ganzheitlich betrachten.",
    tags: ["Förderer", "Materialfluss", "Logistik"],
    img: "/assets/images/soluciones/conveyors.png",
    readingTime: "6 Min.",
    excerpt:
      "Ein gut konzipiertes Fördersystem hält eine Anlage in Bewegung: Es verbindet jede Prozessstufe, gibt den Produktionstakt vor und eliminiert das manuelle Handling, das Stillstand und Risiken verursacht.",
    sections: [
      {
        heading: "Was ist ein industrielles Fördersystem?",
        paragraphs: [
          "Ein Fördersystem ist die Gesamtheit der Elemente, die Materialien, Teile oder Produkte automatisch und kontrolliert von einem Punkt zum anderen bewegt. Bänder, Rollen, Ketten oder modulare Systeme arbeiten zusammen, um einen kontinuierlichen Fluss aufrechtzuerhalten.",
          "Über den reinen Transport hinaus synchronisiert ein gutes System die Stationen, regelt den Takt der Linie und verbindet Prozesse, die sonst vom manuellen Materialtransport abhängig wären.",
        ],
      },
      {
        heading: "Arten von Fördersystemen",
        paragraphs: [
          "Die Förderart hängt von Produkt und Prozess ab: Bänder für kleine oder Schüttgutteile, Rollen für Kartons und Paletten, modulare Kunststoffförderer für Kurven und Nassbereiche sowie Ketten für schwere Lasten.",
          "Oft kombiniert die Lösung mehrere Arten und integriert Heber, Weichen und Puffer, um Höhenunterschiede, Sortierung und Pufferung zwischen Stationen zu lösen.",
        ],
      },
      {
        heading: "Logistik ganzheitlich gedacht",
        paragraphs: [
          "Ein Fördersystem zu planen heißt nicht nur, ein Band auszuwählen: Es bedeutet, Materialfluss, Taktzeiten, Ergonomie und das Anlagenlayout als Ganzes zu betrachten.",
          "Deshalb beginnt das Projekt früh – mit dem Konzept und einer Machbarkeitsstudie –, um sicherzustellen, dass das System in den verfügbaren Raum und den realen Produktionstakt passt.",
        ],
      },
    ],
    benefits: [
      { title: "Kontinuierlicher Fluss", desc: "Verbindet Stationen und eliminiert manuelle Bewegungen zwischen Prozessen." },
      { title: "Kontrollierter Takt", desc: "Synchronisiert Taktzeiten und regelt die Geschwindigkeit der Linie." },
      { title: "Geringeres Risiko", desc: "Reduziert manuelles Lastenhandling und die damit verbundenen ergonomischen Risiken." },
      { title: "Rückverfolgbarkeit", desc: "Ermöglicht die Integration von Sensoren und Steuerung zur Verfolgung des Materials." },
    ],
    applications: [
      "Montagelinien",
      "Verpackung und Linienende",
      "Karton- und Palettenhandling",
      "Stationsbeschickung",
      "Sortierung und Verteilung",
      "Höhenwechsel zwischen Prozessen",
    ],
    faqs: [
      {
        q: "Welche Förderart braucht mein Prozess?",
        a: "Das hängt von Produkt, Gewicht und Strecke ab. Bänder für kleine Teile, Rollen für Kartons und Paletten, modulare Förderer für Kurven und Nassbereiche, Ketten für schwere Lasten. Meist werden mehrere je Abschnitt kombiniert.",
      },
      {
        q: "Lässt es sich in meine vorhandenen Anlagen integrieren?",
        a: "Ja. Die Systeme werden so ausgelegt, dass sie sich mit Stationen, Robotern und bereits installierten Anlagen verbinden und Taktzeiten sowie Steuersignale synchronisieren.",
      },
      {
        q: "Ist die Machbarkeitsstudie enthalten?",
        a: "Das Projekt startet mit dem Konzept und einer Machbarkeitsstudie, die Fluss, verfügbaren Raum und Produktionstakt vor der Fertigung validiert.",
      },
    ],
    closing:
      "Bei STEIGERN entwickeln wir Förder- und Materialflusssysteme von Anfang bis Ende: vom Konzept und der Machbarkeit über die Konstruktion und Fertigung bis zur Inbetriebnahme. Wir denken die Logistik ganzheitlich, damit das Material ohne Unterbrechungen fließt.",
  },
  {
    slug: "estaciones-de-trabajo",
    num: "03",
    title: "Arbeitsplätze",
    desc: "Optimales ergonomisches Design, das den Arbeitsplatz unter Berücksichtigung von Beleuchtung, Umgebung und den Fähigkeiten des Bedieners anpasst. Fortschrittlicher Schutz und Sicherheit in jeder Installation.",
    tags: ["Ergonomie", "Sicherheit", "Produktivität"],
    img: "/assets/images/soluciones/estaciones.png",
    readingTime: "5 Min.",
    excerpt:
      "Der Arbeitsplatz ist der Ort, an dem Mensch und Prozess zusammentreffen. Gut gestaltet, reduziert er Ermüdung, verhindert Fehler und steigert die Produktivität; schlecht gestaltet, wird er zur Hauptquelle von Verletzungen und Nacharbeit.",
    sections: [
      {
        heading: "Ergonomie: für den Menschen gestalten",
        paragraphs: [
          "Ein ergonomischer Arbeitsplatz passt den Platz an die Fähigkeiten des Bedieners an und nicht umgekehrt. Arbeitshöhe, Greifraum, Haltung, Beleuchtung und Werkzeuganordnung werden so festgelegt, dass die Aufgabe mit minimalem Aufwand erledigt wird.",
          "Das ist nicht nur Komfort: Ergonomie reduziert Muskel-Skelett-Beschwerden, Fehlzeiten und die Fehler, die entstehen, wenn ein Bediener unbequem oder müde arbeitet.",
        ],
      },
      {
        heading: "Produktivität und Qualität",
        paragraphs: [
          "Wenn alles griffbereit und in der richtigen Reihenfolge ist, sinkt die Taktzeit und die Qualität steigt. Elemente wie Sichthilfen, Poka-Yoke-Systeme und Materialorganisation verhindern Fehler an der Quelle.",
          "Ein durchdachter Arbeitsplatz erleichtert auch die Standardisierung der Arbeit – entscheidend für eine nachhaltige kontinuierliche Verbesserung.",
        ],
      },
      {
        heading: "Integrierte Sicherheit",
        paragraphs: [
          "Sicherheit wird in den Arbeitsplatz hineingestaltet, nicht nachträglich ergänzt: Schutzeinrichtungen, kontrollierter Zugang, geeignete Beleuchtung und freie Wege gehören von Anfang an zum Konzept.",
          "Ziel ist ein Arbeitsplatz, an dem es leicht ist, gut zu arbeiten, und schwer, unsicher zu arbeiten.",
        ],
      },
    ],
    benefits: [
      { title: "Weniger Ermüdung", desc: "Haltung, Greifraum und Höhe optimiert, um den Aufwand des Bedieners zu senken." },
      { title: "Mehr Qualität", desc: "Sichthilfen und Poka-Yoke, die Fehler am Arbeitspunkt verhindern." },
      { title: "Sicherheit", desc: "Schutzeinrichtungen und Beleuchtung in das Design jedes Platzes integriert." },
      { title: "Standardisierung", desc: "Konsistente Arbeitsplätze, die Standardarbeit und kontinuierliche Verbesserung fördern." },
    ],
    applications: [
      "Manuelle Montage",
      "Prüfung und Qualitätskontrolle",
      "Verpackung und Umverpackung",
      "Funktionsprüfung",
      "Kitting und Materialvorbereitung",
      "Nacharbeit und Reparatur",
    ],
    faqs: [
      {
        q: "Warum in ergonomische Arbeitsplätze investieren?",
        a: "Weil sie Verletzungen, Fehlzeiten und Fehler reduzieren und zugleich die Taktzeit verbessern. Die Investition rechnet sich durch weniger Nacharbeit und einen stabileren Betrieb.",
      },
      {
        q: "Passen sie sich an verschiedene Bediener an?",
        a: "Ja. Arbeitsplätze können mit verstellbaren Elementen (Höhe, Greifraum, Beleuchtung) gestaltet werden, um verschiedene Personen und Schichten zu berücksichtigen.",
      },
      {
        q: "Enthalten sie Sicherheitselemente?",
        a: "Sicherheit ist von Beginn an Teil des Konzepts: Schutzeinrichtungen, geeignete Beleuchtung und freie Wege gehören zur Gestaltung jedes Platzes.",
      },
    ],
    closing:
      "Bei STEIGERN gestalten und fertigen wir Arbeitsplätze, die den Menschen in den Mittelpunkt stellen: Wir analysieren Aufgabe, Ergonomie und Sicherheit, um Arbeitsplätze zu liefern, die die Produktivität steigern und den Bediener bei jeder Installation schützen.",
  },
  {
    slug: "dispositivos-asistidos-por-cobots",
    num: "04",
    title: "Cobot-gestützte Vorrichtungen",
    desc: "Integration kollaborativer Roboter, um die Fähigkeiten des Bedieners an Montagelinien zu unterstützen und zu erweitern, Fehler zu reduzieren und Taktzeiten zu verbessern.",
    tags: ["Cobots", "Montage", "Automatisierung"],
    img: "/assets/images/soluciones/cobots.png",
    readingTime: "6 Min.",
    excerpt:
      "Kollaborative Roboter – Cobots – sind nicht da, um den Bediener zu ersetzen, sondern um an seiner Seite zu arbeiten. Sie übernehmen repetitive, präzise oder schwere Aufgaben, während der Mensch Urteilsvermögen und Flexibilität einbringt. Das Ergebnis vereint das Beste aus beiden Welten.",
    sections: [
      {
        heading: "Was ist ein Cobot?",
        paragraphs: [
          "Ein Cobot ist ein Roboter, der für den sicheren Betrieb neben Menschen ausgelegt ist – ohne die Schutzzäune, die herkömmliche Industrieroboter benötigen. Er erkennt Kontakt und begrenzt Kraft und Geschwindigkeit, um den Arbeitsraum zu teilen.",
          "So lässt er sich direkt an einer bestehenden Station installieren und die Aufgaben zwischen Mensch und Roboter danach aufteilen, was jeder am besten kann.",
        ],
      },
      {
        heading: "Zusammenarbeit, kein Ersatz",
        paragraphs: [
          "Der Cobot übernimmt das Repetitive, Präzise oder Schwere: Verschrauben, Dosieren, Pick-and-Place, Prüfen oder Lastenhandling. Der Bediener behält die Aufgaben, die Urteilsvermögen, Feinmotorik und Anpassung erfordern.",
          "Diese Aufteilung reduziert Fehler und Ermüdung und verbessert die Taktzeit, ohne die Flexibilität einer manuellen Linie zu verlieren.",
        ],
      },
      {
        heading: "Flexibilität und schnelle Umrüstung",
        paragraphs: [
          "Einer der großen Vorteile des Cobots ist, wie einfach er neu programmiert und umgesetzt werden kann. Bei einem Produkt- oder Mengenwechsel passt sich die Zelle ohne große Umbauten oder lange Stillstände an.",
          "Integriert mit maßgeschneiderten Vorrichtungen wird der Cobot zu einem vielseitigen Werkzeug innerhalb der Station.",
        ],
      },
    ],
    benefits: [
      { title: "Sicher neben Menschen", desc: "Arbeitet ohne Zäune und begrenzt Kraft und Geschwindigkeit, um den Platz zu teilen." },
      { title: "Weniger Fehler", desc: "Übernimmt repetitive, präzise Aufgaben, bei denen menschliche Fehler wahrscheinlicher sind." },
      { title: "Kürzere Takte", desc: "Verteilt die Last zwischen Mensch und Roboter zur Optimierung der Taktzeit." },
      { title: "Neu konfigurierbar", desc: "Schnell neu programmiert und umgesetzt bei Produkt- oder Mengenwechsel." },
    ],
    applications: [
      "Verschrauben und Befestigen",
      "Pick-and-Place",
      "Dosieren von Kleb- und Dichtstoffen",
      "Prüfung und Verifizierung",
      "Be- und Entladen von Maschinen",
      "Unterstützte Inspektion",
    ],
    faqs: [
      {
        q: "Ersetzt ein Cobot den Bediener?",
        a: "Nein. Der Cobot unterstützt den Bediener, indem er repetitive, präzise oder schwere Aufgaben übernimmt, während die Person jene behält, die Urteilsvermögen und Geschick erfordern. Es ist Zusammenarbeit, kein Ersatz.",
      },
      {
        q: "Benötigt er Schutzzäune?",
        a: "In der Regel nicht, dank seiner kraft- und geschwindigkeitsbegrenzenden Systeme. Der genaue Umfang wird mit einer Risikobeurteilung der konkreten Anwendung festgelegt.",
      },
      {
        q: "Kann er leicht die Aufgabe wechseln?",
        a: "Ja. Einer seiner Vorteile ist die einfache Neuprogrammierung und Umsetzung, sodass sich die Zelle an Produkt- oder Mengenänderungen anpassen lässt.",
      },
    ],
    closing:
      "Bei STEIGERN integrieren wir kollaborative Zellen, die auf Ihre Linie zugeschnitten sind: Wir gestalten die Vorrichtung, das Werkzeug und die Programmierung, damit Cobot und Bediener sicher zusammenarbeiten – mit messbaren Ergebnissen bei Qualität und Taktzeit.",
  },
  {
    slug: "elevacion-y-guias-lineales",
    num: "05",
    title: "Hub- und Linearführungen",
    desc: "Präzise Hubsysteme und Linearführungen für die kontrollierte Bewegung von Komponenten und Baugruppen innerhalb von Fertigungs- und Montagelinien.",
    tags: ["Hubtechnik", "Linearführungen", "Präzision"],
    img: "/assets/images/soluciones/elevacion.png",
    readingTime: "5 Min.",
    excerpt:
      "Wenn ein Teil immer wieder exakt an denselben Punkt bewegt werden muss, kommen Linearführungen und Hubsysteme ins Spiel. Sie sind die Elemente, die Präzision und Wiederholgenauigkeit in die Bewegung innerhalb einer Linie bringen.",
    sections: [
      {
        heading: "Kontrollierte, wiederholbare Bewegung",
        paragraphs: [
          "Linearführungen bewegen Komponenten und Baugruppen entlang einer definierten Bahn mit sehr geringer Reibung und hoher Präzision. Die Bewegung ist gleichmäßig, stabil und vor allem wiederholbar.",
          "Hubsysteme lösen Höhenunterschiede: Sie heben, senken oder positionieren Lasten exakt zwischen Stationen oder Prozessen.",
        ],
      },
      {
        heading: "Präzision an jeder Station",
        paragraphs: [
          "In der Montage ist es die Grundlage der Qualität, das Teil immer an derselben Stelle zu positionieren. Führungen und Hubsysteme gewährleisten diese exakte Positionierung und erleichtern sowohl manuelle als auch automatisierte Arbeit.",
          "Das reduziert Einstellungen, Nacharbeit und Schwankungen zwischen Teilen.",
        ],
      },
      {
        heading: "Sicheres Lastenhandling",
        paragraphs: [
          "Lasten mit Führungen und Hebern zu bewegen ist auch sicherer: Die Bewegung ist eingegrenzt und kontrolliert und vermeidet Anstrengung und Risiken des manuellen Handlings.",
          "Richtig ausgelegt, vereinen diese Systeme Präzision und Sicherheit in einem Element.",
        ],
      },
    ],
    benefits: [
      { title: "Hohe Präzision", desc: "Exakte, wiederholbare Positionierung an jeder Station der Linie." },
      { title: "Gleichmäßige Bewegung", desc: "Geringe Reibung für stabile, langlebige Bewegungen." },
      { title: "Höhenwechsel", desc: "Hubsysteme, die Lasten kontrolliert heben und positionieren." },
      { title: "Sicheres Handling", desc: "Eingegrenzte Bewegung, die Aufwand und Risiko von Hand reduziert." },
    ],
    applications: [
      "Positionierung in der Montage",
      "Höhenwechsel zwischen Prozessen",
      "Handling von Baugruppen",
      "Achsen für Sondermaschinen",
      "Prüfstationen",
      "Kontrolliertes Be- und Entladen",
    ],
    faqs: [
      {
        q: "Welche Präzision ist erreichbar?",
        a: "Linearführungen bieten eine sehr präzise, wiederholbare Positionierung. Der genaue Wert hängt vom gewählten System ab und wird nach den Anforderungen der Anwendung ausgelegt.",
      },
      {
        q: "Für welche Lasten eignen sie sich?",
        a: "Es gibt Führungen und Heber für ein breites Lastspektrum, von leichten Baugruppen bis zu schweren Teilen. Entscheidend ist die korrekte Auslegung des Systems.",
      },
      {
        q: "Verbessern sie die Sicherheit des Bedieners?",
        a: "Ja. Indem sie die Bewegung der Lasten eingrenzen und kontrollieren, reduzieren sie Aufwand und Risiken des manuellen Handlings.",
      },
    ],
    closing:
      "Bei STEIGERN entwerfen und integrieren wir präzise Hubsysteme und Linearführungen, die auf Ihren Prozess zugeschnitten sind, damit sich jede Komponente exakt an den richtigen Punkt bewegt – mit Wiederholgenauigkeit und Sicherheit, Station für Station.",
  },
  {
    slug: "soluciones-lean",
    num: "06",
    title: "Lean-Lösungen",
    desc: "Umsetzung von Lean Manufacturing durch physische Strukturen: Materialsupermärkte, Kitting-Wagen, visuelle Management-Boards und optimierte Fertigungszellen.",
    tags: ["Lean", "5S", "Kaizen"],
    img: "/assets/images/soluciones/estructuras.png",
    readingTime: "6 Min.",
    excerpt:
      "Lean Manufacturing lebt nicht nur auf Whiteboards: Es nimmt auf dem Hallenboden Gestalt an. Materialsupermärkte, Kitting-Wagen und visuelles Management sind die physischen Strukturen, die Lean-Prinzipien in echten Fluss verwandeln.",
    sections: [
      {
        heading: "Lean auf den Hallenboden bringen",
        paragraphs: [
          "Lean Manufacturing zielt darauf ab, Verschwendung zu eliminieren und Fluss zu schaffen. Dafür brauchen Ideen physische Unterstützung: Strukturen, die Material ordnen, den Standard vorgeben und das Richtige erleichtern.",
          "Das ist die Rolle physischer Lean-Lösungen: Konzepte wie Fluss, Pull oder visuelles Management in konkrete Elemente des Betriebs zu übersetzen.",
        ],
      },
      {
        heading: "Supermärkte, Kitting und visuelles Management",
        paragraphs: [
          "Materialsupermärkte und Kitting-Wagen stellen sicher, dass jede Station erhält, was sie braucht – in der richtigen Menge und zum richtigen Zeitpunkt – und reduzieren Suchen und Überbestände.",
          "Visuelle Management-Boards machen den Prozessstatus sichtbar: Was läuft gut, was weicht ab und wo ist zu handeln. Sichtbare Information ist die Grundlage für schnelle Reaktion.",
        ],
      },
      {
        heading: "Kontinuierliche Verbesserung erhalten",
        paragraphs: [
          "Optimierte Fertigungszellen ordnen den Fluss und verkürzen Wege, während 5S Ordnung und Sauberkeit zur Gewohnheit macht.",
          "Gut gestaltet, verbessern diese Strukturen nicht nur heute: Sie tragen eine Kaizen-Kultur, in der Verbesserung Teil des Arbeitsalltags ist.",
        ],
      },
    ],
    benefits: [
      { title: "Weniger Verschwendung", desc: "Ordnet den Materialfluss und eliminiert Suchen, Warten und Überbestände." },
      { title: "Visuelles Management", desc: "Boards, die den Prozessstatus sichtbar machen, um rechtzeitig zu reagieren." },
      { title: "Optimierter Fluss", desc: "Arbeitszellen, die Wege verkürzen und die Last ausgleichen." },
      { title: "5S-/Kaizen-Kultur", desc: "Strukturen, die Ordnung und kontinuierliche Verbesserung dauerhaft tragen." },
    ],
    applications: [
      "Materialsupermärkte",
      "Kitting-Wagen und Kitting",
      "Visuelle Management-Boards",
      "Fertigungszellen",
      "Flusssysteme (FIFO)",
      "5S-Umsetzung",
    ],
    faqs: [
      {
        q: "Was sind physische Lean-Lösungen?",
        a: "Es sind die Strukturen, die Lean-Prinzipien auf dem Boden materialisieren: Materialsupermärkte, Kitting-Wagen, visuelle Boards und Arbeitszellen, die den Fluss ordnen und Verschwendung eliminieren.",
      },
      {
        q: "Wo sollte man beginnen?",
        a: "Meist beginnt man mit dem sichtbarsten Problem – Materialunordnung, Suchen, Warten – und gestaltet die Struktur, die es löst, integriert in eine umfassendere 5S-/Kaizen-Strategie.",
      },
      {
        q: "Passen sie sich an meinen aktuellen Prozess an?",
        a: "Ja. Jedes Element wird passend zu Fluss, Raum und Materialien Ihres Betriebs gestaltet, nicht als generisches Katalogprodukt.",
      },
    ],
    closing:
      "Bei STEIGERN gestalten und fertigen wir die Strukturen, die Lean auf Ihrem Boden greifbar machen: Supermärkte, Kitting-Wagen, visuelles Management und optimierte Zellen – konzipiert, um Verschwendung zu eliminieren und kontinuierliche Verbesserung zu tragen.",
  },
  {
    slug: "desarrollo-de-proyectos",
    num: "07",
    title: "Projektentwicklung",
    desc: "Durchgängige Engineering-Begleitung: vom Konzept und der Machbarkeit über die Detailkonstruktion bis zur Integration und Inbetriebnahme maßgeschneiderter industrieller Lösungen.",
    tags: ["Engineering", "Integration", "Inbetriebnahme"],
    img: "/assets/images/soluciones/estructuras.png",
    readingTime: "6 Min.",
    excerpt:
      "Ein erfolgreiches Industrieprojekt ist keine isolierte Maschine, sondern ein gut gesteuerter Prozess von Anfang bis Ende. Vom Konzept bis zur Inbetriebnahme entscheidet jede Stufe, ob die Lösung ihr Versprechen erfüllt.",
    sections: [
      {
        heading: "Vom Konzept zur Machbarkeit",
        paragraphs: [
          "Jedes Projekt beginnt damit, das Problem zu verstehen: was erreicht werden soll, mit welchen Einschränkungen bei Raum, Zeit und Budget. Auf dieser Basis wird das Konzept entwickelt und seine technische und wirtschaftliche Machbarkeit validiert.",
          "Diese frühe Phase gut zu lösen vermeidet kostspielige Überraschungen später: Hier wird die Richtung der gesamten Investition entschieden.",
        ],
      },
      {
        heading: "Detailkonstruktion und Fertigung",
        paragraphs: [
          "Mit dem validierten Konzept definiert die Detailkonstruktion jede Komponente, Zeichnung und Spezifikation. Sie ist die Brücke zwischen Idee und realer Anlage, wo Engineering zu etwas Fertigbarem wird.",
          "Fertigung und Integration vereinen Mechanik, Pneumatik, Elektrik und Steuerung zu einer funktionsfähigen Lösung, die vor dem Erreichen der Anlage geprüft wird.",
        ],
      },
      {
        heading: "Integration und Inbetriebnahme",
        paragraphs: [
          "Die Inbetriebnahme ist der Moment, in dem das Projekt seinen Wert beweist: Installation, Einstellung, Prüfung und Begleitung, bis das System stabil produziert.",
          "Jede Stufe mit einem einzigen Engineering-Partner zu steuern reduziert Risiken, beseitigt Grauzonen zwischen Lieferanten und verkürzt die Zeit bis zur Produktion.",
        ],
      },
    ],
    benefits: [
      { title: "Ein einziger Partner", desc: "Ein Engineering-Team verantwortlich für jede Stufe, ohne Grauzonen zwischen Lieferanten." },
      { title: "Geringeres Risiko", desc: "Frühe Machbarkeit vermeidet kostspielige Überraschungen in späten Phasen." },
      { title: "Maßgeschneiderte Lösung", desc: "Speziell für Ihren Prozess gestaltet, keine zwanghaft angepasste Standardmaschine." },
      { title: "Bis zur Produktion", desc: "Begleitung bei der Inbetriebnahme, bis ein stabiler Betrieb erreicht ist." },
    ],
    applications: [
      "Sondermaschinen",
      "Automatisierungszellen",
      "Komplette Montagelinien",
      "Machbarkeitsstudien",
      "Anlagenintegration",
      "Inbetriebnahme und Support",
    ],
    faqs: [
      {
        q: "Was umfasst die durchgängige Projektentwicklung?",
        a: "Sie deckt jede Stufe ab: Konzeptanalyse, Machbarkeitsstudie, Detailkonstruktion, Fertigung, Integration und Inbetriebnahme, gesteuert von einem einzigen Engineering-Team.",
      },
      {
        q: "Warum mit einem einzigen Engineering-Partner arbeiten?",
        a: "Weil es Risiken reduziert und die Grauzonen zwischen Lieferanten beseitigt: eine einzige technische Verantwortung vom Konzept bis zur Produktion, was Zeit spart und Konflikte vermeidet.",
      },
      {
        q: "Gestalten Sie maßgeschneiderte Lösungen oder Standardanlagen?",
        a: "Maßgeschneidert. Wir gehen von Ihrem Prozess und Ihren Anforderungen aus, um die spezifische Lösung zu gestalten, statt eine generische Katalogmaschine zu erzwingen.",
      },
    ],
    closing:
      "Bei STEIGERN begleiten wir Ihr Projekt von Anfang bis Ende: Konzept, Machbarkeit, Detailkonstruktion, Fertigung, Integration und Inbetriebnahme. Mit {years} Jahren Erfahrung verwandeln wir Anforderungen in funktionsfähige Systeme – als einziger Engineering-Partner.",
  },
];
