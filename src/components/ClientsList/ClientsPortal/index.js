import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Modal, Pagination } from '../../Shared'
import Skeleton from 'react-loading-skeleton'
import IosSearch from '@meronex/icons/ios/IosSearch'
import BiChevronDown from '@meronex/icons/bi/BiChevronDown'
import { doGet } from '../../../services/http-client'
import { useSelector } from 'react-redux'
import { SubUserForm } from '../SubUserForm'
import { StatusPopper } from './StatusPopper'

import {
  Container,
  Header,
  ButtonGroup,
  SearchBoxWrapper,
  ClientsListContainer,
  ClientsTable,
  ClientRow,
  PaginationWrapper,
  TableWrapper,
  StartDateSortContainer
} from './styles'

export const ClientsPortal = () => {
  const navigate = useNavigate()
  const cognitoUser = useSelector(state => state.cognitoUser)
  const auth = cognitoUser?.isLoggedIn
  const [subUsersState, setSubUsersState] = useState({ loading: true, result: [], error: null })
  const [pagination, setPagination] = useState({ currentPage: 1, pageSize: 5, total: null })
  const [search, setSearch] = useState(null)
  const [sortbyDate, setSortbyDate] = useState(false)
  const [openAddForm, setOpenAddForm] = useState(false)
  const [usersLoaded, setUsersLoaded] = useState(false)
  const [selectedStatuses, setSelectedStatuses] = useState([])

  const getSubUsers = async (page = 1) => {
    try {
      setSubUsersState({ ...subUsersState, loading: true })
      const options = {
        limit: pagination.pageSize,
        offset: (page - 1) * pagination.pageSize
      }
      if (search) {
        options.search = search
      }
      options['sortby-date'] = sortbyDate ? 'ASC' : 'DESC'
      if (selectedStatuses.length) {
        options.filter = selectedStatuses.join(',')
      }
      const response = await doGet('partner/users', options)
      if (response?.error) {
        throw response.error
      }
      setSubUsersState({
        loading: false,
        result: response.data?.users,
        error: null
      })
      setPagination({
        ...pagination,
        currentPage: page,
        total: response.data?.total_users || 0
      })
      setUsersLoaded(true)
    } catch (error) {
      setSubUsersState({ ...subUsersState, loading: false, error: error.message })
    }
  }

  const handleChangePage = (page) => {
    setPagination({
      ...pagination,
      currentPage: page
    })
    getSubUsers(page)
  }

  const onAddUserSuccess = () => {
    getSubUsers(pagination.currentPage)
    setOpenAddForm(false)
  }


  let timeout = null
  const onChangeSearch = (e) => {
    clearTimeout(timeout)
    timeout = setTimeout(function () {
      setSearch(e.target.value)
    }, 750)
  }

  useEffect(() => {
    if (auth) {
      getSubUsers()
    }
  }, [auth, search, sortbyDate, selectedStatuses])
  
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
            disabled
          >
            + Import CSV
          </Button>
        </ButtonGroup>
      </Header>
      <SearchBoxWrapper>
        <Input
          placeholder='Search client by key word'
          onChange={e => onChangeSearch(e)}
        />
        <IosSearch />
      </SearchBoxWrapper>
      <ClientsListContainer>
        <p>List of clients</p>
        <TableWrapper>
          {!subUsersState.loading && subUsersState.error && (
            <p className='error'>{subUsersState.error === 'Partner sub users not found' ? 'No clients, yet' : subUsersState.error}</p>
          )}
          {!subUsersState.error && (
            <ClientsTable>
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Domain</th>
                  <th>
                    <StartDateSortContainer
                      isASC={sortbyDate}
                      onClick={() => setSortbyDate(!sortbyDate)}
                    >
                      <span>Start Date</span>
                      <BiChevronDown />
                    </StartDateSortContainer>
                  </th>
                  <th>
                    <StatusPopper
                      selectedStatuses={selectedStatuses}
                      setSelectedStatuses={setSelectedStatuses}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {subUsersState.loading ? (
                  [...Array(pagination.pageSize).keys()].map(index => (
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
                      onClick={() => navigate(`/clients/${user.api_key}`)}
                    >
                      <td>{user?.company_name}</td>
                      <td>{user?.company_url}</td>
                      <td>{user?.signed_up_date}</td>
                      <td className='status'>{user?.status?.toLowerCase()}</td>
                    </ClientRow>
                  ))
                )}
              </tbody>
            </ClientsTable>
          )}
        </TableWrapper>
        {usersLoaded && (
          <PaginationWrapper>
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={Math.ceil(pagination.total / pagination.pageSize)}
              handleChangePage={handleChangePage}
            />
          </PaginationWrapper>
        )}
      </ClientsListContainer>
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