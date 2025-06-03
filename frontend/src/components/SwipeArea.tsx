import TinderCard from 'react-tinder-card'
import useMatchStore from '../stores/useMatchStore'

type SwipeHandler = 'left' | 'right' | 'up' | 'down'
const SwipeArea = () => {
  const userProfiles = useMatchStore((state) => state.userProfiles)
  const swipeRight = useMatchStore((state) => state.swipeRight)
  const swipeLeft = useMatchStore((state) => state.swipeLeft)
  const handleSwipe = (dir: SwipeHandler, userId: string) => {
    switch (dir) {
      case 'right':
        swipeRight(userId)
        return
      case 'left':
        swipeLeft(userId)
        return
      default:
        throw new Error('Invalid direction')
    }
  }
  return (
    <div className="relative w-full max-w-sm  h-[28rem]">
      {userProfiles.map((user) => (
        <TinderCard
          className="absolute shadow-none"
          key={user.id}
          onSwipe={(dir: SwipeHandler) => handleSwipe(dir, user.id)}
          swipeRequirementType="position"
          swipeThreshold={100}
          preventSwipe={['up', 'down']}
        >
          <div className="card bg-white w-96 select-none rounded-lg overflow-hidden border border-gray-200">
            <figure className="px-4 pt-4 h-3/4">
              <img
                src={user.image || '/avatar.png'}
                alt={user.name}
                className="rounded-lg object-cover h-full pointer-events-none"
              />
            </figure>
            <div className="card-body bg-gradient-to-b from-white to-pink-50">
              <h2 className="card-title text-2xl text-gray-800">
                {user.name}, {user.age}
              </h2>
              <p className="text-gray-600">{user.bio}</p>
            </div>
          </div>
        </TinderCard>
      ))}
    </div>
  )
}

export default SwipeArea
