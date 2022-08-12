import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sidebar } from '../ClientsList/Sidebar'
import { Container, MainContent } from '../ClientsList/styles'
import FiChevronRight from '@meronex/icons/fi/FiChevronRight'
import { Button, IconButton } from '../Shared'
import MdcContentCopy from '@meronex/icons/mdc/MdcContentCopy'
import { doGet, doPatch } from '../../services/http-client'
import Skeleton from 'react-loading-skeleton'
import { Alert, Confirm } from '../Shared'
import { useToast, ToastType } from '../../contexts/ToastContext'

import {
  ClientDetailContainer,
  DetailWrapper,
  AccountInformation,
  DetailSection,
  WidgetCodeCard,
  APIKeyCard,
  ActionButtonGroup,
  ConfirmText,
  Notification
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
  const [confirm, setConfirm] = useState({ open: false, content: null, handleOnAccept: null })
  const [widgetCodeCopied, setWidgetCodeCopied] = useState(false)
  const [apiKeyCopied, setApiKeyCopied] = useState(false)

  const copyToClipboard = (apiKey, isWidgetCode = false) => {
    const copyText = isWidgetCode ? `<script src="https://developers.honely.com/widget/load-script?api-key=${apiKey}"></script>` : apiKey
    navigator.clipboard.writeText(copyText)
    if (isWidgetCode) {
      setWidgetCodeCopied(true)
      setTimeout(() => {
        setWidgetCodeCopied(false)
      }, 3000)
    } else {
      setApiKeyCopied(true)
      setTimeout(() => {
        setApiKeyCopied(false)
      }, 3000)
    }
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

  const updateClient = async (payload, isDelete = false) => {
    try {
      showToast(ToastType.Info, 'Loading')
      setActionState({ loading: true, error: null })
      const response = await doPatch('user', payload, apiKey)
      if (response?.error) {
        throw response.error
      }
      setActionState({
        loading: false,
        error: null
      })
      if (isDelete) {
        showToast(ToastType.Success, 'Deleted')
        navigate('/clients')
        return
      } else {
        showToast(ToastType.Success, 'Updated')
      }
      if (clientState.result?.apiKey !== response.data?.user?.api_key) {
        navigate(`/clients/${response.data?.user?.api_key}`, { replace: true })
      }
      setClientState({
        ...clientState,
        result: response.data?.user
      })
    } catch (error) {
      setActionState({
        loading: false,
        error: error.message
      })
    }
  }

  const handleRemoveClient = () => {
    setConfirm({
      open: true,
      handleOnAccept: () => {
        setConfirm({ ...confirm, open: false })
        updateClient({ status: 'DELETED' }, true)
      }
    })
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
              <Button
                color='primary'
                onClick={() => navigate(`/clients/${apiKey}/custom-widget`)}
              >
                Customize Widget
              </Button>
            </AccountInformation>
            <DetailSection isBorder>
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
                  onClick={() => copyToClipboard(clientState.result?.api_key, true)}
                >
                  <MdcContentCopy />
                </IconButton>
                {widgetCodeCopied && (
                  <Notification>Widget Code is copied to clipboard</Notification>
                )}
              </WidgetCodeCard>
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
                  onClick={() => copyToClipboard(clientState.result?.api_key)}
                >
                  <MdcContentCopy />
                </IconButton>
                {apiKeyCopied && (
                  <Notification>API Key is copied to clipboard</Notification>
                )}
              </APIKeyCard>
              <Button
                outline
                color='black'
                onClick={() => updateClient({ 'api-key': 'REPLACE' })}
                disabled={actionState.loading}
              >
                Reset API Key                
              </Button>
            </DetailSection>

            <ActionButtonGroup>
              <Button
                outline
                color='black'
                disabled={actionState.loading}
                onClick={() => updateClient({ status: clientState.result?.status !== 'INACTIVE' ? 'INACTIVE' : 'ACTIVE' })}
              >
                {clientState.result?.status !== 'INACTIVE' ? 'Deactivate Client' : 'Activate Client'}
              </Button>
              <Button
                color='black'
                disabled={actionState.loading}
                onClick={() => handleRemoveClient()}
              >
                Remove Client
              </Button>
            </ActionButtonGroup>
          </DetailWrapper>
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
      <Confirm
        width='700px'
        title={'Confirm'}
        content={confirm.content}
        acceptText={'Delete'}
        open={confirm.open}
        onClose={() => setConfirm({ ...confirm, open: false })}
        onCancel={() => setConfirm({ ...confirm, open: false })}
        onAccept={confirm.handleOnAccept}
        closeOnBackdrop={false}
      >
        <ConfirmText>
          Client <span>{clientState.result?.full_name}</span> will be permanently deleted from your account. Would you like to delete?
        </ConfirmText>
      </Confirm>
    </Container>
  )
}
