/* Skaczący kot — prosta symulacja fizyki (grawitacja + odbicia od ścian/podłogi/sufitu).
 * Zero zewnętrznych zasobów, zero sieci. Napędzane Web Animations API (el.animate()),
 * które — inaczej niż ustawianie style.transform wprost — nie wymaga poluzowania CSP
 * o 'unsafe-inline' w style-src.
 *
 * Jeśli JavaScript jest wyłączony albo użytkownik woli mniej ruchu na ekranie
 * (prefers-reduced-motion: reduce), kot zostaje w miejscu — w rogu ekranu,
 * tak jak ustawia to zwykły CSS poniżej. */
(function () {
  "use strict";

  var el = document.querySelector(".kot-pozycja");
  if (!el || typeof el.animate !== "function") return;

  var preferujeMniejRuchu =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (preferujeMniejRuchu) return;

  el.classList.add("kot-ruch");

  var GRAWITACJA = 950; // px/s²
  var ODBICIE_PODLOGA = 0.6; // część energii zachowana po odbiciu od podłogi
  var PROG_NOWEGO_SKOKU = 70; // px/s — poniżej tego zamiast "odbicia" robimy nowy skok
  var KROK = 1 / 60; // s
  var MAKS_KROKOW = 720; // zabezpieczenie: maks. 12 s symulacji jednego lotu

  var szerokosc = el.offsetWidth || 92;
  var wysokosc = el.offsetHeight || 84;

  var x = Math.random() * Math.max(1, window.innerWidth - szerokosc);
  var y = 20;
  var vx = (Math.random() < 0.5 ? -1 : 1) * (90 + Math.random() * 60);
  var vy = 0;

  function granice() {
    return {
      prawa: Math.max(szerokosc, window.innerWidth) - szerokosc,
      dolna: Math.max(wysokosc, window.innerHeight) - wysokosc
    };
  }

  function klatka(px, py, kierunek, t) {
    var obrot = Math.sin(t * 6) * 6 * kierunek;
    return {
      transform:
        "translate(" + px.toFixed(1) + "px, " + py.toFixed(1) + "px) " +
        "scaleX(" + kierunek + ") rotate(" + obrot.toFixed(1) + "deg)"
    };
  }

  function zaplanujLot() {
    var b = granice();
    var kierunek = vx < 0 ? -1 : 1;
    var px = x, py = y, t = 0;
    var klatki = [klatka(px, py, kierunek, 0)];
    var zdarzenie = null;

    for (var i = 0; i < MAKS_KROKOW; i++) {
      t += KROK;
      vy += GRAWITACJA * KROK;
      px += vx * KROK;
      py += vy * KROK;

      if (px <= 0) {
        px = 0;
        zdarzenie = "sciana";
      } else if (px >= b.prawa) {
        px = b.prawa;
        zdarzenie = "sciana";
      }

      if (py >= b.dolna) {
        py = b.dolna;
        zdarzenie = zdarzenie || "podloga";
      } else if (py <= 0) {
        py = 0;
        zdarzenie = zdarzenie || "sufit";
      }

      klatki.push(klatka(px, py, kierunek, t));
      if (zdarzenie) break;
    }

    var czasMs = Math.max(t * 1000, 50);
    var animacja = el.animate(klatki, {
      duration: czasMs,
      easing: "linear",
      fill: "forwards"
    });

    animacja.onfinish = function () {
      x = px;
      y = py;

      if (zdarzenie === "sciana") {
        vx = -vx;
      }
      if (zdarzenie === "podloga") {
        vy = -vy * ODBICIE_PODLOGA;
        if (-vy < PROG_NOWEGO_SKOKU) {
          vy = -(260 + Math.random() * 160);
        }
        vx += (Math.random() - 0.5) * 30;
        var znak = vx < 0 ? -1 : 1;
        var abs = Math.min(220, Math.max(70, Math.abs(vx)));
        vx = znak * abs;
      }
      if (zdarzenie === "sufit") {
        vy = Math.abs(vy) * 0.6;
      }

      zaplanujLot();
    };
  }

  zaplanujLot();
})();
