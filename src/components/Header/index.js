import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTheme } from 'styled-components'
import FaUserAlt from '@meronex/icons/fa/FaUserAlt'

import {
  Container,
  InnerContainer,
  AgentImageContainer,
  AgentImageWrapper,
  PowerdBy,
  ButtonLink
} from './styles'

export const Header = () => {
  const navigate = useNavigate()
  const partner = useSelector(state => state.partner)
  const theme = useTheme()
  return (
    <Container>
      <InnerContainer>
        <AgentImageContainer>
          <AgentImageWrapper>
            {partner.info?.image_url ? (
              <img src={partner.info?.image_url + '?random_number=' + new Date().getTime()} alt='' />
            ) : <FaUserAlt />}
          </AgentImageWrapper>
          <PowerdBy>
            <span>Powered by</span>
            <img src={theme.images.logo} alt='logo' />
          </PowerdBy>
        </AgentImageContainer>
        <ButtonLink
          onClick={() => navigate('/account-management')}
        >
          Account Management
        </ButtonLink>
      </InnerContainer>
    </Container>
  )
}
