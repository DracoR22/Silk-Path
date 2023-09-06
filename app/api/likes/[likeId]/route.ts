import getCurrentUser from "@/actions/getCurrentUser"

export async function DELETE(req: Request, { params }: { params: { likeId: string }}) {
    try {
        const { likeId } = params
        const currentUser = await getCurrentUser()
    } catch (error) {
        
    }
}