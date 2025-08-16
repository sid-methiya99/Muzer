export interface Video {
   id: string
   streamerId: string
   type: string
   active: boolean
   url: string
   title: string
   smallImg: string
   bigImg: string
   extractedId: string
   spaceId: string
   spaceUsers: SpaceUsers[]
}

interface SpaceUsers {
   id: string
   userId: string
   haveVoted: boolean
   streamerId: string
}
