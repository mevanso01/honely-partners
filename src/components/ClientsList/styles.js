import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  
  @media (min-width: 768px) {
    flex-direction: row;
    min-height: calc(100vh - 180px);
  }
`
export const MainContent = styled.div`
  flex: 1;
`
