import InvitationContentImage from '../assets/invitation-content.png'
import InvitationCoverImage from '../assets/invitation-cover.png'
import InvitationCoverInsideImage from '../assets/invitation-cover-under.png'
import { FlipUpCard } from '../components/FlipUpCard'

const WeddingInvitationPage = () => {
  return (
    <div className='flex flex-col items-center h-screen'>
      <h1 className='text-3xl sm:text-4xl font-bold mt-18 mb-24'>
        Wedding Invitation
      </h1>
      <div>
        <FlipUpCard
          coverSrc={InvitationCoverImage}
          insideSrc={InvitationContentImage}
          coverInsideSrc={InvitationCoverInsideImage}
        />
      </div>
    </div>
  )
}

export default WeddingInvitationPage
