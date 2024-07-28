import React from "react";

export default function MealDetails({ params }) {
  return (
    <main>
      <h1>MealDetails</h1>
      <p>{params.id}</p>
    </main>
  );
}
