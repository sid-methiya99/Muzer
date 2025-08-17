import { StreamView } from '@/app/components/StreamView'

export default async function Dashboard({
   params,
}: {
   params: Promise<{ spaceId: string }>
}) {
   const { spaceId } = await params
   return <StreamView spaceId={spaceId} />
}
