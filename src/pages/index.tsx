import Layout from 'components/Layout'
import MessageForm from '../components/MessageForm'
import MessagesList from '../components/MessagesList'
import { NextPage } from 'next'
import { MessagesProvider } from 'utils/useMessages'

const IndexPage: NextPage = () => {
  return (
    <MessagesProvider>
      <Layout>
        <MessagesList />
        <div className="fixed bottom-0 right-0 left-0">
          <MessageForm />
        </div>
      </Layout>
    </MessagesProvider>
  )
}
export default IndexPage