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
export const AccountInformation = styled.div`
  margin-top: 60px;
  padding-bottom: 40px;
  button {
    margin-top: 20px;
  }
  p {
    font-size: 14px;
    line-height: 22px;
    margin: 0;
  }
`
export const DetailSection = styled.div`
  h3 {
    font-weight: 400;
    font-size: 20px;
    margin: 0 0 20px 0;
  }

  ${({ isBorder }) => isBorder && css`
    border-top: 1px solid ${props => props.theme.colors.borderColor};
    border-bottom: 1px solid ${props => props.theme.colors.borderColor};
    padding: 40px 0;
  `}
`
export const WidgetCodeCard = styled.div`
  background-color: ${props => props.theme.colors.backgroundGray100};
  border-radius: 8px;
  padding: 30px 20px;
  margin-bottom: 30px;
  display: flex;
  max-width: 800px;

  p {
    flex: 1;
    margin: 0;
    color: ${props => props.theme.colors.black};
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
`
export const ActionButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 0 20px 0;
  button {
    width: 100%;
    margin: 10px 0;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    button{
      width: 250px;
      &:first-child {
        margin-right: 60px;
      }
    }
  }
`