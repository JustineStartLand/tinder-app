import { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import useMatchStore from '../stores/useMatchStore'
import Header from '../components/Header'
import { Frown } from 'lucide-react'
import SwipeArea from '../components/SwipeArea'
import { SwipeFeedback } from '../components/SwipeFeedback'
import useAuthStore from '../stores/useAuthStore'

const LoadingUI = () => {
  return (
    <div className="relative w-full max-w-sm h-[28rem]">
      <div className="card bg-white w-96 rounded-lg overflow-hidden border border-gray-200 shadow-sm h-[28rem]">
        <div className="px-4 pt-4 h-3/4">
          <div className="w-full h-full bg-gray-200 rounded-lg" />
        </div>
        <div className="card-body bg-gradient-to-b from-white to-slate-50 p-4">
          <div className="space-y-2">
            <div className="h-6 bg-ray-200 rounded w-3/4" />
            <div className="h-6 bg-ray-200 rounded w-1/2" />
          </div>
        </div>
      </div>
    </div>
  )
}

const NoMoreProfiles = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <Frown className="text-slate-400 mb-6" size={80} />
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Woah there, speedy fingers!
      </h2>
      <p className="text-xl text-gray-600 mb-6">
        Bro are you OK? Maybe it's time to touch some grass.
      </p>
    </div>
  )
}
const HomePage = () => {
  const getUserProfiles = useMatchStore((state) => state.getUserProfiles)
  const isFetchingUserProfiles = useMatchStore(
    (state) => state.isFetchingUserProfiles
  )
  const userProfiles = useMatchStore((state) => state.userProfiles)
  const subscribeToNewMatches = useMatchStore(
    (state) => state.subscribeToNewMatches
  )
  const unsubscribeFromNewMatches = useMatchStore(
    (state) => state.unsubscribeFromNewMatches
  )

  const authUser = useAuthStore((state) => state.authUser)
  useEffect(() => {
    getUserProfiles()
  }, [getUserProfiles])

  useEffect(() => {
    if (authUser) {
      subscribeToNewMatches()
    }
    return () => {
      unsubscribeFromNewMatches()
    }
  }, [subscribeToNewMatches, unsubscribeFromNewMatches, authUser])

  return (
    <div className="flex flex-col lg:flex-row text-black min-h-screen bg-gradient-to-br from-slate-100 to-slate-100 overflow-hidden">
      <Sidebar />
      <div className="flex-grow flex flex-col overflow-hidden">
        <Header />
        <main className="flex overflow-y-scroll flex-grow flex-col gap-10 justify-center items-center p-4 relative overflow-hidden">
          {userProfiles.length > 0 && !isFetchingUserProfiles && (
            <>
              <SwipeArea />
              <SwipeFeedback />
            </>
          )}
          {!isFetchingUserProfiles && userProfiles.length === 0 && (
            <NoMoreProfiles />
          )}

          {isFetchingUserProfiles && <LoadingUI />}
        </main>
      </div>
    </div>
  )
}

export default HomePage
