import { useToast } from '@apideck/components'
import ChatCompletionRequestMessage from 'openai'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { sendMessage } from './sendMessage'

const ChatsContext = createContext({})

export function MessagesProvider({ children }) {
  const { addToast } = useToast()
  const [messages, setMessages] = useState([])
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false)

  useEffect(() => {
    const initializeChat = () => {
      const systemMessage = {
        role: 'system',
        content: 'You are ChatGPT, a large language model trained by OpenAI.'
      }
      const welcomeMessage = {
        role: 'assistant',
        content: 'Hi, How can I help you today?'
      }
      setMessages([systemMessage, welcomeMessage])
    }

    // When no messages are present, we initialize the chat the system message and the welcome message
    // We hide the system message from the user in the UI
    if (!messages?.length) {
      initializeChat()
    }
  }, [messages?.length, setMessages])

  const addMessage = async (content) => {
    setIsLoadingAnswer(true)
    try {
      const newMessage = {
        role: 'user',
        content
      }
      const newMessages = [...messages, newMessage]

      // Add the user message to the state so we can see it immediately
      setMessages(newMessages)

      const { data } = await sendMessage(newMessages)
      const reply = data.choices[0].message

      // Add the assistant message to the state
      setMessages([...newMessages, reply])
    } catch (error) {
      console.log(error);
      // Show error when something goes wrong
      addToast({ title: 'An error occurred', type: 'error' })
    } finally {
      setIsLoadingAnswer(false)
    }
  }

  return (
    <ChatsContext.Provider value={{ messages, addMessage, isLoadingAnswer }}>
      {children}
    </ChatsContext.Provider>
  )
}

export const useMessages = () => {
  return useContext(ChatsContext)
}