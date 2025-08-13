import { StreamView } from '@/app/components/StreamView'
interface CreatorPageProps {
   params: {
      creatorId: string
   }
}
export default async function ({
   params,
}: {
   params: Promise<{ creatorId: string }>
}) {
   const { creatorId } = await params
   return <StreamView creatorId={creatorId} />
}
