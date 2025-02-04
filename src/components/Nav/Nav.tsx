import { NavItem } from '../../components';

const Nav = () => {
  const menuItems = [
    { label: "Поиск", link: "/" },
    { label: "Избранное", link: "/favorites" },
  ];

  return (
    <nav className="nav">
      {menuItems.map(({ label, link }) => (
        <NavItem key={label} label={label} link={link} />
      ))}
    </nav>
  );
}

export default Nav;