import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div dir="rtl" className="flex  min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>טקטופ בוט</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-6xl font-bold">
          ברוך הבא ל{" "}
          <a className="text-blue-600" href="https://nextjs.org">
            רמקולים בע"מ
          </a>
        </h1>

        <p className="mt-3 text-2xl">
          <code className="rounded-md bg-gray-100 p-3 font-mono text-lg">מתקדם תכנון מערכות בעזרת AI </code>
          קונים חכם רמקולים
        </p>

        <div className=" mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <a
            href="https://www.facebook.com/ido.moshe1"
            className="mt-6 w-96 rounded-xl border p-6  hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">נסה את הבוט &rarr;</h3>
            <p className="mt-4 text-xl">בנה מערכת מותאמת בעזרת טכנולוגיית AI</p>
          </a>

          {/* <a
            href="https://www.facebook.com/ido.moshe1"
            className="mt-6 w-96 rounded-xl border p-6  hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">למד עלינו &rarr;</h3>
            <p className="mt-4 text-xl">אנחנו גברים אחושרמוטה, ליותר אגו טריפ, כנס פנימה</p>
          </a> */}

          <a href="/bidding" className="mt-6 w-96 rounded-xl border p-6  hover:text-blue-600 focus:text-blue-600">
            <h3 className="text-2xl font-bold"> BidBad &rarr;</h3>
            <p className="mt-4 text-xl"> הימורים בין חברים, שהם אוייבים</p>
          </a>

          <a
            href="https://www.facebook.com/ido.moshe1"
            className="mt-6 w-96 rounded-xl border p-6  hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">תרום לעידו שקל &rarr;</h3>
            <p className="mt-4 text-xl">אין מה להרחיב, תרמו למי שבאמת צריך</p>
          </a>

          <a
            href="https://www.facebook.com/ido.moshe1"
            className="mt-6 w-96 rounded-xl border p-6  hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">חנות של פעם &rarr;</h3>
            <p className="mt-4 text-xl">כנס לפה אם אתה בטוח שאתה יודע מה אתה רוצה</p>
          </a>
        </div>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <div> footer </div>
      </footer>
    </div>
  );
};

export default Home;
