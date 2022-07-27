import styled, { css } from 'styled-components'

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: row;

  padding: 30px 5px;

  > div:first-child {
    flex: 1;
    display: flex;
  }
  
  @media (min-width: 768px) {
    flex-direction: column;
    padding: 30px 0;
    width: 150px;
    border-right: 1px solid ${props => props.theme.colors.borderColor};
    > div:first-child {
      display: initial;
    }
  }

  @media (min-width: 992px) {
    width: 230px
  }
`
export const MenuItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px 0;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.colors.lightGray};
  }

  ${({ active }) => active && css`
    span {
      color: ${props => props.theme.colors.primary};
    }
  `}

  svg {
    font-size: 20px;
  }
`
export const MenuItem = styled.span`
  display: block;
  min-width: 64px;
  font-weight: 700;
  font-size: 18px;
  line-height: 32px;
  margin: 0 10px;
`
