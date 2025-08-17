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
   songByUserId: string
   upVote: number
   haveVoted: boolean
}

export interface VoteParams {
   id: string
   isUpVote: boolean
}
