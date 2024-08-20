import Link from "next/link";

export default ({ currentUser }) => {
  const links = [
    !currentUser && { label: "Sign Up", link: "/auth/signup" },
    !currentUser && { label: "Sign In", link: "/auth/signin" },
    currentUser && { label: "Sign Out", link: "/auth/signout" },
  ]
    .filter((linkconfig) => linkconfig)
    .map(({ label, link }) => {
      return <Link href={link}>{label}</Link>;
    });
  return (
    <nav className="flex w-full">
      <Link href="/">E-Ticket</Link>
      <div className="flex float-end items-end justify-end">{links}</div>
    </nav>
  );
};
