import { Header } from "~/components/common/layout/header/header";

export default function MainLayout(props: { children: React.ReactNode }) {
  return (
    <div className="flex w-full grow flex-col gap-10">
      <Header />
      <main className="flex w-full grow items-center justify-center">
        {props.children}
      </main>
    </div>
  );
}
