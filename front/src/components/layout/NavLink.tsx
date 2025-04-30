interface NavLinkProps {
    label: string
    link: string
}

const NavLink = ({label, link}: NavLinkProps) => {
  return (
    <a href={link} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">{label}</a>
  )
}

export default NavLink