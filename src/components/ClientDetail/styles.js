import styled, { css } from 'styled-components'
import { darken } from 'polished'

export const ClientDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  @media (min-width: 992px) {
    flex-direction: row;
  }
`
export const DetailWrapper = styled.div`
  flex: 1;
  padding: 0 15px;

  h1 {
    font-size: 24px;
    font-weight: 400;
    margin: 0;
    display: flex;
    align-items: center;

    svg {
      margin: 0 10px;
    }
  }

  @media (min-width: 768px) {
    padding: 30px;
    h1 {
      font-size: 32px;
    }
  }

  @media (min-width: 992px) {
    overflow: auto;
    h1 {
      font-size: 36px;
    }
  }
  @media (min-width: 1025px) {
    padding: 30px 60px;
  }
`
export const ActionSidebar = styled.div`
  background-color: ${props => props.theme.colors.backgroundGray100};
  padding: 30px 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 768px) {
    padding: 30px;
  }
  @media (min-width: 992px) {
    width: 250px;
    padding: 30px 20px;
  }
  @media (min-width: 1025px) {
    padding: 30px 40px;
    width: 300px;
  }
`
export const AccountInformation = styled.div`
  margin-top: 60px;
  p {
    font-size: 14px;
    line-height: 22px;
    margin: 0;
  }
`
export const DetailSection = styled.div`
  margin-bottom: 50px;
  h3 {
    font-weight: 400;
    font-size: 20px;
    margin: 0 0 20px 0;
  }
`
export const WidgetCodeCard = styled.div`
  background-color: rgba(0, 0, 0, 0.9);
  border-radius: 8px;
  padding: 30px 20px;
  margin-bottom: 30px;
  display: flex;
  max-width: 800px;

  p {
    flex: 1;
    margin: 0;
    color: ${props => props.theme.colors.white};
    font-size: 16px;
    word-break: break-all;
  }
  button {
    padding: 0;
    margin-left: 16px;
  }
  @media (min-width: 992px) {
    padding: 30px 40px;
  }
`
export const APIKeyCard = styled(WidgetCodeCard)`
  background-color: ${props => props.theme.colors.backgroundGray100};
  p {
    color: ${props => props.theme.colors.black};
  }
`
export const SubMenus = styled.div`
`
export const MenuItemWrapper = styled.div`
  padding: 3px 0;
  cursor: pointer;

  ${({ active }) => active && css`
    span {
      color: ${props => props.theme.colors.primary};
    }
  `}
  &:hover {
    span {
      color: ${props => props.theme.colors.primary};
    }
  }
`
export const MenuItem = styled.span`
  display: block;
  font-weight: 700;
  font-size: 18px;
  line-height: 32px;
  margin: 0 10px;

`
export const ActionButtonGroup = styled.div`
  button {
    width: 100%;
    margin: 20px 0;
    &.remove {
      background: ${props => props.theme.colors.lightRed};
      border-color: ${props => props.theme.colors.black};
      color: ${props => props.theme.colors.black};

      &:hover {
        background: ${props => darken(0.1, props.theme.colors.lightRed)};
      }
    }
  }
`