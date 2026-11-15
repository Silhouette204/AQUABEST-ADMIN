# AquaBest Admin Web: Handoff (Frontend → Backend)

Layout at UI pa lang ang tapos. **Hardcoded pa ang lahat ng data** at wala pang totoong function. Ang layunin ng dokumentong ito ay ipakita kung saan papasok ang API para hindi na kailangang basahin ang buong UI.

Stack ng web: Next.js (App Router) + React + Tailwind v4 + TypeScript strict + pnpm.

---

## 1. Paano nakaayos ang bawat page

Pareho ang pattern ng lahat ng pages:

```
components/main-dashboard/<page>/
├── <page>.ts        ← types + hardcoded data + style maps (WALANG JSX)
├── <Page>Page.tsx   ← layout, state, at mga handler (may TODO)
└── <mga component>  ← presentational lang; tumatanggap ng props, walang fetch
```

- **Ang `<page>.ts` ang data contract.** Dito makikita kung anong hugis ng data ang inaasahan ng UI.
- **Ang mga component ay props lang ang tinatanggap.** Hindi mo kailangang galawin ang itsura para ikabit ang API.
- **Ang Page file lang ang may state at handlers.** Hanapin ang `TODO` sa buong project para sa lahat ng lugar na kailangan ng API.

Mga page: `orders`, `dispatch`, `deliveries`, `riders`, at `shared` (para sa `DataState`).

---

## 2. Ano ang papalitan at saan

| Page | Hardcoded na papalitan | Posibleng endpoint (palitan) | Handler na i-wire |
|---|---|---|---|

| Orders | `ORDERS` | `GET /orders` (status, type, rider, date, search, page) | Assign Rider, Edit order, Cancel order, New Walk-in Order |


| Dispatch | `UNASSIGNED`, `RIDERS` | `GET /orders?status=pending`, `GET /riders` | `handleAssign` |
| Dispatch (mapa) | posisyon ng riders at ruta | WebSocket (live rider location) | state ng `riders` |

| Deliveries | `DELIVERIES`, `STATS` | `GET /deliveries`, `GET /deliveries/stats` | `handleVerify` |

| Riders | `RIDERS`, `RIDER_STATS` | `GET /riders`, `GET /riders/stats` | Create rider account, Edit rider account |

| Customers | `CUSTOMERS`, `CUSTOMER_STATS` | GET /customers, GET /customers/stats, GET /customers/:id/orders, GET /customers/:id/gallons | Add customer, Edit profile |

| Inventory | `PRODUCTS`, `ADJUSTMENTS`, `INVENTORY_STATS` | GET /products, GET /products/stats, GET /inventory/adjustments | Add/Edit product, Adjust stock |

| Payments | `PAYMENTS`, `PAYMENT_STATS` | GET /payments (status, method, date, search, page), GET /payments/stats | Record payment, Verify payment, Export |

### Mga button na itsura pa lang (walang logic)

- Orders: Export, New Walk-in Order, Assign Rider, Edit order, Cancel order, filters, search, pagination
- Dispatch: Refresh map, Layers, tab na Active Deliveries (placeholder pa)
- Deliveries: Export deliveries, View full route, Reschedule delivery, Contact customer, filters, search
- Riders: Create rider account, Edit (sa table), Edit rider account, More filters, search

---

## 3. Mga kailangan namin sa response

Hindi eksaktong pareho ang shape ng UI types at ng Prisma. Ito ang mga inaasahan namin, at ang mapper sa frontend ang mag-aayos ng natitira.

