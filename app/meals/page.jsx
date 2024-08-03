import classes from "./page.module.css";
import React, { Suspense } from "react";
import Link from "next/link";
import { headers } from "next/headers";
import MealsGrid from "@/components/meals/MealsGrid";
import { getMeals } from "@/meals";


export const metadata = {
  title: "All Meals",
  description: "Browse the delicious meals shared by our vibrant community.",
};

async function MealsGet() {
  const meals = await getMeals();

  return <MealsGrid meals={meals} />;
}

export default function Meals() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicius meals, created{" "}
          <span className={classes.highlight}> by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share your Favorite Recipe</Link>
        </p>
      </header>
      <main className={headers.main}>
        <Suspense
          fallback={<p className={classes.loading}>Fetching meals ...</p>}
        >
          <MealsGet />
        </Suspense>
      </main>
    </>
  );
}
