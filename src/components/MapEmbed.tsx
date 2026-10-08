"use client";

import { useState } from "react";
import Icon from "./Icon";

/**
 * Google Maps loads ~20 scripts and ~1.5 MB. Show a lightweight placeholder
 * and only load the real map when the visitor asks for it.
 */
export default function MapEmbed({ query, label }: { query: string; label: string }) {
  const [show, setShow] = useState(false);
  const q = encodeURIComponent(query);

  if (show) {
    return (
      <div className="map">
        <iframe
          title={`Map showing ${label}`}
          src={`https://www.google.com/maps?q=${q}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    );
  }

  return (
    <div className="map map--placeholder">
      <div className="map__grid" aria-hidden="true" />
      <span className="map__pin" aria-hidden="true">
        <Icon name="pin" size={28} strokeWidth={2} />
      </span>
      <p className="map__label">{label}</p>
      <div className="map__actions">
        <button type="button" className="btn btn--dark btn--sm" onClick={() => setShow(true)}>
          Show map
        </button>
        <a className="btn btn--sm map__open" href={`https://www.google.com/maps/search/?api=1&query=${q}`} target="_blank" rel="noopener noreferrer">
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}
