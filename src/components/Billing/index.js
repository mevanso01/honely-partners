import React from 'react'
import { DashboardLayout } from '../Layout/DashboardLayout'
import { Button } from '../Shared'
import {
  Container,
  CardsContainer,
  CardsList,
  CardInfo,
  PaymentHistoryContainer,
  PaymentHistoryTableWrapper
} from './styles'

export const Billing = (props) => {
  return (
    <DashboardLayout>
      <Container>
        <h1>Billing</h1>
        <CardsContainer>
          <p>Card on file</p>
          <CardsList>
            <CardInfo>
              <span className='brand'>VISA</span>
              <span>**** **** **** 1213</span>
            </CardInfo>
          </CardsList>
          <Button
            outline
            color='black'
          >
            Change Card
          </Button>
        </CardsContainer>

        <PaymentHistoryContainer>
          <p>Payment History</p>
          <PaymentHistoryTableWrapper>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Payment Type</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>March 3rd</td>
                  <td>AUTOPAY: Credit Card ending in 4958</td>
                  <td>$24.99</td>
                </tr>
                <tr>
                  <td>February 3rd</td>
                  <td>AUTOPAY: Credit Card ending in 4958</td>
                  <td>$24.99</td>
                </tr>
                <tr>
                  <td>January 2nd</td>
                  <td>AUTOPAY: Credit Card ending in 4958</td>
                  <td>$24.99</td>
                </tr>
              </tbody>
            </table>
          </PaymentHistoryTableWrapper>
        </PaymentHistoryContainer>
      </Container>
    </DashboardLayout>
  )
}

