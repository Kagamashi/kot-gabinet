# Kot gabinet — wersja rozrywkowa

To jest **żartobliwa, prywatna kopia** strony informacyjnej Indywidualnej Praktyki
Stomatologicznej Mariola Krajewska, z dodanym animowanym kotem. Nie jest to oficjalna strona
gabinetu i nie służy do informowania pacjentów.

Oficjalna, obowiązująca informacja dla pacjentów jest tutaj:
**https://gabinetkrajewska.github.io/**

## Co to jest

Treść strony (HTML i CSS) jest kopią zatwierdzonej wersji z repozytorium
`gabinetkrajewska/gabinetkrajewska.github.io`, z trzema dodatkami:

1. Dyskretny pasek na górze strony z informacją „Wersja rozrywkowa" i odnośnikiem do oficjalnej
   strony.
2. Dopisek „(wersja rozrywkowa)" w tytule strony i w znaczniku `og:title`.
3. Skaczący kot, który krąży po całym ekranie i odbija się od krawędzi — z prawdziwą fizyką
   (grawitacja, odbicia), napędzaną małym lokalnym plikiem JavaScript.

Cała reszta treści — łącznie z pełnym tekstem informacji o naruszeniu ochrony danych i danymi
kontaktowymi gabinetu — jest identyczna jak na stronie oficjalnej.

## Zasady, których strona przestrzega

- Brak plików cookies, brak analityki, brak śledzenia.
- Jedyny JavaScript na stronie to lokalny plik `kot.js` (ruch maskotki) — zero zewnętrznych
  bibliotek, zero żądań sieciowych, zero dostępu do jakichkolwiek danych.
- Ta sama restrykcyjna Content Security Policy co na stronie oficjalnej (`default-src 'none'`),
  rozszerzona wyłącznie o `script-src 'self'` (żeby `kot.js` mógł się uruchomić) — obraz kota,
  arkusz stylów i skrypt ładują się wyłącznie z własnej domeny.
- `noindex, nofollow` oraz `robots.txt` blokujący indeksowanie — tak jak na stronie oficjalnej.
- Zero żądań do serwerów zewnętrznych.

To jedyna różnica względem oficjalnej strony gabinetu, która pozostaje w 100% bez JavaScriptu.

## Kot

- `kot.webp` — główny format (z przezroczystością), ok. 48 KB.
- `kot.png` — fallback dla przeglądarek bez obsługi WebP, ok. 49 KB.
- Zdjęcie źródłowe miało nieprzezroczyste czarne tło (zwykłe piksele, nie kanał alfa). Tło
  usunięto narzędziem do segmentacji obrazu (rembg/u2net), obraz przycięto i zmniejszono.
- Animacja (`kot.js`): prosta symulacja fizyki — grawitacja ciągnie kota w dół, przy uderzeniu
  o podłogę traci część energii i odbija się (albo robi nowy skok, jeśli odbicie byłoby za słabe),
  przy uderzeniu o ścianę odwraca kierunek w poziomie i wizualnie się odwraca. Pozycja jest
  liczona w JavaScripcie, a renderowana przez `Element.animate()` (Web Animations API) — dzięki
  temu nie trzeba rozluźniać CSP o `unsafe-inline` w `style-src`.
- Gdy JavaScript jest wyłączony albo zawiedzie, kot zostaje nieruchomo w rogu ekranu (sam CSS,
  bez animacji ruchu) — strona nigdy się nie psuje.
- Przy `prefers-reduced-motion: reduce` kot w ogóle nie zaczyna się ruszać (JS to sprawdza przed
  startem) i zostaje statyczny w rogu. W wydruku (`@media print`) kota nie ma.

## To repozytorium jest publiczne

Podobnie jak oryginał: nie wolno tu umieszczać żadnych danych pacjentów. Strona jest statyczna
i nie zbiera żadnych danych.

## Podgląd lokalny

```bash
python3 -m http.server 8000
```

Następnie w przeglądarce: `http://localhost:8000`.
