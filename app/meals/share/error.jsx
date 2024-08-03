"use client";

import React from "react";

export default function Error({ error }) {
  console.log("Teste", error.message);

  return (
    <main className="error">
      <h1>An erro ocurred!</h1>
      <p>Failed to create a meal.</p>
    </main>
  );
}
