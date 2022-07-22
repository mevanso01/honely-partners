import React, { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { DashboardLayout } from '../Layout/DashboardLayout'
import { Button, Input } from '../Shared'
import MdcContentCopy from '@meronex/icons/mdc/MdcContentCopy'

import {
  Container,
  InformationContainer,
  ManagementContainer,
  LogoContainer,
  InfoItem,
  LogoWrapper,
  UploadButtonContainer,
  IntegrationCredentialsContainer,
  CredentialItem
} from './styles'

export const AccountManagement = () => {
  const partner = useSelector(state => state.partner)
  const [photoState, setPhotoState] = useState(null)

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
        }
      }
    }
  }
  const copyToClipboard = () => {
    const copyText = 'test'
    navigator.clipboard.writeText(copyText)
  }

  return (
    <DashboardLayout>
      <Container>
        <InformationContainer>
          <ManagementContainer>
            <h1>Account Management</h1>
            <InfoItem>
              <label>Full Name</label>
              <p>Thomas Jefferson</p>
            </InfoItem>
            <InfoItem>
              <label>Organization</label>
              <p>Reality Group</p>
            </InfoItem>
            <InfoItem>
              <label>Website</label>
              <p>myrealtor.com</p>
            </InfoItem>
            <InfoItem>
              <label>Email</label>
              <p>name@email.com</p>
            </InfoItem>
            <InfoItem>
              <label>Password</label>
              <p>**************</p>
            </InfoItem>
            <Button
              outline
              color='black'
            >
              Reset Password
            </Button>
          </ManagementContainer>
          <LogoContainer>
            <h1>Company Logo</h1>
            <LogoWrapper>
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
                onClick={() => inputRef?.current?.click()}
              >
                Upload Image
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
                defaultValue='XIXIXIJXCIJXCI'
              />
              <Button
                color='black'
                naked
                onClick={() => copyToClipboard()}
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
              <Input
                type='password'
                defaultValue='*************************'
              />
              <Button
                color='black'
                naked
                onClick={() => copyToClipboard()}
              >
                <MdcContentCopy />
                <span>Copy</span>
              </Button>
            </div>
            <p>Client secret used to request an OAuth 2.0 access token</p>
            <p>Creation Date: 6/1/2021 8:21 AM</p>
          </CredentialItem>
        </IntegrationCredentialsContainer>
      </Container>
    </DashboardLayout>
  )
}