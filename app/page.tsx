export const dynamic = 'force-dynamic'

import {CSSProperties} from 'react'
import ClientOnly from './components/ClientOnly'
import Container from './components/Container'
import EmptyState from './components/EmptyState'
import getListings, {IListingParams} from './actions/getListings'
import ListingCard from './components/listings/ListingCard'
import getCurrentUser from './actions/getCurrentUser'

interface HomeProps {
  searchParams: IListingParams
}

const Home = async ({searchParams}: HomeProps) => {
  const listings = await getListings(searchParams)
  const currentUser = await getCurrentUser()

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <Container>
        <div style={wrapperStyles}>
          {listings.map(listing => {
            return (
              <ListingCard
                currentUser={currentUser}
                data={listing}
                key={listing.id}
              />
            )
          })}
        </div>
      </Container>
    </ClientOnly>
  )
}

export default Home

const wrapperStyles: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: 32,
  width: '100%',
  paddingTop: 100,
}
