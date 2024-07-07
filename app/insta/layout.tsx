import Navbar from "@/components/navbar/navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {/* <Navbar /> */}
      {children}
      <div className="text-center mb-8 text-sm text-[#444444]">
        Made with ❤ in India
      </div>
    </div>
  );
}
