import { FunctionComponent } from 'react'

interface NavbarItemProps {
  label: string
}

export const NavbarItem: FunctionComponent<NavbarItemProps> = ({ label }) => {
  return (
    <div className="text-white cursor-pointer hover:text-gray-300 transition">
      {label}
    </div>
  )
}
