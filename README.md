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
3. Animowany, skaczący kot w rogu ekranu (czysty CSS, bez JavaScriptu).

Cała reszta treści — łącznie z pełnym tekstem informacji o naruszeniu ochrony danych i danymi
kontaktowymi gabinetu — jest identyczna jak na stronie oficjalnej.

## Zasady, których strona przestrzega

- Brak JavaScriptu, brak plików cookies, brak analityki.
- Ta sama restrykcyjna Content Security Policy co na stronie oficjalnej (`default-src 'none'`),
  obraz kota i arkusz stylów ładują się wyłącznie z własnej domeny.
- `noindex, nofollow` oraz `robots.txt` blokujący indeksowanie — tak jak na stronie oficjalnej.
- Zero żądań do serwerów zewnętrznych.

## Kot

- `kot.webp` — główny format (z przezroczystością), ok. 48 KB.
- `kot.png` — fallback dla przeglądarek bez obsługi WebP, ok. 49 KB.
- Zdjęcie źródłowe miało nieprzezroczyste czarne tło (zwykłe piksele, nie kanał alfa). Tło
  usunięto narzędziem do segmentacji obrazu (rembg/u2net), obraz przycięto i zmniejszono.
- Animacja: czysty CSS (`@keyframes`), skok z przysiadem przed i po (squash & stretch), w pętli
  z kilkusekundową przerwą. Wyłączona przy `prefers-reduced-motion: reduce` i ukryta w wydruku.

## To repozytorium jest publiczne

Podobnie jak oryginał: nie wolno tu umieszczać żadnych danych pacjentów. Strona jest statyczna
i nie zbiera żadnych danych.

## Podgląd lokalny

```bash
python3 -m http.server 8000
```

Następnie w przeglądarce: `http://localhost:8000`.
