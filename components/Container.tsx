'use client'

interface Props {
    children: React.ReactNode
}

const Container = ({children}: Props) => {
  return (
    <div className="max-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 xs:px-4">
      {children}
    </div>
  )
}

export default Container
