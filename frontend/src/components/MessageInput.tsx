import { useEffect, useRef, useState } from 'react'
import useMessageStore from '../stores/useMessageStore'
import { Send, Smile } from 'lucide-react'
import EmojiPicker from 'emoji-picker-react'
const MessageInput = ({ userMatchId }: { userMatchId: string }) => {
  const [message, setMessage] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const emojiPickerRef = useRef<HTMLDivElement | null>(null)
  const sendMessage = useMessageStore((state) => state.sendMessage)

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (message.trim()) {
      sendMessage(userMatchId, message)
      setMessage('')
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleToggleEmoji = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setShowEmojiPicker(true)
  }
  return (
    <form onSubmit={handleSendMessage} className="flex relative">
      <button
        type="button"
        onClick={handleToggleEmoji}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-slate-500 focus:outline-none"
      >
        <Smile size={24} />
      </button>
      <input
        type="text"
        value={message}
        onChange={handleChange}
        className="flex-grow p-3 text-slate-500 pl-12 rounded-l-lg border-2 border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
        placeholder="Type a message..."
      />
      <button
        type="submit"
        className="bg-slate-500 text-white p-3 rounded-r-lg hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300"
      >
        <Send size={24} />
      </button>
      {showEmojiPicker && (
        <div ref={emojiPickerRef} className="absolute bottom-20 left-4">
          <EmojiPicker
            onEmojiClick={(emojiObject) => {
              setMessage((prevMessage) => prevMessage + emojiObject.emoji)
            }}
          />
        </div>
      )}
    </form>
  )
}

export default MessageInput
