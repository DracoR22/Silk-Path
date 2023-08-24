export default async function NotificationsLayout({
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