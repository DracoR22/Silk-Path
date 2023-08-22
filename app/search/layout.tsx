
export default async function UsersLayout({
    children
}: {
    children: React.ReactNode
}) {

    return (
        <div className="mx-10 my-6">
          {children}
        </div>
    )
}