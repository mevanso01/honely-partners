import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Sidebar } from '../ClientsList/Sidebar'
import { Container, MainContent } from '../ClientsList/styles'
import FiChevronRight from '@meronex/icons/fi/FiChevronRight'
import { Button, IconButton } from '../Shared'
import MdcContentCopy from '@meronex/icons/mdc/MdcContentCopy'

import {
  ClientDetailContainer,
  DetailWrapper,
  ActionSidebar,
  AccountInformation,
  DetailSection,
  WidgetCodeCard,
  APIKeyCard,
  SubMenus,
  MenuItemWrapper,
  MenuItem,
  ActionButtonGroup
} from './styles'

export const ClientDetail = (props) => {
  const {
    clientId
  } = props

  const navigate = useNavigate()

  const copyToClipboard = () => {
    const copyText = `<script src="https://developers.honely.com/widget/load-script?api-key=test-601253ce-c99f-11ec-a950-0ebb94ef5085"></script>`
    navigator.clipboard.writeText(copyText)
  }

  return (
    <Container>
      <Sidebar />
      <MainContent>
        <ClientDetailContainer>
          <DetailWrapper>
            <h1>Clients <FiChevronRight /> John Doe</h1>
            <AccountInformation>
              <DetailSection>
                <h3>Account Information</h3>
                <p>Name: John Doe</p>
                <p>Email: Johnagent@gmail.com</p>
              </DetailSection>
            </AccountInformation>
            <DetailSection>
              <h3>Widget Code:</h3>
              <WidgetCodeCard>
                <p>
                  {`<script src="https://developers.honely.com/widget/load-script?api-key=test-601253ce-c99f-11ec-a950-0ebb94ef5085"></script>`}
                </p>
                <IconButton
                  color='primary'
                  onClick={() => copyToClipboard()}
                >
                  <MdcContentCopy />
                </IconButton>
              </WidgetCodeCard>
              <Button
                color='primary'
                onClick={() => navigate(`/clients/${clientId}/custom-widget`)}
              >
                Customize Widget
              </Button>
            </DetailSection>
            <DetailSection>
              <h3>API Key</h3>
              <APIKeyCard>
                <p>test-601253ce-c99f-11ec-a950-0ebb94ef5085</p>
                <IconButton
                  color='primary'
                  onClick={() => copyToClipboard()}
                >
                  <MdcContentCopy />
                </IconButton>
              </APIKeyCard>
              <Button
                color='primary'
              >
                Replace API key
              </Button>
            </DetailSection>
          </DetailWrapper>
          <ActionSidebar>
            <SubMenus>
              <MenuItemWrapper>
                <MenuItem>Customize WIdget</MenuItem>
              </MenuItemWrapper>
              <MenuItemWrapper>
                <MenuItem
                  onClick={() => navigate('/account-management')}
                >Account Information</MenuItem>
              </MenuItemWrapper>
            </SubMenus>
            <ActionButtonGroup>
              <Button
                outline
                color='black'
              >
                Deactivate Client
              </Button>
              <Button className='remove'>
                Remove Client
              </Button>
            </ActionButtonGroup>
          </ActionSidebar>
        </ClientDetailContainer>
      </MainContent>
    </Container>
  )
}
