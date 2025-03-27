import UnitConverter from "@/components/unit-converter";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="w-full max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-slate-800 dark:text-slate-100">
          Unit Converter
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-center mb-8">
          Convert between different units of measurement with ease
        </p>
        <UnitConverter />
      </div>
    </main>
  );
}
