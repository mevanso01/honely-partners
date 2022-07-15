import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, Button, Input, Modal, Pagination } from '../../Shared'
import Skeleton from 'react-loading-skeleton'
import IosSearch from '@meronex/icons/ios/IosSearch'
import { doGet } from '../../../services/http-client'
import { useSelector } from 'react-redux'
import { SubUserForm } from '../SubUserForm'

import {
  Container,
  Header,
  ButtonGroup,
  SearchBoxWrapper,
  ClientsListContainer,
  ClientsTable,
  ClientRow,
  PaginationWrapper,
  TableWrapper
} from './styles'

export const ClientsPortal = () => {
  const navigate = useNavigate()
  const cognitoUser = useSelector(state => state.cognitoUser)
  const auth = cognitoUser?.isLoggedIn
  const [alertState, setAlertState] = useState({ open: false, content: [] })
  const [subUsersState, setSubUsersState] = useState({ loading: true, result: [], error: null })
  const [openAddForm, setOpenAddForm] = useState(false)

  const getSubUsers = async (page = 0) => {
    try {
      setSubUsersState({ ...subUsersState, loading: true })
      const response = await doGet('partner/users', { limit: 5, offset: page })
      if (response?.error) {
        throw response.error
      }
      setSubUsersState({
        loading: false,
        result: response.data,
        error: null
      })
    } catch (error) {
      setSubUsersState({ ...subUsersState, loading: false, error: error.message })
    }
  }

  const handleChangePage = (page) => {
    console.log(page)
  }

  const onAddUserSuccess = (newUser) => {
    // const updatedUsers = [...subUsersState.result, newUser]
    // setSubUsersState({
    //   ...subUsersState,
    //   result: updatedUsers
    // })
    // dispatch(setSubUsers(updatedUsers))
    setOpenAddForm(false)
  }
  
  useEffect(() => {
    if (auth) {
      getSubUsers()
    }
  }, [auth])
  
  useEffect(() => {
    if (subUsersState.error) {
      setAlertState({ open: true, content: subUsersState.error })
    }
  }, [subUsersState.error])

  return (
    <Container>
      <Header>
        <h1>Client Portal</h1>
        <ButtonGroup>
          <Button
            outline
            color='black'
            onClick={() => setOpenAddForm(true)}
          >
            + Add new
          </Button>
          <Button
            outline
            color='black'
          >
            + Import CSV
          </Button>
        </ButtonGroup>
      </Header>
      <SearchBoxWrapper>
        <Input
          placeholder='Search client by key word'
        />
        <IosSearch />
      </SearchBoxWrapper>
      <ClientsListContainer>
        <p>List of clients</p>
        <TableWrapper>
          <ClientsTable>
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Domain</th>
                <th>Start Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {subUsersState.loading ? (
                [...Array(5).keys()].map(index => (
                  <ClientRow key={index}>
                    <td><Skeleton width={80} height={17} /></td>
                    <td><Skeleton width={130} height={17} /></td>
                    <td><Skeleton width={100} height={17} /></td>
                    <td><Skeleton width={80} height={17} /></td>
                  </ClientRow>
                ))
              ) : (
                subUsersState.result.map(user => (
                  <ClientRow
                    key={user.user_id}
                    onClick={() => navigate(`/clients/${user.user_id}`)}
                  >
                    <td>{user?.company_name}</td>
                    <td>{user?.company_url}</td>
                    <td></td>
                    <td className='status'>{user?.status?.toLowerCase()}</td>
                  </ClientRow>
                ))
              )}
            </tbody>
          </ClientsTable>
        </TableWrapper>
        <PaginationWrapper>
          <Pagination
            currentPage={1}
            totalPages={10}
            handleChangePage={handleChangePage}
          />
        </PaginationWrapper>
      </ClientsListContainer>
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
      <Modal
        open={openAddForm}
        onClose={() => setOpenAddForm(false)}
      >
        <SubUserForm
          onAddUserSuccess={() => onAddUserSuccess()}
        />
      </Modal>
    </Container>
  )
}