| Nasa UI ngayon | Malamang sa backend | Ano ang kailangan |
|---|---|---|
| `scheduledAt: "Today, 11:00 AM"` | `DateTime` | ISO string. Kami ang magfo-format sa Asia/Manila |
| `unitPrice`, `total`, `deliveryFee` bilang `number` | Prisma `Decimal` (nagiging string sa JSON) | Number sa response, o sabihin kung string para mai-convert namin |
| `status: "out_for_delivery"` | enum, madalas `OUT_FOR_DELIVERY` | Ilista ang **eksaktong enum values** |
| `customerName`, `address` | nested na `customer` | OK lang. Ifa-flatten namin sa mapper |
| `rider: string \| null` | `rider: { id, name } \| null` | OK lang |
| `id: "AB-1048"` | internal id at display code | Parehong i-send (id at code) |
| `timeline` (order) | status history / events | Hingin bilang listahan ng events, o sabihin kung derived |
| `gps` (delivery) | GPS points table | Listahan ng `{ label, time, lat, lng }` |
| Tab counts, stats cards | hiwalay na endpoint | **Backend ang magbibilang**, hindi client |
| "Showing 1-8 of 48" | pagination meta | `page`, `limit`, `total` |
| `proofPhotoUrl` | file storage | URL lang ng larawan (o `null` kung wala pa) |

### Mga enum na ginagamit ng UI ngayon

- Order status: `pending`, `assigned`, `out_for_delivery`, `delivered`, `failed`
- Payment status: `pending`, `paid`, `unverified`
- Order type: `online`, `walk_in`
- Rider availability: `available`, `busy`, `offline`

Sabihin lang kung iba ang gagamitin at ia-update namin ang mapper.

---

## 4. Loading, error, at empty states

Ginagamit ng bawat table at listahan ang `DataState` (`components/main-dashboard/shared/DataState.tsx`).

Hanapin ang `getViewState(...)` sa bawat page at palitan ang hardcoded na `isLoading` at `isError` ng totoong galing sa fetch. Hindi na kailangang gumawa ng bagong UI.

---

## 5. Auth

- better-auth sa web (React client), pareho ng mobile.
- Magkaibang domain ang web (Vercel) at API (Railway), kaya kailangan ng:
  - CORS na may `credentials: true` at tamang `origin`
  - Session cookie na `SameSite=None; Secure`
  - `credentials: "include"` sa client
- Dapat i-check ng **backend** ang admin role. Hindi sapat ang proteksyon sa web.

---

## 6. Types

Gusto naming gamitin ang Hono RPC (`hc<AppType>`) para hindi na sulatin sa kamay ang types, tulad ng mobile.

**Tanong:** magkakahiwalay ang repos, kaya paano ibabahagi ang `AppType` (o OpenAPI types) sa web?

Mga posibleng paraan:
1. Package ng types (git dependency o published) mula sa backend
2. `openapi.json` ng `@hono/zod-openapi`, tapos `openapi-typescript` sa web para mag-generate ng types

Kapag nagbago ang response sa backend, dapat magkaroon agad ng TypeScript error sa web.

---

## 7. Mapa

Leaflet + OpenStreetMap pa ang nasa `DispatchMap.tsx`, pansamantala lang. Google Maps ang plano, kaya papalitan ang loob ng component.

- Parehong props ang gagamitin (`riders`, `orders`, `route`), kaya hindi madadamay ang page at ang listahan.
- Hardcoded pa ang `ROUTE` at posisyon ng riders.
- Live location: WebSocket na mag-a-update lang ng `riders` state.

---

## 8. Mga bagay na hindi pa tapos

- Walang totoong filters, search, at pagination
- Walang modal para sa Create at Edit rider, Edit order, at New Walk-in Order
- Walang toast sa assign at verify
- Walang login screen at proteksyon ng pages (planong `proxy.ts` sa Next 16)
- Ang stats cards at kanang panel (Proof of delivery, Profile, Performance) ay wala pang sariling skeleton
- Hindi pa kumpleto ang lahat ng screens ng admin (Customers, Products & Inventory, Gallon Tracking, Payments, at iba pa)

---

## 9. Kulay

Nasa `:root` ang palette. Huwag mag-hardcode ng kulay sa component:

```css
--primary: #F5F7FA;    /* page background, hover */
--secondary: #0B3B5C;  /* text, sidebar */
--tertiary: #0EA5E9;   /* accent: buttons, links, active tab */
```

Ang amber, emerald, at red ay para lang sa status (pending, delivered, failed). Hex ang gamit sa mapa (marker at ruta) dahil hindi nababasa ng Leaflet ang CSS variable sa SVG line, kaya dapat tumugma ang hex sa `--tertiary`.