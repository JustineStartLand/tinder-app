import useMatchStore from '../stores/useMatchStore'
import type { TSwipeFeedback } from '../types/Stores.type'

const getFeedbackProperties = (swipeFeedback: TSwipeFeedback) => {
  switch (swipeFeedback) {
    case 'liked':
      return {
        feedBackStyle: 'text-green-500',
        feedBackText: 'Liked',
      }
    case 'passed':
      return {
        feedBackStyle: 'text-red-500',
        feedBackText: 'Passed',
      }
    case 'matched':
      return {
        feedBackStyle: 'text-slate-500',
        feedBackText: "It's a match!",
      }
    default:
      return
  }
}

export const SwipeFeedback = () => {
  const swipeFeedback = useMatchStore((state) => state.swipeFeedback)
  const feedbackProperties = getFeedbackProperties(swipeFeedback)
  const feedBackText = !feedbackProperties
    ? ''
    : feedbackProperties.feedBackText
  return (
    <div
      className={`absolute top-10 left-0 right-0 text-center text-2xl font-bold ${feedbackProperties?.feedBackStyle}`}
    >
      {feedBackText}
    </div>
  )
}
