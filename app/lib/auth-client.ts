import { createAuthClient } from 'better-auth/react' // make sure to import from better-auth/react

export const authClient = createAuthClient()

export const signUp = async () => {
   try {
      const data = await authClient.signIn.social({
         provider: 'google',
         callbackURL: '/dashboard',
      })
      console.log(data)
      return data
   } catch (error) {
      console.error(error)
   }
}
