import { Button } from 'primereact/button'
import { confirmPopup, ConfirmPopup } from 'primereact/confirmpopup'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { SelectButton } from 'primereact/selectbutton'
import { useState } from 'react'

const RsvpPage = () => {
  const [formData, setFormData] = useState<{
    name: string
    attending: boolean
    guests: number | null
    needsBabySeat: boolean
    babySeatCount: number | null
    needsVegetarianMeal: boolean
    remarks: string
    eInvitationEmail: string
    physicalInvitationAddress: string
  }>({
    name: '',
    attending: true,
    guests: null,
    needsBabySeat: false,
    babySeatCount: null,
    needsVegetarianMeal: false,
    remarks: '',
    eInvitationEmail: '',
    physicalInvitationAddress: '',
  })
  const [errorsMap, setErrorsMap] = useState<Map<string, string>>()

  const validateForm = () => {
    const newErrorsMap = new Map<string, string>()
    if (!formData.name) newErrorsMap.set('name', '請填寫你的大名')
    if (formData.attending && formData.guests === null) {
      newErrorsMap.set('guests', '請填寫攜伴人數')
    }
    if (formData.eInvitationEmail) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailPattern.test(formData.eInvitationEmail)) {
        newErrorsMap.set('eInvitationEmail', '請填寫有效的電子郵件地址')
      }
    }
    if (formData.physicalInvitationAddress) {
      const validRegex = /^\d{3,}.*$/
      if (!validRegex.test(formData.physicalInvitationAddress)) {
        newErrorsMap.set('physicalInvitationAddress', '請在開頭填寫郵遞區號')
      }
    }
    setErrorsMap(newErrorsMap)

    return newErrorsMap.size === 0
  }

  const onSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const confirmPopupTarget = event.currentTarget
    const isFormValid = validateForm()
    if (!isFormValid) {
      return
    }
    confirmPopup({
      target: confirmPopupTarget,
      message: '資料都確認過了嗎？',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: '確認送出',
      rejectLabel: '取消',
      accept: async () => {
        const response = await fetch('/api/rsvp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })

        const result = await response.json()
        console.log(result)
      },
    })
  }

  return (
    <div className='flex flex-col items-center justify-center p-20'>
      <h1 className='text-4xl font-bold mb-4'>RSVP</h1>
      <div className='grid grid-cols-[auto_1fr] gap-8 items-center grid-flow-row-dense mb-4'>
        <label className='justify-self-end' htmlFor='name'>
          你的大名
        </label>
        <div className='relative flex flex-col'>
          <InputText
            autoComplete='name'
            pt={{
              root: {
                id: 'name',
              },
            }}
            invalid={!!errorsMap?.get('name')}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errorsMap?.get('name') && (
            <div className='absolute bottom-[-24px]'>
              <small className='p-error'>{errorsMap.get('name')}</small>
            </div>
          )}
        </div>
        <div className='justify-self-end'>是否参加我們的婚禮</div>
        <SelectButton
          value={formData.attending}
          onChange={(e) => setFormData({ ...formData, attending: e.value })}
          options={[
            { label: '参加', value: true },
            { label: '不参加', value: false },
          ]}
        />
        <label className='justify-self-end' htmlFor='eInvitationEmail'>
          電子喜帖寄送 Email
        </label>
        <div className='relative flex flex-col'>
          <InputText
            pt={{
              root: {
                id: 'eInvitationEmail',
              },
            }}
            invalid={!!errorsMap?.get('eInvitationEmail')}
            placeholder='（不需要則不必填寫）'
            value={formData.eInvitationEmail}
            onChange={(e) =>
              setFormData({ ...formData, eInvitationEmail: e.target.value })
            }
          />
          {errorsMap?.get('eInvitationEmail') && (
            <div className='absolute bottom-[-24px]'>
              <small className='p-error'>
                {errorsMap.get('eInvitationEmail')}
              </small>
            </div>
          )}
        </div>
        <label className='justify-self-end' htmlFor='physicalInvitationAddress'>
          紙本喜帖寄送地址
        </label>
        <div className='relative flex flex-col'>
          <InputText
            pt={{
              root: {
                id: 'physicalInvitationAddress',
              },
            }}
            invalid={!!errorsMap?.get('physicalInvitationAddress')}
            placeholder='（不需要則不必填寫）郵遞區號 + 地址'
            value={formData.physicalInvitationAddress}
            onChange={(e) =>
              setFormData({
                ...formData,
                physicalInvitationAddress: e.target.value,
              })
            }
          />
          {errorsMap?.get('physicalInvitationAddress') && (
            <div className='absolute bottom-[-24px]'>
              <small className='p-error'>
                {errorsMap.get('physicalInvitationAddress')}
              </small>
            </div>
          )}
        </div>
        {formData.attending && (
          <>
            <label className='justify-self-end' htmlFor='guests'>
              攜伴人數
            </label>
            <div className='relative flex flex-col'>
              <InputNumber
                pt={{
                  input: {
                    root: {
                      id: 'guests',
                    },
                  },
                }}
                placeholder='（不包含自己）'
                type='number'
                invalid={!!errorsMap?.get('guests')}
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: e.value })}
              />
              {errorsMap?.get('guests') && (
                <div className='absolute bottom-[-24px]'>
                  <small className='p-error'>{errorsMap.get('guests')}</small>
                </div>
              )}
            </div>
            <div className='justify-self-end'>是否需要兒童座椅</div>
            <SelectButton
              value={formData.needsBabySeat}
              onChange={(e) =>
                setFormData({ ...formData, needsBabySeat: e.value })
              }
              options={[
                { label: '需要', value: true },
                { label: '不需要', value: false },
              ]}
            />
            {formData.needsBabySeat && (
              <>
                <label className='justify-self-end'>兒童座椅張數</label>
                <InputNumber
                  type='number'
                  value={formData.babySeatCount}
                  onChange={(e) =>
                    setFormData({ ...formData, babySeatCount: e.value })
                  }
                />
              </>
            )}
            <div className='justify-self-end'>是否需要素食餐點</div>
            <SelectButton
              value={formData.needsVegetarianMeal}
              onChange={(e) =>
                setFormData({ ...formData, needsVegetarianMeal: e.value })
              }
              options={[
                { label: '需要', value: true },
                { label: '不需要', value: false },
              ]}
            />
          </>
        )}
        <label className='justify-self-end' htmlFor='remarks'>
          想給我們的留言
        </label>
        <InputTextarea
          pt={{
            root: {
              id: 'remarks',
            },
          }}
          rows={5}
          cols={30}
          value={formData.remarks}
          onChange={(e) =>
            setFormData({ ...formData, remarks: e.target.value })
          }
        />
      </div>
      <ConfirmPopup />
      <Button outlined onClick={onSubmit}>
        送出
      </Button>
    </div>
  )
}

export default RsvpPage
