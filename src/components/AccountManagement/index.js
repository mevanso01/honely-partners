import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DashboardLayout } from '../Layout/DashboardLayout'
import { Alert, Button, Input, Modal } from '../Shared'
import MdcContentCopy from '@meronex/icons/mdc/MdcContentCopy'
import { doGet, doPatch } from '../../services/http-client'
import { useToast, ToastType } from '../../contexts/ToastContext'
import { ChangePassword } from './ChangePassword'
import { setPartner } from '../../store/reducers/partner'
import AiOutlineEye from '@meronex/icons/ai/AiOutlineEye'
import AiOutlineEyeInvisible from '@meronex/icons/ai/AiOutlineEyeInvisible'

import {
  Container,
  InformationContainer,
  ManagementContainer,
  LogoContainer,
  InfoItem,
  LogoWrapper,
  UploadButtonContainer,
  IntegrationCredentialsContainer,
  CredentialItem,
  SecretWrpper
} from './styles'

export const AccountManagement = () => {
  const dispatch = useDispatch()
  const partner = useSelector(state => state.partner)
  const [, { showToast }] = useToast()

  const [photoState, setPhotoState] = useState(null)
  const [compoanyLogoData, setCompanyLogoData] = useState(null)
  const [actionState, setActionState] = useState({ loading: false, error: null })
  const [alertState, setAlertState] = useState({ open: false, content: [] })
  const [openModal, setOpenModal] = useState(false)
  const [showSecret, setShowSecret] = useState(false)

  const inputRef = useRef()
  const handleFiles = (e) => {
    e.preventDefault()
    e.stopPropagation()
    let files = e.target.files
    if (files.length === 1) {
      const type = files[0].type.split('/')[0]
      if (type === 'image') {
        const reader = new window.FileReader()
        reader.readAsDataURL(files[0])
        reader.onload = () => {
          setPhotoState(reader.result)
          setCompanyLogoData(reader.result.replace(/^data:image\/[a-z]+;base64,/, ""))
        }
      }
    }
  }
  const copyToClipboard = (copyText) => {
    navigator.clipboard.writeText(copyText)
  }

  const getPartner = async () => {
    try {
      const response = await doGet('partner')
      if (response?.error) {
        throw response.error
      }
      dispatch(setPartner(response?.data))
      setActionState({
        loading: false,
        error: null
      })
      showToast(ToastType.Success, 'Uploaded')
    } catch (error) {
      setActionState({
        loading: false,
        error: error.message
      })
    }
  }

  const uploadImage = async () => {
    try {
      setActionState({ loading: true, error: null })
      const response = await doPatch('partner/update-partner-info', { logo: compoanyLogoData })
      if (response?.error) {
        throw response.error
      }
      getPartner()
      setCompanyLogoData(null)
    } catch (error) {
      setActionState({
        loading: false,
        error: error.message
      })
    }
  }

  useEffect(() => {
    if (!actionState.error) return
    setAlertState({
      open: true,
      content: actionState.error
    })
  }, [actionState.error])

  return (
    <DashboardLayout>
      <Container>
        <InformationContainer>
          <ManagementContainer>
            <h1>Account Management</h1>
            <InfoItem>
              <label>Organization</label>
              <p>{partner.info?.company_name}</p>
            </InfoItem>
            <InfoItem>
              <label>Website</label>
              <p>{partner.info?.company_url}</p>
            </InfoItem>
            <InfoItem>
              <label>Email</label>
              <p>{partner.info?.email}</p>
            </InfoItem>
            <InfoItem>
              <label>Password</label>
              <p>**************</p>
            </InfoItem>
            <Button
              outline
              color='black'
              onClick={() => setOpenModal(true)}
            >
              Reset Password
            </Button>
          </ManagementContainer>
          <LogoContainer>
            <h1>Company Logo</h1>
            <LogoWrapper
              onClick={() => inputRef?.current?.click()}
            >
              <img src={photoState || partner.info?.image_url} alt='' />
            </LogoWrapper>
            <p>Image should fit in 190 x 45 px dimensions.</p>
            <UploadButtonContainer>
              <input
                ref={inputRef}
                type='file'
                accept='image/png, image/jpeg, image/jpg'
                onChange={handleFiles}
              />
              <Button
                outline
                color='black'
                disabled={!compoanyLogoData}
                onClick={() => uploadImage()}
              >
                {actionState.loading ? 'Uploading...' : 'Upload Image'}
              </Button>
            </UploadButtonContainer>
          </LogoContainer>
        </InformationContainer>

        <IntegrationCredentialsContainer>
          <h1>Integration Credentials</h1>
          <CredentialItem>
            <label>Cliend ID</label>
            <div>
              <Input
                defaultValue={partner.info?.app_client_id}
              />
              <Button
                color='black'
                naked
                onClick={() => copyToClipboard(partner.info?.app_client_id)}
              >
                <MdcContentCopy />
                <span>Copy</span>
              </Button>
            </div>
            <p>Client identifier used to request an OAuth 2.0 access token</p>
          </CredentialItem>
          <CredentialItem>
            <label>Client Secret</label>
            <div>
              <SecretWrpper>
                <Input
                  type={showSecret ? 'text' : 'password'}
                  defaultValue={partner.info?.app_client_secret}
                />
                {showSecret ? <AiOutlineEyeInvisible onClick={() => setShowSecret(false)} /> : <AiOutlineEye onClick={() => setShowSecret(true)} />}
              </SecretWrpper>
              <Button
                color='black'
                naked
                onClick={() => copyToClipboard(partner.info?.app_client_secret)}
              >
                <MdcContentCopy />
                <span>Copy</span>
              </Button>
            </div>
            <p>Client secret used to request an OAuth 2.0 access token</p>
            <p>Creation Date: {partner.info?.signed_up_date}</p>
          </CredentialItem>
        </IntegrationCredentialsContainer>
      </Container>
      <Modal
        width='700px'
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <ChangePassword
          setActionState={setActionState}
          onClose={() => setOpenModal(false)}
        />
      </Modal>
      <Alert
        title='Error'
        width='700px'
        content={alertState.content}
        acceptText={'Accept'}
        open={alertState.open}
        onClose={() => setAlertState({ open: false, content: [] })}
        onAccept={() => setAlertState({ open: false, content: [] })}
        closeOnBackdrop={false}
      />
    </DashboardLayout>
  )
}