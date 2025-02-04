import { NavLink } from "react-router-dom";

type MenuItemProps = {
  label: string;
  link: string;
}

export default function MenuItem({ label, link }: MenuItemProps): JSX.Element {
  const menuStyle = 'nav__item';
  const menuStyleActive = 'nav__item_active';

  return (
    <NavLink className={({ isActive }) => isActive ? menuStyleActive : menuStyle} to={link}>
      {label}
    </NavLink>
  );
}