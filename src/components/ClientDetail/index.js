import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sidebar } from '../ClientsList/Sidebar'
import { Container, MainContent } from '../ClientsList/styles'
import FiChevronRight from '@meronex/icons/fi/FiChevronRight'
import { Button, IconButton } from '../Shared'
import MdcContentCopy from '@meronex/icons/mdc/MdcContentCopy'
import { doGet, doPatch, doPost } from '../../services/http-client'
import Skeleton from 'react-loading-skeleton'
import { Alert } from '../Shared'
import { useToast, ToastType } from '../../contexts/ToastContext'

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
    apiKey
  } = props

  const navigate = useNavigate()
  const [, { showToast }] = useToast()
  const [clientState, setClientState] = useState({ result: null, loading: true, error: null })
  const [actionState, setActionState] = useState({ loading: false, error: null })
  const [alertState, setAlertState] = useState({ open: false, content: [] })

  const copyToClipboard = () => {
    const copyText = `<script src="https://developers.honely.com/widget/load-script?api-key=test-601253ce-c99f-11ec-a950-0ebb94ef5085"></script>`
    navigator.clipboard.writeText(copyText)
  }

  const getClient = async () => {
    try {
      setClientState({
        ...clientState,
        loading: true
      })
      const response = await doGet('user', {}, apiKey)
      if (response?.error) {
        throw response.error
      }
      setClientState({
        loading: false,
        result: response.data[0],
        error: null
      })
    } catch (error) {
      setClientState({
        ...clientState,
        loading: false,
        error: error.message
      })
    }
  }

  const updateClient = async (payload) => {
    try {
      showToast(ToastType.Info, 'Loading')
      setActionState({ ...actionState, loading: false })
      const response = await doPatch('user', payload, apiKey)
      if (response?.error) {
        throw response.error
      }
      setActionState({
        loading: false,
        error: null
      })
      showToast(ToastType.Success, 'Updated')
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

  useEffect(() => {
    getClient()
  }, [apiKey])

  return (
    <Container>
      <Sidebar />
      <MainContent>
        <ClientDetailContainer>
          <DetailWrapper>
            <h1>Clients <FiChevronRight /> {clientState.loading ? <Skeleton width={150} hieght={44} /> : <span>{clientState.result?.full_name}</span>}</h1>
            <AccountInformation>
              <DetailSection>
                <h3>Account Information</h3>
                <p>Name: {clientState.loading ? <Skeleton width={100} height={17} /> : clientState.result?.full_name}</p>
                <p>Email: {clientState.loading ? <Skeleton width={150} height={17} /> : clientState.result?.email}</p>
              </DetailSection>
            </AccountInformation>
            <DetailSection>
              <h3>Widget Code:</h3>
              <WidgetCodeCard>
                {clientState?.loading ? (
                  <p>
                    <Skeleton height={40} />
                  </p>
                ) : (
                  <p>
                    {`<script src="https://developers.honely.com/widget/load-script?api-key=${clientState.result?.api_key}"></script>`}
                  </p>
                )}
                <IconButton
                  color='primary'
                  onClick={() => copyToClipboard()}
                >
                  <MdcContentCopy />
                </IconButton>
              </WidgetCodeCard>
              <Button
                color='primary'
                onClick={() => navigate(`/clients/${apiKey}/custom-widget`)}
              >
                Customize Widget
              </Button>
            </DetailSection>
            <DetailSection>
              <h3>API Key</h3>
              <APIKeyCard>
                {clientState.loading ? (
                  <p>
                    <Skeleton height={32} />
                  </p>
                ) : (
                  <p>{clientState.result?.api_key}</p>
                )}
                <IconButton
                  color='primary'
                  onClick={() => copyToClipboard()}
                >
                  <MdcContentCopy />
                </IconButton>
              </APIKeyCard>
              <Button
                color='primary'
                onClick={() => updateClient({ 'api-key': 'REPLACE' })}
                disabled={actionState.loading}
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
                disabled={actionState.loading}
                onClick={() => updateClient({ status: 'INACTIVE' })}
              >
                Deactivate Client
              </Button>
              <Button
                className='remove'
                disabled={actionState.loading}
                onClick={() => updateClient({ status: 'DELETED' })}
              >
                Remove Client
              </Button>
            </ActionButtonGroup>
          </ActionSidebar>
        </ClientDetailContainer>
      </MainContent>
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
    </Container>
  )
}
