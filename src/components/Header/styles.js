import styled from 'styled-components'

export const Container = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.borderColor};
`
export const InnerContainer = styled.div`
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 45px 0;
`
export const AgentImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const AgentImageWrapper = styled.div`
  width: 160px;
  height: 55px;
  margin-bottom: 8px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  svg {
    width: 100%;
    height: 100%;
  }
`
export const PowerdBy = styled.div`
  display: flex;
  align-items: center;

  span {
    font-size: 14px;
    margin-right: 10px;
  }

  img {
    width: 73px;
    height: 26px;
    object-fit: contain;
  }
`
export const ButtonLink = styled.span`
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`
