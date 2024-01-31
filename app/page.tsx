import Reference from "./components/Reference"

export default function Home() {
  return (
    <main className="flex h-full min-h-screen w-full max-w-7xl flex-col items-center px-4 pt-20 lg:min-h-0 lg:pt-32">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Reference />
    </main>
  );
}
