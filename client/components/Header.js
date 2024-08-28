import Link from "next/link";

export default function Navbar({ currentUser }) {
  const links = [
    !currentUser && { label: "Sign Up", link: "/auth/signup" },
    !currentUser && { label: "Sign In", link: "/auth/signin" },
    currentUser && { label: "Sign Out", link: "/auth/signout" },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, link }) => (
      <div key={link} className="ml-4">
        <Link href={link} className="text-white hover:underline">
          {label}
        </Link>
      </div>
    ));

  return (
    <nav className="flex items-center justify-between bg-orange-400 p-4">
      <div className="text-white text-lg font-semibold">
        <Link href="/">E-Ticket</Link>
      </div>
      <div className="flex items-center">{links}</div>
    </nav>
  );
}
