"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import { MARKER_COLOR, type DispatchOrder, type Rider } from "./dispatch";

const CENTER: [number, number] = [14.6765, 121.0437]; // San Isidro, Quezon City

const dot = (color: string) =>
  L.divIcon({
    className: "",
    html: `<div style="background:${color}" class="h-4 w-4 rounded-full border-2 border-white shadow"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });

interface Props {
  riders: Rider[];
  orders: DispatchOrder[];
  route?: [number, number][];
}

export default function DispatchMap({ riders, orders, route }: Props) {
  return (
    <MapContainer center={CENTER} zoom={15} zoomControl={false} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {route && <Polyline positions={route} pathOptions={{ color: MARKER_COLOR.rider, weight: 4 }} />}

      {orders.map((o) => (
        <Marker key={o.id} position={[o.lat, o.lng]} icon={dot(MARKER_COLOR[o.state])}>
          <Popup>
            #{o.id} · {o.customerName}
          </Popup>
        </Marker>
      ))}

      {riders.map((r) => (
        <Marker key={r.id} position={[r.lat, r.lng]} icon={dot(MARKER_COLOR.rider)}>
          <Popup minWidth={240}>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-xs font-semibold text-sky-700">
                  {r.initials}
                </span>
                <div>
                  <p className="font-semibold leading-tight">{r.name}</p>
                  <p className="text-xs text-gray-500">
                    {r.vehicle} · {r.plate}
                  </p>
                </div>
              </div>
              {r.currentDelivery && (
                <>
                  <span className="inline-block rounded-full bg-sky-50 px-2 py-0.5 text-xs text-sky-600">
                    Out for Delivery
                  </span>
                  <p>{r.currentDelivery}</p>
                  <p className="text-xs text-gray-500">Last update: {r.lastUpdate}</p>
                </>
              )}
              <p className="text-xs font-medium text-sky-600">
                {r.activeOrders} current deliveries · View route →
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}