import Header from '../components/Header'
import useAuthStore from '../stores/useAuthStore'
import useMessageStore from '../stores/useMessageStore'
import useMatchStore from '../stores/useMatchStore'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Loader, UserX } from 'lucide-react'
import MessageInput from '../components/MessageInput'
import { useShallow } from 'zustand/react/shallow'
const MatchNotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 bg-opacity-50 bg-dot-pattern">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <UserX size={64} className="mx-auto text-slate-500 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Match Not Found
        </h2>
        <p className="text-gray-600">
          Oops! It seems this match doesn't exist or has been removed
        </p>
        <Link
          to="/"
          className="mt-6 px-4 py-2 bg-slate-500 text-white rounded hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-300 inline-block"
        >
          Go Back To home
        </Link>
      </div>
    </div>
  )
}

const LoadingMessagesUI = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <Loader
          size={48}
          className="mx-auto text-slate-500 animate-spin mb-4"
        />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Loading Chat
        </h2>
        <p className="text-gray-600">
          Please wait while we fetch your conversation...
        </p>
        <div className="mt-6 flex justify-center space-x-2">
          <div
            className="size-3 bg-slate-500 rounded-full animate-bounce"
            style={{ animationDelay: '0s' }}
          ></div>
          <div
            className="size-3 bg-slate-500 rounded-full animate-bounce"
            style={{ animationDelay: '0.4s' }}
          ></div>
          <div
            className="size-3 bg-slate-500 rounded-full animate-bounce"
            style={{ animationDelay: '0.6s' }}
          ></div>
        </div>
      </div>
    </div>
  )
}
const ChatPage = () => {
  const {
    messages,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useMessageStore(
    useShallow((state) => ({
      messages: state.messages,
      getMessages: state.getMessages,
      subscribeToMessages: state.subscribeToMessages,
      unsubscribeFromMessages: state.unsubscribeFromMessages,
    }))
  )

  const { matches, isFetchingMatches, getMyMatches } = useMatchStore(
    useShallow((state) => ({
      matches: state.matches,
      isFetchingMatches: state.isFetchingMatches,
      getMyMatches: state.getMyMatches,
    }))
  )

  const authUser = useAuthStore((state) => state.authUser)
  const { id } = useParams()
  const match = matches.find((match) => match.id === id)

  useEffect(() => {
    if (authUser && id) {
      getMyMatches()
    }
  }, [getMyMatches, authUser, id])

  useEffect(() => {
    if (id) {
      getMessages(id)
      subscribeToMessages()
    }
    return () => {
      unsubscribeFromMessages()
    }
  }, [getMessages, id, subscribeToMessages, unsubscribeFromMessages])

  if (isFetchingMatches) return <LoadingMessagesUI />
  if (!match) return <MatchNotFound />
  return (
    <div className="flex flex-col h-screen bg-gray-100 bg-opacity-50">
      <Header />
      <div className="flex-grow flex flex-col p-4 md:p-6 lg:p-8 overflow-hidden max-w-4xl mx-auto w-full">
        <div className="flex items-center mb-4 bg-white rounded-lg shadow p-3">
          <img
            src={match.image || '/avatar.png'}
            alt="Avatar"
            className="size-12 object-cover rounded-full mr-3 border-2 border-slate-300"
          />
          <h2 className="text-xl font-semibold text-gray-800">{match.name}</h2>
        </div>

        <div className="flex-grow overflow-y-auto mb-4 bg-white rounded-lg shadow p-4">
          {messages.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              Start your conversation with {match.name}
            </p>
          ) : (
            messages.map((message) => (
              <div
                key={`${message.id} + ${message.content}`}
                className={`mb-3 ${
                  message.senderId === authUser!.id ? 'text-right' : 'text-left'
                }`}
              >
                <span
                  className={`inline-block p-3 rounded-lg max-w-xs lg:max-w-md ${
                    message.senderId === authUser!.id
                      ? 'bg-slate-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {message.content}
                </span>
              </div>
            ))
          )}
        </div>
        <MessageInput userMatchId={match.id} />
      </div>
    </div>
  )
}

export default ChatPage
