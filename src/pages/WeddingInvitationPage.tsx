import InvitationContentImage from '../assets/invitation-content.png'
import InvitationCoverImage from '../assets/invitation-cover.png'
import InvitationCoverInsideImage from '../assets/invitation-cover-under.png'
import { FlipUpCard } from '../components/FlipUpCard'

const WeddingInvitationPage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-4xl font-bold mb-4'>Wedding Invitation</h1>
      <div className='w-80 h-100'>
        <FlipUpCard
          coverSrc={InvitationCoverImage}
          insideSrc={InvitationContentImage}
          coverInsideSrc={InvitationCoverInsideImage}
          width={420}
          height={280}
        />
      </div>
    </div>
  )
}

export default WeddingInvitationPage
