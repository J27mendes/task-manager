import { tv } from 'tailwind-variants'

const SidebarButton = ({ children, color }) => {
  const sideBarButton = tv({
    base: 'flex items-center gap-2 rounded-lg px-6 py-3',
    variants: {
      color: {
        unselected: 'text-brend-darkGrey',
        selected: 'bg-brend-lightGreen text-brend-primary',
      },
    },
  })

  return (
    <a href="#" className={sideBarButton({ color })}>
      {children}
    </a>
  )
}

export default SidebarButton
