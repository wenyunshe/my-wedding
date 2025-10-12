import { Button } from 'primereact/button'
import { ConfirmDialog } from 'primereact/confirmdialog'
import { confirmDialog } from 'primereact/confirmdialog'
import { Dialog } from 'primereact/dialog'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { SelectButton } from 'primereact/selectbutton'
import { useCallback, useState } from 'react'

const DEFAULT_FORM_DATA = {
  name: '',
  attending: true,
  guests: null,
  needsBabySeat: false,
  babySeatCount: null,
  needsVegetarianMeal: false,
  remarks: '',
  eInvitationEmail: '',
  physicalInvitationAddress: '',
}

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
  }>(DEFAULT_FORM_DATA)
  const [errorsMap, setErrorsMap] = useState<Map<string, string>>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successDialogVisible, setSuccessDialogVisible] = useState(false)
  const [errorDialogVisible, setErrorDialogVisible] = useState(false)

  const validateForm = useCallback(() => {
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
    if (formData.needsBabySeat && formData.babySeatCount === null) {
      newErrorsMap.set('babySeatCount', '請填寫嬰兒座椅數量')
    }
    if (formData.physicalInvitationAddress) {
      const validRegex = /^\d{3,}.*$/
      if (!validRegex.test(formData.physicalInvitationAddress)) {
        newErrorsMap.set('physicalInvitationAddress', '請在開頭填寫郵遞區號')
      }
    }

    if (newErrorsMap.size > 0) {
      setErrorsMap(newErrorsMap)
    }

    return newErrorsMap.size === 0
  }, [formData])

  const onSubmit = useCallback(async () => {
    const isFormValid = validateForm()
    if (!isFormValid) {
      return
    }
    confirmDialog({
      header: '送出確認',
      message: '請再次確認您的回覆內容，送出後將無法修改。',
      acceptLabel: '確認送出',
      rejectLabel: '取消',
      accept: async () => {
        setIsSubmitting(true)
        const response = await fetch(
          import.meta.env.VITE_API_BASE_URL + '/rsvp',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          }
        )
        setIsSubmitting(false)
        if (response.ok) {
          setSuccessDialogVisible(true)
        } else {
          setErrorDialogVisible(true)
        }
      },
    })
  }, [formData, validateForm])

  return (
    <div className='flex flex-col items-center justify-center sm:p-20 px-4 py-8'>
      <h1 className='text-4xl font-bold mb-4 sm:mb-12'>RSVP</h1>
      <div className='grid sm:grid-cols-[auto_1fr] sm:gap-8 items-center grid-flow-row-dense mb-4 w-full sm:w-lg'>
        <label
          className='sm:justify-self-end mt-8 mb-1 sm:mt-0 sm:mb-0'
          htmlFor='name'
        >
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
        <div className='sm:justify-self-end mt-8 mb-1 sm:mt-0 sm:mb-0'>
          是否參加我們的婚禮
        </div>
        <SelectButton
          value={formData.attending}
          onChange={(e) => setFormData({ ...formData, attending: e.value })}
          options={[
            { label: '参加', value: true },
            { label: '不参加', value: false },
          ]}
        />
        <label
          className='sm:justify-self-end mt-8 mb-1 sm:mt-0 sm:mb-0'
          htmlFor='eInvitationEmail'
        >
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
        <label
          className='sm:justify-self-end mt-8 mb-1 sm:mt-0 sm:mb-0'
          htmlFor='physicalInvitationAddress'
        >
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
            <label
              className='sm:justify-self-end mt-8 mb-1 sm:mt-0 sm:mb-0'
              htmlFor='guests'
            >
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
            <div className='sm:justify-self-end mt-8 mb-1 sm:mt-0 sm:mb-0'>
              是否需要兒童座椅
            </div>
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
                <label className='sm:justify-self-end mt-8 mb-1 sm:mt-0 sm:mb-0'>
                  兒童座椅張數
                </label>
                <div className='relative flex flex-col'>
                  <InputNumber
                    value={formData.babySeatCount}
                    invalid={!!errorsMap?.get('babySeatCount')}
                    onChange={(e) =>
                      setFormData({ ...formData, babySeatCount: e.value })
                    }
                  />
                  {errorsMap?.get('babySeatCount') && (
                    <div className='absolute bottom-[-24px]'>
                      <small className='p-error'>
                        {errorsMap.get('babySeatCount')}
                      </small>
                    </div>
                  )}
                </div>
              </>
            )}
            <div className='sm:justify-self-end mt-8 mb-1 sm:mt-0 sm:mb-0'>
              是否需要素食餐點
            </div>
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
        <label
          className='sm:justify-self-end mt-8 mb-1 sm:mt-0 sm:mb-0'
          htmlFor='remarks'
        >
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
      <ConfirmDialog
        breakpoints={{ '960px': '96vw' }}
        style={{ width: '50vw' }}
        contentStyle={{
          display: 'flex',
          justifyContent: 'center',
        }}
      />
      <Button
        outlined
        label='送出'
        onClick={onSubmit}
        disabled={isSubmitting}
        loading={isSubmitting}
      />
      <Dialog
        header='送出成功'
        footer={
          <Button
            label='確定'
            onClick={() => {
              setSuccessDialogVisible(false)
              setFormData(DEFAULT_FORM_DATA)
              setErrorsMap(undefined)
            }}
          />
        }
        visible={successDialogVisible}
        onHide={() => {
          setSuccessDialogVisible(false)
          setFormData(DEFAULT_FORM_DATA)
          setErrorsMap(undefined)
        }}
      >
        <p>感謝填寫！我們已收到您的回覆。</p>
      </Dialog>
      <Dialog
        header='送出失敗'
        footer={
          <Button label='確定' onClick={() => setErrorDialogVisible(false)} />
        }
        visible={errorDialogVisible}
        onHide={() => setErrorDialogVisible(false)}
      >
        <p>送出失敗，請再嘗試一次。</p>
        <p>
          如果問題持續存在，請聯繫我們的
          <a
            className='text-[#bc5c38] underline'
            href='https://line.me/ti/p/LMHKX2x6k-'
          >
            客服團隊
          </a>
          。
        </p>
      </Dialog>
      <Dialog
        header='送出中'
        visible={isSubmitting}
        onHide={() => {}}
        showCloseIcon={false}
        closable={false}
      >
        <div className='flex justify-center items-center gap-2 pb-[1.5rem]'>
          <i className='pi pi-spin pi-spinner' />
          請稍候，我們正在上傳您的回覆。
        </div>
      </Dialog>
    </div>
  )
}

export default RsvpPage
