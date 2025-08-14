const HomePage = () => {
  return (
    <div className='flex py-16 md:py-14 px-6 justify-center items-center flex-col gap-5'>
      <img src='public/hero.svg' className='w-full md:w-2xl' />
      <h4 className='text-xl md:text-2xl text-center'>
        You are invited to the wedding
      </h4>
      <a
        href={import.meta.env.VITE_CALENDER_EVENT_URL}
        target='_blank'
        rel='noopener noreferrer'
        className='p-button p-button-outlined'
      >
        點我加入 Google 行事曆
      </a>
      <h3 className='text-ms/8 md:text-xl/9 text-center'>
        <span className='text-2xl/10 md:text-3xl/12'>2026/3/28</span>
        <br />
        <span className='pi pi-at' />
        &nbsp;高雄日航酒店
      </h3>
      <iframe
        className='size-72'
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.1765795558445!2d120.30279087564934!3d22.609880331602284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e030004dc9165%3A0xf1c8ab02b634069b!2z6auY6ZuE5pel6Iiq6YWS5bqXIEhvdGVsIE5pa2tvIEthb2hzaXVuZw!5e0!3m2!1szh-TW!2stw!4v1751132070968!5m2!1szh-TW!2stw'
        loading='lazy'
        referrerPolicy='no-referrer-when-downgrade'
      ></iframe>
    </div>
  )
}

export default HomePage
