# Step-by-step: Netlify + Cloudflare + GitHub + Rackhost domain

Egy lépésről lépésre útmutató: a projekt a **GitHub**on van, **Netlify** hostolja, a **Cloudflare** kezeli a DNS-t, a domain a **Rackhost**.hu-n van regisztrálva.

---

## Áttekintés

| Szolgáltatás   | Szerepe |
|----------------|---------|
| **Rackhost.hu** | Domain regisztráció (pl. kikuldetespdf.hu). Itt csak a nameszervereket állítod át. |
| **GitHub**      | Kód tárolása. A Netlify innen húzza le és buildeli a projektet. |
| **Netlify**     | Next.js app hostolása, automatikus build + HTTPS. |
| **Cloudflare**  | DNS kezelés (és opcionális CDN). A domain névfeloldás itt történik. |

---

## Step 1: Projekt feltöltése a GitHubra

1. Ha még nincs GitHub repo:
   - Nyisd meg [github.com](https://github.com) és jelentkezz be.
   - **New repository** → adj nevet (pl. `kikuldetespdf`), **Create repository**.
2. A projekt mappájában (ahol a `package.json` van) a terminálban:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/FELHASZNÁLÓNÉV/REPO-NEV.git
   git push -u origin main
   ```
   Cseréld a `FELHASZNÁLÓNÉV` és `REPO-NEV` értékeket a saját GitHub felhasználónevedre és repo nevedre.
3. Ha a repo már létezik és csak frissíteni akarsz: `git add .` → `git commit -m "Update"` → `git push`.

---

## Step 2: Netlify site létrehozása (GitHubról)

1. Menj a [app.netlify.com](https://app.netlify.com) oldalra → **Sign up** / **Log in**.
2. **Sign up** esetén válaszd az **Authorize with GitHub** lehetőséget, és engedélyezd a Netlify hozzáférést a GitHubhoz.
3. **Add new site** → **Import an existing project**.
4. **Deploy with GitHub** → **Authorize Netlify** (ha kéri), majd válaszd ki a **repository-t** (pl. `kikuldetespdf`).
5. **Configure build settings**:
   - **Branch to deploy:** `main` (vagy amit használsz).
   - **Build command:** `npm run build` (a `netlify.toml` miatt ez már alapértelmezett lehet).
   - **Publish directory:** a `netlify.toml` miatt `.next` – ha üresen hagyod, a plugin kezeli.
   - Ne változtass máson, hacsak nem kell (pl. környezeti változók).
6. **Deploy site**.
7. Várd meg a build végét. Ha sikeres, megjelenik a site URL-je, pl. `random-words-12345.netlify.app`. **Másold ki ezt az URL-t** – a későbbi Cloudflare CNAME-nél kell (Step 6).

---

## Step 3: Egyéni domain hozzáadása a Netlify-hoz

1. A Netlify dashboardon válaszd ki az új site-ot.
2. **Domain management** (vagy **Site configuration** → **Domain management**) → **Add domain** / **Add custom domain**.
3. Írd be a **fő domain nevedet** (pl. `kikuldetespdf.hu`) → **Verify** / **Add domain**.
4. A Netlify fel fogja ajánlani a **www**-t is. Add hozzá: **Add domain** → `www.kikuldetespdf.hu` → **Verify**.
5. A Netlify megjeleníti, hogy „Domain is not configured yet” vagy hasonló – ez normális, mert a DNS-t a Cloudflare-ben állítod be (Step 6). A **site URL** (pl. `something.netlify.app`) maradjon meg fejben a következő lépéshez.

---

## Step 4: Domain hozzáadása a Cloudflare-hez (és nameszerverek)

1. Nyisd meg a [dash.cloudflare.com](https://dash.cloudflare.com) oldalt → **Sign up** / **Log in**.
2. **Add a Site** (vagy **Websites** → **Add a site**).
3. Írd be a domain nevedet (pl. `kikuldetespdf.hu`) → **Add site**.
4. A **Select a plan** képernyőn válaszd a **Free** tervet → **Continue**.
5. A Cloudflare megmutatja a **DNS scan** eredményét. Kattints a **Continue** gombra.
6. A **Update nameservers** képernyőn megjelennek a Cloudflare nameszerverek, pl.:
   - `xxx.ns.cloudflare.com`
   - `yyy.ns.cloudflare.com`
   **Másold ki vagy tartsd nyitva ezt az oldalt** – ezeket be kell állítanod a Rackhost-on (Step 5).

---

## Step 5: Nameszerverek beállítása a Rackhost-on

1. Jelentkezz be a [www.rackhost.hu](https://www.rackhost.hu) oldalon.
2. Menj a **Domainek** / **Saját domainek** (vagy **Domain kezelés** / **My domains**) menüpontba.
3. Kattints a domain nevedre (pl. `kikuldetespdf.hu`).
4. Keress egy **Nameszerver** / **NS rekord** / **DNS szerver** / **Domain nameservers** jellegű beállítást.
5. Cseréld a jelenlegi nameszervereket a Cloudflare által megadott **két** nameszerverre (Step 4-ből). Ha több mező van, csak a kettőt töltsd ki.
6. **Mentés** / **Save**.
7. A propagálás általában **5 perctől 24–48 óráig** is tarthat. A Cloudflare-nél ezután a domain állapota **Active** (zöld pipa) lesz – ez lehet néhány óra is.

---

## Step 6: DNS rekordok beállítása a Cloudflare-ben (Netlify-ra)

1. A Cloudflare dashboardon válaszd ki a site-odat (pl. `kikuldetespdf.hu`).
2. Bal oldalt kattints a **DNS** → **Records** menüpontra.
3. Töröld a felesleges alapértelmezett rekordokat (pl. régi A vagy CNAME), ha olyan van, ami ütközne.
4. Add hozzá az alábbi rekordokat (**Add record**):

   **Első A rekord (fő domain):**
   - **Type:** `A`
   - **Name:** `@`
   - **IPv4 address:** `75.2.60.5`
   - **Proxy status:** **Proxied** (narancs felhő)
   - **Save**

   **Második A rekord (fő domain):**
   - **Type:** `A`
   - **Name:** `@`
   - **IPv4 address:** `99.83.231.61`
   - **Proxy status:** **Proxied** (narancs felhő)
   - **Save**

   **CNAME rekord (www):**
   - **Type:** `CNAME`
   - **Name:** `www`
   - **Target:** `A-NETLIFY-SITE-URL.netlify.app`  
     → **Ide a Step 2-ben kapott Netlify URL-t írd** (pl. `amazing-name-12345.netlify.app`), **https:// és záró percel ne írd**, csak a hostnevet.
   - **Proxy status:** **Proxied** (narancs felhő)
   - **Save**

5. Ellenőrizd, hogy mindkét A rekord és a CNAME megvan, és a proxy (narancs felhő) be van kapcsolva.

---

## Step 7: SSL (HTTPS) beállítása a Cloudflare-nél

1. A Cloudflare dashboardon a site kiválasztása után bal oldalt: **SSL/TLS**.
2. **Overview** fülön az **SSL/TLS encryption mode** legyen: **Full (strict)**.
3. Ha **Full** vagy **Flexible** van, válaszd át **Full (strict)**-re. Ezzel a böngésző–Cloudflare és a Cloudflare–Netlify kapcsolat is titkosított marad.

---

## Step 8: HTTPS tanúsítvány a Netlify-on

1. Menj vissza a Netlify dashboardra → a site → **Domain management**.
2. A custom domain (pl. `kikuldetespdf.hu`) mellett a **HTTPS** státusz előbb **Pending** lehet. A Netlify a DNS propagálás után (Step 5–6) automatikusan kér Let’s Encrypt tanúsítványt.
3. Ha **24 óra** után is **Pending** marad:
   - A Cloudflare **DNS** → **Records** alatt kapcsold **ideiglenesen** a proxy-t **DNS only** (szürke felhő) értékre mindkét A rekordnál és a CNAME-nél.
   - Várj 10–30 percet, majd a Netlify-nál kattints a **Verify DNS configuration** / **Renew certificate** jellegű gombra.
   - Ha a Netlify **Certificate: Verified** lett, kapcsold vissza a Cloudflare rekordokat **Proxied** (narancs felhő) állapotra.

---

## Step 9: Ellenőrzés

1. **DNS:** [whatsmydns.net](https://www.whatsmydns.net) – keresd meg a domain nevedet; az A rekordoknak a fenti két IP-re kell mutatniuk (vagy Cloudflare IP-kre, ha proxy be van kapcsolva).
2. **Netlify:** **Domain management** alatt a custom domain mellett a **HTTPS** legyen **Verified**.
3. **Böngésző:** nyisd meg `https://kikuldetespdf.hu` és `https://www.kikuldetespdf.hu` – mindkettő a Netlify site-odra kell, hogy mutasson, HTTPS-sel.

---

## Gyors ellenőrzőlista

- [ ] **Step 1:** Projekt a GitHubon, pusholva (pl. `main` branch).
- [ ] **Step 2:** Netlify site létrejött, build sikeres, site URL kimásolva (pl. `xxx.netlify.app`).
- [ ] **Step 3:** Netlify Domain management: hozzáadva a domain (pl. `kikuldetespdf.hu` és `www.kikuldetespdf.hu`).
- [ ] **Step 4:** Cloudflare: site hozzáadva, nameszerverek megjelennek.
- [ ] **Step 5:** Rackhost: nameszerverek átállítva a Cloudflare NS-ekre.
- [ ] **Step 6:** Cloudflare DNS: két A rekord `@` → `75.2.60.5` és `99.83.231.61`; CNAME `www` → `[site].netlify.app`; proxy **Proxied**.
- [ ] **Step 7:** Cloudflare SSL: **Full (strict)**.
- [ ] **Step 8:** Netlify HTTPS: **Verified** (vagy Pending után proxy kikapcsolva, majd visszakapcsolva).
- [ ] **Step 9:** Böngészőben mindkét URL működik HTTPS-sel.

---

## Későbbi frissítések

Ha a kódot a GitHubon frissíted (`git add .` → `git commit -m "..."` → `git push`), a Netlify automatikusan újra buildel és deployol. Nincs külön lépés a Netlify-on, ha a GitHub deploy be van állítva.

---

## Hibaelhárítás

- **Build failed a Netlify-on:** Ellenőrizd a **Build log**-ot. Gyakori: hiányzó dependency → a `package-lock.json` legyen commitolva; Node verzió → a `netlify.toml`-ban a `NODE_VERSION = "20"` szerepel.
- **Domain nem oldódik meg:** Várj 24–48 órát a nameszerver propagálásra; ellenőrizd a [whatsmydns.net](https://www.whatsmydns.net)-en.
- **HTTPS Pending a Netlify-on:** Lásd Step 8 – proxy ideiglenesen **DNS only**, majd tanúsítvány ellenőrzés után vissza **Proxied**.

Ha megmondod, melyik lépésnél tartasz (pl. „Step 5, Rackhost”), a Rackhost menüpontok neve alapján pontosabb szöveget is tudunk írni (saját felületük változhat).
